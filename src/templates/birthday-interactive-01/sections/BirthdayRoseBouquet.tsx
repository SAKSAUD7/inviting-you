'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onComplete: () => void
}

// ── 8-position layout: 4 per side stacked evenly ────────────────────────────
const POSITIONS = [
  { top: '4%',  left: '0%',   side: 'left'  },
  { top: '4%',  right: '0%',  side: 'right' },
  { top: '26%', left: '0%',   side: 'left'  },
  { top: '26%', right: '0%',  side: 'right' },
  { top: '50%', left: '0%',   side: 'left'  },
  { top: '50%', right: '0%',  side: 'right' },
  { top: '72%', left: '0%',   side: 'left'  },
  { top: '72%', right: '0%',  side: 'right' },
] as const

// Default beautiful 8 messages (used if seed has no bouquetMessages)
const DEFAULT_WORDS = [
  '💖 Our Shared Laughter\nThe silly inside jokes and endless laughs that make every moment with you golden.',
  '🌟 My Constant Inspiration\nYour strength and unwavering belief in me inspire me to grow every single day.',
  '🌸 Your Warm Heart\nYour infinite kindness and gentle nature fill my world with so much love.',
  '✨ Every Moment With You\nEvery memory we share becomes a treasure I hold close forever.',
  '🤝 My Ride or Die\nThrough every adventure and storm, you have always been right beside me.',
  '😂 You Crack Me Up\nYour humor and the joy you bring make every ordinary day feel extraordinary.',
  '🌙 My Safe Place\nWith you I can be completely myself — no masks, no pretending, just us.',
  '🎂 Happy Birthday!\nWishing you a day as magical and beautiful as the person you are. Love you!',
]

const FLOAT_DELAYS   = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1]
const FLOAT_DURATIONS = [3.2, 2.8, 3.5, 3.1, 2.9, 3.4, 3.0, 3.3]

// SVG tree decoration
const Tree = ({ side }: { side: 'left' | 'right' }) => (
  <svg width="80" height="110" viewBox="0 0 90 120"
    style={{ transform: side === 'right' ? 'scaleX(-1)' : 'none', opacity: 0.85 }}>
    <rect x="40" y="80" width="10" height="38" rx="4" fill="#c48a5b" />
    <path d="M45 70 Q22 55 10 42" stroke="#c48a5b" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M45 75 Q60 60 72 50" stroke="#c48a5b" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="10" cy="40" r="10" fill="#f9a8b8" opacity="0.8" />
    <circle cx="18" cy="30" r="8"  fill="#ffc0cb" opacity="0.7" />
    <circle cx="72" cy="48" r="10" fill="#f9a8b8" opacity="0.8" />
    <circle cx="64" cy="38" r="8"  fill="#ffc0cb" opacity="0.7" />
    <circle cx="45" cy="55" r="12" fill="#f9a8b8" opacity="0.75" />
    <text x="4"  y="22" fontSize="12" fill="#e05070">♥</text>
    <text x="66" y="30" fontSize="12" fill="#e05070">♥</text>
    <text x="40" y="44" fontSize="10" fill="#e05070">♥</text>
  </svg>
)

