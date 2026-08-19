'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetProgram({ events }: Props) {
  if (events.length === 0) return null

  return (
    <section className="program-section section-pad">
      <div className="section-shell program-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">The celebration</span>
          <h2>Our Nikah day</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        <div id="programTimeline" className="timeline reveal">
          {events.map((ev, i) => (
            <article key={ev.id}>
              <span className="timeline-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              <time>
                {ev.timeDisplay || '—'}
              </time>
              <div>
                <h3>{ev.name}</h3>
                {ev.description && <p>{ev.description}</p>}
                {ev.venueName && (
                  <small className="venue-meta">
                    {ev.venueName}
                  </small>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
