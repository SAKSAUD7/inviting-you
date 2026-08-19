'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetEvents({ events }: Props) {
  if (events.length === 0) return null

  return (
    <section className="events-section section-pad">
      <div className="section-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">The Festivities</span>
          <h2>Days filled with joy</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div id="preWeddingEvents" className="event-list reveal">
          {events.map((ev) => (
            <article key={ev.id}>
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
                  {ev.date && ev.timeDisplay && <span>⬩</span>}
                  {ev.timeDisplay && <span>{ev.timeDisplay}</span>}
                </p>
              )}

              {ev.venueName && (
                <small>{ev.venueName}</small>
              )}

              {ev.mapsUrl && (
                <a
                  href={ev.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-map-link"
                >
                  View on Google Maps
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
