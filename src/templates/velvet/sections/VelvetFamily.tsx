'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

const Ornament = () => (
  <div className="velvet-family__divider">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z"
        stroke="#C9971A" strokeWidth="1" fill="none"/>
    </svg>
  </div>
)

export default function VelvetFamily({ couple, family }: Props) {
  if (!couple || !family) return null

  return (
    <section className="velvet-family">
      {/* Opening invitation */}
      <div className="reveal-hidden">
        {family.invitationFromName && (
          <p className="velvet-family__from">{family.invitationFromName}</p>
        )}
        <p className="velvet-family__invitation">
          Request the honour of your presence to celebrate the<br />
          <strong style={{ fontFamily: 'var(--font-serif)', color: 'var(--velvet-script)', fontStyle: 'normal' }}>
            Nikah Ceremony
          </strong>
          <br />of their beloved daughter and son
        </p>
      </div>

      <Ornament />

      {/* Bride side */}
      <div className="velvet-family__side reveal-hidden">
        <h2 className="velvet-family__name">{couple.brideName}</h2>
        {couple.brideQualification && (
          <p className="velvet-family__qual">{couple.brideQualification}</p>
        )}
        {family.brideParents && (
          <p className="velvet-family__parent">D/o. {family.brideParents}</p>
        )}
        {family.bridePaternalGrandfather && (
          <p className="velvet-family__grandparent">
            Paternal Grand D/o. {family.bridePaternalGrandfather}
          </p>
        )}
        {family.brideMaternalGrandfather && (
          <p className="velvet-family__grandparent">
            Maternal Grand D/o. {family.brideMaternalGrandfather}
          </p>
        )}
      </div>

      <span className="velvet-family__weds reveal-hidden">Weds</span>

      {/* Groom side */}
      <div className="velvet-family__side reveal-hidden">
        <h2 className="velvet-family__name">{couple.groomName}</h2>
        {couple.groomQualification && (
          <p className="velvet-family__qual">{couple.groomQualification}</p>
        )}
        {family.groomFather && (
          <p className="velvet-family__parent">S/o. {family.groomFather}</p>
        )}
        {family.groomPaternalGrandfather && (
          <p className="velvet-family__grandparent">
            Paternal Grand S/o. {family.groomPaternalGrandfather}
          </p>
        )}
        {family.groomMaternalGrandfather && (
          <p className="velvet-family__grandparent">
            Maternal Grand S/o. {family.groomMaternalGrandfather}
          </p>
        )}
      </div>

      <Ornament />

      {/* Invitation from details */}
      {(family.invitationFromOrg || family.invitationFromAddress || family.invitationFromPhone) && (
        <div className="reveal-hidden" style={{ textAlign: 'center', marginTop: '1rem' }}>
          {family.invitationFromOrg && (
            <p className="velvet-family__parent" style={{ marginBottom: '0.25rem' }}>
              {family.invitationFromOrg}
            </p>
          )}
          {family.invitationFromAddress && (
            <p className="velvet-family__grandparent">{family.invitationFromAddress}</p>
          )}
          {family.invitationFromPhone && (
            <p className="velvet-family__grandparent" style={{ marginTop: '0.25rem' }}>
              Mob: {family.invitationFromPhone}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
