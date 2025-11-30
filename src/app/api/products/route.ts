import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    // Single product by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json(
          { 
            error: 'Valid ID is required',
            code: 'INVALID_ID' 
          },
          { status: 400 }
        );
      }

      const product = await db.select()
        .from(products)
        .where(eq(products.id, parseInt(id)))
        .limit(1);

      if (product.length === 0) {
        return NextResponse.json(
          { error: 'Product not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(product[0], { status: 200 });
    }

    // List products with pagination and search
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');

    let query = db.select().from(products);

    if (search) {
      query = query.where(
        or(
          like(products.name, `%${search}%`),
          like(products.color, `%${search}%`),
          like(products.switches, `%${search}%`)
        )
      );
    }

    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'price', 'priceValue', 'image', 'color', 'switches', 'lights'];
    for (const field of requiredFields) {
      if (!body[field] || (typeof body[field] === 'string' && body[field].trim() === '')) {
        return NextResponse.json(
          { 
            error: `${field} is required`,
            code: 'MISSING_REQUIRED_FIELD' 
          },
          { status: 400 }
        );
      }
    }

    // Validate priceValue is a number
    if (typeof body.priceValue !== 'number' || isNaN(body.priceValue)) {
      return NextResponse.json(
        { 
          error: 'priceValue must be a valid number',
          code: 'INVALID_PRICE_VALUE' 
        },
        { status: 400 }
      );
    }

    // Sanitize text fields
    const sanitizedData = {
      name: body.name.trim(),
      price: body.price.trim(),
      priceValue: body.priceValue,
      image: body.image.trim(),
      color: body.color.trim(),
      switches: body.switches.trim(),
      lights: body.lights.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newProduct = await db.insert(products)
      .values(sanitizedData)
      .returning();

    return NextResponse.json(newProduct[0], { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Build update object with only provided fields
    const updates: Record<string, any> = {
      updatedAt: new Date().toISOString()
    };

    // Add fields if they exist in the request body
    if (body.name !== undefined) {
      updates.name = typeof body.name === 'string' ? body.name.trim() : body.name;
    }
    if (body.price !== undefined) {
      updates.price = typeof body.price === 'string' ? body.price.trim() : body.price;
    }
    if (body.priceValue !== undefined) {
      if (typeof body.priceValue !== 'number' || isNaN(body.priceValue)) {
        return NextResponse.json(
          { 
            error: 'priceValue must be a valid number',
            code: 'INVALID_PRICE_VALUE' 
          },
          { status: 400 }
        );
      }
      updates.priceValue = body.priceValue;
    }
    if (body.image !== undefined) {
      updates.image = typeof body.image === 'string' ? body.image.trim() : body.image;
    }
    if (body.color !== undefined) {
      updates.color = typeof body.color === 'string' ? body.color.trim() : body.color;
    }
    if (body.switches !== undefined) {
      updates.switches = typeof body.switches === 'string' ? body.switches.trim() : body.switches;
    }
    if (body.lights !== undefined) {
      updates.lights = typeof body.lights === 'string' ? body.lights.trim() : body.lights;
    }

    const updatedProduct = await db.update(products)
      .set(updates)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json(updatedProduct[0], { status: 200 });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: 'Valid ID is required',
          code: 'INVALID_ID' 
        },
        { status: 400 }
      );
    }

    // Check if product exists
    const existingProduct = await db.select()
      .from(products)
      .where(eq(products.id, parseInt(id)))
      .limit(1);

    if (existingProduct.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const deletedProduct = await db.delete(products)
      .where(eq(products.id, parseInt(id)))
      .returning();

    return NextResponse.json(
      {
        message: 'Product deleted successfully',
        product: deletedProduct[0]
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error as Error).message },
      { status: 500 }
    );
  }
}