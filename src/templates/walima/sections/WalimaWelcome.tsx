'use client'
import { WeddingCouple } from '@/types/wedding'
import WalimaScratchCard from '../components/WalimaScratchCard'

interface Props {
  couple?: WeddingCouple | null
}

export default function WalimaWelcome({ couple }: Props) {
  const monogramLetters = couple?.monogram
    ? couple.monogram.split(/\s*[&\/]\s*/).map(s => s.trim()).filter(s => s.length === 1)
    : null

  const findNameByInitial = (fullName: string, initial: string) => {
    const parts = fullName.split(/\s+/)
    const match = parts.find(p => p[0]?.toUpperCase() === initial.toUpperCase() && p.toLowerCase() !== 'mohammed')
    if (match) return match
    const backup = parts.find(p => p[0]?.toUpperCase() === initial.toUpperCase())
    return backup || initial
  }

  const leftName = monogramLetters
    ? findNameByInitial((couple?.brideName ?? '') + ' ' + (couple?.groomName ?? ''), monogramLetters[0])
    : (couple?.brideName?.split(' ')[0] ?? 'Iqra')

  const rightName = monogramLetters
    ? findNameByInitial((couple?.groomName ?? '') + ' ' + (couple?.brideName ?? ''), monogramLetters[1])
    : (couple?.groomName ?? 'Mufassir').replace(/^(Mohammed|Md\.?)\s+/i, '').split(' ')[0]

  const welcomeBody = couple?.invitationMessage ||
    'With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful occasion with the love, prayers, and blessings of our families.'

  return (
    <section id="walima-welcome" className="walima-welcome-section walima-section-pad">
      <div className="walima-shell" style={{ maxWidth: '400px' }}>
        {/* Islamic arch emblem */}
        <div className="walima-arch-emblem walima-reveal" aria-hidden="true">
          <span>﷽</span>
          <i />
        </div>

        <div className="walima-welcome-copy walima-reveal delay-1">
          <span className="walima-eyebrow">In The Name Of Allah</span>
          <h2>A Blessed Beginning</h2>
          <p>{welcomeBody}</p>
          <div id="welcomeSignature" className="walima-signature">
            {leftName}
            <span>&amp;</span>
            {rightName}
          </div>
        </div>

        {couple?.gregorianDisplay && (
          <div className="walima-reveal delay-3" style={{ marginTop: '48px' }}>
            <WalimaScratchCard 
              revealText={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mauve)' }}>
                    Save The Date
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.4rem', color: 'var(--rose-dark)' }}>
                    {couple.gregorianDisplay}
                  </p>
                  {couple.hijriDate && (
                    <p style={{ fontFamily: 'var(--font-arabic)', fontSize: '1rem', color: 'var(--text-muted)' }}>
                      {couple.hijriDate}
                    </p>
                  )}
                </div>
              } 
            />
          </div>
        )}
      </div>
    </section>
  )
}
