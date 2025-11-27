"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const keys = ['W', 'A', 'S', 'D']
const products = [
  { id: 1, name: 'CLASSIC WASD', color: '#cc0000' },
  { id: 2, name: 'STEALTH EDITION', color: '#1a2744' },
  { id: 3, name: 'RGB GAMER', color: '#3b82f6' },
  { id: 4, name: 'CRYSTAL PRO', color: '#8b5cf6' },
]

export default function KeychainDisplay() {
  const router = useRouter()
  const [pressedKey, setPressedKey] = useState<number | null>(null)
  const [clickCount, setClickCount] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  const handleKeyClick = (index: number) => {
    setPressedKey(index)
    setClickCount(prev => prev + 1)
    setSelectedProduct(index)
    
    // Create visual feedback particle
    const keyElement = document.getElementById(`key-${index}`)
    if (keyElement) {
      const rect = keyElement.getBoundingClientRect()
      createClickParticle(rect.left + rect.width / 2, rect.top, products[index].name)
    }
    
    setTimeout(() => {
      setPressedKey(null)
      // Navigate to product page
      router.push(`/products/${products[index].id}`)
    }, 200)
  }

  const createClickParticle = (x: number, y: number, productName: string) => {
    const particle = document.createElement('div')
    particle.className = 'fixed pointer-events-none text-xs font-bold'
    particle.style.left = `${x}px`
    particle.style.top = `${y}px`
    particle.style.transform = 'translate(-50%, -50%)'
    particle.style.color = '#cc0000'
    particle.style.zIndex = '100'
    particle.style.textShadow = '2px 2px 0px #1a2744'
    particle.textContent = `PRODUCT ${products.findIndex(p => p.name === productName) + 1}`
    
    document.body.appendChild(particle)
    
    setTimeout(() => {
      particle.style.transition = 'all 1s ease-out'
      particle.style.opacity = '0'
      particle.style.transform = 'translate(-50%, -100px)'
    }, 50)
    
    setTimeout(() => particle.remove(), 1100)
  }

  return (
    <div className="relative">
      {/* Product selector display */}
      {selectedProduct !== null && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-center w-full">
          <div 
            className="text-sm font-bold animate-pulse-glow px-4 py-2 border-2 border-[#1a2744] bg-white inline-block"
            style={{ color: products[selectedProduct].color }}
          >
            {products[selectedProduct].name}
          </div>
        </div>
      )}

      <div className="inline-block p-8 bg-white border-4 border-[#1a2744] shadow-[8px_8px_0px_0px_rgba(26,39,68,1)] animate-float">
        <div className="flex gap-4">
          {keys.map((key, index) => (
            <div key={key} className="relative">
              {/* Product number label */}
              <div 
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold whitespace-nowrap"
                style={{ color: products[index].color }}
              >
                P{index + 1}
              </div>
              
              <button
                id={`key-${index}`}
                onClick={() => handleKeyClick(index)}
                className={`
                  w-16 h-16 md:w-20 md:h-20 
                  bg-white border-4 border-[#1a2744]
                  flex items-center justify-center
                  text-2xl md:text-3xl font-bold
                  transition-all duration-100
                  hover:bg-[#ffcccc] hover:scale-105
                  active:scale-95
                  ${pressedKey === index 
                    ? 'translate-y-2 shadow-none bg-[#cc0000] text-white scale-90' 
                    : 'shadow-[4px_4px_0px_0px_rgba(26,39,68,1)]'
                  }
                  ${selectedProduct === index ? 'ring-4 ring-[#cc0000] ring-offset-2' : ''}
                `}
              >
                {key}
              </button>
            </div>
          ))}
        </div>
        
        {/* Keychain ring */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 border-4 border-[#1a2744] bg-[#cccccc] rounded-full" />
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-6 bg-[#1a2744]" />
      </div>
    </div>
  )
}