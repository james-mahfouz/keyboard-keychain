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
  type: 'pacman' | 'ghost' | 'coin' | 'mushroom' | 'star' | 'heart' | 'tree' | 'ornament' | 'candycane' | 'present' | 'bell' | 'snowman' | 'santahat'
  life: number
  scale: number
  rotation: number
  depth: number
}

interface ChristmasLight {
  id: number
  x: number
  y: number
  color: string
  delay: number
}

export default function PixelBackground() {
  const [pixels, setPixels] = useState<Pixel[]>([])
  const [retroElements, setRetroElements] = useState<RetroElement[]>([])
  const [christmasLights, setChristmasLights] = useState<ChristmasLight[]>([])
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

    // Create twinkling Christmas lights across the top
    const lights: ChristmasLight[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 5) + Math.random() * 3,
      y: 2 + Math.random() * 3,
      color: ['#cc0000', '#00ff00', '#ffff00', '#0088ff', '#ff00ff'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2
    }))
    setChristmasLights(lights)
  }, [])

  useEffect(() => {
    let elementId = 0
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Spawn Christmas-themed elements frequently
      if (Math.random() < 0.3) {
        const types: RetroElement['type'][] = ['tree', 'ornament', 'candycane', 'present', 'bell', 'snowman', 'santahat', 'star', 'heart', 'coin']
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
      case 'tree':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 0, 0.9))' }}>
            <polygon points="12,2 8,8 10,8 6,14 8,14 4,20 20,20 16,14 18,14 14,8 16,8" fill="#00aa00" stroke="#006600" strokeWidth="1" />
            <rect x="10" y="20" width="4" height="3" fill="#8B4513" />
            <circle cx="12" cy="6" r="1.5" fill="#cc0000" />
            <circle cx="10" cy="11" r="1.5" fill="#ffff00" />
            <circle cx="14" cy="11" r="1.5" fill="#0088ff" />
            <circle cx="12" cy="17" r="1.5" fill="#cc0000" />
          </svg>
        )
      case 'ornament':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(204, 0, 0, 0.9))' }}>
            <rect x="10" y="4" width="4" height="2" fill="#ffd700" />
            <circle cx="12" cy="13" r="7" fill="#cc0000" stroke="#8B0000" strokeWidth="1" />
            <circle cx="9" cy="10" r="2" fill="#ffffff" opacity="0.4" />
            <path d="M 12 6 L 10 8 L 14 8 Z" fill="#ffd700" />
          </svg>
        )
      case 'candycane':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9))' }}>
            <path d="M 14 4 Q 18 4 18 8 Q 18 10 16 11 L 10 20 L 8 19 L 14 10 Q 15 9 15 8 Q 15 6 14 6 Q 13 6 13 8 L 11 8 Q 11 4 14 4 Z" fill="white" stroke="#cc0000" strokeWidth="0.5" />
            <rect x="13" y="6" width="2" height="2" fill="#cc0000" />
            <rect x="14" y="10" width="2" height="2" fill="#cc0000" />
            <rect x="12" y="14" width="2" height="2" fill="#cc0000" />
            <rect x="10" y="18" width="2" height="2" fill="#cc0000" />
          </svg>
        )
      case 'present':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' }}>
            <rect x="6" y="10" width="12" height="10" fill="#cc0000" stroke="#8B0000" strokeWidth="1" />
            <rect x="11" y="10" width="2" height="10" fill="#ffd700" />
            <rect x="6" y="14" width="12" height="2" fill="#ffd700" />
            <rect x="8" y="6" width="8" height="4" fill="#ffd700" stroke="#FFB000" strokeWidth="1" />
            <path d="M 12 6 Q 10 4 8 6" fill="none" stroke="#FFB000" strokeWidth="1.5" />
            <path d="M 12 6 Q 14 4 16 6" fill="none" stroke="#FFB000" strokeWidth="1.5" />
          </svg>
        )
      case 'bell':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' }}>
            <path d="M 12 4 L 10 6 L 10 8 Q 7 9 7 13 L 7 16 L 17 16 L 17 13 Q 17 9 14 8 L 14 6 Z" fill="#ffd700" stroke="#FFB000" strokeWidth="1" />
            <ellipse cx="12" cy="16" rx="5" ry="1.5" fill="#FFB000" />
            <circle cx="12" cy="18" r="1.5" fill="#ffd700" stroke="#FFB000" strokeWidth="1" />
            <rect x="11" y="3" width="2" height="2" fill="#cc0000" />
          </svg>
        )
      case 'snowman':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))' }}>
            <circle cx="12" cy="17" r="5" fill="white" stroke="#cccccc" strokeWidth="1" />
            <circle cx="12" cy="10" r="4" fill="white" stroke="#cccccc" strokeWidth="1" />
            <circle cx="12" cy="5" r="3" fill="white" stroke="#cccccc" strokeWidth="1" />
            <circle cx="11" cy="4.5" r="0.5" fill="black" />
            <circle cx="13" cy="4.5" r="0.5" fill="black" />
            <path d="M 10 6 Q 12 6.5 14 6" fill="none" stroke="#ff6600" strokeWidth="0.5" />
            <circle cx="12" cy="9" r="0.5" fill="black" />
            <circle cx="12" cy="11" r="0.5" fill="black" />
            <circle cx="12" cy="16" r="0.5" fill="black" />
            <circle cx="12" cy="18" r="0.5" fill="black" />
            <rect x="9" y="3" width="6" height="1.5" fill="#cc0000" />
          </svg>
        )
      case 'santahat':
        return (
          <svg width="40" height="40" viewBox="0 0 24 24" style={{ filter: 'drop-shadow(0 0 8px rgba(204, 0, 0, 0.9))' }}>
            <path d="M 12 4 L 6 16 L 18 16 Z" fill="#cc0000" stroke="#8B0000" strokeWidth="1" />
            <ellipse cx="12" cy="16" rx="6.5" ry="1.5" fill="white" />
            <circle cx="12" cy="4" r="2" fill="white" />
          </svg>
        )
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
      {/* Twinkling Christmas lights */}
      {christmasLights.map((light) => (
        <div
          key={light.id}
          className="absolute rounded-full"
          style={{
            left: `${light.x}%`,
            top: `${light.y}%`,
            width: '12px',
            height: '12px',
            backgroundColor: light.color,
            boxShadow: `0 0 20px ${light.color}, 0 0 30px ${light.color}`,
            animation: `pulse-glow 1.5s ease-in-out infinite`,
            animationDelay: `${light.delay}s`,
          }}
        />
      ))}

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

      {/* Christmas gradient overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(204, 0, 0, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 170, 0, 0.3) 0%, transparent 50%)',
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