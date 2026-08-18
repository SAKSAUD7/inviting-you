'use client'
import { useEffect, useState } from 'react'
import { WeddingEvent } from '@/types/wedding'

interface Props { targetEvent: WeddingEvent }

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime()
  const diff = target.getTime() - now
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

export default function VelvetCountdown({ targetEvent }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [isPast, setIsPast] = useState(false)

  const target = targetEvent.date ? new Date(targetEvent.date) : null

  useEffect(() => {
    if (!target) return
    const tick = () => {
      const tl = getTimeLeft(target)
      setTimeLeft(tl)
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsPast(true)
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetEvent.date])

  if (!target || !timeLeft) return null

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <section className="velvet-countdown">
      <p className="velvet-countdown__label reveal-hidden">Counting down to the Nikah</p>

      {isPast ? (
        <h2 className="velvet-countdown__today reveal-hidden">
          Today is the day. 🤍
        </h2>
      ) : (
        <div className="velvet-countdown__grid reveal-hidden">
          {[
            { value: timeLeft.days,    label: 'Days' },
            null,
            { value: timeLeft.hours,   label: 'Hours' },
            null,
            { value: timeLeft.minutes, label: 'Minutes' },
            null,
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((unit, i) =>
            unit === null ? (
              <span key={i} className="velvet-countdown__sep">:</span>
            ) : (
              <div key={i} className="velvet-countdown__unit">
                <span className="velvet-countdown__number">{pad(unit.value)}</span>
                <span className="velvet-countdown__label-unit">{unit.label}</span>
              </div>
            )
          )}
        </div>
      )}
    </section>
  )
}
