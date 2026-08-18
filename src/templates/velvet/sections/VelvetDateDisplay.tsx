'use client'

interface Props {
  gregorianDisplay: string
  hijriDate?: string | null
}

export default function VelvetDateDisplay({ gregorianDisplay, hijriDate }: Props) {
  // Parse the date for the large editorial display
  const parts = gregorianDisplay.split(/[\s,]+/).filter(Boolean)
  // e.g. "Friday, 2nd October 2026" → ["Friday", "2nd", "October", "2026"]
  const day = parts[0] ?? 'FRIDAY'
  const num = parts[1] ?? '2'
  const month = parts[2] ?? 'OCTOBER'
  const year = parts[3] ?? '2026'

  return (
    <section className="velvet-date reveal-hidden">
      <p className="velvet-date__day">{day.toUpperCase()}</p>
      <p className="velvet-date__month">{month.toUpperCase()}</p>
      <h2 className="velvet-date__number">{num.replace(/\D/g, '')}</h2>
      <p className="velvet-date__year">{year}</p>
      {hijriDate && <p className="velvet-date__hijri">{hijriDate}</p>}
    </section>
  )
}
