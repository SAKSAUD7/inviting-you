'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onComplete: () => void
}

export default function BirthdayGift({ data, onComplete }: Props) {
  const [clickCount, setClickCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const maxClicks = 3

  const name = data.birthdayPersonName || 'You'
  const loveMessage = data.loveMessage
    ? data.loveMessage.replace('{name}', name)
    : `I love you, ${name}! 💕`
  const giftMessage = data.giftMessage || 'Tap the gift to open it...'

  const handleGiftClick = () => {
    if (isOpen) return
    const next = clickCount + 1
    setClickCount(next)

    if (next >= maxClicks) {
      setIsOpen(true)
      // Massive confetti celebration
      const duration = 4000
      const end = Date.now() + duration
      const frame = () => {
        confetti({ particleCount: 8, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors: ['#ff758c', '#ff7eb3', '#ffc0cb'] })
        confetti({ particleCount: 8, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors: ['#a2d2ff', '#cdb4db', '#fff0f5'] })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
      setTimeout(() => setShowHeart(true), 800)
    }
  }

  const shakeVariants = {
    idle: { rotate: 0, scale: 1 },
    shake1: { rotate: [-5, 5, -5, 5, 0], scale: [1, 1.05, 1], transition: { duration: 0.5 } },
    shake2: { rotate: [-8, 8, -8, 8, 0], scale: [1, 1.08, 1], transition: { duration: 0.5 } },
  }

  const getShakeKey = () => {
    if (clickCount === 1) return 'shake1'
    if (clickCount === 2) return 'shake2'
    return 'idle'
  }

  const clicksLeft = maxClicks - clickCount

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="gift-closed"
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
            exit={{ opacity: 0, scale: 0.5, y: -60 }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <h2 style={{ fontSize: '2rem', color: '#e05070', margin: 0 }}>One Last Surprise 🎀</h2>
              <motion.p
                style={{ color: '#d06080', fontSize: '1.05rem', marginTop: '0.5rem', fontFamily: 'var(--font-birthday-heading)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.7 }}
              >
                {giftMessage}
              </motion.p>
            </motion.div>

            {/* Gift Box */}
            <motion.div
              key={`gift-${clickCount}`}
              animate={getShakeKey()}
              variants={shakeVariants}
              onClick={handleGiftClick}
              style={{ cursor: 'pointer', position: 'relative', userSelect: 'none' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <svg width="180" height="190" viewBox="0 0 180 190" style={{ filter: 'drop-shadow(0 8px 20px rgba(255,117,140,0.3))' }}>
                {/* Box body */}
                <rect x="15" y="80" width="150" height="100" rx="6" fill="#ff9eb5" />
                <rect x="15" y="80" width="150" height="100" rx="6" fill="url(#boxGrad)" />
                {/* Box lid */}
                <rect x="8" y="58" width="164" height="30" rx="6" fill="#ff758c" />
                {/* Ribbon vertical */}
                <rect x="82" y="58" width="16" height="122" fill="#c9315a" />
                {/* Ribbon horizontal on lid */}
                <rect x="8" y="68" width="164" height="10" fill="#c9315a" opacity="0.5" />
                {/* Bow */}
                <ellipse cx="70" cy="60" rx="28" ry="18" fill="#ff758c" transform="rotate(-20 70 60)" />
                <ellipse cx="110" cy="60" rx="28" ry="18" fill="#ff758c" transform="rotate(20 110 60)" />
                <ellipse cx="70" cy="60" rx="22" ry="13" fill="#ff9eb5" transform="rotate(-20 70 60)" />
                <ellipse cx="110" cy="60" rx="22" ry="13" fill="#ff9eb5" transform="rotate(20 110 60)" />
                {/* Bow center knot */}
                <circle cx="90" cy="60" r="12" fill="#c9315a" />
                {/* Dots on box */}
                <circle cx="50" cy="120" r="8" fill="rgba(255,255,255,0.3)" />
                <circle cx="130" cy="145" r="6" fill="rgba(255,255,255,0.3)" />
                <circle cx="80" cy="155" r="5" fill="rgba(255,255,255,0.2)" />
                <defs>
                  <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Click counter badge */}
              <AnimatePresence>
                {clickCount > 0 && clicksLeft > 0 && (
                  <motion.div
                    key={clickCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: -12,
                      right: -12,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#c9315a',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                  >
                    {clicksLeft}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.p
              style={{ color: '#d06080', fontSize: '0.85rem', opacity: 0.6, textAlign: 'center' }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {clickCount === 0 ? `Tap ${maxClicks} times to open ✨` : `${clicksLeft} more tap${clicksLeft !== 1 ? 's' : ''} to go!`}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="gift-open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', width: '90%' }}
          >
            {/* Animated Heart */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', bounce: 0.6, duration: 1 }}
                  style={{ textAlign: 'center', position: 'relative' }}
                >
                  {/* Big Heart SVG */}
                  <motion.svg
                    width="160"
                    height="145"
                    viewBox="0 0 160 145"
                    animate={{
                      scale: [1, 1.05, 1],
                      filter: [
                        'drop-shadow(0 0 10px rgba(255,117,140,0.5))',
                        'drop-shadow(0 0 25px rgba(255,117,140,0.8))',
                        'drop-shadow(0 0 10px rgba(255,117,140,0.5))',
                      ]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  >
                    <defs>
                      <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff9eb5" />
                        <stop offset="100%" stopColor="#e05070" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M80 130 C80 130 10 85 10 42 C10 20 28 8 48 8 C62 8 74 15 80 26 C86 15 98 8 112 8 C132 8 150 20 150 42 C150 85 80 130 80 130Z"
                      fill="url(#heartGrad)"
                    />
                    {/* Highlight */}
                    <ellipse cx="52" cy="32" rx="16" ry="12" fill="rgba(255,255,255,0.35)" transform="rotate(-20 52 32)" />
                    {/* I LOVE YOU Text */}
                    <text
                      x="80"
                      y="65"
                      fontFamily="var(--font-birthday-heading), sans-serif"
                      fontSize="22"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                      style={{ textShadow: '0 2px 4px rgba(201, 49, 90, 0.5)' }}
                    >
                      I LOVE YOU
                    </text>
                  </motion.svg>

                  {/* Floating mini hearts */}
                  {[...Array(6)].map((_, i) => (
                    <motion.span
                      key={i}
                      style={{
                        position: 'absolute',
                        fontSize: `${1 + Math.random()}rem`,
                        pointerEvents: 'none',
                      }}
                      initial={{ x: (i % 2 === 0 ? -1 : 1) * 40, y: 0, opacity: 1 }}
                      animate={{ x: (i % 2 === 0 ? -1 : 1) * (60 + i * 15), y: -(60 + i * 20), opacity: 0, scale: 0.5 }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, repeatDelay: 0.5 }}
                    >
                      💕
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Love Message */}
            <AnimatePresence>
              {showHeart && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ textAlign: 'center', width: '100%' }}
                >
                  <motion.h2
                    style={{
                      fontFamily: 'var(--font-birthday-heading)',
                      fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                      color: '#e05070',
                      margin: '0 0 0.5rem',
                      lineHeight: 1.2,
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    Thank you so much for making my life beautiful {name}
                  </motion.h2>
                  <p style={{ color: '#d06080', fontFamily: 'var(--font-birthday-heading)', fontSize: '1.25rem', opacity: 0.9, marginTop: '0.5rem' }}>
                    {loveMessage}
                  </p>

                  <motion.button
                    className="birthday-btn primary"
                    onClick={onComplete}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: 'spring' }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    style={{ marginTop: '2rem' }}
                  >
                    Restart 🔄
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
