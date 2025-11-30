"use client";

import PixelBackground from '@/components/PixelBackground';
import KeychainDisplay from '@/components/KeychainDisplay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CartButton } from '@/components/CartButton';
import { useCart } from '@/components/CartProvider';
import { useState, useEffect } from 'react';

export default function Home() {
  const { addToCart } = useCart();
  const [gameScore, setGameScore] = useState(0);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [lightningFlash, setLightningFlash] = useState(false);

  const keys = ['W', 'A', 'S', 'D'];

  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    setLightningFlash(true);
    setGameScore((prev) => prev + 1);

    // Create particle effect
    const keyElement = document.getElementById(`game-key-${key}`);
    if (keyElement) {
      const rect = keyElement.getBoundingClientRect();
      createScoreParticle(rect.left + rect.width / 2, rect.top);
    }

    setTimeout(() => {
      setPressedKey(null);
      setLightningFlash(false);
    }, 150);
  };

  const createScoreParticle = (x: number, y: number) => {
    const particle = document.createElement('div');
    particle.className = 'fixed pointer-events-none text-2xl font-bold z-50';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.transform = 'translate(-50%, -50%)';
    particle.style.color = '#ffffff';
    particle.style.textShadow = '2px 2px 0px #cc0000, 0 0 10px #ffff00';
    particle.textContent = '+1';

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.style.transition = 'all 0.8s ease-out';
      particle.style.opacity = '0';
      particle.style.transform = 'translate(-50%, -80px) scale(1.5)';
    }, 50);

    setTimeout(() => particle.remove(), 900);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (keys.includes(key) && pressedKey !== key) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pressedKey]);

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
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl text-[#cc0000] animate-blink">CLICK IT</h1>
            <span className="text-lg">🎄</span>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-4">
              <a href="#features" className="text-xs md:text-sm hover:text-[#cc0000] transition-colors">FEATURES</a>
              <a href="#products" className="text-xs md:text-sm hover:text-[#cc0000] transition-colors">PRODUCTS</a>
              <a href="#specs" className="text-xs md:text-sm hover:text-[#cc0000] transition-colors">SPECS</a>
            </nav>
            <CartButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl text-[#cc0000] drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
              CLICK IT <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/eea4b40c-925b-4a40-a278-743f03c95c99/generated_images/pixel-art-santa-claus-face-icon-white-ba-bc887a04-20251126075406.jpg" alt="Pixel Santa" className="inline-block h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 align-baseline ml-2" style={{ imageRendering: 'pixelated' }} />
            </h2>
            <p className="text-base md:text-lg text-[#1a2744]">
              mechanical keyboard keychain
            </p>
            <p className="text-sm text-green-700 animate-pulse">
              ⭐ PERFECT HOLIDAY GIFT! ⭐
            </p>
          </div>
          
          <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            YOUR PORTABLE STRESS RELIEF COMPANION - YOU'LL NEED IT
          </p>

          <div className="flex justify-center py-8">
            <KeychainDisplay />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="pixel-button bg-[#cc0000] text-white px-8 py-4 text-sm md:text-base">
              BUY NOW - $5.97 🎁
            </button>
            <button className="pixel-button bg-white text-[#1a2744] px-8 py-4 text-sm md:text-base">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 bg-[#cc0000] border-y-4 border-[#1a2744] py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl md:text-4xl text-center text-white mb-12 drop-shadow-[4px_4px_0px_rgba(26,39,68,1)]">
            FEATURES 🎄
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            { title: 'MECHANICAL', desc: 'Cherry MX-style switches for authentic feel' },
            { title: 'PORTABLE', desc: 'Compact 4-key design fits anywhere' },
            { title: 'CUSTOMIZABLE', desc: 'We will make customize keycaps soon' },
            { title: 'RETRO', desc: 'Pixel-perfect design aesthetics' }].
            map((feature, index) =>
            <div
              key={index}
              className="bg-white border-4 border-[#1a2744] p-6 pixel-border hover:translate-y-1 transition-transform">

                <h4 className="text-[#cc0000] mb-4 text-sm md:text-base">{feature.title}</h4>
                <p className="text-xs leading-relaxed">{feature.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative z-10 container mx-auto px-4 py-16">
        <h3 className="text-3xl md:text-4xl text-center mb-12 text-[#cc0000]">
          OUR PRODUCTS 🎁
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
          {
            id: 1,
            name: 'CLASSIC WASD',
            price: '$5.97',
            color: 'Clear & Cream',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_59PM-1763504359428.png'
          },
          {
            id: 2,
            name: 'STEALTH EDITION',
            price: '$5.97',
            color: 'Smoke & Black',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_36PM-1763504359353.png'
          },
          {
            id: 3,
            name: 'RGB GAMER',
            price: '$5.97',
            color: 'Clear & Blue',
            switches: 'Clicky & Loud (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_29PM-1763504359576.png'
          },
          {
            id: 4,
            name: 'CRYSTAL PRO',
            price: '$5.97',
            color: 'Crystal Clear',
            switches: 'Light Sound (4 colors available)',
            lights: 'With & Without Lights',
            image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Generated-Image-November-18-2025-11_28PM-1763504359521.png'
          }].
          map((product, index) =>
          <div
            key={index}
            className="bg-white border-4 border-[#1a2744] p-6 pixel-border hover:translate-y-[-8px] hover:shadow-[12px_12px_0px_rgba(26,39,68,1)] transition-all duration-300 group cursor-pointer">

              <div className="mb-4 h-48 flex items-center justify-center bg-white relative overflow-hidden border-2 border-[#1a2744]">
                <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-[180px] max-w-full relative z-10 group-hover:scale-110 transition-transform duration-300"
                style={{ imageRendering: 'pixelated' }} />

              </div>
              <h4 className="text-base text-[#cc0000] mb-4 text-center group-hover:animate-pulse break-words">{product.name}</h4>
              <div className="space-y-2 text-xs mb-6 overflow-hidden">
                <div className="border-b-2 border-dashed border-[#1a2744] pb-2">
                  <p className="text-[#cc0000] mb-1 font-bold">COLOR:</p>
                  <p className="break-words leading-relaxed">{product.color}</p>
                </div>
                <div className="border-b-2 border-dashed border-[#1a2744] pb-2">
                  <p className="text-[#cc0000] mb-1 font-bold">SWITCHES:</p>
                  <p className="break-words leading-relaxed">{product.switches}</p>
                </div>
                <div className="border-b-2 border-dashed border-[#1a2744] pb-2">
                  <p className="text-[#cc0000] mb-1 font-bold">LIGHTS:</p>
                  <p className="break-words leading-relaxed">{product.lights}</p>
                </div>
              </div>
              <div className="text-center mb-4">
                <div className="text-2xl text-[#cc0000] font-bold group-hover:scale-110 transition-transform duration-300 inline-block">{product.price}</div>
              </div>
              <button 
                onClick={() => addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  priceValue: 5.97,
                  image: product.image,
                  color: product.color,
                  switches: product.switches,
                  lights: product.lights
                })}
                className="pixel-button bg-[#cc0000] text-white px-6 py-3 text-xs w-full group-hover:bg-[#1a2744] transition-colors duration-300">
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="relative z-10 container mx-auto px-4 py-16 bg-[#f5f5f5]">
        <h3 className="text-3xl md:text-4xl text-center mb-12 text-[#cc0000]">
          SPECIFICATIONS
        </h3>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border-4 border-[#1a2744] pixel-border p-8 space-y-4">
            {[
            { label: 'KEYS', value: '4 (W, A, S, D)' },
            { label: 'SWITCHES', value: 'Cherry MX Red (4 colors available)' },
            { label: 'DIMENSIONS', value: "8 cm x 2.5 cm x 2.0 cm" },
            { label: 'WEIGHT', value: "25 g" },
            { label: 'MATERIAL', value: 'Aluminum + ABS' },
            { label: 'CONNECTION', value: 'USB-C' },
            { label: 'CUSTOMIZABLE', value: 'Coming Soon' },
            { label: 'WARRANTY', value: '30 Days' }].
            map((spec, index) =>
            <div
              key={index}
              className="flex justify-between items-center border-b-2 border-dashed border-[#1a2744] pb-2 last:border-b-0">

                <span className="text-sm text-[#cc0000]">{spec.label}</span>
                <span className="text-sm text-right">{spec.value}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-[#1a2744] text-white py-16 border-t-4 border-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h3 className="text-3xl md:text-4xl text-[#cc0000]">
            LEVEL UP YOUR SETUP 🎄
          </h3>
          <p className="text-sm md:text-base max-w-xl mx-auto">LIMITED QUANTITY - ONLY 120 UNITS AVAILABLE</p>
          <button className="pixel-button bg-[#cc0000] text-white px-12 py-6 text-lg border-white">
            ORDER NOW 🎁
          </button>
        </div>
      </section>

      {/* Game Section */}
      <section className="relative z-10 bg-white py-16 border-t-4 border-[#1a2744]">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl md:text-3xl text-center mb-8 text-[#cc0000]">
            WASD SPEED TEST! ⛄
          </h3>
          
          <div className="max-w-2xl mx-auto">
            <div
              className={`relative bg-gradient-to-br from-[#cc0000] to-[#1a2744] border-4 border-[#1a2744] pixel-border p-8 overflow-hidden transition-all duration-150 ${
              lightningFlash ? 'bg-[#ffff00] shadow-[0_0_40px_rgba(255,255,0,0.8)]' : 'shadow-[8px_8px_0px_rgba(26,39,68,1)]'}`
              }>

              {/* Lightning flash overlay */}
              {lightningFlash &&
              <div className="absolute inset-0 bg-gradient-radial from-[#ffff00] via-[#ffffff] to-transparent opacity-60 animate-pulse pointer-events-none z-20" />
              }

              {/* Pixel grid background */}
              <div className="absolute inset-0 bg-[length:40px_40px] opacity-20"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg, #fff, #fff 2px, transparent 2px, transparent 4px), repeating-linear-gradient(90deg, #fff, #fff 2px, transparent 2px, transparent 4px)' }}></div>
              
              {/* Score display - moved to top-right */}
              <div className="absolute top-4 right-4 bg-white border-2 border-[#1a2744] px-4 py-2 text-[#cc0000] text-sm z-30">
                SCORE: {gameScore}
              </div>
              
              {/* WASD Keys Game */}
              <div className="flex justify-center gap-3 relative z-10 mt-4">
                {keys.map((key) =>
                <button
                  key={key}
                  id={`game-key-${key}`}
                  onClick={() => handleKeyPress(key)}
                  className={`
                      w-16 h-16 md:w-20 md:h-20 
                      bg-white border-4 border-[#1a2744]
                      flex items-center justify-center
                      text-2xl md:text-3xl font-bold
                      transition-all duration-100
                      hover:bg-[#ffff00] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,0,0.6)]
                      active:scale-95
                      ${pressedKey === key ?
                  'translate-y-2 shadow-none bg-[#ffff00] text-[#cc0000] scale-90 animate-pulse' :
                  'shadow-[4px_4px_0px_0px_rgba(26,39,68,1)]'}
                    `
                  }>

                    {key}
                  </button>
                )}
              </div>
            </div>
            
            <div className="text-center mt-8 space-y-2">
              <p className="text-lg md:text-xl text-[#cc0000] animate-pulse">
                CUSTOMIZABLE KEYCAPS COMING SOON! 🎄
              </p>
              <p className="text-xs md:text-sm text-[#1a2744]">
                BE THE FIRST TO DESIGN YOUR PERFECT SETUP - JOIN THE WAITLIST NOW!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t-4 border-[#1a2744] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">&copy; 2025 CLICK IT. ALL RIGHTS RESERVED. 🎄</p>
            <div className="flex gap-6">
              {['INSTAGRAM', 'TIKTOK', ""].map((social) =>
              <a
                key={social}
                href="#"
                className="text-xs hover:text-[#cc0000] transition-colors">

                  {social}
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>);

}