import React, { useState, useEffect } from 'react'
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
    <section className="noor-section reveal-hidden" style={{ background: 'var(--noor-ivory)', position: 'relative', overflow: 'hidden', padding: '4rem 1.5rem 6rem' }}>
      
      {/* Large faint floral wreath watermark */}
      <NoorBotanicalWatermark 
        className="noor-sway-slow" 
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 'min(800px, 120vw)', opacity: 0.05 }} 
      />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-ink-light)' }}>
          The Celebration Begins In
        </p>
        <div style={{ width: '1px', height: '30px', background: 'linear-gradient(to bottom, var(--noor-gold-champagne), transparent)', margin: '1rem auto' }} />
      </div>

      <div className="noor-countdown" style={{ position: 'relative', zIndex: 1 }}>
        <div className="noor-countdown__unit">
          <div className="noor-countdown-circle">{timeLeft.days.toString().padStart(2, '0')}</div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-deep)' }}>Days</span>
        </div>
        <div className="noor-countdown__unit">
          <div className="noor-countdown-circle">{timeLeft.hours.toString().padStart(2, '0')}</div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-deep)' }}>Hours</span>
        </div>
        <div className="noor-countdown__unit">
          <div className="noor-countdown-circle">{timeLeft.minutes.toString().padStart(2, '0')}</div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-deep)' }}>Minutes</span>
        </div>
        <div className="noor-countdown__unit">
          <div className="noor-countdown-circle">{timeLeft.seconds.toString().padStart(2, '0')}</div>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--noor-gold-deep)' }}>Seconds</span>
        </div>
      </div>
    </section>
  )
}
