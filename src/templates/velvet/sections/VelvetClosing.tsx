'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

export default function VelvetClosing({ couple, family }: Props) {
  // Use monogram to find the correct display name (e.g. "Aman" for monogram "A")
  const getDisplayName = (fullName: string, monogramInitial?: string): string => {
    if (monogramInitial) {
      const parts = fullName.split(/\s+/)
      const match = parts.find(
        (p) => p[0]?.toUpperCase() === monogramInitial.toUpperCase() && p.toLowerCase() !== 'mohammed'
      )
      if (match) return match
    }
    // Fallback: strip common prefixes
    return fullName.replace(/^(Mohammed|Md\.?|Syed|Syeda|Mir|Shaik)\s+/i, '').split(' ')[0]
  }

  // Parse monogram e.g. "A & T" → ['A', 'T']
  const monogramLetters = couple?.monogram
    ? couple.monogram.split(/\s*[&\/]\s*/).map((s) => s.trim()).filter((s) => s.length === 1)
    : []

  const groomInitial = monogramLetters?.[0] // 'A' — Aman (groom)
  const brideInitial = monogramLetters?.[1] // 'T' — Tazeen (bride)

  const groomFn = getDisplayName(couple?.groomName ?? 'Yousuf', groomInitial)
  const brideFn = getDisplayName(couple?.brideName ?? 'Iqra', brideInitial)

  const dateStr = couple?.gregorianDisplay ?? '2 October 2026'
  const fromName = family?.invitationFromName ?? ''

  // Split fromName at ' · ' to get individual family lines
  const fromLines = fromName ? fromName.split(/\s*·\s*/).filter(Boolean) : []

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
            color: '#c9a96e',
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
            color: '#c9a96e',
            margin: 0,
          }}>
            Ameen
          </p>
        </div>

        <h2>We can&apos;t wait to celebrate with you.</h2>

        {/* Groom first, bride second */}
        <div id="closingNames" className="closing-names" style={{ color: '#c9a96e' }}>
          {groomFn} <span className="name-ampersand" style={{ fontSize: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-display)', margin: '0 6px', color: '#c9a96e' }}>&amp;</span> {brideFn}
        </div>

        {/* Details — one line each, golden colour */}
        <div id="closingDetails" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          marginTop: '0.75rem',
          padding: '0 1rem',
        }}>
          <small style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {dateStr}
          </small>
          {fromLines.map((line, i) => (
            <small key={i} style={{ color: '#c9a96e', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
              {line}
            </small>
          ))}
        </div>

        {/* ── Call to Action / Branding ── */}
        <div style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(201, 169, 110, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            color: 'var(--admin-muted)',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            Create your own premium digital invitation
          </p>
          <a
            href="https://inviting-you-eta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.5rem',
              border: '1px solid #c9a96e',
              borderRadius: '4px',
              color: '#c9a96e',
              textDecoration: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              background: 'transparent'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(201, 169, 110, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            Visit Inviting You
          </a>
        </div>

      </div>
    </footer>
  )
}
