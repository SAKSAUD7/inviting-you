'use client'
import { Compliment } from '@/types/wedding'

interface Props { compliments?: Compliment[] }

export default function VelvetCompliments({ compliments }: Props) {
  if (!compliments || compliments.length === 0) return null

  return (
    <section className="section-pad" style={{ background: 'var(--plum)', color: 'var(--ivory)' }}>
      <div className="section-shell" style={{ width: 'min(560px, calc(100% - 40px))', margin: '0 auto', textAlign: 'center' }}>
        <header className="section-heading reveal" style={{ marginBottom: '32px' }}>
          <span className="eyebrow" style={{ color: 'rgba(201,169,110,0.75)' }}>With Best Compliments From</span>
        </header>

        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {compliments.map((comp) => (
            <p key={comp.id} style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
              {comp.name}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
