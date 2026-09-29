'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WeddingData } from '@/types/wedding'

import './sultan.css'

import SultanHero from './sections/SultanHero'
import SultanCouple from './sections/SultanCouple'
import SultanCountdown from './sections/SultanCountdown'
import SultanEvents from './sections/SultanEvents'
import SultanGallery from './sections/SultanGallery'
import SultanScratchReveal from './sections/SultanScratchReveal'
import SultanRSVP from './sections/SultanRSVP'
import SultanClosing from './sections/SultanClosing'
import SultanMusicPlayer from './sections/SultanMusicPlayer'
import SultanCompliments from './sections/SultanCompliments'

interface SultanInvitationProps {
  wedding: WeddingData
}

export default function SultanInvitation({ wedding }: SultanInvitationProps) {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return () => { document.body.style.overflow = 'auto' }
  }, [opened])

  return (
    <div className="sultan-shell">
      {/* Music Player (always mounted, unobtrusive) */}
      {wedding.music && (
        <SultanMusicPlayer
          musicUrl={wedding.music.url || ''}
          title={wedding.music.title || ''}
          autoplay={wedding.music.autoplay}
        />
      )}

      {/* Hero — always visible (handles its own door animation) */}
      <SultanHero
        opened={opened}
        onOpen={() => setOpened(true)}
        data={wedding}
      />

      {/* All content sections — revealed after doors open */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="sultan-main"
          >
            {/* 2. Couple */}
            {wedding.couple && (
              <SultanCouple
                couple={wedding.couple}
                family={wedding.family}
              />
            )}

            {/* 3. Countdown */}
            {wedding.couple?.gregorianDate && (
              <SultanCountdown date={wedding.couple.gregorianDate} />
            )}

            {/* 4. Events */}
            {wedding.events && wedding.events.length > 0 && (
              <SultanEvents events={wedding.events} />
            )}

            {/* 5. Gallery */}
            {wedding.gallery && wedding.gallery.length > 0 && (
              <SultanGallery photos={wedding.gallery.map(g => g.url)} />
            )}

            {/* 6. Scratch Card */}
            {wedding.couple && (
              <SultanScratchReveal
                dateDisplay={wedding.couple.gregorianDisplay || ''}
                venueName={wedding.events?.[0]?.venueName ?? undefined}
              />
            )}

            {/* Compliments (if any) */}
            {wedding.compliments && wedding.compliments.length > 0 && (
              <SultanCompliments compliments={wedding.compliments} />
            )}

            {/* 7. RSVP */}
            <SultanRSVP
              weddingId={wedding.id}
              phoneNumber={wedding.rsvpConfig?.whatsapp || ''}
            />

            {/* 8. Closing */}
            <SultanClosing
              brideName={wedding.couple?.brideName || 'Bride'}
              groomName={wedding.couple?.groomName || 'Groom'}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
