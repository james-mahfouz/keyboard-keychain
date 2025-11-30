"use client";

import { useCart } from '@/components/CartProvider';
import { useRouter } from 'next/navigation';
import PixelBackground from '@/components/PixelBackground';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: '',
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.zipCode) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Simulate order submission
    setTimeout(() => {
      toast.success('🎉 Order placed successfully!', {
        description: 'You will receive a confirmation email shortly.',
      });
      clearCart();
      router.push('/order-confirmation');
      setIsSubmitting(false);
    }, 2000);
  };

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
            onClick={() => router.push('/cart')}
            className="text-xs md:text-sm hover:text-[#cc0000] transition-colors"
          >
            ← BACK TO CART
          </button>
        </div>
      </header>

      {/* Checkout Content */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-center text-[#cc0000] mb-8 drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
            CHECKOUT 🎁
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shipping Form */}
            <div className="bg-white border-4 border-[#1a2744] p-8 pixel-border">
              <h2 className="text-2xl text-[#cc0000] mb-6">SHIPPING INFO</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-2 text-[#cc0000]">NAME *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#cc0000]">EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#cc0000]">PHONE *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#cc0000]">ADDRESS *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2 text-[#cc0000]">CITY *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-[#cc0000]">ZIP CODE *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-[#cc0000]">ORDER NOTES</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full border-4 border-[#1a2744] p-3 text-sm focus:outline-none focus:border-[#cc0000] resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Items Summary */}
              <div className="bg-white border-4 border-[#1a2744] p-8 pixel-border">
                <h2 className="text-2xl text-[#cc0000] mb-6">YOUR ORDER</h2>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm border-b-2 border-dashed border-[#1a2744] pb-4">
                      <div className="flex gap-3 items-center">
                        <div className="w-16 h-16 border-2 border-[#1a2744] flex items-center justify-center bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-1"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                        <div>
                          <p className="text-[#cc0000]">{item.name}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold">${(item.priceValue * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm border-t-4 border-[#1a2744] pt-4">
                  <div className="flex justify-between">
                    <span>SUBTOTAL ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SHIPPING</span>
                    <span>FREE 🎄</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-dashed border-[#1a2744]">
                    <span>TOTAL</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-[#cc0000] text-white border-4 border-[#1a2744] p-8 pixel-border">
                <h2 className="text-2xl mb-6">PAYMENT METHOD 💵</h2>
                <div className="bg-white text-[#1a2744] border-2 border-[#1a2744] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-4 border-[#1a2744] bg-[#ffff00]"></div>
                    <div>
                      <p className="font-bold">CASH ON DELIVERY</p>
                      <p className="text-xs">Pay when you receive your order</p>
                    </div>
                  </div>
                  <p className="text-xs border-t-2 border-dashed border-[#1a2744] pt-4">
                    💳 You will pay ${totalPrice.toFixed(2)} in cash when your order arrives at your doorstep.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="pixel-button bg-white text-[#cc0000] px-8 py-4 text-lg w-full mt-6 hover:bg-[#ffff00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER 🎁'}
                </button>
              </div>
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
