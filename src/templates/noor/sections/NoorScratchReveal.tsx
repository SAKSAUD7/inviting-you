import React, { useRef, useEffect, useState } from 'react'

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
      ctx.fillStyle = '#c5a059' // Champagne Gold cover
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw some "scratch me" text
      ctx.font = '300 24px "Noto Serif Display", serif'
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let isDrawing = false
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
      isDrawing = true
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
      ctx.arc(x, y, 45, 0, Math.PI * 2) // 45px brush size
      ctx.fill()
      
      pixelsScratched += Math.PI * 45 * 45 // Approximation
      
      if (pixelsScratched > totalPixels * 0.4) {
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
      if (pixelsScratched > totalPixels * 0.4) revealAll()
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
    <section className="noor-section reveal-hidden" style={{ background: 'var(--noor-ivory)', minHeight: '80vh', display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* ── Top-left botanical corner ── */}
      <svg aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: '200px', opacity: 0.1, pointerEvents: 'none' }} viewBox="0 0 200 200" fill="none">
        <path d="M0 0 Q30 50 10 100 Q-10 150 30 200" stroke="#1F3624" strokeWidth="2" fill="none"/>
        <path d="M8 40  Q55 20  75 45"  stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <path d="M5 90  Q55 70  80 95"  stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <path d="M22 140 Q70 120 90 145" stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <ellipse cx="77"  cy="43"  rx="12" ry="6" fill="#1F3624" transform="rotate(-25 77 43)"/>
        <ellipse cx="82"  cy="93"  rx="12" ry="6" fill="#1F3624" transform="rotate(-5 82 93)"/>
        <ellipse cx="92"  cy="143" rx="12" ry="6" fill="#1F3624" transform="rotate(15 92 143)"/>
        <circle cx="0" cy="0" r="4" fill="#D4AF37" fillOpacity="0.6"/>
      </svg>

      {/* ── Bottom-right botanical corner ── */}
      <svg aria-hidden="true" style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', opacity: 0.1, pointerEvents: 'none', transform: 'rotate(180deg)' }} viewBox="0 0 200 200" fill="none">
        <path d="M0 0 Q30 50 10 100 Q-10 150 30 200" stroke="#1F3624" strokeWidth="2" fill="none"/>
        <path d="M8 40  Q55 20  75 45"  stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <path d="M5 90  Q55 70  80 95"  stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <path d="M22 140 Q70 120 90 145" stroke="#1F3624" strokeWidth="1.3" fill="none"/>
        <ellipse cx="77"  cy="43"  rx="12" ry="6" fill="#1F3624" transform="rotate(-25 77 43)"/>
        <ellipse cx="82"  cy="93"  rx="12" ry="6" fill="#1F3624" transform="rotate(-5 82 93)"/>
        <ellipse cx="92"  cy="143" rx="12" ry="6" fill="#1F3624" transform="rotate(15 92 143)"/>
        <circle cx="0" cy="0" r="4" fill="#D4AF37" fillOpacity="0.6"/>
      </svg>

      <div style={{ textAlign: 'center', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* ── Section label ── */}
        <div className="noor-bloom-reveal revealed" style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--noor-ink-light)', marginBottom: '0.6rem' }}>
            A Secret Awaits
          </p>
          <svg width="160" height="12" viewBox="0 0 160 12" aria-hidden="true" style={{ margin: '0 auto', display: 'block' }}>
            <line x1="0" y1="6" x2="58" y2="6" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5"/>
            <path d="M64 6 Q68 2 72 6 Q76 10 80 6" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
            <circle cx="80" cy="6" r="2" fill="#D4AF37" fillOpacity="0.6"/>
            <path d="M80 6 Q84 2 88 6 Q92 10 96 6" stroke="#D4AF37" strokeWidth="0.8" fill="none"/>
            <line x1="102" y1="6" x2="160" y2="6" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.5"/>
          </svg>
        </div>

        {/* Ornate Frame Container */}
        <div style={{ position: 'relative', width: 'min(700px, 95vw)', margin: '0 auto' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/noor-scratch-frame.png" 
            alt="" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block', 
              mixBlendMode: 'multiply',
              opacity: 0.95,
              position: 'relative',
              zIndex: 2,
              pointerEvents: 'none'
            }} 
          />
          
          <div className="noor-scratch-wrap" style={{ 
            position: 'absolute', 
            top: '12%', 
            left: '12%', 
            right: '12%', 
            bottom: '12%', 
            width: 'auto', 
            margin: 0, 
            aspectRatio: 'auto',
            borderRadius: '12px',
            boxShadow: 'none',
            zIndex: 1
          }}>
          {/* Revealed Content */}
          <div className="noor-date-card">
            <h3 className="noor-date-card__eyebrow">Save the Date</h3>
            <div className="noor-date-card__date">{dateDisplay}</div>
            
            <div className="noor-date-card__meta">
              <span>{venueName || "Bangalore"}</span>
              <i />
              <span>Insha Allah</span>
            </div>
          </div>

          {/* Canvas Cover */}
          <canvas 
            ref={canvasRef}
            id="scratch-canvas"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', zIndex: 10, borderRadius: '12px', touchAction: 'none' }}
          />
        </div>
        </div>

        {/* Hint text below card */}
        <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-serif)', fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--noor-ink-light)', letterSpacing: '0.05em' }}>
          Reveal Our Special Date
        </p>
      </div>
    </section>
  )
}
