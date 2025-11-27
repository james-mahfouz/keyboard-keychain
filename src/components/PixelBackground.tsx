"use client"

import { useEffect, useState } from 'react'

interface Pixel {
  id: number
  left: number
  duration: number
  delay: number
  size: number
}

interface RetroElement {
  id: number
  x: number
  y: number
  type: 'pacman' | 'ghost' | 'coin' | 'mushroom' | 'star' | 'heart'
  life: number
  scale: number
  rotation: number
  depth: number
}

export default function PixelBackground() {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [retroElements, setRetroElements] = useState<RetroElement[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const newPixels: Pixel[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
      size: 8 + Math.floor(Math.random() * 3) * 8,
    }))
    setPixels(newPixels)
  }, [])

  useEffect(() => {
    let elementId = 0
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Spawn retro gaming elements more frequently
      if (Math.random() < 0.25) {
        const types: RetroElement['type'][] = ['pacman', 'ghost', 'coin', 'mushroom', 'star', 'heart']
        const depth = Math.random()
        const newElement: RetroElement = {
          id: elementId++,
          x: e.clientX,
          y: e.clientY,
          type: types[Math.floor(Math.random() * types.length)],
          life: 100,
          scale: 0.8 + Math.random() * 0.8,
          rotation: Math.random() * 360,
          depth: depth
        }
        setRetroElements(prev => [...prev, newElement])
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Fade out and remove old elements
  useEffect(() => {
    const interval = setInterval(() => {
      setRetroElements(prev => 
        prev
          .map(el => ({ 
            ...el, 
            life: el.life - 1.5,
            rotation: el.rotation + 2
          }))
          .filter(el => el.life > 0)
      )
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const renderRetroIcon = (type: RetroElement['type']) => {
    switch (type) {
      case 'pacman':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#ffff00" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 0, 0.8))' }}>
            <path d="M12 2 L12 12 L20 6 A10 10 0 0 1 20 18 L12 12 L12 22 A10 10 0 1 1 12 2 Z" />
          </svg>
        )
      case 'ghost':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))' }}>
            <rect x="6" y="4" width="12" height="2" fill="#00ffff" />
            <rect x="4" y="6" width="16" height="12" fill="#00ffff" />
            <rect x="4" y="18" width="3" height="2" fill="#00ffff" />
            <rect x="9" y="18" width="3" height="2" fill="#00ffff" />
            <rect x="14" y="18" width="3" height="2" fill="#00ffff" />
            <rect x="8" y="8" width="2" height="2" fill="#000" />
            <rect x="14" y="8" width="2" height="2" fill="#000" />
          </svg>
        )
      case 'coin':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' }}>
            <circle cx="12" cy="12" r="8" fill="#ffd700" stroke="#ff8c00" strokeWidth="1" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ff8c00">$</text>
          </svg>
        )
      case 'mushroom':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(204, 0, 0, 0.8))' }}>
            <ellipse cx="12" cy="10" rx="8" ry="6" fill="#cc0000" />
            <rect x="9" y="10" width="6" height="8" fill="#ffcccc" rx="1" />
            <circle cx="8" cy="8" r="2" fill="white" />
            <circle cx="16" cy="8" r="2" fill="white" />
            <rect x="9" y="10" width="6" height="1" fill="#ff6666" />
          </svg>
        )
      case 'star':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 0, 0.9))' }}>
            <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9" fill="#ffff00" stroke="#ffaa00" strokeWidth="1" />
          </svg>
        )
      case 'heart':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 105, 180, 0.8))' }}>
            <path d="M12 21 L10 19 C5 14.5 2 11.5 2 8 C2 5.5 4 4 6 4 C7.5 4 9 4.8 10 6 C11 4.8 12.5 4 14 4 C16 4 18 5.5 18 8 C18 11.5 15 14.5 10 19 Z" fill="#ff69b4" stroke="#ff1493" strokeWidth="1" />
          </svg>
        )
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pixels.map((pixel) => (
        <div
          key={pixel.id}
          className="absolute bg-[#cccccc] opacity-40 animate-pixel-fall"
          style={{
            left: `${pixel.left}%`,
            width: `${pixel.size}px`,
            height: `${pixel.size}px`,
            animationDuration: `${pixel.duration}s`,
            animationDelay: `${pixel.delay}s`,
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, #1a2744 0px, #1a2744 1px, transparent 1px, transparent 16px),
            repeating-linear-gradient(90deg, #1a2744 0px, #1a2744 1px, transparent 1px, transparent 16px)
          `,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Retro gaming elements with depth and eye-catching effects */}
      {retroElements.map((element) => {
        const depthScale = 0.5 + element.depth * 1.5
        const depthBlur = (1 - element.depth) * 2
        const zIndex = Math.floor(element.depth * 10)
        
        return (
          <div
            key={element.id}
            className="absolute transition-opacity duration-200"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              opacity: element.life / 100,
              transform: `translate(-50%, -50%) scale(${element.scale * depthScale}) rotate(${element.rotation}deg)`,
              zIndex: zIndex,
              filter: `blur(${depthBlur}px) brightness(${1 + element.life / 200})`,
              animation: 'float 2s ease-in-out infinite',
            }}
          >
            <div 
              style={{
                filter: 'drop-shadow(4px 4px 0px rgba(26, 39, 68, 0.3))',
              }}
            >
              {renderRetroIcon(element.type)}
            </div>
          </div>
        )
      })}
    </div>
  )
}