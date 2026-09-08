'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function WalimaFloatingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; scale: number; rotate: number }>>([])

  useEffect(() => {
    // Generate random petals only on the client side to avoid hydration mismatch
    const generatedPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal start (0 to 100%)
      delay: Math.random() * 5, // Random start delay
      duration: 10 + Math.random() * 15, // Fall duration between 10s and 25s
      scale: 0.5 + Math.random() * 0.8, // Random size
      rotate: Math.random() * 360, // Random initial rotation
    }))
    setPetals(generatedPetals)
  }, [])

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50, // Float above content
        overflow: 'hidden'
      }}
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ 
            y: -50, 
            x: `${petal.left}vw`, 
            rotate: petal.rotate, 
            opacity: 0,
            scale: petal.scale
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [petal.rotate, petal.rotate + 180, petal.rotate + 360],
            opacity: [0, 0.8, 0.8, 0],
            x: [`${petal.left}vw`, `${petal.left - 5 + Math.random() * 10}vw`, `${petal.left + 5 - Math.random() * 10}vw`]
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            width: '35px',
            height: '35px',
            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))'
          }}
        >
          {/* HD Photorealistic SVG Petal (Guaranteed 100% Transparent Background) */}
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', opacity: 0.85 }}>
            <defs>
              <linearGradient id={`petal-grad-${petal.id}`} x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" stopColor="#e3c2eb" />
                <stop offset="40%" stopColor="#9b6baf" />
                <stop offset="100%" stopColor="#5d356e" />
              </linearGradient>
              <radialGradient id={`petal-shadow-${petal.id}`} cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#9b6baf" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path 
              d="M50 5 C75 15, 95 40, 85 70 C75 100, 30 95, 15 70 C0 45, 25 15, 50 5 Z" 
              fill={`url(#petal-grad-${petal.id})`}
            />
            {/* Inner shading for realism */}
            <path 
              d="M50 5 C75 15, 95 40, 85 70 C75 100, 30 95, 15 70 C0 45, 25 15, 50 5 Z" 
              fill={`url(#petal-shadow-${petal.id})`}
            />
            {/* Delicate petal vein */}
            <path 
              d="M50 5 Q 45 40 40 80" 
              stroke="#5d356e" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              opacity="0.3"
            />
            <path 
              d="M50 5 Q 60 45 65 75" 
              stroke="#5d356e" 
              strokeWidth="1" 
              strokeLinecap="round" 
              opacity="0.2"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
