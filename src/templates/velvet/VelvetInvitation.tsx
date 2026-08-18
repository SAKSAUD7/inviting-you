'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import './velvet.css'
import { WeddingData } from '@/types/wedding'

// ─── Sub-components ───────────────────────────────────────────
import VelvetOpening from './sections/VelvetOpening'
import VelvetBlessed from './sections/VelvetBlessed'
import VelvetCouple from './sections/VelvetCouple'
import VelvetScratchReveal from './sections/VelvetScratchReveal'
import VelvetIslamicSection from './sections/VelvetIslamicSection'
import VelvetFamily from './sections/VelvetFamily'
import VelvetEvents from './sections/VelvetEvents'
import VelvetDateDisplay from './sections/VelvetDateDisplay'
import VelvetCountdown from './sections/VelvetCountdown'
import VelvetVenue from './sections/VelvetVenue'
import VelvetGallery from './sections/VelvetGallery'
import VelvetRSVP from './sections/VelvetRSVP'
import VelvetCompliments from './sections/VelvetCompliments'
import VelvetClosing from './sections/VelvetClosing'
import VelvetMusicPlayer from './sections/VelvetMusicPlayer'

interface VelvetInvitationProps {
  wedding: WeddingData
}

export default function VelvetInvitation({ wedding }: VelvetInvitationProps) {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const handleOpen = useCallback(() => {
    if (opening || opened) return
    setOpening(true)
    setTimeout(() => setOpened(true), 1200)
  }, [opening, opened])

  // Scroll reveal
  useEffect(() => {
    if (!opened) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    const elements = mainRef.current?.querySelectorAll('.reveal-hidden')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [opened])

  const couple = wedding.couple
  const family = wedding.family
  const events = wedding.events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  const nikahEvent = events.find((e) => e.name.toLowerCase().includes('nikah') || e.type === 'NIKAH')
  const venues = events.filter((e) => e.venueName)

  return (
    <div className="invitation-shell">
      {/* Opening screen */}
      <VelvetOpening
        couple={couple}
        onOpen={handleOpen}
        isOpening={opening}
        isOpened={opened}
      />

      {/* Floating music player */}
      {wedding.music && <VelvetMusicPlayer music={wedding.music} opened={opened} />}

      {/* Main content — revealed after opening */}
      {opened && (
        <main ref={mainRef} className="velvet-main">
          <VelvetBlessed couple={couple} family={family} />
          <VelvetCouple couple={couple} />
          <VelvetScratchReveal couple={couple} />
          <VelvetIslamicSection />
          <VelvetFamily couple={couple} family={family} />
          <VelvetEvents events={events} />
          {couple && (
            <VelvetDateDisplay
              gregorianDisplay={couple.gregorianDisplay}
              hijriDate={couple.hijriDate}
            />
          )}
          {nikahEvent && <VelvetCountdown targetEvent={nikahEvent} />}
          {venues.length > 0 && <VelvetVenue events={venues} />}
          {wedding.gallery.length > 0 && <VelvetGallery images={wedding.gallery} />}
          <VelvetRSVP weddingId={wedding.id} rsvpConfig={wedding.rsvpConfig} />
          {wedding.compliments.length > 0 && <VelvetCompliments compliments={wedding.compliments} />}
          <VelvetClosing couple={couple} />
        </main>
      )}
    </div>
  )
}
