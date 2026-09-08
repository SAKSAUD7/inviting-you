import React from 'react'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function WalimaEvents({ events }: Props) {
  if (events.length === 0) return null

  const getGoogleCalendarUrl = (ev: WeddingEvent) => {
    if (!ev.date) return ''
    const dateStr = new Date(ev.date).toISOString().replace(/-|:|\.\d\d\d/g, "")
    // Adding 2 hours for a default duration if time is provided
    const endDate = new Date(new Date(ev.date).getTime() + 2 * 60 * 60 * 1000)
    const endStr = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "")
    
    const url = new URL('https://calendar.google.com/calendar/render')
    url.searchParams.append('action', 'TEMPLATE')
    url.searchParams.append('text', ev.name)
    url.searchParams.append('dates', `${dateStr}/${endStr}`)
    if (ev.venueName) url.searchParams.append('location', ev.venueName)
    if (ev.mapsUrl) url.searchParams.append('details', `Location link: ${ev.mapsUrl}`)
    return url.toString()
  }

  return (
    <section className="walima-events-section walima-section-pad">
      <div className="walima-shell" style={{ position: 'relative', zIndex: 2 }}>
        <header className="walima-section-heading walima-reveal">
          <span className="walima-eyebrow">The Celebration</span>
          <h2>Days filled with joy</h2>
          <div className="walima-ornament" aria-hidden="true"><i /></div>
        </header>

        <div id="preWeddingEvents" className="walima-event-grid">
          {events.map((ev, index) => (
            <article key={ev.id} className={`walima-event-card walima-reveal delay-${index + 1}`}>
              {/* Small petal motif */}
              <div style={{ marginBottom: '16px', opacity: 0.4 }} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M12 2C10 5 6 6 6 10C6 14 9 16 12 16C15 16 18 14 18 10C18 6 14 5 12 2Z"
                    stroke="#d4888a" strokeWidth="0.8" fill="#f2c4c4" opacity="0.6"/>
                  <path d="M12 16L12 22" stroke="#d4888a" strokeWidth="0.8"/>
                </svg>
              </div>

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
                  {ev.date && ev.timeDisplay && <span> · </span>}
                  {ev.timeDisplay && <span>{ev.timeDisplay}</span>}
                </p>
              )}

              {ev.venueName && (
                <small style={{ display: 'block', marginBottom: '12px' }}>{ev.venueName}</small>
              )}

              <div className="walima-event-actions" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '16px' }}>
                {ev.date && (
                  <a
                    href={getGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="walima-event-btn"
                  >
                    Add to Calendar
                  </a>
                )}
                {ev.mapsUrl && (
                  <a
                    href={ev.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="walima-event-btn outline"
                  >
                    View Map
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
