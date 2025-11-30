"use client"

import { useParams, useRouter } from 'next/navigation'
import PixelBackground from '@/components/PixelBackground'
import { Button } from '@/components/ui/button'
import { CartButton } from '@/components/CartButton'
import { useCart } from '@/components/CartProvider'
import { useEffect } from 'react'

const products = [
  {
    id: 1,
    name: 'CLASSIC WASD',
    price: '$5.97',
    priceValue: 5.97,
    color: 'Clear & Cream',
    switches: 'Light Sound (4 colors available)',
    lights: 'With & Without Lights',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_59PM-1763504359428.png',
    description: 'The original gaming keychain that started it all. Classic clear and cream color scheme with smooth light sound switches for lightning-fast actuation.',
    specs: {
      actuation: '45g',
      travel: '4.0mm',
      sound: 'Light & Quiet',
      rgb: 'Optional LED'
    }
  },
  {
    id: 2,
    name: 'STEALTH EDITION',
    price: '$5.97',
    priceValue: 5.97,
    color: 'Smoke & Black',
    switches: 'Light Sound (4 colors available)',
    lights: 'With & Without Lights',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_36PM-1763504359353.png',
    description: 'For the professional who needs stress relief without the noise. Silent switches perfect for office use while maintaining that satisfying mechanical feel.',
    specs: {
      actuation: '45g',
      travel: '3.7mm',
      sound: 'Light & Silent',
      rgb: 'Optional LED'
    }
  },
  {
    id: 3,
    name: 'RGB GAMER',
    price: '$5.97',
    priceValue: 5.97,
    color: 'Clear & Blue',
    switches: 'Clicky & Loud (4 colors available)',
    lights: 'With & Without Lights',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_29PM-1763504359576.png',
    description: 'Maximum style with RGB lighting effects. Clicky blue switches provide tactile and audible feedback that gamers crave. Customizable LED patterns.',
    specs: {
      actuation: '50g',
      travel: '4.0mm',
      sound: 'Clicky & Loud',
      rgb: 'Optional LED'
    }
  },
  {
    id: 4,
    name: 'CRYSTAL PRO',
    price: '$5.97',
    priceValue: 5.97,
    color: 'Crystal Clear',
    switches: 'Light Sound (4 colors available)',
    lights: 'With & Without Lights',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_28PM-1763504359521.png',
    description: 'Premium crystal clear design for the ultimate enthusiast. Tactile light sound switches offer perfect balance between typing and gaming.',
    specs: {
      actuation: '45g',
      travel: '4.0mm',
      sound: 'Light & Medium',
      rgb: 'Optional LED'
    }
  }
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const productId = parseInt(params.id as string)
  const product = products.find(p => p.id === productId)

  // Christmas snowflakes effect
  useEffect(() => {
    const createSnowflake = () => {
      const snowflake = document.createElement('div');
      snowflake.className = 'fixed pointer-events-none z-[5] text-white opacity-80';
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

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl text-[#cc0000]">PRODUCT NOT FOUND</h1>
          <button 
            onClick={() => router.push('/')}
            className="pixel-button bg-[#cc0000] text-white px-8 py-4"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-white text-[#1a2744]">
      <PixelBackground />
      
      {/* Christmas decoration styles */}
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
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.push('/#products')}
              className="text-xs md:text-sm hover:text-[#cc0000] transition-colors"
            >
              ← BACK TO PRODUCTS
            </button>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <section className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Product Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="mb-4 h-64 flex items-center justify-center bg-white border-4 border-[#1a2744] pixel-border relative overflow-hidden group">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-auto h-full object-contain p-4 relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <h1 className="text-4xl md:text-5xl text-[#cc0000] drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
              {product.name} 🎁
            </h1>
            <div className="text-3xl font-bold">{product.price}</div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Description Card */}
            <div className="bg-white border-4 border-[#1a2744] p-8 pixel-border space-y-4">
              <h2 className="text-2xl text-[#cc0000] mb-4">DESCRIPTION</h2>
              <p className="text-sm leading-relaxed">{product.description}</p>
              
              <div className="pt-4 border-t-2 border-dashed border-[#1a2744] space-y-2">
                <p className="flex justify-between text-xs">
                  <span className="text-[#cc0000]">COLOR:</span>
                  <span>{product.color}</span>
                </p>
                <p className="flex justify-between text-xs">
                  <span className="text-[#cc0000]">SWITCHES:</span>
                  <span className="text-right">{product.switches}</span>
                </p>
                <p className="flex justify-between text-xs">
                  <span className="text-[#cc0000]">LIGHTS:</span>
                  <span>{product.lights}</span>
                </p>
              </div>
            </div>

            {/* Specs Card */}
            <div className="bg-white border-4 border-[#1a2744] p-8 pixel-border">
              <h2 className="text-2xl text-[#cc0000] mb-4">SPECS</h2>
              <div className="space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div 
                    key={key}
                    className="flex justify-between items-center border-b-2 border-dashed border-[#1a2744] pb-2"
                  >
                    <span className="text-sm text-[#cc0000] uppercase">{key}</span>
                    <span className="text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: '⚡', label: 'FAST SHIPPING' },
              { icon: '🛡️', label: '30 DAYS WARRANTY' },
              { icon: '🎄', label: 'CUSTOMIZABLE SOON' },
              { icon: '💯', label: 'SATISFACTION GUARANTEED' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-[#cc0000] text-white border-4 border-[#1a2744] p-4 text-center pixel-border"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-[10px]">{feature.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                priceValue: product.priceValue,
                image: product.image,
                color: product.color,
                switches: product.switches,
                lights: product.lights
              })}
              className="pixel-button bg-[#cc0000] text-white px-12 py-6 text-lg">
              ADD TO CART - {product.price} 🎁
            </button>
            <button 
              onClick={() => router.push('/#products')}
              className="pixel-button bg-white text-[#1a2744] px-12 py-6 text-lg"
            >
              VIEW ALL PRODUCTS
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
  )
}