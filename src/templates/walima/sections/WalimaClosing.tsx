'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

export default function WalimaClosing({ couple, family }: Props) {
  const brideFn = (couple?.brideName ?? 'Iqra').replace(/^(Mohammed|Md\.?)\s+/i, '').split(' ')[0]
  const groomFn = (couple?.groomName ?? 'Mufassir').replace(/^(Mohammed|Md\.?)\s+/i, '').split(' ')[0]
  const dateStr = couple?.gregorianDisplay ?? '4 October 2026'
  const fromName = family?.invitationFromName
  const fromOrg = family?.invitationFromOrg

  return (
    <footer className="walima-closing-section">
      <div className="walima-reveal" style={{ position: 'relative', zIndex: 1 }}>
        {/* Ornamental divider top */}
        <div className="walima-closing-ornament" aria-hidden="true"><i /></div>

        <p className="walima-closing-message">
          We can&apos;t wait to celebrate with you.
        </p>

        <div id="closingNames" className="walima-closing-names">
          {brideFn}
          <span>&amp;</span>
          {groomFn}
        </div>

        <small id="closingDetails" className="walima-closing-meta">
          {dateStr}
          {fromName ? ` · ${fromName}` : ''}
          {fromOrg ? ` · ${fromOrg}` : ''}
        </small>

        {/* Islamic blessing */}
        <p className="walima-closing-blessing">
          May Allah Guide this Marriage with His Blessings, Shower the Couple with Happiness,
          Love, Wealth, Understanding, Wisdom &amp; Long Life. <em>Ameen.</em>
        </p>

        {/* Botanical ornament bottom */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', opacity: 0.35 }} aria-hidden="true">
          <svg viewBox="0 0 160 32" fill="none" width="140" style={{ maxWidth: '80%' }}>
            <path d="M10 16 Q40 6 80 16 Q120 26 150 16" stroke="#d4888a" strokeWidth="0.8" fill="none"/>
            <circle cx="80" cy="16" r="3" fill="#d4888a"/>
            <path d="M80 10 C77 6 74 8 80 4 C86 8 83 6 80 10 Z" fill="#d4888a" opacity="0.5"/>
            <circle cx="50" cy="15" r="1.5" fill="#d4888a" opacity="0.5"/>
            <circle cx="110" cy="15" r="1.5" fill="#d4888a" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </footer>
  )
}
