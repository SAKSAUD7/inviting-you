import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { NoorBotanicalCorner, NoorBotanicalCrest } from '../NoorOrnaments'

interface Props {
  dateDisplay: string
  venueName?: string
}

export default function NoorScratchReveal({ dateDisplay, venueName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth
        canvas.height = canvas.parentElement.offsetHeight
        fillCanvas()
      }
    }

    const fillCanvas = () => {
      if (!ctx || isRevealed) return
      
      // Create a metallic gold foil gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#BF953F')
      gradient.addColorStop(0.25, '#FCF6BA')
      gradient.addColorStop(0.5, '#B38728')
      gradient.addColorStop(0.75, '#FBF5B7')
      gradient.addColorStop(1, '#AA771C')
      
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add subtle texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
      for(let i=0; i<canvas.width; i+=8) {
         for(let j=0; j<canvas.height; j+=8) {
            if((i+j)%16 === 0) {
               ctx.beginPath()
               ctx.arc(i, j, 1, 0, Math.PI*2)
               ctx.fill()
            }
         }
      }

      // Draw "scratch me" text
      ctx.font = 'italic 24px "Playfair Display", serif'
      ctx.fillStyle = '#5A461E' // Deep gold-brown
      ctx.textAlign = 'center'
      ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let isDrawing = false
    let lastX = 0
    let lastY = 0
    let pixelsScratched = 0
    const totalPixels = canvas.width * canvas.height

    const getCursorPosition = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      }
    }

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getCursorPosition(e)
      isDrawing = true
      lastX = x
      lastY = y
      scratch(e)
    }

    const stopDrawing = () => {
      isDrawing = false
      checkReveal()
    }

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || !ctx || isRevealed) return
      e.preventDefault()

      const { x, y } = getCursorPosition(e)
      
      ctx.globalCompositeOperation = 'destination-out'
      ctx.beginPath()
      ctx.moveTo(lastX, lastY)
      ctx.lineTo(x, y)
      ctx.lineWidth = 60
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.stroke()
      
      const distance = Math.hypot(x - lastX, y - lastY)
      pixelsScratched += (distance + 10) * 60
      
      lastX = x
      lastY = y
      
      if (pixelsScratched > totalPixels * 0.7) {
        revealAll()
      }
    }

    const revealAll = () => {
      if (isRevealed) return
      setIsRevealed(true)
      canvas.style.transition = 'opacity 1s ease'
      canvas.style.opacity = '0'
      setTimeout(() => {
        canvas.style.display = 'none'
      }, 1000)
    }

    const checkReveal = () => {
      if (pixelsScratched > totalPixels * 0.7) revealAll()
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', scratch)
    window.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('touchstart', startDrawing, { passive: false })
    canvas.addEventListener('touchmove', scratch, { passive: false })
    window.addEventListener('touchend', stopDrawing)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', scratch)
      window.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', scratch)
      window.removeEventListener('touchend', stopDrawing)
    }
  }, [isRevealed])

  return (
    <section className="noor-section" style={{ background: 'var(--noor-paper)', padding: '6rem 1.5rem', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* ── Top-left botanical corner ── */}
      <NoorBotanicalCorner position="top-left" style={{ top: 0, left: 0, opacity: 0.1, pointerEvents: 'none' }} />

      {/* ── Bottom-right botanical corner ── */}
      <NoorBotanicalCorner position="bottom-right" style={{ bottom: 0, right: 0, opacity: 0.1, pointerEvents: 'none' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ textAlign: 'center', width: '100%', position: 'relative', zIndex: 1 }}
      >
        {/* ── Section label ── */}
        <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '1.5rem' }}>
            A Secret Awaits
          </p>
          <NoorBotanicalCrest />
        </div>

        {/* ── Ornamental Frame + Scratch Card ── */}
        <div style={{ position: 'relative', width: 'min(360px, 92vw)', margin: '0 auto' }}>

          {/* Outer golden border frame */}
          <div style={{
            position: 'relative',
            border: '1.5px solid rgba(193,160,99,0.65)',
            borderRadius: '18px',
            padding: '22px',
            background: 'linear-gradient(145deg, #fdf9f2 0%, #f8f1e2 100%)',
            boxShadow: '0 8px 32px rgba(193,160,99,0.12), inset 0 0 0 1px rgba(255,255,255,0.6)',
          }}>
            {/* Inner hairline border */}
            <div style={{ position: 'absolute', inset: '8px', border: '1px solid rgba(193,160,99,0.25)', borderRadius: '12px', pointerEvents: 'none', zIndex: 0 }} />

            {/* Corner ornaments — botanical bouquets */}
            <img src="/images/noor_bouquet_top.png" alt="" style={{ position: 'absolute', top: '-18px', left: '-18px', width: '80px', opacity: 0.75, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5 }} />
            <img src="/images/noor_bouquet_top.png" alt="" style={{ position: 'absolute', top: '-18px', right: '-18px', width: '80px', opacity: 0.75, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5, transform: 'scaleX(-1)' }} />
            <img src="/images/noor_bouquet_top.png" alt="" style={{ position: 'absolute', bottom: '-18px', left: '-18px', width: '80px', opacity: 0.75, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5, transform: 'scaleY(-1)' }} />
            <img src="/images/noor_bouquet_top.png" alt="" style={{ position: 'absolute', bottom: '-18px', right: '-18px', width: '80px', opacity: 0.75, mixBlendMode: 'multiply', pointerEvents: 'none', zIndex: 5, transform: 'scale(-1)' }} />

            {/* Scratch canvas area */}
            <div className="noor-scratch-wrap" style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/2',
              borderRadius: '10px',
              overflow: 'hidden',
              backgroundColor: 'var(--noor-white)',
              boxShadow: 'inset 0 0 20px rgba(193,160,99,0.08)',
            }}>
              {/* Revealed content */}
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--noor-ivory)', padding: '1.2rem', position: 'relative' }}>
                <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '0.8rem' }}>
                  Save the Date
                </h3>
                <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.1rem, 4vw, 2rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.2, margin: '0.3rem 0' }}>
                  {dateDisplay}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.8rem', fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: 'var(--noor-gold-champagne)', fontStyle: 'italic' }}>
                  <span>{venueName || 'Bangalore'}</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--noor-gold-champagne)', display: 'inline-block' }} />
                  <span>Insha Allah</span>
                </div>
              </div>

              {/* Gold foil canvas */}
              <canvas
                ref={canvasRef}
                id="scratch-canvas"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', zIndex: 10, touchAction: 'none' }}
              />
            </div>
          </div>
        </div>


        {/* Hint text below card */}
        <p style={{ marginTop: '2rem', fontFamily: 'var(--font-serif)', fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--noor-emerald)', letterSpacing: '0.05em' }}>
          Reveal Our Special Date
        </p>
      </motion.div>
    </section>
  )
}
