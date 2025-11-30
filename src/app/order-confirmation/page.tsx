"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import PixelBackground from '@/components/PixelBackground';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface OrderItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
  image: string;
  color: string;
  switches: string;
  lights: string;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingZipCode: string;
  orderNotes: string | null;
  items: OrderItem[];
  totalAmount: string;
  totalItems: number;
  paymentMethod: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNumber) {
        toast.error('No order number provided');
        router.push('/');
        return;
      }

      try {
        const token = localStorage.getItem("bearer_token");
        const headers: Record<string, string> = {};
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`/api/orders/${orderNumber}`, { headers });
        
        if (!response.ok) {
          throw new Error('Order not found');
        }

        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Failed to fetch order:', error);
        toast.error('Failed to load order details');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber, router]);

  // Christmas snowflakes effect
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'fixed pointer-events-none z-50 text-[#cccccc] opacity-80';
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.top = '-20px';
      snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
      snowflake.textContent = '❄';
      snowflake.style.animation = `snowfall ${Math.random() * 3 + 5}s linear`;

      document.body.appendChild(snowflake);

      setTimeout(() => snowflake.remove(), 8000);
    };

    const interval = setInterval(createSnowflake, 300);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-white text-[#1a2744] flex items-center justify-center">
        <PixelBackground />
        <div className="relative z-10 text-center">
          <div className="text-2xl text-[#cc0000] animate-pulse">LOADING...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-white text-[#1a2744]">
      <PixelBackground />

      {/* Header */}
      <header className="relative z-10 border-b-4 border-[#1a2744] bg-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-xl md:text-2xl text-[#cc0000] animate-blink hover:scale-105 transition-transform flex items-center gap-2"
          >
            CLICK IT <span>🎄</span>
          </button>
        </div>
      </header>

      {/* Confirmation Content */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Message */}
          <div className="bg-white border-4 border-[#1a2744] p-8 md:p-12 pixel-border text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-20 h-20 md:w-24 md:h-24 text-green-600 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="text-2xl md:text-4xl text-[#cc0000] drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
                ORDER CONFIRMED! 🎉
              </h1>
              <div className="text-lg md:text-2xl font-bold text-[#1a2744]">
                ORDER #{order.orderNumber}
              </div>
              <p className="text-base md:text-lg">Thank you, {order.customerName}!</p>
              <p className="text-xs md:text-sm">
                Your order has been received and will be processed shortly.
                <br />
                A confirmation email has been sent to {order.customerEmail}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white border-4 border-[#1a2744] p-6 md:p-8 pixel-border">
            <h2 className="text-xl md:text-2xl text-[#cc0000] mb-6">ORDER DETAILS</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm border-b-2 border-dashed border-[#1a2744] pb-4 last:border-b-0">
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#1a2744] flex items-center justify-center bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain p-1"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                    <div>
                      <p className="text-[#cc0000] font-bold text-xs md:text-sm">{item.name}</p>
                      <p className="text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold text-sm md:text-base">${(item.priceValue * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t-4 border-[#1a2744] pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>SUBTOTAL ({order.totalItems} items)</span>
                <span>${order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>SHIPPING</span>
                <span>FREE 🎄</span>
              </div>
              <div className="flex justify-between text-lg md:text-xl font-bold pt-2 border-t-2 border-dashed border-[#1a2744]">
                <span>TOTAL</span>
                <span>${order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="bg-white border-4 border-[#1a2744] p-6 md:p-8 pixel-border">
            <h2 className="text-xl md:text-2xl text-[#cc0000] mb-6">SHIPPING ADDRESS</h2>
            <div className="space-y-2 text-sm">
              <p className="font-bold">{order.customerName}</p>
              <p>{order.shippingAddress}</p>
              <p>{order.shippingCity}, {order.shippingZipCode}</p>
              <p>Phone: {order.customerPhone}</p>
              {order.orderNotes && (
                <div className="mt-4 pt-4 border-t-2 border-dashed border-[#1a2744]">
                  <p className="text-[#cc0000] font-bold mb-1">ORDER NOTES:</p>
                  <p>{order.orderNotes}</p>
                </div>
              )}
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-[#f5f5f5] border-4 border-[#1a2744] p-6 md:p-8 pixel-border space-y-6">
            <h2 className="text-xl md:text-2xl text-[#cc0000]">WHAT'S NEXT?</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <Package className="w-6 h-6 text-[#cc0000] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-sm">STEP 1: PROCESSING</p>
                  <p className="text-xs">We'll prepare your order within 1-2 business days</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Truck className="w-6 h-6 text-[#cc0000] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-sm">STEP 2: SHIPPING</p>
                  <p className="text-xs">Your order will be shipped and arrive in 3-5 business days</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-[#cc0000] flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-sm">STEP 3: DELIVERY & PAYMENT</p>
                  <p className="text-xs">Pay ${order.totalAmount} cash on delivery when you receive your package! 💵</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="pixel-button bg-[#cc0000] text-white px-8 py-4"
            >
              BACK TO HOME 🏠
            </button>
            <button
              onClick={() => router.push('/')}
              className="pixel-button bg-white text-[#1a2744] px-8 py-4"
            >
              CONTINUE SHOPPING 🎁
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t-4 border-[#1a2744] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">&copy; 2025 CLICK IT. ALL RIGHTS RESERVED. 🎄</p>
            <div className="flex gap-6">
              {['INSTAGRAM', 'TIKTOK', 'YOUTUBE'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs hover:text-[#cc0000] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}