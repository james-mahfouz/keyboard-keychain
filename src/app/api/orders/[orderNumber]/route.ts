import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    const { orderNumber } = params;

    // Validate orderNumber is provided
    if (!orderNumber || orderNumber.trim() === '') {
      return NextResponse.json(
        { 
          error: 'Order number is required',
          code: 'MISSING_ORDER_NUMBER'
        },
        { status: 400 }
      );
    }

    // Query database for order with matching orderNumber
    const order = await db.select()
      .from(orders)
      .where(eq(orders.orderNumber, orderNumber))
      .limit(1);

    // Return 404 if order not found
    if (order.length === 0) {
      return NextResponse.json(
        { 
          error: 'Order not found',
          code: 'ORDER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Return full order details
    return NextResponse.json(order[0], { status: 200 });

  } catch (error) {
    console.error('GET order error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}