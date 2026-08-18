'use client'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

export default function VelvetClosing({ couple }: Props) {
  const brideFn = couple?.brideName?.split(' ')[0] ?? 'The Bride'
  const groomFn = couple?.groomName?.split(' ')[0] ?? 'The Groom'
  const dateStr = couple?.gregorianDate
    ? new Date(couple.gregorianDate).toLocaleDateString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      }).replace(/\//g, '.')
    : '02.10.2026'

  return (
    <section className="velvet-closing">
      <div className="velvet-closing__ornament" />
      <h2 className="velvet-closing__couple reveal-hidden">
        {brideFn} &amp; {groomFn}
      </h2>
      <p className="velvet-closing__date reveal-hidden">{dateStr}</p>
      <p className="velvet-closing__message reveal-hidden">
        We can&apos;t wait to celebrate with you.<br />
        May Allah bless this union with love and mercy.
      </p>
      <div className="velvet-closing__ornament" />
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.55rem',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'rgba(201,151,26,0.3)',
        marginTop: '3rem',
      }}>
        Naqsh Digital
      </p>
    </section>
  )
}
