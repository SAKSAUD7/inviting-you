'use client'

import { useState, useEffect, useRef } from 'react'
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
    const newBalloons: Balloon[] = Array.from({ length: totalBalloons }).map((_, i) => {
      const palette = PALETTE[i % PALETTE.length]
      return {
        id: i,
        color: palette.color,
        highlightColor: palette.highlight,
        stringColor: palette.string,
        speed: 2.5 + Math.random() * 2,
        size: 90,
        delay: i * 0.15,
      }
    })
    setBalloons(newBalloons)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalBalloons])

  const handlePop = (id: number, e: React.PointerEvent) => {
    if (poppedIds.includes(id)) return
    e.preventDefault()

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

  // Determine grid columns based on balloon count
  const cols = totalBalloons <= 2 ? totalBalloons : totalBalloons <= 4 ? 2 : 3

  return (
    <motion.section
      className="birthday-section balloon-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="balloon-header"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="balloon-intro-text">
          A gentle surprise floats just for {name} 🎈
        </p>
        <h2 className="balloon-title">{sectionTitle}</h2>
        <p className="balloon-subtitle">{sectionSubtitle}</p>
      </motion.div>

      {/* Balloon Grid */}
      <div
        className="balloon-grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        <AnimatePresence>
          {balloons.map((balloon) => {
            const isPopped = poppedIds.includes(balloon.id)
            const wordIndex = poppedIds.indexOf(balloon.id)
            const word = wordIndex >= 0 ? revealedWords[wordIndex] : null

            return (
              <div key={balloon.id} className="balloon-cell">
                <AnimatePresence mode="wait">
                  {!isPopped ? (
                    <motion.div
                      key="balloon"
                      className="balloon-item"
                      initial={{ scale: 0, y: 60, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        y: [0, -10, 0, 10, 0],
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
                      style={{ cursor: 'pointer', touchAction: 'none', userSelect: 'none' }}
                    >
                      <svg
                        width={balloon.size}
                        height={balloon.size * 1.3}
                        viewBox="0 0 100 130"
                        style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
                      >
                        <ellipse cx="50" cy="50" rx="42" ry="48" fill={balloon.color} />
                        <ellipse cx="35" cy="30" rx="14" ry="18" fill={balloon.highlightColor} opacity="0.7" />
                        <ellipse cx="28" cy="22" rx="5" ry="7" fill="white" opacity="0.5" />
                        <ellipse cx="50" cy="98" rx="5" ry="4" fill={balloon.color} />
                        <ellipse cx="50" cy="97" rx="3" ry="3" fill={balloon.stringColor} />
                        <path
                          d="M50 101 Q45 112 50 122 Q55 132 50 130"
                          stroke={balloon.stringColor}
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="word"
                      className="balloon-word"
                      initial={{ opacity: 0, scale: 0, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', bounce: 0.6, delay: 0.1 }}
                    >
                      {word ?? '✨'}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Instruction / Continue */}
      <motion.div
        className="balloon-footer"
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
          <p className="balloon-hint">
            {poppedIds.length > 0
              ? `${totalBalloons - poppedIds.length} balloon${totalBalloons - poppedIds.length !== 1 ? 's' : ''} left to pop!`
              : 'Tap each balloon to pop it! 🎈'}
          </p>
        )}
      </motion.div>
    </motion.section>
  )
}
