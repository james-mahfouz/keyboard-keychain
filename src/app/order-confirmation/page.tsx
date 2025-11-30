"use client";

import { useRouter } from 'next/navigation';
import PixelBackground from '@/components/PixelBackground';
import { CheckCircle, Package, Truck } from 'lucide-react';
import { useEffect } from 'react';

export default function OrderConfirmationPage() {
  const router = useRouter();

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

  return (
    <div className="relative min-h-screen bg-white text-[#1a2744]">
      <PixelBackground />

      <style jsx global>{`
        @keyframes snowfall {
          0% { transform: translateY(-20px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>

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
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-4 border-[#1a2744] p-12 pixel-border text-center space-y-8">
            <div className="flex justify-center">
              <CheckCircle className="w-24 h-24 text-green-600 animate-pulse" />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl text-[#cc0000] drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
                ORDER CONFIRMED! 🎉
              </h1>
              <p className="text-lg">Thank you for your purchase!</p>
              <p className="text-sm">
                Your order has been received and will be processed shortly.
                <br />
                You will receive a confirmation email with your order details.
              </p>
            </div>

            <div className="bg-[#f5f5f5] border-4 border-[#1a2744] p-8 space-y-6">
              <h2 className="text-xl text-[#cc0000]">WHAT'S NEXT?</h2>
              
              <div className="space-y-4 text-left">
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
                    <p className="font-bold text-sm">STEP 3: DELIVERY</p>
                    <p className="text-xs">Pay cash on delivery when you receive your package! 💵</p>
                  </div>
                </div>
              </div>
            </div>

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
