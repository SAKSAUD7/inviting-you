'use client'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

export default function VelvetIslamicSection({ couple }: Props) {
  const line1 = couple?.islamicVerse?.split('\n')[0] || 'In The Name Of Allah'
  const line2 = couple?.islamicVerse?.split('\n')[1] || 'The Most Beneficent & The Most Merciful'

  return (
    <section className="velvet-islamic reveal-hidden">
      {/* Bismillah calligraphy Unicode */}
      <div
        className="velvet-islamic__calligraphy"
        style={{ fontFamily: 'serif', direction: 'rtl' }}
        aria-label="Bismillah ir-Rahman ir-Rahim"
      >
        ﷽
      </div>

      <div className="velvet-islamic__ornament" />

      <h2 className="velvet-islamic__title">{line1}</h2>
      <p className="velvet-islamic__subtitle">{line2}</p>

      <div className="velvet-islamic__ornament" style={{ marginTop: '2rem' }} />

      {/* Islamic star motif */}
      <svg
        width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true"
        style={{ margin: '1.5rem auto 0', opacity: 0.4 }}
      >
        <polygon
          points="40,4 48,28 74,28 53,44 61,68 40,52 19,68 27,44 6,28 32,28"
          stroke="#C9971A" strokeWidth="1.5" fill="none"
        />
        <circle cx="40" cy="40" r="15" stroke="#C9971A" strokeWidth="1" fill="none"/>
        <circle cx="40" cy="40" r="6" stroke="#C9971A" strokeWidth="0.8" fill="none"/>
        <circle cx="40" cy="40" r="3" fill="#C9971A" opacity="0.7"/>
      </svg>
    </section>
  )
}
