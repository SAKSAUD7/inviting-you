'use client'

import { useState, useCallback, useEffect } from 'react'
import { WeddingData } from '@/types/wedding'
import './birthday.css'
import BirthdayIntro from './sections/BirthdayIntro'
import BirthdayBalloons from './sections/BirthdayBalloons'
import BirthdayCandle from './sections/BirthdayCandle'
import BirthdayBouquet from './sections/BirthdayBouquet'
import BirthdayGallery from './sections/BirthdayGallery'
import BirthdayEnvelope from './sections/BirthdayEnvelope'
import BirthdayGift from './sections/BirthdayGift'
import StarryBackground from './components/StarryBackground'
import VelvetMusicPlayer from '../velvet/sections/VelvetMusicPlayer'
import { AnimatePresence } from 'framer-motion'
import BirthdayRoseBouquet from './sections/BirthdayRoseBouquet'

type BirthdayState = 'INTRO' | 'BALLOONS' | 'CANDLE' | 'BOUQUET' | 'GALLERY' | 'ROSE_BOUQUET' | 'ENVELOPE' | 'GIFT'

export default function BirthdayInvitation({ wedding }: { wedding: WeddingData }) {
  const [currentState, setCurrentState] = useState<BirthdayState>('INTRO')
  const [sessionKey, setSessionKey] = useState(0)
  const birthdayData = wedding.birthday

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = 'auto' }
  }, [])

  const advanceState = useCallback((nextState: BirthdayState) => {
    setCurrentState(nextState)
  }, [])

  const handleStart = useCallback(() => {
    advanceState('BALLOONS')
    window.dispatchEvent(new Event('velvet-music-play'))
  }, [advanceState])

  // Full replay: reset state machine AND increment key to remount all child scenes
  const handleReplay = useCallback(() => {
    setCurrentState('INTRO')
    setSessionKey(k => k + 1)
  }, [])

  if (!birthdayData) {
    return (
      <div id="birthday-invitation" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#e05070', textAlign: 'center', padding: '2rem' }}>
          No birthday data found. Please check the invitation URL.
        </h2>
      </div>
    )
  }

  return (
    <main id="birthday-invitation">
      <StarryBackground />
      <VelvetMusicPlayer musicUrl={wedding.music?.url} />

      <AnimatePresence mode="wait">
        {currentState === 'INTRO' && (
          <BirthdayIntro
            key={`intro-${sessionKey}`}
            data={birthdayData}
            onNext={handleStart}
          />
        )}

        {currentState === 'BALLOONS' && (
          <BirthdayBalloons
            key={`balloons-${sessionKey}`}
            data={birthdayData}
            onComplete={() => advanceState('CANDLE')}
          />
        )}

        {currentState === 'CANDLE' && (
          <BirthdayCandle
            key={`candle-${sessionKey}`}
            data={birthdayData}
            onComplete={() => advanceState('BOUQUET')}
          />
        )}

        {currentState === 'BOUQUET' && (
          <BirthdayBouquet
            key={`bouquet-${sessionKey}`}
            data={birthdayData}
            images={wedding.gallery || []}
            onComplete={() => advanceState('GALLERY')}
          />
        )}

        {currentState === 'GALLERY' && (
          <BirthdayGallery
            key={`gallery-${sessionKey}`}
            images={wedding.gallery || []}
            onComplete={() => advanceState('ROSE_BOUQUET')}
          />
        )}

        {currentState === 'ROSE_BOUQUET' && (
          <BirthdayRoseBouquet
            key={`rose-bouquet-${sessionKey}`}
            data={birthdayData}
            onComplete={() => advanceState('ENVELOPE')}
          />
        )}

        {currentState === 'ENVELOPE' && (
          <BirthdayEnvelope
            key={`envelope-${sessionKey}`}
            data={birthdayData}
            onComplete={() => advanceState('GIFT')}
          />
        )}

        {currentState === 'GIFT' && (
          <BirthdayGift
            key={`gift-${sessionKey}`}
            data={birthdayData}
            onComplete={handleReplay}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
