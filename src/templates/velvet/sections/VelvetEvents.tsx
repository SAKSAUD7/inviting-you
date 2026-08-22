import React from 'react'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetEvents({ events }: Props) {
  if (events.length === 0) return null

  return (
    <section className="events-section section-pad" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="velvet-garland tr" aria-hidden="true" />
      <div className="velvet-garland bl" aria-hidden="true" />
      
      <div className="section-shell" style={{ position: 'relative', zIndex: 2 }}>
        <header className="section-heading reveal">
          <span className="eyebrow">The Festivities</span>
          <h2>Days filled with joy</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div id="preWeddingEvents" className="velvet-event-grid reveal">
          {events.map((ev) => (
            <article key={ev.id} className="velvet-event-card">
              <h3>{ev.name}</h3>

              {(ev.date || ev.timeDisplay) && (
                <p>
                  {ev.date && (
                    <span>
                      {new Date(ev.date).toLocaleDateString('en-GB', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })}
                    </span>
                  )}
                  {ev.date && ev.timeDisplay && <span> ⬩ </span>}
                  {ev.timeDisplay && <span>{ev.timeDisplay}</span>}
                </p>
              )}

              {ev.venueName && (
                <small style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--ivory)', opacity: 0.8, letterSpacing: '0.05em' }}>
                  {ev.venueName}
                </small>
              )}

              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-map-link"
                >
                  View Map
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
