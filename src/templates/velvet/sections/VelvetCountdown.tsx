'use client'
import { useEffect, useState } from 'react'
import { WeddingEvent } from '@/types/wedding'

interface Props { targetEvent: WeddingEvent }
interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function VelvetCountdown({ targetEvent }: Props) {
  const target = targetEvent.date ? new Date(targetEvent.date) : null
  const [tl, setTL] = useState<TimeLeft | null>(null)
  const [past, setPast] = useState(false)

  useEffect(() => {
    if (!target) return
    const tick = () => {
      const t = getTimeLeft(target)
      setTL(t)
      if (!t.days && !t.hours && !t.minutes && !t.seconds) setPast(true)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetEvent.date])

  if (!target || !tl) return null

  return (
    <section className="countdown-section section-pad">
      <div className="section-shell countdown-shell">
        <header className="section-heading reveal">
          <span className="eyebrow">Until we say Qubool Hai</span>
          <h2>Counting every heartbeat</h2>
          <span className="ornament" aria-hidden="true"><i /></span>
        </header>

        {past ? (
          <p className="reveal" style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'color-mix(in srgb, var(--champagne) 90%, transparent)' }}>Today is the day. 🤍</p>
        ) : (
          <div className="countdown reveal" aria-label="Wedding countdown">
            <div><strong id="countdownDays">{pad(tl.days)}</strong><span>days</span></div>
            <div><strong id="countdownHours">{pad(tl.hours)}</strong><span>hours</span></div>
            <div><strong id="countdownMinutes">{pad(tl.minutes)}</strong><span>minutes</span></div>
            <div><strong id="countdownSeconds">{pad(tl.seconds)}</strong><span>seconds</span></div>
          </div>
        )}
      </div>
    </section>
  )
}
