'use client'
import { Compliment } from '@/types/wedding'

interface Props { compliments?: Compliment[] }

export default function WalimaCompliments({ compliments }: Props) {
  if (!compliments || compliments.length === 0) return null

  return (
    <section className="walima-compliments-section walima-section-pad">
      <div className="walima-shell" style={{ width: 'min(560px, calc(100% - 40px))', margin: '0 auto', textAlign: 'center' }}>
        <header className="walima-section-heading walima-reveal" style={{ marginBottom: '32px' }}>
          <span className="walima-eyebrow">With Best Compliments From</span>
        </header>
        <div className="walima-reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {compliments.map((comp) => (
            <p
              key={comp.id}
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                color: 'color-mix(in srgb, var(--ivory) 80%, transparent)',
              }}
            >
              {comp.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
