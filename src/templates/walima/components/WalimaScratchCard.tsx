'use client'
import React, { useEffect, useRef, useState } from 'react'
import { WalimaCornerBotanical } from '../WalimaOrnaments'

interface Props {
  coverImageUrl?: string // The image covering the scratch card (e.g. scratch-foil.png)
  revealText: React.ReactNode // The text/content underneath
  onComplete?: () => void
}

export default function WalimaScratchCard({ coverImageUrl = '/assets/images/scratch-foil.png', revealText, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      fillCanvas()
    }

    const fillCanvas = () => {
      const img = new Image()
      img.src = coverImageUrl
      img.onload = () => {
        // Fill canvas with the foil texture
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      img.onerror = () => {
        // Fallback to silver/lavender gradient if image fails
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, '#e3d5e8')
        gradient.addColorStop(0.5, '#f4eff7')
        gradient.addColorStop(1, '#d4c4e0')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Add "Scratch Here" text
        ctx.fillStyle = '#8b649c'
        ctx.font = '20px "DM Sans", sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [coverImageUrl])

  const getPointerPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    }
  }

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRevealed) return
    setIsDrawing(true)
    scratch(e)
  }

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRevealed) return
    if (e.cancelable) e.preventDefault() // Prevent scrolling on touch devices while scratching
    scratch(e)
  }

  const handleEnd = () => {
    setIsDrawing(false)
    checkReveal()
  }

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getPointerPos(e)
    
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, 2 * Math.PI) // Brush size
    ctx.fill()
  }

  const checkReveal = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data
    let transparentPixels = 0
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++
    }

    const totalPixels = pixels.length / 4
    const percentCleared = (transparentPixels / totalPixels) * 100

    // If 40% of the canvas is scratched off, reveal the whole thing
    if (percentCleared > 40) {
      setIsRevealed(true)
      if (onComplete) onComplete()
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '550px',
        margin: '20px auto',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(245,237,247,0.9), rgba(253,246,255,0.9))',
        borderRadius: '16px',
        boxShadow: '0 20px 50px rgba(107, 64, 122, 0.15)',
        border: '1px solid rgba(139, 100, 156, 0.3)',
      }}
    >
      {/* Botanical Overlays wrapping the card */}
      <div style={{ position: 'absolute', top: -20, left: -20, width: 80, height: 80, transform: 'rotate(0deg)', zIndex: 10, pointerEvents: 'none' }}>
        <WalimaCornerBotanical />
      </div>
      <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, transform: 'rotate(180deg)', zIndex: 10, pointerEvents: 'none' }}>
        <WalimaCornerBotanical />
      </div>

      {/* Inner Gold Frame */}
      <div 
        ref={containerRef}
        className={`walima-scratch-container ${isRevealed ? 'revealed' : ''}`}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/2',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--ivory)',
          border: '2px solid #d4bba0', /* Gold edge */
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
        }}
      >
        {/* Underlying content */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center'
          }}
        >
          {revealText}
        </div>

        {/* The scratchable canvas layer */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            touchAction: 'none', // Critical for preventing scroll while dragging on mobile
            cursor: 'crosshair',
            transition: 'opacity 0.6s ease-out',
            opacity: isRevealed ? 0 : 1,
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
        />
      </div>
    </div>
  )
}
