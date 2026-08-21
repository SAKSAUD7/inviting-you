import React, { useEffect, useState } from 'react'

export default function NoorParticles() {
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    const newParticles = []
    // Generate 30 petals/light motes
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${15 + Math.random() * 20}s`,
        animationDelay: `-${Math.random() * 20}s`,
        opacity: 0.1 + Math.random() * 0.4,
        size: `${Math.random() * 15 + 5}px`,
        isPetal: Math.random() > 0.5
      })
    }
    setParticles(newParticles)
  }, [])

  if (!mounted) return null

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
      {particles.map(p => (
        <div 
          key={p.id}
          className={p.isPetal ? "noor-petal" : "noor-mote"}
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
