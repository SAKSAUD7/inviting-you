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

        {/* Ornate Frame Container */}
        <div style={{ position: 'relative', width: 'min(500px, 95vw)', margin: '0 auto', padding: '24px', background: 'var(--noor-paper)', border: '1px solid var(--noor-gold-soft)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
          {/* Inner hairline border for double-frame effect */}
          <div style={{ position: 'absolute', inset: '8px', border: '1px solid var(--noor-gold-whisper)', borderRadius: '10px', pointerEvents: 'none' }} />
          
          {/* Outline Design of Flowers on the Frame */}
          <NoorBotanicalCorner position="top-left" style={{ top: '-10px', left: '-10px', width: '120px', opacity: 0.6, pointerEvents: 'none', zIndex: 5 }} />
          <NoorBotanicalCorner position="bottom-right" style={{ bottom: '-10px', right: '-10px', width: '120px', opacity: 0.6, pointerEvents: 'none', zIndex: 5 }} />

          
          <div className="noor-scratch-wrap" style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'var(--noor-white)',
            boxShadow: 'inset 0 0 20px rgba(193,160,99,0.1)'
          }}>
            {/* Revealed Content */}
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--noor-ivory)', padding: '1.5rem', position: 'relative' }}>
              
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '1rem' }}>
                Save the Date
              </h3>
              <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.2rem, 4vw, 2.5rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.2, margin: '0.5rem 0' }}>
                {dateDisplay}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', fontFamily: 'var(--font-serif)', fontSize: '0.9rem', color: 'var(--noor-gold-champagne)', fontStyle: 'italic' }}>
                <span>{venueName || "Bangalore"}</span>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--noor-gold-champagne)' }} />
                <span>Insha Allah</span>
              </div>
            </div>

            {/* Canvas Cover */}
            <canvas 
              ref={canvasRef}
              id="scratch-canvas"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', zIndex: 10, touchAction: 'none' }}
            />
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
