import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NoorBotanicalWatermark } from '../NoorOrnaments'

interface Props {
  targetDate: Date
}

export default function NoorCountdown({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="noor-section" style={{ background: 'var(--noor-ivory)', position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Large faint floral watermark */}
      <NoorBotanicalWatermark 
        className="noor-sway-slow" 
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(800px, 120vw)', opacity: 0.03 }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '800px' }}
      >
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '3rem' }}>
          Counting Down To Forever
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
            <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1, fontWeight: 400 }}>
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-champagne)' }}>Days</span>
          </div>

          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)', opacity: 0.5 }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
            <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1, fontWeight: 400 }}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-champagne)' }}>Hours</span>
          </div>

          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)', opacity: 0.5 }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
            <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1, fontWeight: 400 }}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-champagne)' }}>Minutes</span>
          </div>

          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)', opacity: 0.5 }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '80px' }}>
            <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1, fontWeight: 400 }}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-champagne)' }}>Seconds</span>
          </div>

        </div>
      </motion.div>
    </section>
  )
}
