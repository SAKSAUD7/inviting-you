'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function WalimaProgram({ events }: Props) {
  if (events.length === 0) return null

  const hasValima = events.some(
    (e) => e.type === 'VALIMA' || e.name?.toLowerCase().includes('valima')
  )
  const dayTitle = hasValima ? 'Our Walima Day' : 'Our Celebration'
  const eyebrow  = 'The Programme'

  return (
    <section className="walima-program-section walima-section-pad">
      <div className="walima-shell walima-reveal">
        <header className="walima-section-heading">
          <span className="walima-eyebrow">{eyebrow}</span>
          <h2>{dayTitle}</h2>
          <div className="walima-ornament" aria-hidden="true"><i /></div>
        </header>

        <div id="programTimeline" className="walima-timeline">
          {events.map((ev, i) => (
            <article key={ev.id}>
              {/* Time (left column on desktop) */}
              <time className="walima-timeline-time">
                {ev.timeDisplay || '—'}
              </time>

              {/* Timeline dot node */}
              <div className="walima-timeline-node" aria-hidden="true" />

              {/* Event details (right column) */}
              <div className="walima-timeline-details">
                <h3>{ev.name}</h3>
                {ev.description && <p>{ev.description}</p>}
                {ev.venueName && <small>{ev.venueName}</small>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
