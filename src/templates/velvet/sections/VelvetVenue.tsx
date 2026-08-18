'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetVenue({ events }: Props) {
  const venues = events.filter((e) => e.venueName)
  if (!venues.length) return null

  return (
    <section className="velvet-venue">
      <p className="velvet-venue__heading reveal-hidden">Venue</p>

      <div className="velvet-venue__grid">
        {venues.map((event, i) => (
          <div key={event.id} className="velvet-venue__card reveal-hidden">
            <p className="velvet-venue__number">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="velvet-venue__name">{event.venueName}</h3>
            {event.venueAddress && (
              <p className="velvet-venue__address">{event.venueAddress}</p>
            )}

            <div className="velvet-venue__btns">
              {event.mapsUrl ? (
                <>
                  <a href={event.mapsUrl} target="_blank" rel="noopener noreferrer" className="velvet-venue__btn">
                    View Location
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((event.venueName ?? '') + ' ' + (event.venueAddress ?? ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="velvet-venue__btn"
                  >
                    Get Directions
                  </a>
                </>
              ) : (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent((event.venueName ?? '') + ' ' + (event.venueAddress ?? ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="velvet-venue__btn"
                >
                  Find on Maps
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
