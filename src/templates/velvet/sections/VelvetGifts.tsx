'use client'
import { WeddingCouple } from '@/types/wedding'

interface Props { couple?: WeddingCouple | null }

export default function VelvetGifts({ couple }: Props) {
  const defaultText = "Your love, blessings, and presence are the greatest gifts we could ever ask for."
  const giftsText = couple?.invitationMessage || defaultText

  return (
    <section className="gifts-section section-pad">
      <div className="gift-bloom" aria-hidden="true"><i /><i /><i /></div>

      <div className="gift-copy reveal">
        <span className="eyebrow">With all our hearts</span>
        <h2>Your presence is our present</h2>
        <p><span>{giftsText}</span></p>
      </div>
    </section>
  )
}
