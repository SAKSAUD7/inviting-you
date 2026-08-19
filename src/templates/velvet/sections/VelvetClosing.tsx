'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

export default function VelvetClosing({ couple, family }: Props) {
  const brideFn = couple?.brideName?.split(' ')[0] ?? 'Iqra'
  const groomFn = couple?.groomName?.split(' ')[0] ?? 'Mufassir'
  const dateStr = couple?.gregorianDisplay ?? '2 October 2026'
  const fromName = family?.invitationFromName
  const fromOrg = family?.invitationFromOrg
  const fromAddress = family?.invitationFromAddress

  return (
    <footer className="closing-section">
      <div className="closing-arch reveal">
        <span className="ornament light" aria-hidden="true"><i /></span>
        <h2>We can&apos;t wait to celebrate with you.</h2>
        <div id="closingNames" className="closing-names">
          {brideFn} <span className="name-ampersand" style={{ fontSize: '1rem', fontStyle: 'italic', fontFamily: 'var(--font-display)', margin: '0 6px', color: 'color-mix(in srgb, var(--champagne) 55%, transparent)' }}>&amp;</span> {groomFn}
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
