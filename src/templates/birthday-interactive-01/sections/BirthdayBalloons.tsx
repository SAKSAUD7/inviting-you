'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onComplete: () => void
}

interface Balloon {
  id: number
  color: string
  highlightColor: string
  stringColor: string
  x: number
  y: number
  speed: number
  size: number
  delay: number
}

export default function BirthdayBalloons({ data, onComplete }: Props) {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [poppedIds, setPoppedIds] = useState<number[]>([])
  const [revealedWords, setRevealedWords] = useState<string[]>([])
  const totalBalloons = data.balloons || 4

  const name = data.birthdayPersonName || 'You'
  const sectionTitle = data.balloonSectionTitle || 'Pop the Balloons'
  const sectionSubtitle = data.balloonSectionSubtitle
    ? data.balloonSectionSubtitle.replace('{name}', name)
    : `and reveal a message from my heart for ${name}...`

  // Words revealed when each balloon is popped - first word is always the name
  const revealWords: string[] = data.balloonRevealWords?.length
    ? data.balloonRevealWords.map(w => w.replace('{name}', name))
    : [name, 'makes', 'life', 'beautiful']

  const PALETTE = [
    { color: '#a8d8ea', highlight: '#d6f0f9', string: '#76b9cf' },
    { color: '#f4b8c8', highlight: '#fde0e9', string: '#d98fa0' },
    { color: '#b5e8b5', highlight: '#d8f5d8', string: '#7ecb7e' },
    { color: '#d4b8e8', highlight: '#eeddf9', string: '#aa85cf' },
    { color: '#fde68a', highlight: '#fef9c3', string: '#e0c060' },
    { color: '#fbc4ab', highlight: '#fde3d4', string: '#e09070' },
  ]

  useEffect(() => {
    const cols = 2
    const rows = Math.ceil(totalBalloons / cols)
    const newBalloons: Balloon[] = Array.from({ length: totalBalloons }).map((_, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const palette = PALETTE[i % PALETTE.length]
      return {
        id: i,
        color: palette.color,
        highlightColor: palette.highlight,
        stringColor: palette.string,
        x: 25 + col * 50 + (Math.random() * 10 - 5),
        y: 35 + row * (55 / Math.max(rows, 1)) + (Math.random() * 6 - 3),
        speed: 2.5 + Math.random() * 2,
        size: 80 + Math.random() * 20,
        delay: i * 0.15,
      }
    })
    setBalloons(newBalloons)
  }, [totalBalloons])

  const handlePop = (id: number, e: React.PointerEvent) => {
    if (poppedIds.includes(id)) return
    e.preventDefault()

    // Confetti burst at click position
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { x, y },
      colors: ['#ff758c', '#ffd166', '#a2d2ff', '#b9fbc0', '#d4b8e8'],
      disableForReducedMotion: true,
      zIndex: 200,
    })

    const newPopped = [...poppedIds, id]
    setPoppedIds(newPopped)
    setRevealedWords(revealWords.slice(0, newPopped.length))

    if (newPopped.length >= totalBalloons) {
      setTimeout(onComplete, 2800)
    }
  }

  const allPopped = poppedIds.length >= totalBalloons

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{ justifyContent: 'flex-start', paddingTop: '1.5rem' }}
    >
      {/* Header */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: '1rem', zIndex: 10 }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p style={{
          fontFamily: 'var(--font-birthday-heading)',
          fontSize: '1rem',
          color: '#ff758c',
          marginBottom: '0.25rem',
          letterSpacing: '0.05em'
        }}>
          A gentle surprise floats just for {name} 🎈
        </p>
        <h2 style={{
          fontSize: '2.2rem',
          color: '#e05070',
          margin: 0,
          lineHeight: 1.1
        }}>
          {sectionTitle}
        </h2>
        <p style={{
          fontFamily: 'var(--font-birthday-heading)',
          fontSize: '1.1rem',
          color: '#d06080',
          marginTop: '0.25rem',
          opacity: 0.85
        }}>
          {sectionSubtitle}
        </p>
      </motion.div>

      {/* Balloon field */}
      <div style={{ position: 'relative', flex: 1, width: '100%', zIndex: 5 }}>
        <AnimatePresence>
          {balloons.filter(b => !poppedIds.includes(b.id)).map((balloon) => (
            <motion.div
              key={balloon.id}
              style={{
                position: 'absolute',
                left: `${balloon.x}%`,
                top: `${balloon.y}%`,
                transform: 'translateX(-50%)',
                cursor: 'pointer',
                userSelect: 'none',
                touchAction: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              initial={{ scale: 0, y: 60, opacity: 0 }}
              animate={{
                scale: 1, opacity: 1,
                y: [0, -12, 0, 12, 0],
                rotate: [0, -3, 3, -2, 0],
              }}
              exit={{ scale: 0, opacity: 0, y: -40 }}
              transition={{
                scale: { type: 'spring', bounce: 0.5, delay: balloon.delay },
                opacity: { delay: balloon.delay },
                y: { repeat: Infinity, duration: balloon.speed, ease: 'easeInOut', delay: balloon.delay },
                rotate: { repeat: Infinity, duration: balloon.speed * 1.3, ease: 'easeInOut' },
              }}
              onPointerDown={(e) => handlePop(balloon.id, e)}
            >
              {/* SVG Balloon */}
              <svg
                width={balloon.size}
                height={balloon.size * 1.3}
                viewBox="0 0 100 130"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
              >
                {/* Balloon body */}
                <ellipse cx="50" cy="50" rx="42" ry="48" fill={balloon.color} />
                {/* Highlight */}
                <ellipse cx="35" cy="30" rx="14" ry="18" fill={balloon.highlightColor} opacity="0.7" />
                {/* Small highlight dot */}
                <ellipse cx="28" cy="22" rx="5" ry="7" fill="white" opacity="0.5" />
                {/* Knot */}
                <ellipse cx="50" cy="98" rx="5" ry="4" fill={balloon.color} />
                <ellipse cx="50" cy="97" rx="3" ry="3" fill={balloon.stringColor} />
                {/* String */}
                <path
                  d="M50 101 Q45 112 50 122 Q55 132 50 130"
                  stroke={balloon.stringColor}
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Revealed words */}
        <AnimatePresence>
          {revealedWords.map((word, i) => (
            <motion.div
              key={`word-${i}`}
              style={{
                position: 'absolute',
                left: `${20 + (i % 3) * 30}%`,
                top: `${20 + Math.floor(i / 3) * 35}%`,
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-birthday-heading)',
                fontSize: i === 0 ? '3rem' : '2.5rem',
                color: '#e05070',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
              initial={{ opacity: 0, scale: 0, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
            >
              {word}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Instruction / Continue */}
      <motion.div
        style={{ marginBottom: '2rem', textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {allPopped ? (
          <motion.button
            className="birthday-btn primary"
            onClick={onComplete}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue 🎉
          </motion.button>
        ) : (
          <p style={{ color: '#d06080', fontSize: '0.9rem', opacity: 0.7 }}>
            {poppedIds.length > 0
              ? `${totalBalloons - poppedIds.length} balloon${totalBalloons - poppedIds.length !== 1 ? 's' : ''} left to pop!`
              : 'Tap each balloon to pop it! 🎈'}
          </p>
        )}
      </motion.div>
    </motion.section>
  )
}
