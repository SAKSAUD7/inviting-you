'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BirthdayConfig, GalleryImage } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  images?: GalleryImage[]
  onComplete: () => void
}

const ICONS = ['✨', '😊', '⭐', '💫', '🌸', '🦋', '🌙', '💎']
const ICON_COLORS = ['#ff9eb5', '#ffb347', '#a78bfa', '#60d394', '#ff758c', '#f4a261', '#4cc9f0', '#c084fc']

export default function BirthdayBouquet({ data, images, onComplete }: Props) {
  const [selectedReason, setSelectedReason] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<number[]>([])
  const [done, setDone] = useState(false)

  const name = data.birthdayPersonName || 'You'
  const title = data.bouquetTitle
    ? data.bouquetTitle.replace('{name}', name)
    : `For ${name}, who brings beauty to my world 🌷`
  const subtitle = data.bouquetSubtitle
    ? data.bouquetSubtitle.replace('{name}', name)
    : `Each button represents a reason why ${name} is so special to me`

  const reasons: string[] = data.bouquetReasons?.length
    ? data.bouquetReasons
    : data.bouquetMessages?.length
      ? data.bouquetMessages
      : ['Your Warm Heart', 'Your Beautiful Soul', 'Your Joyful Spirit', 'Your Kind Nature']

  const bouquetImage = '/templates/birthday/tulip_bouquet.png'

  // Auto-complete after revealing all
  useEffect(() => {
    if (revealed.length >= reasons.length && !done) {
      const t = setTimeout(() => setDone(true), 500)
      return () => clearTimeout(t)
    }
  }, [revealed, reasons.length, done])

  const handleIconClick = (i: number) => {
    setSelectedReason(selectedReason === i ? null : i)
    if (!revealed.includes(i)) {
      setRevealed(prev => [...prev, i])
    }
  }

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      style={{ justifyContent: 'flex-start', paddingTop: '1.5rem', gap: '0' }}
    >
      {/* Title */}
      <motion.div
        style={{ textAlign: 'center', padding: '0 1.5rem', marginBottom: '1rem', zIndex: 10 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 style={{ fontSize: '1.5rem', lineHeight: 1.3, color: '#e05070', margin: 0 }}>
          {title}
        </h2>
        <p style={{
          fontSize: '0.95rem',
          color: '#d06080',
          marginTop: '0.5rem',
          fontFamily: 'var(--font-birthday-heading)',
          opacity: 0.8,
        }}>
          {subtitle}
        </p>
      </motion.div>

      {/* Icon Buttons Row */}
      <motion.div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          padding: '0.5rem 1.5rem',
          zIndex: 10,
          marginBottom: '0.75rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {reasons.map((_, i) => {
          const isSelected = selectedReason === i
          const isRevealed = revealed.includes(i)
          return (
            <motion.button
              key={i}
              onClick={() => handleIconClick(i)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: isSelected
                  ? ICON_COLORS[i % ICON_COLORS.length]
                  : isRevealed
                    ? 'rgba(255,255,255,0.9)'
                    : 'rgba(255,255,255,0.7)',
                border: `2px solid ${isSelected ? ICON_COLORS[i % ICON_COLORS.length] : 'rgba(255,117,140,0.3)'}`,
                boxShadow: isSelected
                  ? `0 6px 20px ${ICON_COLORS[i % ICON_COLORS.length]}60`
                  : '0 4px 12px rgba(255,117,140,0.15)',
                cursor: 'pointer',
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.25s ease',
                backdropFilter: 'blur(8px)',
              }}
            >
              {ICONS[i % ICONS.length]}
            </motion.button>
          )
        })}
      </motion.div>

      {/* Reason Card */}
      <div style={{ width: '100%', padding: '0 1.5rem', marginBottom: '0.75rem', zIndex: 10, minHeight: '80px' }}>
        <AnimatePresence mode="wait">
          {selectedReason !== null && (
            <motion.div
              key={selectedReason}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', bounce: 0.4 }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: `0 8px 25px ${ICON_COLORS[selectedReason % ICON_COLORS.length]}30`,
                border: `1px solid ${ICON_COLORS[selectedReason % ICON_COLORS.length]}40`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '0.5rem',
              }}
            >
              {(() => {
                const text = reasons[selectedReason] || ''
                const parts = text.split('\n')
                const reasonTitle = parts[0]
                const reasonDesc = parts.slice(1).join('\n').trim()

                return (
                  <>
                    <h3 style={{
                      fontFamily: 'var(--font-birthday-heading)',
                      fontSize: '1.5rem',
                      color: '#e05070',
                      margin: 0,
                      fontWeight: 700,
                    }}>
                      {reasonTitle}
                    </h3>
                    {reasonDesc && (
                      <p style={{
                        fontFamily: 'var(--font-birthday-body)',
                        fontSize: '0.95rem',
                        color: '#594a4e',
                        margin: 0,
                        lineHeight: 1.4,
                      }}>
                        {reasonDesc}
                      </p>
                    )}
                  </>
                )
              })()}
            </motion.div>
          )}
          {selectedReason === null && (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                textAlign: 'center',
                color: '#d06080',
                fontSize: '0.9rem',
                opacity: 0.6,
                paddingTop: '1rem',
              }}
            >
              Tap an icon to reveal a reason ✨
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bouquet Image */}
      <motion.div
        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, minHeight: 0 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
      >
        <motion.img
          src={bouquetImage}
          alt="Birthday bouquet"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{
            maxHeight: '220px',
            maxWidth: '85%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(255,117,140,0.25))',
            borderRadius: '16px',
          }}
        />
      </motion.div>

      {/* Continue Button */}
      <motion.div
        style={{ padding: '1.25rem', textAlign: 'center', zIndex: 10 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="birthday-btn primary"
          onClick={onComplete}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue 💝
        </motion.button>
      </motion.div>
    </motion.section>
  )
}
