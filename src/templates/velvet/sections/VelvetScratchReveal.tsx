/* eslint-disable react-hooks/exhaustive-deps, react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
/* eslint-disable */
'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

interface Particle { x: number; y: number; vx: number; vy: number; life: number; size: number; hue: number }

export default function VelvetScratchReveal({ couple }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const particleRef = useRef<HTMLCanvasElement>(null)
  const isDrawing   = useRef(false)
  const lastPos     = useRef<{ x: number; y: number } | null>(null)
  const animFrame   = useRef<number>(0)
  const particles   = useRef<Particle[]>([])

  const [revealed,    setRevealed]    = useState(false)
  const [revealing,   setRevealing]   = useState(false) // fade-out phase
  const [hintVisible, setHintVisible] = useState(true)

  const dateDisplay = couple?.gregorianDisplay || 'Friday, 2 October 2026'
  const weddingDate = couple?.gregorianDate ? new Date(couple.gregorianDate) : new Date('2026-10-02')
  const dayName     = weddingDate.toLocaleDateString('en-US', { weekday: 'long' })
  const hijriDate   = couple?.hijriDate || ''

  /* ── Init canvas overlay ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const resize = () => {
      const W = canvas.offsetWidth  || 560
      const H = canvas.offsetHeight || 230
      canvas.width  = W * window.devicePixelRatio
      canvas.height = H * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      drawOverlay(ctx, W, H)
    }
    resize()
  }, [])

  const drawOverlay = (ctx: CanvasRenderingContext2D, W: number, H: number) => {
    // Deep velvet background
    ctx.fillStyle = '#1A0002'
    ctx.fillRect(0, 0, W, H)

    // Subtle noise texture
    for (let x = 0; x < W; x += 3) {
      for (let y = 0; y < H; y += 3) {
        const a = Math.random() * 0.05
        ctx.fillStyle = `rgba(${100 + Math.random()*40}, ${8 + Math.random()*6}, ${8 + Math.random()*6}, ${a})`
        ctx.fillRect(x, y, 3, 3)
      }
    }

    // Gold shimmer lines
    for (let i = 0; i < 4; i++) {
      const grd = ctx.createLinearGradient(0, 0, W, 0)
      grd.addColorStop(0,   'rgba(201,169,110,0)')
      grd.addColorStop(0.3, `rgba(201,169,110,${0.03 + Math.random()*0.04})`)
      grd.addColorStop(0.7, `rgba(240,212,154,${0.05 + Math.random()*0.04})`)
      grd.addColorStop(1,   'rgba(201,169,110,0)')
      ctx.fillStyle = grd
      const yPos = H * (0.2 + i * 0.2)
      ctx.fillRect(0, yPos, W, 1 + Math.random())
    }

    // Border glow
    const borderGrd = ctx.createLinearGradient(0, 0, W, H)
    borderGrd.addColorStop(0,   'rgba(201,169,110,0.18)')
    borderGrd.addColorStop(0.5, 'rgba(240,212,154,0.08)')
    borderGrd.addColorStop(1,   'rgba(201,169,110,0.18)')
    ctx.strokeStyle = borderGrd
    ctx.lineWidth = 1.5
    ctx.strokeRect(8, 8, W - 16, H - 16)

    // Hint text
    ctx.fillStyle  = 'rgba(240,212,154,0.55)'
    ctx.font       = `italic ${Math.min(W * 0.028, 13)}px 'Cormorant Infant', serif`
    ctx.textAlign  = 'center'
    ctx.letterSpacing = '0.15em'
    ctx.fillText('✦  scratch to reveal  ✦', W / 2, H / 2 + 5)
  }

  /* ── Smooth scratch ── */
  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas || revealed || revealing) return
    const ctx  = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const rect  = canvas.getBoundingClientRect()
    const sx    = (x - rect.left) * (canvas.width  / rect.width  / window.devicePixelRatio)
    const sy    = (y - rect.top)  * (canvas.height / rect.height / window.devicePixelRatio)

    ctx.globalCompositeOperation = 'destination-out'
    ctx.lineWidth   = 58
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.strokeStyle = 'rgba(0,0,0,1)'

    if (lastPos.current) {
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      // Smooth quadratic curve to current point
      const mx = (lastPos.current.x + sx) / 2
      const my = (lastPos.current.y + sy) / 2
      ctx.quadraticCurveTo(lastPos.current.x, lastPos.current.y, mx, my)
      ctx.lineTo(sx, sy)
      ctx.stroke()
    } else {
      // First point — draw a circle
      ctx.beginPath()
      ctx.arc(sx, sy, 29, 0, Math.PI * 2)
      ctx.fill()
    }

    lastPos.current = { x: sx, y: sy }
    setHintVisible(false)

    // Check reveal threshold
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let transparent = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 80) transparent++
    }
    if (transparent / (data.length / 4) > 0.48) {
      triggerReveal()
    }
  }, [revealed, revealing])

  /* ── Celebrate particles ── */
  const triggerReveal = useCallback(() => {
    setRevealing(true)
    spawnParticles()
    setTimeout(() => setRevealed(true), 700)
  }, [])

  function spawnParticles() {
    const pc = particleRef.current
    if (!pc) return
    const W = pc.offsetWidth, H = pc.offsetHeight
    pc.width  = W * window.devicePixelRatio
    pc.height = H * window.devicePixelRatio

    const newParticles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        x:    W * (0.2 + Math.random() * 0.6),
        y:    H * (0.3 + Math.random() * 0.4),
        vx:   (Math.random() - 0.5) * 5,
        vy:   -(2 + Math.random() * 5),
        life: 1,
        size: 2 + Math.random() * 4,
        hue:  30 + Math.random() * 30,
      })
    }
    particles.current = newParticles
    animateParticles()
  }

  function animateParticles() {
    const pc = particleRef.current
    if (!pc) return
    const ctx = pc.getContext('2d')
    if (!ctx) return

    const W = pc.offsetWidth, H = pc.offsetHeight
    ctx.clearRect(0, 0, W * window.devicePixelRatio, H * window.devicePixelRatio)
    ctx.save()
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    particles.current = particles.current.filter(p => p.life > 0.01)
    for (const p of particles.current) {
      p.x    += p.vx
      p.y    += p.vy
      p.vy   += 0.12
      p.life -= 0.022

      ctx.globalAlpha = p.life
      ctx.fillStyle   = `hsl(${p.hue}, 80%, 68%)`
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()

      // Star sparkle
      if (p.size > 3) {
        ctx.strokeStyle = `hsla(${p.hue + 15}, 90%, 80%, ${p.life})`
        ctx.lineWidth   = 0.8
        for (let a = 0; a < 4; a++) {
          const ang = (a * Math.PI) / 2
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + Math.cos(ang) * p.size * 2.5, p.y + Math.sin(ang) * p.size * 2.5)
          ctx.stroke()
        }
      }
    }
    ctx.restore()

    if (particles.current.length > 0) {
      animFrame.current = requestAnimationFrame(animateParticles)
    }
  }

  useEffect(() => () => cancelAnimationFrame(animFrame.current), [])

  const getXY = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
    return { x: e.clientX, y: e.clientY }
  }

  return (
    <section id="date" className="scratch-section section-pad">
      <div className="section-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">A date to hold close</span>
          <h2 id="scratchHeading" className={revealed ? 'scratch-revealed-title' : ''}>
            {revealed ? 'Our Special Day ✦' : 'Scratch to Reveal'}
          </h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div className="scratch-frame-shell reveal">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/scratch-frame.webp" alt="" className="scratch-frame-overlay" aria-hidden="true" />

          <div id="scratchCard" className="scratch-wrap">

            {/* Date revealed beneath */}
            <div className={`date-reveal${revealed ? ' is-revealed' : ''}`} aria-live="polite">
              <span className="date-kicker">You&apos;re Invited!</span>
              <strong className="date-main">{dateDisplay}</strong>
              <div className="date-day">
                <span>{dayName}</span>
                <a aria-hidden="true">⬩</a>
                <span>05:00 PM</span>
              </div>
            </div>

            {/* Scratch canvas overlay */}
            {!revealed && (
              <canvas
                id="scratchCanvas"
                className={`scratch-canvas${revealing ? ' is-fading' : ''}${hintVisible ? ' hint-pulse' : ''}`}
                ref={canvasRef}
                role="button"
                tabIndex={0}
                aria-label="Scratch to reveal the wedding date"
                onMouseDown={(e) => { isDrawing.current = true; lastPos.current = null; scratch(e.clientX, e.clientY) }}
                onMouseMove={(e) => { if (isDrawing.current) scratch(e.clientX, e.clientY) }}
                onMouseUp={() => { isDrawing.current = false; lastPos.current = null }}
                onMouseLeave={() => { isDrawing.current = false; lastPos.current = null }}
                onTouchStart={(e) => { isDrawing.current = true; lastPos.current = null; const { x, y } = getXY(e); scratch(x, y) }}
                onTouchMove={(e) => { if (isDrawing.current) { const { x, y } = getXY(e); scratch(x, y) } }}
                onTouchEnd={() => { isDrawing.current = false; lastPos.current = null }}
                onKeyDown={(e) => { if (e.key === 'Enter') triggerReveal() }}
              />
            )}

            {/* Celebration particle canvas */}
            <canvas ref={particleRef} className="scratch-particles" aria-hidden="true" />
          </div>
        </div>

        <p id="scratchNote" className={`scratch-note reveal${revealed ? ' is-revealed' : ''}`}>
          {revealed ? hijriDate : 'Use your finger or cursor to uncover the moment.'}
        </p>
      </div>
    </section>
  )
}
