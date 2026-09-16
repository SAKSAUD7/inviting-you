'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

export default function VelvetClosing({ couple, family }: Props) {
  const getFirstName = (fullName: string) => {
    const parts = fullName.replace(/^(Mohammed|Md\.?|Syed|Syeda|Mir|Shaik)\s+/i, '').split(' ')
    return parts[0]
  }

  const brideFn = getFirstName(couple?.brideName ?? 'Iqra')
  const groomFn = getFirstName(couple?.groomName ?? 'Mufassir')
  const dateStr = couple?.gregorianDisplay ?? '2 October 2026'
  const fromName = family?.invitationFromName
  const fromOrg = family?.invitationFromOrg
  const fromAddress = family?.invitationFromAddress

  return (
    <footer className="closing-section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="velvet-garland tl" />
      <div className="velvet-garland br" />
      <div className="closing-arch reveal" style={{ position: 'relative', zIndex: 2 }}>
        <span className="ornament light" aria-hidden="true"><i /></span>

        {/* ── Dua Block in Closing ── */}
        <div style={{ padding: '0 1rem 3rem', maxWidth: '640px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            lineHeight: 1.6,
            color: '#c9a96e', // Golden color
            letterSpacing: '0.02em',
            margin: '0 0 1rem',
          }}>
            &ldquo;May Allah guide this marriage to the best of understanding,
            happiness, prosperity &amp; success in the footsteps of the
            Holy Prophet Mohammed (PBUH)&rdquo;
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#c9a96e', // Golden color
            margin: 0,
          }}>
            Ameen
          </p>
        </div>

        <h2>We can&apos;t wait to celebrate with you.</h2>
        <div id="closingNames" className="closing-names" style={{ color: '#c9a96e' }}>
          {brideFn} <span className="name-ampersand" style={{ fontSize: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-display)', margin: '0 6px', color: '#c9a96e' }}>&amp;</span> {groomFn}
        </div>
        <small id="closingDetails">
          {dateStr}
          {fromName ? ` · ${fromName}` : ''}
          {fromOrg ? ` · ${fromOrg}` : ''}
        </small>
      </div>
    </footer>
  )
}
