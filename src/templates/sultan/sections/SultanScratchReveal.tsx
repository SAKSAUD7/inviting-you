'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SultanDivider, SultanCrown, SultanLantern, SultanCornerOrnament } from '../SultanOrnaments'

interface Props {
  dateDisplay: string
  venueName?: string
}

export default function SultanScratchReveal({ dateDisplay, venueName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || revealed) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setup = () => {
      const parent = canvas.parentElement
      if (!parent) return
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      draw()
    }

    const draw = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dark emerald card base
      ctx.fillStyle = '#0B211C'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Gold brush stroke area (the scratchable foil)
      const grd = ctx.createLinearGradient(canvas.width * 0.1, 0, canvas.width * 0.9, canvas.height)
      grd.addColorStop(0, '#A07830')
      grd.addColorStop(0.3, '#E6C97A')
      grd.addColorStop(0.6, '#CBA45D')
      grd.addColorStop(1, '#8B6520')
      ctx.fillStyle = grd
      // Brush-stroke shape
      ctx.beginPath()
      const cx = canvas.width / 2, cy = canvas.height / 2
      const rw = canvas.width * 0.72, rh = canvas.height * 0.42
      ctx.moveTo(cx - rw/2 + 15, cy - rh/2 - 8)
      ctx.bezierCurveTo(cx - rw/4, cy - rh/2 - 20, cx + rw/4, cy - rh/2 - 12, cx + rw/2 - 15, cy - rh/2)
      ctx.bezierCurveTo(cx + rw/2 + 5, cy, cx + rw/2, cy + rh/2, cx + rw/2 - 20, cy + rh/2 + 5)
      ctx.bezierCurveTo(cx + rw/4, cy + rh/2 + 15, cx - rw/4, cy + rh/2 + 8, cx - rw/2 + 10, cy + rh/2)
      ctx.bezierCurveTo(cx - rw/2 - 8, cy, cx - rw/2, cy - rh/4, cx - rw/2 + 15, cy - rh/2 - 8)
      ctx.closePath()
      ctx.fill()

      // "Scratch Here" text
      ctx.font = 'italic 1.2rem "Cormorant Garamond", serif'
      ctx.fillStyle = '#2A1C12'
      ctx.textAlign = 'center'
      ctx.fillText('Scratch', cx, cy - 8)
      ctx.fillText('Here', cx, cy + 18)

      // Hand cursor icon
      ctx.beginPath()
      ctx.arc(cx + 28, cy + 38, 5, 0, Math.PI * 2)
      ctx.strokeStyle = '#2A1C12'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.moveTo(cx + 28, cy + 43)
      ctx.lineTo(cx + 33, cy + 55)
      ctx.lineTo(cx + 23, cy + 55)
      ctx.closePath()
      ctx.stroke()
    }

    setup()
    window.addEventListener('resize', setup)

    let isDown = false, lx = 0, ly = 0, scratched = 0

    const pos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect()
      const t = 'touches' in e ? e.touches[0] : e
      return { x: t.clientX - r.left, y: t.clientY - r.top }
    }

    const onDown = (e: MouseEvent | TouchEvent) => {
      const { x, y } = pos(e); isDown = true; lx = x; ly = y
    }
    const onUp = () => { isDown = false }
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDown || !ctx || revealed) return
      e.preventDefault()
      const { x, y } = pos(e)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(x, y)
      ctx.lineWidth = 38; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke()
      scratched += (Math.hypot(x - lx, y - ly) + 8) * 38
      lx = x; ly = y
      const prog = Math.min(100, (scratched / (canvas.width * canvas.height)) * 100)
      setScratchProgress(prog)
      if (scratched > canvas.width * canvas.height * 0.38) {
        setRevealed(true)
        canvas.style.transition = 'opacity 1.2s ease'
        canvas.style.opacity = '0'
        setTimeout(() => { canvas.style.display = 'none' }, 1200)
      }
    }

    canvas.addEventListener('mousedown', onDown)
    canvas.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    canvas.addEventListener('touchstart', onDown, { passive: false })
    canvas.addEventListener('touchmove', onMove, { passive: false })
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('resize', setup)
      canvas.removeEventListener('mousedown', onDown)
      canvas.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      canvas.removeEventListener('touchstart', onDown)
      canvas.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [revealed])

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Palace BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(7,20,33,0.3) 0%, rgba(7,20,33,0.9) 80%)' }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.7, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '180px', height: '240px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '180px', height: '240px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Arch border */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.35)', pointerEvents: 'none', borderRadius: '200px 200px 0 0', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(203,164,93,0.18)', pointerEvents: 'none', borderRadius: '190px 190px 0 0', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '5rem 2rem', width: '100%', maxWidth: '480px', margin: '0 auto' }}
      >
        <SultanCrown size={38} style={{ marginBottom: '1rem' }}/>
        <div className="sultan-script" style={{ fontSize: '2.8rem', color: 'var(--sultan-champagne)', marginBottom: '0.2rem', lineHeight: 1.2 }}>
          A Little<br/>Surprise For You
        </div>
        <div className="sultan-label" style={{ opacity: 0.65, marginBottom: '3rem', lineHeight: 1.8 }}>
          SCRATCH THE CARD<br/>TO REVEAL YOUR BLESSINGS
        </div>

        {/* THE SCRATCH CARD */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', maxWidth: '360px', margin: '0 auto 2.5rem' }}>
          {/* Inner border */}
          <div style={{ position: 'absolute', inset: '-2px', border: '2px solid var(--sultan-gold)', zIndex: 0 }}/>
          <div style={{ position: 'absolute', inset: '5px', border: '1px solid rgba(203,164,93,0.35)', pointerEvents: 'none', zIndex: 20 }}/>

          {/* Corner ornaments (always on top) */}
          <SultanCornerOrnament style={{ position: 'absolute', top: 0, left: 0, zIndex: 30, pointerEvents: 'none' }}/>
          <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 30, pointerEvents: 'none', transform: 'scaleX(-1)' }}><SultanCornerOrnament /></div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 30, pointerEvents: 'none', transform: 'scaleY(-1)' }}><SultanCornerOrnament /></div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 30, pointerEvents: 'none', transform: 'scale(-1,-1)' }}><SultanCornerOrnament /></div>

          {/* REVEALED content (behind the scratch) */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundColor: 'var(--sultan-ivory)',
            backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem', textAlign: 'center', zIndex: 1
          }}>
            {/* Gift icon */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="1.2" style={{ marginBottom: '1rem' }}>
              <rect x="3" y="8" width="18" height="12" rx="1"/>
              <path d="M12 8v12"/><path d="M19 8c0-1.66-1.34-3-3-3s-3 1.34-3 3"/>
              <path d="M5 8c0-1.66 1.34-3 3-3s3 1.34 3 3"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
            </svg>
            <div className="sultan-heading" style={{ fontSize: '1.5rem', color: 'var(--sultan-brown)', fontStyle: 'normal', marginBottom: '0.5rem' }}>
              Alhamdulillah!
            </div>
            <div className="sultan-body" style={{ fontSize: '0.82rem', color: 'rgba(42,28,18,0.8)', lineHeight: 1.6 }}>
              You have received a<br/>Special Message<br/>from the Couple
            </div>
          </div>

          {/* Scratch canvas */}
          <canvas ref={canvasRef} style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            cursor: revealed ? 'default' : 'crosshair', zIndex: 10, touchAction: 'none',
            borderRadius: 'inherit'
          }}/>
        </div>

        <motion.p
          animate={{ opacity: revealed ? 1 : 0.5 }}
          transition={{ duration: 1 }}
          className="sultan-body"
          style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--sultan-champagne)', opacity: 0.7, lineHeight: 1.7 }}
        >
          May this be a reminder of the love and blessings in our journey.
        </motion.p>
      </motion.div>
    </section>
  )
}
