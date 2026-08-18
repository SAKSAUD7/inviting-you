'use client'

import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

const FloralsTop = () => (
  <svg className="velvet-blessed__garland-top" viewBox="0 0 900 90" fill="none" aria-hidden="true">
    <path d="M0 70 Q225 20 450 40 Q675 60 900 10" stroke="#8B1A1A" strokeWidth="2" fill="none" opacity="0.3"/>
    {[80,160,250,350,450,550,640,730,820].map((x,i) => (
      <g key={i} transform={`translate(${x},${40+(i%3)*10})`}>
        <circle r={i%3===1?14:10} fill={i%2===0?'#8B1A1A':'#6B1010'} opacity="0.85"/>
        <circle r={i%3===1?8:6} fill={i%2===0?'#A02020':'#801515'} opacity="0.75"/>
      </g>
    ))}
    {[40,130,220,310,400,490,590,680,770,860].map((x,i)=>(
      <g key={i} transform={`translate(${x},${50+(i%2)*8})`}>
        <path d={`M0 0 Q${i%2===0?12:-12} -15 0 -28`} stroke="#C9971A" strokeWidth="1.5" fill="none" opacity="0.6"/>
      </g>
    ))}
  </svg>
)

export default function VelvetBlessed({ couple, family }: Props) {
  const brideName = couple?.brideName?.split(' ')[0] ?? 'The Bride'
  const groomName = couple?.groomName?.split(' ')[0] ?? 'The Groom'
  const fromName = family?.invitationFromName ?? family?.brideParents

  return (
    <section className="velvet-blessed reveal-hidden">
      <FloralsTop />

      <div className="velvet-blessed__heading stagger-children">
        <span style={{ display: 'block' }}>A</span>
        <span style={{ display: 'block' }}>Blessed</span>
        <span style={{ display: 'block' }}>Beginning</span>
      </div>

      <p className="velvet-blessed__text reveal-hidden">
        {couple?.invitationMessage ||
          `With hearts full of gratitude, we warmly invite you to join us as we
          celebrate this beautiful beginning with the love, prayers, and blessings
          of our families.`}
      </p>

      {fromName && (
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
          color: 'var(--velvet-muted)',
          letterSpacing: '0.05em',
        }}>
          — {fromName}
        </p>
      )}
    </section>
  )
}
