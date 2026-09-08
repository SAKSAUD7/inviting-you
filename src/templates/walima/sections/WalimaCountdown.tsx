'use client'
import { WeddingEvent } from '@/types/wedding'
import { useCountdown } from '@/engine/useCountdown'

interface Props { targetEvent: WeddingEvent }

const pad = (n: number) => String(n).padStart(2, '0')

export default function WalimaCountdown({ targetEvent }: Props) {
  const { days, hours, minutes, seconds, isPast, isLoading } = useCountdown(targetEvent.date)

  if (!targetEvent.date || isLoading) return null

  return (
    <section className="walima-countdown-section walima-section-pad">
      <div className="walima-shell">
        <header className="walima-section-heading walima-reveal">
          <span className="walima-eyebrow">Until the blessed occasion</span>
          <h2>Counting every heartbeat</h2>
          <div className="walima-ornament" aria-hidden="true"><i /></div>
        </header>

        {isPast ? (
          <p
            className="walima-reveal"
            style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: 'var(--rose-dark)',
              textAlign: 'center',
            }}
          >
            Today is the day. 🌸
          </p>
        ) : (
          <div className="walima-countdown walima-reveal" aria-label="Walima countdown">
            <div>
              <strong id="countdownDays">{pad(days)}</strong>
              <span>days</span>
            </div>
            <div className="walima-countdown-dot" aria-hidden="true" />
            <div>
              <strong id="countdownHours">{pad(hours)}</strong>
              <span>hours</span>
            </div>
            <div className="walima-countdown-dot" aria-hidden="true" />
            <div>
              <strong id="countdownMinutes">{pad(minutes)}</strong>
              <span>minutes</span>
            </div>
            <div className="walima-countdown-dot" aria-hidden="true" />
            <div>
              <strong id="countdownSeconds">{pad(seconds)}</strong>
              <span>seconds</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
