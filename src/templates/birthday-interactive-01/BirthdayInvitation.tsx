'use client'

import { useState, useCallback, useEffect } from 'react'
import { WeddingData } from '@/types/wedding'
import './birthday.css'
import BirthdayIntro from './sections/BirthdayIntro'
import BirthdayBalloons from './sections/BirthdayBalloons'
import BirthdayCandle from './sections/BirthdayCandle'
import BirthdayBouquet from './sections/BirthdayBouquet'
import BirthdayVideo from './sections/BirthdayVideo'
import dynamic from 'next/dynamic'
import BirthdayEnvelope from './sections/BirthdayEnvelope'
import BirthdayGift from './sections/BirthdayGift'
import StarryBackground from './components/StarryBackground'
import VelvetMusicPlayer from '../velvet/sections/VelvetMusicPlayer'
import { AnimatePresence } from 'framer-motion'

// Lazy-load the heavy game section to keep initial load fast
const BirthdayLoveGame = dynamic(() => import('./sections/BirthdayLoveGame'), {
  ssr: false,
  loading: () => (
    <div id="birthday-invitation" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #0D0628 0%, #2D0F4A 100%)',
      flexDirection: 'column', gap: '1rem',
    }}>
      <div style={{ fontSize: '3rem', animation: 'birthday-spin 1s linear infinite' }}>💖</div>
      <p style={{ fontFamily: 'var(--font-birthday-heading)', color: '#FF9EB5', fontSize: '1.1rem' }}>
        Loading Love Quest...
      </p>
      <style>{`@keyframes birthday-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
})

type BirthdayState = 'INTRO' | 'BALLOONS' | 'CANDLE' | 'BOUQUET' | 'VIDEO' | 'LOVE_GAME' | 'ENVELOPE' | 'GIFT'

// Video fallback to the bundled WhatsApp video
const DEFAULT_VIDEO = '/assets/videos/WhatsApp Video 2026-09-30 at 7.41.59 AM.mp4'

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

  const videoUrl = (birthdayData as any).videoUrl || DEFAULT_VIDEO

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
            onComplete={() => advanceState('VIDEO')}
          />
        )}

        {currentState === 'VIDEO' && (
          <BirthdayVideo
            key={`video-${sessionKey}`}
            videoSrc={videoUrl}
            name={birthdayData.birthdayPersonName || undefined}
            onComplete={() => advanceState('LOVE_GAME')}
          />
        )}

        {currentState === 'LOVE_GAME' && (
          <BirthdayLoveGame
            key={`love-game-${sessionKey}`}
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
