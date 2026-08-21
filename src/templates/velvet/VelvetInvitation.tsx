'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import './velvet.css'
import { WeddingData } from '@/types/wedding'
import VelvetOpening from './sections/VelvetOpening'
import VelvetWelcome from './sections/VelvetWelcome'

import VelvetScratchReveal from './sections/VelvetScratchReveal'
import VelvetGallery from './sections/VelvetGallery'
import VelvetCountdown from './sections/VelvetCountdown'

import VelvetVenue from './sections/VelvetVenue'
import VelvetEvents from './sections/VelvetEvents'
import VelvetProgram from './sections/VelvetProgram'
import VelvetBlessings from './sections/VelvetBlessings'
import VelvetCompliments from './sections/VelvetCompliments'
import VelvetClosing from './sections/VelvetClosing'
import VelvetMusicPlayer from './sections/VelvetMusicPlayer'

export const FloralDivider = () => (
  <div className="floral-divider" aria-hidden="true">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/images/floral-divider.webp" alt="" />
  </div>
)

export default function VelvetInvitation({ wedding }: { wedding: WeddingData }) {
  const [opened, setOpened] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  // Lock scroll on open screen
  useEffect(() => {
    document.body.classList.add('intro-locked')
    return () => document.body.classList.remove('intro-locked')
  }, [])

  const handleOpen = useCallback(() => {
    setOpened(true)
    document.body.classList.remove('intro-locked')
    
    // Dispatch event to VelvetMusicPlayer to start the MP3 audio
    window.dispatchEvent(new Event('velvet-music-play'))
  }, [])

  // Set up IntersectionObserver for scroll reveals
  useEffect(() => {
    if (!opened) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // Small delay to let React render the content sections
    const t = setTimeout(() => {
      const els = mainRef.current?.querySelectorAll('.reveal')
      els?.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  }, [opened])

  const couple = wedding.couple
  const family = wedding.family
  const events = wedding.events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  const nikahEvent = events.find((e) => e.type === 'NIKAH' || e.name.toLowerCase().includes('nikah'))
  const venueEvents = events.filter((e) => e.venueName)
  const isValima = events.some((e) => e.type === 'VALIMA' || e.name.toLowerCase().includes('valima'))

  return (
    <main id="invitation" ref={mainRef}>
      {/* Ambient music player — always shown, top-right corner */}
      <VelvetMusicPlayer />

      {/* Opening / hero — always rendered, is-open class toggles visibility of content */}
      <VelvetOpening couple={couple} family={family} onOpen={handleOpen} isOpened={opened} isValima={isValima} />

      {/* Main invitation content — always rendered so scrolling works */}
      <FloralDivider />
      <VelvetWelcome couple={couple} />
      <FloralDivider />
      <VelvetScratchReveal couple={couple} />
      <FloralDivider />
      {wedding.gallery.length > 0 && (
        <>
          <VelvetGallery images={wedding.gallery} />
          <FloralDivider />
        </>
      )}
      {nikahEvent && (
        <>
          <VelvetCountdown targetEvent={nikahEvent} />
          <FloralDivider />
        </>
      )}
      {events.length > 0 && (
        <>
          <VelvetProgram events={events} />
          <FloralDivider />
        </>
      )}
      {venueEvents.length > 0 && (
        <>
          <VelvetVenue events={venueEvents} />
          <FloralDivider />
        </>
      )}
      <VelvetEvents events={events} />
      <FloralDivider />
      <VelvetBlessings />
      <FloralDivider />
      <VelvetCompliments compliments={wedding.compliments} />
      <VelvetClosing couple={couple} family={family} />
    </main>
  )
}
