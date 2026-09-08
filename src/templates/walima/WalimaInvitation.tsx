'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import './walima.css'
import { WeddingData } from '@/types/wedding'
import WalimaOpening from './sections/WalimaOpening'
import WalimaWelcome from './sections/WalimaWelcome'
import WalimaFamily from './sections/WalimaFamily'
import WalimaGallery from './sections/WalimaGallery'
import WalimaCountdown from './sections/WalimaCountdown'
import WalimaProgram from './sections/WalimaProgram'
import WalimaVenue from './sections/WalimaVenue'
import WalimaEvents from './sections/WalimaEvents'
import WalimaRSVP from './sections/WalimaRSVP'
import WalimaBlessings from './sections/WalimaBlessings'
import WalimaCompliments from './sections/WalimaCompliments'
import WalimaClosing from './sections/WalimaClosing'
import WalimaMusicPlayer from './sections/WalimaMusicPlayer'
import WalimaFloatingPetals from './components/WalimaFloatingPetals'
import { WalimaSectionWrap } from './WalimaOrnaments'

export default function WalimaInvitation({ wedding }: { wedding: WeddingData }) {
  const [opened, setOpened] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  // Lock scroll on opening screen
  useEffect(() => {
    document.body.classList.add('walima-intro-locked')
    return () => document.body.classList.remove('walima-intro-locked')
  }, [])

  const handleOpen = useCallback(() => {
    setOpened(true)
    document.body.classList.remove('walima-intro-locked')
    // Trigger ambient music
    window.dispatchEvent(new Event('walima-music-play'))
  }, [])

  // IntersectionObserver for scroll-reveal animations
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

    const t = setTimeout(() => {
      const els = mainRef.current?.querySelectorAll('.walima-reveal')
      els?.forEach((el) => observer.observe(el))
    }, 100)

    return () => {
      clearTimeout(t)
      observer.disconnect()
    }
  }, [opened])

  const couple     = wedding.couple
  const family     = wedding.family
  const events     = wedding.events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  const valimaEvent = events.find((e) => e.type === 'VALIMA' || e.name.toLowerCase().includes('valima'))
  const nikahEvent  = events.find((e) => e.type === 'NIKAH'  || e.name.toLowerCase().includes('nikah'))
  const countdownTarget = valimaEvent ?? nikahEvent
  const venueEvents = events.filter((e) => e.venueName)
  const isValima    = events.some((e) => e.type === 'VALIMA' || e.name.toLowerCase().includes('valima'))

  return (
    <main id="walima-invitation" ref={mainRef}>
      {/* Floating ambient music button */}
      <WalimaMusicPlayer />

      {/* Opening / hero */}
      <WalimaOpening
        couple={couple}
        family={family}
        onOpen={handleOpen}
        isOpened={opened}
        isValima={isValima}
      />

      {/* The beautiful floating purple petals effect (activates when opened) */}
      {opened && <WalimaFloatingPetals />}

      {/* ── Main invitation content — each section wrapped so divider straddles the boundary ── */}

      <WalimaSectionWrap>
        <WalimaWelcome couple={couple} />
      </WalimaSectionWrap>

      <WalimaSectionWrap>
        <WalimaFamily couple={couple} family={family} />
      </WalimaSectionWrap>

      {wedding.gallery.length > 0 && (
        <WalimaSectionWrap>
          <WalimaGallery images={wedding.gallery} />
        </WalimaSectionWrap>
      )}

      {countdownTarget && (
        <WalimaSectionWrap>
          <WalimaCountdown targetEvent={countdownTarget} />
        </WalimaSectionWrap>
      )}

      {events.length > 0 && (
        <WalimaSectionWrap>
          <WalimaProgram events={events} />
        </WalimaSectionWrap>
      )}

      {venueEvents.length > 0 && (
        <WalimaSectionWrap>
          <WalimaVenue events={venueEvents} />
        </WalimaSectionWrap>
      )}

      <WalimaSectionWrap>
        <WalimaEvents events={events} />
      </WalimaSectionWrap>

      {wedding.rsvpConfig?.enabled && (
        <WalimaSectionWrap>
          <WalimaRSVP weddingId={wedding.id} rsvpConfig={wedding.rsvpConfig} />
        </WalimaSectionWrap>
      )}

      <WalimaSectionWrap>
        <WalimaBlessings />
      </WalimaSectionWrap>

      <WalimaSectionWrap>
        <WalimaCompliments compliments={wedding.compliments} />
      </WalimaSectionWrap>

      {/* Closing — no divider after the last section */}
      <WalimaSectionWrap withDivider={false}>
        <WalimaClosing couple={couple} family={family} />
      </WalimaSectionWrap>
    </main>
  )
}
