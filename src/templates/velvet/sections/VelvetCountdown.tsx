'use client'
import { WeddingEvent } from '@/types/wedding'
import { useCountdown } from '@/engine/useCountdown'

interface Props { targetEvent: WeddingEvent }

const pad = (n: number) => String(n).padStart(2, '0')

export default function VelvetCountdown({ targetEvent }: Props) {
  const { days, hours, minutes, seconds, isPast, isLoading } = useCountdown(targetEvent.date)

  if (!targetEvent.date || isLoading) return null

  return (
    <section className="countdown-section section-pad">
      <div className="section-shell countdown-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">Until we say Qubool Hai</span>
          <h2>Counting every heartbeat</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        {isPast ? (
          <p className="reveal" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'color-mix(in srgb, var(--champagne) 90%, transparent)' }}>Today is the day. 🤍</p>
        ) : (
          <div className="countdown reveal" aria-label="Wedding countdown">
            <div><strong id="countdownDays">{pad(days)}</strong><span>days</span></div>
            <div><strong id="countdownHours">{pad(hours)}</strong><span>hours</span></div>
            <div><strong id="countdownMinutes">{pad(minutes)}</strong><span>minutes</span></div>
            <div><strong id="countdownSeconds">{pad(seconds)}</strong><span>seconds</span></div>
          </div>
        )}
      </div>
    </section>
  )
}
