'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onReplay: () => void
}

export default function BirthdayFinal({ data, onReplay }: Props) {
  const [giftOpened, setGiftOpened] = useState(false)

  useEffect(() => {
    if (giftOpened) {
      const duration = 4000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 200 }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now()
        if (timeLeft <= 0) return clearInterval(interval)
        const particleCount = 50 * (timeLeft / duration)
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } })
      }, 250)

      return () => clearInterval(interval)
    }
  }, [giftOpened])

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ gap: '1.5rem', justifyContent: 'center' }}
    >
      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.div
            key="gift-closed"
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              One Last Thing... 🎀
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              transition={{ delay: 0.7 }}
              style={{ fontSize: '1.1rem' }}
            >
              Tap the gift to open it
            </motion.p>

            <motion.div
              style={{ fontSize: '110px', cursor: 'pointer', userSelect: 'none', lineHeight: 1 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              animate={{ rotate: [-5, 5, -5], y: [0, -8, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' }, y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
              onClick={() => setGiftOpened(true)}
            >
              🎁
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="gift-open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '1.5rem' }}
          >
            {/* Final card */}
            <motion.div
              style={{
                background: 'linear-gradient(135deg, #fff9fb 0%, #fff0f5 100%)',
                padding: '2rem 1.5rem',
                borderRadius: '20px',
                boxShadow: '0 15px 40px rgba(255,117,140,0.15)',
                border: '2px solid rgba(255,117,140,0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '90%',
                gap: '0.75rem'
              }}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <div style={{ fontSize: '64px', lineHeight: 1 }}>🎉🎂🎉</div>

              <h2 style={{ color: '#ff758c', textAlign: 'center', fontSize: '2rem', margin: 0 }}>
                Happy Birthday,<br />{data.birthdayPersonName}! 🎂
              </h2>

              <p style={{ color: '#555', textAlign: 'center', fontSize: '1.1rem', lineHeight: 1.5, margin: 0 }}>
                {data.finalMessage || 'Lots of love for you ❤️'}
              </p>

              {data.senderName && (
                <p style={{ color: '#ff758c', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                  — {data.senderName} 💝
                </p>
              )}

              {/* Hero image */}
              {data.heroImage && (
                <motion.img
                  src={data.heroImage}
                  alt="Birthday"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                  style={{ width: '120px', height: '120px', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' }}
                />
              )}
            </motion.div>

            {/* Replay button */}
            <motion.button
              className="birthday-btn primary"
              onClick={onReplay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', padding: '0.85rem 2.5rem' }}
            >
              🔄 Experience Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
