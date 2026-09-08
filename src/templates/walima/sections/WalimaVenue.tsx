'use client'
import React from 'react'
import { WeddingEvent } from '@/types/wedding'

interface Props {
  events: WeddingEvent[]
}

export default function WalimaVenue({ events }: Props) {
  // Always show the venue section, using events that have venue info or all events
  const venueEvents = events.length > 0 ? events : []
  
  return (
    <section 
      id="venue" 
      style={{ 
        padding: 'clamp(60px, 8vw, 100px) 20px',
        textAlign: 'center',
        background: 'transparent',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <p style={{ 
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: '0.65rem', 
          letterSpacing: '0.25em', 
          textTransform: 'uppercase',
          color: 'var(--mauve, #8b649c)',
          marginBottom: '12px'
        }}>
          Location &amp; Directions
        </p>
        <h2 style={{ 
          fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 400,
          color: 'var(--text-primary, #3a2d44)',
          margin: 0
        }}>
          Venue Details
        </h2>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Always show Crown Pavilions regardless of whether event data has it */}
        <div style={{ marginBottom: '50px' }}>
          {venueEvents.map((event, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <h3 style={{ 
                fontFamily: '"Playfair Display", "Cormorant Garamond", serif',
                fontSize: '1.8rem', 
                fontWeight: 500,
                background: 'linear-gradient(135deg, #c9a84c 0%, #f2e08a 40%, #c9a84c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '8px'
              }}>
                {event.name}
              </h3>
              {event.venueName && (
                <p style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--mauve, #8b649c)', marginBottom: '6px' }}>
                  {event.venueName}
                </p>
              )}
              {event.venueAddress && (
                <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '16px', lineHeight: 1.7 }}>
                  {event.venueAddress.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}<br /></React.Fragment>
                  ))}
                </p>
              )}
            </div>
          ))}

          {/* Hardcoded fallback if no venue data in events */}
          {venueEvents.every(e => !e.venueName) && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '1.3rem', fontWeight: 600, color: 'var(--mauve, #8b649c)', marginBottom: '6px' }}>
                CROWN PAVILIONS-1
              </p>
              <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '16px', lineHeight: 1.7 }}>
                Palace Ground, Gate No.5<br />
                Near Mekhri Circle, Bellary Road<br />
                Bangalore
              </p>
            </div>
          )}
        </div>

        {/* Google Maps Embed */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid rgba(212, 187, 160, 0.6)',
            boxShadow: '0 20px 60px rgba(107, 64, 122, 0.2), 0 0 0 6px rgba(155, 107, 175, 0.08)',
            marginBottom: '30px'
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.359265147585!2d77.58514431527375!3d13.012759990828551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae179374092b77%3A0xcda770989f668f!2sCROWN%20PAVILIONS!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Crown Pavilions - Venue Map"
          />
        </div>

        {/* Get Directions Button */}
        <a
          href="https://maps.google.com/?q=Crown+Pavilions+Palace+Ground+Bangalore"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: 'linear-gradient(135deg, #9b6baf, #7a4d8f)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '50px',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.9rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            boxShadow: '0 8px 24px rgba(107, 64, 122, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          📍 Get Directions
        </a>
      </div>
    </section>
  )
}
