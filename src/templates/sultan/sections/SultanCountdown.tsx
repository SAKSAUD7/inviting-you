'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SultanDivider, SultanCrown, SultanLantern, SultanMoon } from '../SultanOrnaments'

interface Props {
  date: Date | string
}

export default function SultanCountdown({ date }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const tick = () => {
      const target = new Date(date).getTime()
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) { setIsExpired(true); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000)
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [date])

  const OctUnit = ({ value, label }: { value: number, label: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}>
      <div style={{ position: 'relative', width: '88px', height: '88px' }}>
        {/* Outer gold octagon */}
        <div style={{
          position: 'absolute', inset: 0,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(135deg, rgba(203,164,93,0.5) 0%, rgba(203,164,93,0.15) 100%)',
          border: '2px solid var(--sultan-gold)'
        }}/>
        {/* Inner octagon */}
        <div style={{
          position: 'absolute', inset: '4px',
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
          background: 'linear-gradient(160deg, #0B211C 0%, #071421 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span className="sultan-heading" style={{ fontSize: '2.2rem', color: 'var(--sultan-champagne)', fontStyle: 'normal', fontWeight: 500, lineHeight: 1 }}>
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="sultan-label" style={{ fontSize: '0.6rem', letterSpacing: '0.2em', opacity: 0.7 }}>{label}</div>
    </div>
  )

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Palace BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, filter: 'brightness(0.7)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(7,20,33,0.3) 0%, rgba(7,20,33,0.9) 80%)' }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Arch frame border */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.35)', pointerEvents: 'none', borderRadius: '200px 200px 0 0', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(203,164,93,0.18)', pointerEvents: 'none', borderRadius: '190px 190px 0 0', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>

      {/* Moon */}
      <SultanMoon size={45} style={{ position: 'absolute', top: '58%', left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '5rem 2rem', maxWidth: '500px', margin: '0 auto' }}
      >
        <SultanCrown size={38} style={{ marginBottom: '1.2rem' }}/>

        <div className="sultan-script" style={{ fontSize: '3rem', color: 'var(--sultan-champagne)', marginBottom: '0.2rem' }}>Awaiting</div>
        <h2 className="sultan-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>THE MOMENT</h2>
        <div className="sultan-label" style={{ opacity: 0.7, marginBottom: '3.5rem', lineHeight: 1.8 }}>
          COUNTING DOWN TO OUR<br/>HAPPILY EVER AFTER
        </div>

        {!isExpired ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem 2.5rem', justifyContent: 'center', maxWidth: '280px', margin: '0 auto 3rem' }}>
            <OctUnit value={timeLeft.days} label="DAYS" />
            <OctUnit value={timeLeft.hours} label="HOURS" />
            <OctUnit value={timeLeft.minutes} label="MINUTES" />
            <OctUnit value={timeLeft.seconds} label="SECONDS" />
          </div>
        ) : (
          <div className="sultan-heading" style={{ fontSize: '2rem', color: 'var(--sultan-gold)', padding: '2rem', border: '1px solid var(--sultan-gold)', marginBottom: '3rem' }}>
            The Celebration Has Begun ✨
          </div>
        )}

        <SultanDivider style={{ margin: '0 auto' }} width={200}/>
      </motion.div>
    </section>
  )
}
