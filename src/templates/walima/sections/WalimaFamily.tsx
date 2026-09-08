'use client'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  family?: WeddingFamily | null
}

const FamilyOrnament = () => (
  <div className="walima-family-divider" aria-hidden="true">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 7.5H19.5L14.5 10.5L16 16L12 13L8 16L9.5 10.5L4.5 7.5H10.5Z"
        stroke="#d4888a" strokeWidth="0.8" fill="#f2c4c4" opacity="0.7"/>
      <circle cx="12" cy="10" r="2" fill="#d4888a" opacity="0.5"/>
    </svg>
  </div>
)

export default function WalimaFamily({ couple, family }: Props) {
  if (!couple || !family) return null

  return (
    <section id="walima-family" className="walima-family-section walima-section-pad">
      <div className="walima-shell" style={{ maxWidth: '480px', textAlign: 'center' }}>

        <div className="walima-section-heading walima-reveal">
          <span className="walima-eyebrow">The Hosts</span>
          <h2>The Families</h2>
        </div>

        {/* Invitation from host */}
        <div className="walima-reveal delay-1">
          {family.invitationFromName && (
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {family.invitationFromName}
            </p>
          )}
          <p className="walima-family-parent" style={{ marginBottom: '24px' }}>
            Solicit your gracious presence on the auspicious occasion of Dawat-e-Valima of their son
          </p>
        </div>

        <FamilyOrnament />

        {/* Groom */}
        <div className="walima-reveal delay-1" style={{ marginTop: '20px', marginBottom: '8px' }}>
          <h2 className="walima-family-name">{couple.groomName}</h2>
          {couple.groomQualification && (
            <p className="walima-family-qual">{couple.groomQualification}</p>
          )}
          {family.groomFather && (
            <p className="walima-family-parent">S/o. {family.groomFather}</p>
          )}
          {family.groomPaternalGrandfather && (
            <p className="walima-family-grandparent">Paternal Grand S/o. {family.groomPaternalGrandfather}</p>
          )}
          {family.groomMaternalGrandfather && (
            <p className="walima-family-grandparent">Maternal Grand S/o. {family.groomMaternalGrandfather}</p>
          )}
        </div>

        <span className="walima-family-weds walima-reveal">With</span>

        {/* Bride */}
        <div className="walima-reveal delay-1" style={{ marginBottom: '24px' }}>
          <h2 className="walima-family-name">{couple.brideName}</h2>
          {couple.brideQualification && (
            <p className="walima-family-qual">{couple.brideQualification}</p>
          )}
          {family.brideParents && (
            <p className="walima-family-parent">D/o. {family.brideParents}</p>
          )}
          {family.bridePaternalGrandfather && (
            <p className="walima-family-grandparent">Paternal Grand D/o. {family.bridePaternalGrandfather}</p>
          )}
          {family.brideMaternalGrandfather && (
            <p className="walima-family-grandparent">Maternal Grand D/o. {family.brideMaternalGrandfather}</p>
          )}
        </div>

        <FamilyOrnament />

        {/* Removed Contact / from address section per request */}
      </div>
    </section>
  )
}
