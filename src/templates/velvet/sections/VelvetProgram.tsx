'use client'
import { WeddingEvent } from '@/types/wedding'

interface Props { events: WeddingEvent[] }

export default function VelvetProgram({ events }: Props) {
  if (events.length === 0) return null

  // Detect event types
  const hasNikah = events.some(
    (e) => e.type === 'NIKAH' || e.name?.toLowerCase().includes('nikah')
  )
  const hasValima = events.some(
    (e) => e.type === 'VALIMA' || e.name?.toLowerCase().includes('valima') || e.name?.toLowerCase().includes('walima')
  )
  
  let dayTitle = 'The Celebration'
  if (hasNikah && hasValima) dayTitle = 'Our Nikah & Valima'
  else if (hasValima) dayTitle = 'Our Reception day'
  else if (hasNikah) dayTitle = 'Our Nikah day'
  
  const eyebrow = 'The celebration'

  return (
    <section className="program-section section-pad">
      <div className="section-shell program-shell">
        {/* In The Name Of Allah */}
        <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>In The Name Of Allah</p>
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
