'use client'
import { WeddingCouple } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
}

export default function VelvetWelcome({ couple }: Props) {
  // Resolve preferred first names via monogram if set (e.g. 'Z & A' → Zuhaib & Asfiya)
  const monogramLetters = couple?.monogram
    ? couple.monogram.split(/\s*[&\/]\s*/).map(s => s.trim()).filter(s => s.length === 1)
    : null

  const findNameByInitial = (fullName: string, initial: string) =>
    fullName.split(/\s+/).find(p => p[0]?.toUpperCase() === initial.toUpperCase()) ?? fullName.split(' ')[0]

  const leftName = monogramLetters
    ? findNameByInitial((couple?.brideName ?? '') + ' ' + (couple?.groomName ?? ''), monogramLetters[0])
    : (couple?.brideName?.split(' ')[0] ?? 'Iqra')

  const rightName = monogramLetters
    ? findNameByInitial((couple?.groomName ?? '') + ' ' + (couple?.brideName ?? ''), monogramLetters[1])
    : (couple?.groomName?.split(' ')[0] ?? 'Mufassir')

  const welcomeTitle = 'A Blessed Beginning'
  const welcomeBody = couple?.invitationMessage ||
    'With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful beginning with the love, prayers, and blessings of our families.'

  return (
    <section id="welcome" className="welcome-section section-pad">
      <div className="section-shell welcome-shell">
        {/* Arch Emblem — exact reference element */}
        <div className="arch-emblem" aria-hidden="true">
          <span>﷽</span>
          <i />
        </div>

        <div className="welcome-copy reveal">
          <span className="eyebrow">In The Name Of Allah</span>
          <h2>{welcomeTitle}</h2>
          <p>{welcomeBody}</p>
          <div id="welcomeSignature" className="signature">
            {leftName}
            <span>&amp;</span>
            {rightName}
          </div>
        </div>
      </div>
    </section>
  )
}
