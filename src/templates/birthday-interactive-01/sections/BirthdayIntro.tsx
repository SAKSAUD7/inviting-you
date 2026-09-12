'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onNext: () => void
}

export default function BirthdayIntro({ data, onNext }: Props) {
  // Yes button: 3 clicks to advance; first 2 clicks cause a playful bounce
  const [yesClicks, setYesClicks] = useState(0)
  const [yesKey, setYesKey] = useState(0)
  // No button: clicking turns it into a "Yes" button
  const [noIsYes, setNoIsYes] = useState(false)

  const handleYesClick = () => {
    const next = yesClicks + 1
    if (next >= 3) {
      onNext()
    } else {
      setYesClicks(next)
      setYesKey(k => k + 1) // remount to retrigger bounce animation
    }
  }

  const handleNoClick = () => {
    if (noIsYes) {
      // Already converted to Yes — do nothing, let it sit there
      return
    }
    setNoIsYes(true)
  }

  const yesLabel = yesClicks === 0 ? 'Yes! 🎉' : yesClicks === 1 ? 'Really? 🥺' : 'Are you sure? 💕'

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {data.headline || 'Happy Birthday,'}
      </motion.h1>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ fontSize: 'clamp(1.8rem, 7vw, 2.5rem)', marginBottom: '1.5rem' }}
      >
        {data.birthdayPersonName}
      </motion.h2>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          scale: { delay: 0.7, type: 'spring', bounce: 0.5 },
          y: { delay: 1, repeat: Infinity, duration: 3, ease: 'easeInOut' },
        }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0.5rem 0',
        }}
      >
        <motion.img
          src={data.heroImage || '/templates/birthday/hero_bears.png'}
          alt="Birthday Surprise"
          className="birthday-illustration"
          whileHover={{ scale: 1.05, rotate: 3 }}
          style={{
            width: 'clamp(180px, 55vw, 260px)',
            height: 'clamp(180px, 55vw, 260px)',
            objectFit: 'contain',
            filter: 'drop-shadow(0 15px 30px rgba(255,117,140,0.25))',
          }}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '1.5rem' }}
      >
        <p style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', fontWeight: 600, textAlign: 'center' }}>
          {data.questionText || "Are you ready for a surprise?"}
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Yes Button — 3 clicks to advance */}
          <AnimatePresence mode="wait">
            <motion.button
              key={yesKey}
              className="birthday-btn primary"
              onClick={handleYesClick}
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', bounce: 0.6 }}
              style={{ minWidth: 100 }}
            >
              {yesLabel}
            </motion.button>
          </AnimatePresence>

          {/* No Button — turns into Yes on click */}
          <motion.button
            className={`birthday-btn${noIsYes ? ' primary' : ''}`}
            onClick={handleNoClick}
            whileHover={{ scale: noIsYes ? 1 : 1.06 }}
            whileTap={{ scale: 0.9 }}
            animate={noIsYes ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
            style={{ minWidth: 80, cursor: noIsYes ? 'default' : 'pointer' }}
          >
            {noIsYes ? 'Yes 💕' : 'No'}
          </motion.button>
        </div>

        {yesClicks > 0 && (
          <motion.p
            key={yesClicks}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: '0.9rem', color: '#e05070', fontFamily: 'var(--font-birthday-heading)', opacity: 0.8 }}
          >
            {yesClicks === 1 ? 'Oh come on, you know you want to! 😄' : 'One more tap and the magic begins! ✨'}
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  )
}
