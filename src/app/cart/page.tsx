"use client";

import { useCart } from '@/components/CartProvider';
import { useRouter } from 'next/navigation';
import PixelBackground from '@/components/PixelBackground';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
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
          <button
            onClick={() => router.push('/')}
            className="text-xs md:text-sm hover:text-[#cc0000] transition-colors"
          >
            ← BACK TO SHOP
          </button>
        </div>
      </header>

      {/* Cart Content */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-center text-[#cc0000] mb-8 drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
            YOUR CART 🛒
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white border-4 border-[#1a2744] p-12 pixel-border text-center space-y-6">
              <ShoppingBag className="w-24 h-24 mx-auto text-[#cccccc]" />
              <h2 className="text-2xl text-[#cc0000]">YOUR CART IS EMPTY</h2>
              <p className="text-sm">Add some awesome keychains to get started!</p>
              <button
                onClick={() => router.push('/')}
                className="pixel-button bg-[#cc0000] text-white px-8 py-4"
              >
                SHOP NOW 🎁
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-4 border-[#1a2744] p-6 pixel-border"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="w-full md:w-32 h-32 flex-shrink-0 border-2 border-[#1a2744] flex items-center justify-center bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow space-y-2">
                        <h3 className="text-lg text-[#cc0000]">{item.name}</h3>
                        <div className="text-xs space-y-1">
                          <p><span className="text-[#cc0000]">Color:</span> {item.color}</p>
                          <p><span className="text-[#cc0000]">Switches:</span> {item.switches}</p>
                          <p><span className="text-[#cc0000]">Lights:</span> {item.lights}</p>
                        </div>
                        <p className="text-xl font-bold">{item.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex md:flex-col items-center gap-4">
                        <div className="flex items-center gap-2 border-4 border-[#1a2744]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-[#cc0000] text-white p-2 hover:bg-[#aa0000] transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-[#cc0000] text-white p-2 hover:bg-[#aa0000] transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="pixel-button bg-white text-[#cc0000] p-2 hover:bg-[#cc0000] hover:text-white transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-[#cc0000] text-white border-4 border-[#1a2744] p-8 pixel-border space-y-6">
                <h2 className="text-2xl text-center mb-4">ORDER SUMMARY 🎁</h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b-2 border-dashed border-white pb-2">
                    <span>ITEMS ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b-2 border-dashed border-white pb-2">
                    <span>SHIPPING</span>
                    <span>FREE 🎄</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4">
                    <span>TOTAL</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="pixel-button bg-white text-[#cc0000] px-8 py-4 text-lg w-full hover:bg-[#ffff00] transition-colors"
                >
                  PROCEED TO CHECKOUT 🎁
                </button>

                <button
                  onClick={() => router.push('/')}
                  className="text-sm hover:underline text-center w-full"
                >
                  ← Continue Shopping
                </button>
              </div>
            </>
          )}
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