export default function BirthdayRoseBouquet({ data, onComplete }: Props) {
  const [hasEntered, setHasEntered] = useState(false)

  const name = data.birthdayPersonName || 'You'
  const title = data.bouquetTitle
    ? data.bouquetTitle.replace('{name}', name)
    : `Your Rose Bouquet 🌹`

  // Build 8 words: prefer bouquetMessages from seed, else use defaults
  const sourceWords = data.bouquetMessages?.length
    ? data.bouquetMessages
    : DEFAULT_WORDS

  // Ensure exactly 8 items (pad with defaults if fewer)
  const words8 = [...sourceWords, ...DEFAULT_WORDS].slice(0, 8)

  const wordItems = words8.map((raw, i) => ({
    raw: raw.replace('{name}', name),
    pos: POSITIONS[i],
  }))

  useEffect(() => {
    const t = setTimeout(() => {
      setHasEntered(true)
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { x: 0.5, y: 0.3 },
        colors: ['#ff758c', '#ffc0cb', '#e05070', '#fff0f5'],
        disableForReducedMotion: true,
        zIndex: 200,
      })
    }, 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.6 }}
      style={{
        justifyContent: 'space-between',
        paddingTop: '1rem',
        paddingBottom: '0',
        overflow: 'hidden',
      }}
    >
      {/* ── Title ── */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: 'center', zIndex: 10, paddingTop: '0.25rem', flexShrink: 0 }}
      >
        <h2 style={{
          fontFamily: 'var(--font-birthday-heading)',
          fontSize: 'clamp(1.7rem, 6vw, 2.4rem)',
          color: '#e05070',
          margin: 0,
          lineHeight: 1.1,
        }}>
          {title}
        </h2>
      </motion.div>

      {/* ── Central arena: bouquet + 8 floating bubbles ── */}
      <div style={{
        position: 'relative',
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
      }}>
        {/* Floating word bubbles */}
        {wordItems.map((item, i) => {
          const { top, side, ...posStyle } = item.pos
          const lines = item.raw.split('\n')
          const titleLine = lines[0]
          const descLine  = lines.slice(1).join(' ').trim()

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -7, 0, 7, 0],
              }}
              transition={{
                opacity: { delay: FLOAT_DELAYS[i] + 0.4, duration: 0.5 },
                scale:   { delay: FLOAT_DELAYS[i] + 0.4, type: 'spring', bounce: 0.5 },
                y:       { delay: FLOAT_DELAYS[i] + 1.2, repeat: Infinity, duration: FLOAT_DURATIONS[i], ease: 'easeInOut' },
              }}
              style={{
                position: 'absolute',
                top,
                ...(side === 'left' ? { left: 0 } : { right: 0 }),
                maxWidth: 'min(44%, 170px)',
                background: 'rgba(255,255,255,0.93)',
                backdropFilter: 'blur(8px)',
                borderRadius: '14px',
                padding: '0.55rem 0.8rem',
                boxShadow: '0 4px 16px rgba(255,117,140,0.18)',
                fontSize: 'clamp(0.68rem, 3vw, 0.82rem)',
                fontFamily: 'var(--font-birthday-body)',
                fontWeight: 600,
                color: '#594a4e',
                textAlign: side === 'left' ? 'left' : 'right',
                zIndex: 8,
                lineHeight: 1.3,
              }}
            >
              <div style={{ color: '#e05070', fontWeight: 700, fontSize: 'clamp(0.75rem, 3.2vw, 0.88rem)', lineHeight: 1.2, marginBottom: descLine ? '0.2rem' : 0 }}>
                {titleLine}
              </div>
              {descLine && (
                <div style={{ fontWeight: 400, color: '#7a6870', fontSize: 'clamp(0.62rem, 2.5vw, 0.72rem)', lineHeight: 1.25 }}>
                  {descLine}
                </div>
              )}
            </motion.div>
          )
        })}

        {/* Central bouquet image */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
          transition={{
            scale:   { delay: 0.5, type: 'spring', bounce: 0.4 },
            opacity: { delay: 0.5 },
            y:       { delay: 1.5, repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
          }}
          style={{ zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src="/templates/birthday/rose_bouquet.png"
            alt="Rose Bouquet"
            style={{
              width: 'clamp(130px, 32vw, 200px)',
              height: 'auto',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
              filter: 'drop-shadow(0 10px 25px rgba(255,117,140,0.3))',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      </div>

      {/* ── Tree decoration + Continue button ── */}
      <div style={{ width: '100%', zIndex: 10, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 0.5rem' }}>
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Tree side="left" />
          </motion.div>

          <motion.button
            className="birthday-btn primary"
            onClick={onComplete}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.8, type: 'spring', bounce: 0.4 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{ marginBottom: '1.5rem', zIndex: 20, flexShrink: 0 }}
          >
            Continue 💌
          </motion.button>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Tree side="right" />
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
