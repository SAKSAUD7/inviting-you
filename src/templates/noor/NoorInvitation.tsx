'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NoorHero from './sections/NoorHero'
import NoorWelcome from './sections/NoorWelcome'
import NoorCouple from './sections/NoorCouple'
import NoorStory from './sections/NoorStory'
import NoorScratchReveal from './sections/NoorScratchReveal'
import NoorEvents from './sections/NoorEvents'
import NoorVenue from './sections/NoorVenue'
import NoorRSVP from './sections/NoorRSVP'
import NoorGallery from './sections/NoorGallery'
import NoorCountdown from './sections/NoorCountdown'
import NoorInteractiveDua from './sections/NoorInteractiveDua'
import NoorBlessings from './sections/NoorBlessings'
import NoorClosing from './sections/NoorClosing'
import NoorMusicPlayer from './sections/NoorMusicPlayer'
import './noor.css'

interface Props {
  wedding: any
}

import { NoorFloralDivider } from './NoorOrnaments'

// Reusable ornamental divider for sections
const NoorDivider = () => (
  <div style={{ width: '100%', height: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', position: 'relative', zIndex: 10, pointerEvents: 'none' }} aria-hidden="true">
    <div style={{ width: '100%', maxWidth: '900px' }}>
      <NoorFloralDivider />
    </div>
  </div>
)

export default function NoorInvitation({ wedding }: Props) {
  const { couple, events, galleryImages, family } = wedding
  const [opened, setOpened] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const primaryEvent = events?.find((e: any) => e.isPrimary) || events?.[0]
  const dateDisplay = primaryEvent?.date 
    ? new Date(primaryEvent.date).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) 
    : wedding.couple?.gregorianDisplay?.replace(/\n/g, ' ') || 'Coming Soon'

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

  return (
    <div ref={mainRef} className="noor-shell">
      {opened && <NoorParticles />}
      
      <NoorHero wedding={wedding} opened={opened} onOpen={() => setOpened(true)} />
      
      {opened && (
        <motion.main 
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="noor-main" 
          style={{ position: 'relative', zIndex: 1, paddingBottom: '0' }}
        >
          <NoorWelcome couple={couple} />
          
          <NoorDivider />
          <NoorCouple couple={couple} />
          
          {(couple?.story || couple?.howTheyMet) && (
            <>
              <NoorDivider />
              <NoorStory couple={couple} />
            </>
          )}

          <NoorDivider />
          <NoorScratchReveal dateDisplay={dateDisplay} venueName={primaryEvent?.venueName || undefined} />
          
          {primaryEvent?.date && (
            <>
              <NoorDivider />
              <NoorCountdown targetDate={new Date(primaryEvent.date)} />
            </>
          )}
          
          {events && events.length > 0 && (
            <>
              {/* No divider before events because it has its own transition */}
              <NoorEvents events={events} />
              <NoorVenue events={events} />
            </>
          )}

          <NoorRSVP />
          
          {galleryImages && galleryImages.length > 0 && (
            <>
              <NoorDivider />
              <NoorGallery gallery={galleryImages} />
            </>
          )}

          <NoorInteractiveDua />
          
          {(family?.parents || family?.grandparents) && (
            <>
              <NoorDivider />
              <NoorBlessings family={family} />
            </>
          )}

          <NoorClosing couple={couple} />
        </motion.main>
      )}

      <NoorMusicPlayer music={wedding.music} opened={opened} />
    </div>
  )
}

function NoorParticles() {
  const [petals, setPetals] = useState<{ id: number; left: string; animDuration: string; animDelay: string; size: number }[]>([])
  const [motes, setMotes] = useState<{ id: number; left: string; animDuration: string; animDelay: string; size: number }[]>([])

  useEffect(() => {
    // Fewer petals, more organic variation
    setPetals(Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}vw`,
      animDuration: `${15 + Math.random() * 15}s`,
      animDelay: `${Math.random() * 10}s`,
      size: 10 + Math.random() * 8, // 10-18px
    })))
    
    // Ambient gold dust motes
    setMotes(Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}vw`,
      animDuration: `${10 + Math.random() * 10}s`,
      animDelay: `${Math.random() * 8}s`,
      size: 3 + Math.random() * 4, // 3-7px
    })))
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map((p) => (
        <div 
          key={`petal-${p.id}`}
          className="noor-falling-petal"
          style={{
            left: p.left, width: `${p.size}px`, height: `${p.size * 1.2}px`,
            animationDuration: p.animDuration, animationDelay: p.animDelay
          }}
        />
      ))}
      {motes.map((m) => (
        <div 
          key={`mote-${m.id}`}
          className="noor-gold-dust"
          style={{
            left: m.left, top: '100%', width: `${m.size}px`, height: `${m.size}px`,
            animationDuration: m.animDuration, animationDelay: m.animDelay
          }}
        />
      ))}
    </div>
  )
}
