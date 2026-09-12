'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function StarryBackground() {
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, delay: number, duration: number, isHeart: boolean }[]>([])

  useEffect(() => {
    // Generate random floating particles on mount
    const generatedParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 100 + Math.random() * 20, // Start below the screen
      size: Math.random() * 15 + 8, // Larger sizes for cute particles
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 15, // Slow float upwards
      isHeart: Math.random() > 0.7 // 30% chance to be a heart
    }))
    setParticles(generatedParticles)
  }, [])

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none'
    }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.isHeart ? 'transparent' : 'rgba(255, 255, 255, 0.4)',
            borderRadius: p.isHeart ? '0' : '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: `${p.size}px`,
            filter: 'drop-shadow(0 2px 4px rgba(255,117,140,0.2))'
          }}
          initial={{ y: '0vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-120vh', // Float all the way up and off screen
            opacity: [0, 0.8, 0.8, 0],
            rotate: p.isHeart ? [-10, 10, -10] : 0,
            x: p.isHeart ? ['0px', '20px', '-20px', '0px'] : 0
          }}
          transition={{
            y: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            opacity: { duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {p.isHeart ? '🤍' : ''}
        </motion.div>
      ))}
    </div>
  )
}
