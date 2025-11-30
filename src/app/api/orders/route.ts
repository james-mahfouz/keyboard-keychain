import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      shippingCity,
      shippingZipCode,
      orderNotes,
      items,
      totalAmount,
      totalItems,
      paymentMethod
    } = body;

    // Validate required fields
    if (!customerName || !customerName.trim()) {
      return NextResponse.json({
        error: 'Customer name is required',
        code: 'MISSING_CUSTOMER_NAME'
      }, { status: 400 });
    }

    if (!customerEmail || !customerEmail.trim()) {
      return NextResponse.json({
        error: 'Customer email is required',
        code: 'MISSING_CUSTOMER_EMAIL'
      }, { status: 400 });
    }

    if (!customerPhone || !customerPhone.trim()) {
      return NextResponse.json({
        error: 'Customer phone is required',
        code: 'MISSING_CUSTOMER_PHONE'
      }, { status: 400 });
    }

    if (!shippingAddress || !shippingAddress.trim()) {
      return NextResponse.json({
        error: 'Shipping address is required',
        code: 'MISSING_SHIPPING_ADDRESS'
      }, { status: 400 });
    }

    if (!shippingCity || !shippingCity.trim()) {
      return NextResponse.json({
        error: 'Shipping city is required',
        code: 'MISSING_SHIPPING_CITY'
      }, { status: 400 });
    }

    if (!shippingZipCode || !shippingZipCode.trim()) {
      return NextResponse.json({
        error: 'Shipping zip code is required',
        code: 'MISSING_SHIPPING_ZIP_CODE'
      }, { status: 400 });
    }

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({
        error: 'Items must be an array',
        code: 'INVALID_ITEMS_FORMAT'
      }, { status: 400 });
    }

    if (items.length === 0) {
      return NextResponse.json({
        error: 'Items array cannot be empty',
        code: 'EMPTY_ITEMS_ARRAY'
      }, { status: 400 });
    }

    if (!totalAmount || !totalAmount.trim()) {
      return NextResponse.json({
        error: 'Total amount is required',
        code: 'MISSING_TOTAL_AMOUNT'
      }, { status: 400 });
    }

    if (totalItems === undefined || totalItems === null) {
      return NextResponse.json({
        error: 'Total items is required',
        code: 'MISSING_TOTAL_ITEMS'
      }, { status: 400 });
    }

    if (typeof totalItems !== 'number' || totalItems <= 0) {
      return NextResponse.json({
        error: 'Total items must be a positive integer',
        code: 'INVALID_TOTAL_ITEMS'
      }, { status: 400 });
    }

    // Generate unique order number with max 10 attempts
    let orderNumber = '';
    let attempts = 0;
    const maxAttempts = 10;
    let isUnique = false;

    while (attempts < maxAttempts && !isUnique) {
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      orderNumber = `ORD-${randomDigits}`;

      const existingOrder = await db.select()
        .from(orders)
        .where(eq(orders.orderNumber, orderNumber))
        .limit(1);

      if (existingOrder.length === 0) {
        isUnique = true;
      }

      attempts++;
    }

    if (!isUnique) {
      return NextResponse.json({
        error: 'Failed to generate unique order number. Please try again.',
        code: 'ORDER_NUMBER_GENERATION_FAILED'
      }, { status: 500 });
    }

    // Sanitize and prepare data
    const now = new Date().toISOString();
    
    const orderData = {
      orderNumber,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      shippingAddress: shippingAddress.trim(),
      shippingCity: shippingCity.trim(),
      shippingZipCode: shippingZipCode.trim(),
      orderNotes: orderNotes ? orderNotes.trim() : null,
      items: items,
      totalAmount: totalAmount.trim(),
      totalItems: totalItems,
      paymentMethod: paymentMethod ? paymentMethod.trim() : 'Cash on Delivery',
      orderStatus: 'pending',
      createdAt: now,
      updatedAt: now
    };

    // Insert order into database
    const newOrder = await db.insert(orders)
      .values(orderData)
      .returning();

    if (!newOrder || newOrder.length === 0) {
      return NextResponse.json({
        error: 'Failed to create order',
        code: 'ORDER_CREATION_FAILED'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      orderId: newOrder[0].id,
      orderNumber: newOrder[0].orderNumber,
      message: 'Order created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
}