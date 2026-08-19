'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetVenue({ events }: Props) {
  if (events.length === 0) return null

  // Single venue - use the exact reference style
  if (events.length === 1) {
    const ev = events[0]
    return (
      <section className="venue-section section-pad">
        <div className="section-shell">
          <div className="venue-card reveal">
            <span className="eyebrow">The venue</span>
            <div className="venue-divider" aria-hidden="true">
              <span>✦</span>
            </div>
            <h2>{ev.venueName}</h2>
            <p>{ev.venueAddress}</p>
            {ev.mapsUrl && (
              <a
                id="mapLink"
                className="venue-map-button"
                target="_blank"
                rel="noreferrer"
                href={ev.mapsUrl}
              >
                View on Google Maps
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Multi-venue using inline styles but matching class principles
  return (
    <section className="venue-section section-pad">
      <div className="section-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">The venues</span>
          <h2 style={{ color: 'var(--plum)', fontFamily: 'var(--font-script)' }}>Where it happens</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', maxWidth: '760px', margin: '0 auto' }} className="reveal">
          {events.map((ev, i) => (
            <div key={ev.id} className="venue-card" style={{ padding: '40px 32px' }}>
              <p style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.35em', color: 'color-mix(in srgb, var(--champagne) 80%, transparent)', marginBottom: '12px' }}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 style={{ marginBottom: '8px' }}>{ev.venueName}</h2>
              {ev.type && (
                <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--champagne) 85%, transparent)', marginBottom: '16px' }}>
                  {ev.type === 'NIKAH' ? 'Nikah Ceremony' : ev.type === 'RECEPTION' ? 'Dinner Reception' : ev.name}
                </p>
              )}
              {ev.timeDisplay && (
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--plum)', fontWeight: 500, marginBottom: '24px' }}>
                  {ev.timeDisplay}
                </p>
              )}
              {ev.venueAddress && (
                <p style={{ marginBottom: '24px' }}>{ev.venueAddress}</p>
              )}
              {ev.mapsUrl && (
                <a href={ev.mapsUrl} target="_blank" rel="noopener noreferrer" className="venue-map-button">
                  View on Google Maps
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
