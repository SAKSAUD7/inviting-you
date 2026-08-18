'use client'

import { useEffect, useRef, useState } from 'react'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

export default function VelvetScratchReveal({ couple }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [scratched, setScratched] = useState(0)
  const isDrawing = useRef(false)

  const date = couple?.gregorianDisplay ?? 'Friday, 2nd October 2026'
  const dateShort = couple?.gregorianDate
    ? new Date(couple.gregorianDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    : date

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    // Draw scratch layer — dark crimson with texture
    ctx.fillStyle = '#3D0A0A'
    ctx.fillRect(0, 0, W, H)

    // Overlay pattern
    for (let i = 0; i < W; i += 12) {
      for (let j = 0; j < H; j += 12) {
        ctx.fillStyle = `rgba(${80 + Math.random() * 20}, ${5 + Math.random() * 5}, ${5 + Math.random() * 5}, 0.3)`
        ctx.fillRect(i, j, 10, 10)
      }
    }

    // Gold text hint
    ctx.fillStyle = 'rgba(201, 151, 26, 0.35)'
    ctx.font = `italic ${Math.min(W * 0.04, 16)}px Georgia`
    ctx.textAlign = 'center'
    ctx.fillText('scratch here to reveal', W / 2, H / 2 + 4)
  }, [])

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 28, 0, Math.PI * 2)
    ctx.fill()

    // Calculate % revealed
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const total = data.data.length / 4
    let transparent = 0
    for (let i = 3; i < data.data.length; i += 4) {
      if (data.data[i] < 128) transparent++
    }
    const pct = (transparent / total) * 100
    setScratched(pct)
    if (pct > 55) setRevealed(true)
  }

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  return (
    <section className="velvet-scratch">
      <p className="velvet-scratch__label">A date to hold close</p>
      <h2 className="velvet-scratch__heading reveal-hidden">
        {revealed ? 'Our Day' : 'Scratch to Reveal'}
      </h2>
      <div className="velvet-scratch__divider">◆</div>

      <div className="velvet-scratch__canvas-wrap reveal-hidden">
        {/* Revealed content beneath */}
        <div className="velvet-scratch__reveal">
          <span className="velvet-scratch__date-day">
            {couple?.gregorianDate
              ? new Date(couple.gregorianDate).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
              : 'FRIDAY'}
          </span>
          <span className="velvet-scratch__date-main">
            {couple?.gregorianDate
              ? new Date(couple.gregorianDate).getDate()
              : '2'}
          </span>
          <span className="velvet-scratch__date-year">
            {couple?.gregorianDate
              ? new Date(couple.gregorianDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
              : 'October 2026'}
          </span>
        </div>

        {/* Scratch canvas */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="velvet-scratch__canvas"
            onMouseDown={(e) => { isDrawing.current = true; scratch(...Object.values(getPos(e, e.currentTarget)) as [number, number]) }}
            onMouseMove={(e) => { if (isDrawing.current) scratch(...Object.values(getPos(e, e.currentTarget)) as [number, number]) }}
            onMouseUp={() => { isDrawing.current = false }}
            onMouseLeave={() => { isDrawing.current = false }}
            onTouchStart={(e) => { isDrawing.current = true; e.preventDefault(); scratch(...Object.values(getPos(e, e.currentTarget)) as [number, number]) }}
            onTouchMove={(e) => { if (isDrawing.current) { e.preventDefault(); scratch(...Object.values(getPos(e, e.currentTarget)) as [number, number]) }}}
            onTouchEnd={() => { isDrawing.current = false }}
          />
        )}
      </div>

      {revealed && couple?.hijriDate && (
        <p className="reveal-hidden" style={{
          fontFamily: 'var(--font-elegant)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
          color: 'var(--velvet-muted)',
          marginTop: '1.5rem',
          opacity: 0.8,
        }}>
          {couple.hijriDate}
        </p>
      )}
    </section>
  )
}
