'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetProgram({ events }: Props) {
  if (events.length === 0) return null

  // Detect if this invitation is for a Valima
  const hasValima = events.some(
    (e) => e.type === 'VALIMA' || e.name?.toLowerCase().includes('valima')
  )
  const dayTitle = hasValima ? 'Our Valima day' : 'Our Nikah day'
  const eyebrow = hasValima ? 'The celebration' : 'The celebration'

  return (
    <section className="program-section section-pad">
      <div className="section-shell program-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{dayTitle}</h2>
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
