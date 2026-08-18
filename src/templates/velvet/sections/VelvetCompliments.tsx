'use client'
import { Compliment } from '@/types/wedding'

interface Props { compliments: Compliment[] }

export default function VelvetCompliments({ compliments }: Props) {
  if (!compliments.length) return null
  const sorted = [...compliments].sort((a, b) => a.order - b.order)

  return (
    <section className="velvet-compliments">
      <p className="velvet-compliments__heading reveal-hidden">With Best Compliments From</p>
      <ul className="velvet-compliments__list">
        {sorted.map((c, i) => (
          <li
            key={c.id}
            className={`velvet-compliments__item reveal-hidden ${
              i === sorted.length - 1 ? 'velvet-compliments__item--last' : ''
            }`}
          >
            {c.name}
          </li>
        ))}
      </ul>
    </section>
  )
}
