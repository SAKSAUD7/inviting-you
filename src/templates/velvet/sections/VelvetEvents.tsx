'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetEvents({ events }: Props) {
  if (!events.length) return null

  return (
    <section className="velvet-events">
      <p className="velvet-events__label reveal-hidden">The Celebrations</p>
      <h2 className="velvet-events__heading reveal-hidden">Insha Allah</h2>
      <p className="velvet-events__inshallah reveal-hidden">Mehfil-e-Nikah</p>

      <div className="velvet-events__grid">
        {events.map((event, i) => (
          <article key={event.id} className="velvet-events__card reveal-hidden">
            <p className="velvet-events__number">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="velvet-events__name">{event.name}</h3>

            {event.date && (
              <p className="velvet-events__date">
                {new Date(event.date).toLocaleDateString('en-GB', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                })}
              </p>
            )}

            {event.timeDisplay && (
              <p className="velvet-events__time">{event.timeDisplay}</p>
            )}

            {event.description && (
              <p className="velvet-events__desc">{event.description}</p>
            )}

            {event.venueName && (
              <p className="velvet-events__venue">{event.venueName}</p>
            )}

            {event.venueAddress && (
              <p className="velvet-events__address">{event.venueAddress}</p>
            )}

            {event.mapsUrl && (
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href={event.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="velvet-events__map-btn"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  View Location
                </a>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venueName + ' ' + (event.venueAddress ?? ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="velvet-events__map-btn"
                >
                  Get Directions
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
