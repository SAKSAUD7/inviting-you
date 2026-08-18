'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import './noor.css'
import { WeddingData, WeddingEvent } from '@/types/wedding'

interface NoorInvitationProps {
  wedding: WeddingData
}

export default function NoorInvitation({ wedding }: NoorInvitationProps) {
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

  const { couple, family, events, gallery, compliments, rsvpConfig } = wedding
  const activeEvents = events.filter((e) => e.enabled).sort((a, b) => a.order - b.order)
  const nikahEvent = activeEvents.find((e) => e.name.toLowerCase().includes('nikah') || e.type === 'NIKAH')
  
  return (
    <div className="noor-shell">
      {/* Opening sequence */}
      <div className={`noor-opening ${opening || opened ? 'is-opening' : ''}`}>
        <div className="noor-opening-content">
          <p style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.2em', fontSize: '0.8rem', color: 'var(--noor-muted)', marginBottom: '2rem', textTransform: 'uppercase' }}>
            You are invited
          </p>
          <h1 style={{ marginBottom: '1rem', color: 'var(--noor-gold)' }}>
            {couple?.brideName} &amp; {couple?.groomName}
          </h1>
          <p style={{ color: 'var(--noor-muted)', marginBottom: '3rem' }}>
            {couple?.gregorianDisplay}
          </p>
          <button className="noor-btn" onClick={handleOpen}>
            Open Invitation
          </button>
        </div>
      </div>

      {opened && (
        <main ref={mainRef} className="noor-main">
          
          {/* Islamic Bismillah & Verse */}
          <section className="noor-section noor-section-ivory">
            <div className="reveal-hidden" style={{ textAlign: 'center', maxWidth: '600px' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--noor-gold)', marginBottom: '2rem', fontFamily: 'var(--font-serif)', whiteSpace: 'pre-line' }}>
                {couple?.islamicVerse || "In The Name Of Allah\nThe Most Beneficent & The Most Merciful"}
              </p>
              <div style={{ height: '40px', width: '1px', background: 'var(--noor-gold-soft)', margin: '0 auto 2rem' }} />
              <p style={{ color: 'var(--noor-muted)' }}>
                {couple?.invitationMessage}
              </p>
            </div>
          </section>

          {/* Couple Presentation */}
          <section className="noor-section">
            <div className="noor-arch-container reveal-hidden">
              <h2 style={{ fontSize: '2rem', color: 'var(--noor-green)', marginBottom: '0.5rem' }}>
                {couple?.brideName}
              </h2>
              {couple?.brideQualification && (
                <p style={{ fontSize: '0.85rem', color: 'var(--noor-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {couple.brideQualification}
                </p>
              )}
              {family?.brideParents && (
                <p style={{ fontSize: '0.9rem', color: 'var(--noor-text)', marginBottom: '3rem' }}>
                  D/O {family.brideParents}
                </p>
              )}
              
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--noor-gold)', margin: '2rem 0' }}>&amp;</div>

              <h2 style={{ fontSize: '2rem', color: 'var(--noor-green)', marginBottom: '0.5rem' }}>
                {couple?.groomName}
              </h2>
              {couple?.groomQualification && (
                <p style={{ fontSize: '0.85rem', color: 'var(--noor-muted)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {couple.groomQualification}
                </p>
              )}
              {family?.groomFather && (
                <p style={{ fontSize: '0.9rem', color: 'var(--noor-text)' }}>
                  S/O {family.groomFather}
                </p>
              )}
            </div>
          </section>

          {/* Events */}
          {activeEvents.length > 0 && (
            <section className="noor-section noor-section-alt">
              <h2 className="reveal-hidden">Wedding Events</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
                {activeEvents.map((event) => (
                  <div key={event.id} className="noor-event-card reveal-hidden">
                    <h3 className="noor-event-title">{event.name}</h3>
                    <div className="noor-event-time">
                      {new Date(event.date || '').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} <br/>
                      {event.timeDisplay}
                    </div>
                    {event.description && <p style={{ marginBottom: '1.5rem', fontStyle: 'italic', color: 'var(--noor-muted)' }}>{event.description}</p>}
                    <div className="noor-event-venue">
                      <strong>{event.venueName}</strong>
                      <p style={{ fontSize: '0.9rem', color: 'var(--noor-muted)', marginTop: '0.5rem' }}>{event.venueAddress}</p>
                    </div>
                    {event.mapsUrl && (
                      <a href={event.mapsUrl} target="_blank" rel="noreferrer" className="noor-btn" style={{ display: 'inline-block', marginTop: '1.5rem', textDecoration: 'none' }}>
                        View Map
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Compliments / Family */}
          {compliments && compliments.length > 0 && (
            <section className="noor-section">
              <h2 className="reveal-hidden" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>With Best Compliments From</h2>
              <div className="reveal-hidden" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '800px' }}>
                {compliments.map((comp) => (
                  <span key={comp.id} style={{ padding: '0.5rem 1rem', border: '1px solid var(--noor-gold-soft)', color: 'var(--noor-text)', borderRadius: '20px', fontSize: '0.9rem' }}>
                    {comp.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* RSVP and Closing */}
          <section className="noor-section noor-section-ivory" style={{ paddingBottom: '8rem' }}>
            <h2 className="reveal-hidden">Join Our Celebration</h2>
            {rsvpConfig?.enabled && (
              <p className="reveal-hidden" style={{ color: 'var(--noor-muted)', marginBottom: '2rem', maxWidth: '500px' }}>
                {rsvpConfig.message || "We would be honored by your presence."}
              </p>
            )}
            
            <div className="reveal-hidden" style={{ textAlign: 'center', marginTop: '4rem', borderTop: '1px solid var(--noor-gold-soft)', paddingTop: '4rem', width: '100%', maxWidth: '600px' }}>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--noor-muted)', marginBottom: '1rem' }}>
                Invitation From
              </p>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--noor-gold)', marginBottom: '0.5rem' }}>
                {family?.invitationFromName}
              </h3>
              {family?.invitationFromOrg && <p style={{ fontSize: '0.95rem' }}>{family.invitationFromOrg}</p>}
              {family?.invitationFromAddress && <p style={{ fontSize: '0.9rem', color: 'var(--noor-muted)' }}>{family.invitationFromAddress}</p>}
              {family?.invitationFromPhone && <p style={{ fontSize: '0.9rem', color: 'var(--noor-muted)', marginTop: '0.5rem' }}>Ph: {family.invitationFromPhone}</p>}
            </div>
          </section>

        </main>
      )}
    </div>
  )
}
