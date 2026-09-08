'use client'
import { RSVPConfig } from '@/types/wedding'
import { useRSVP } from '@/engine/useRSVP'

interface Props {
  weddingId: string
  rsvpConfig?: RSVPConfig | null
}

export default function WalimaRSVP({ weddingId, rsvpConfig }: Props) {
  const { formData, setFormData, status, error, submit } = useRSVP(weddingId)

  if (!rsvpConfig?.enabled) return null

  return (
    <section className="walima-rsvp-section walima-section-pad">
      <div className="walima-shell" style={{ width: 'min(560px, calc(100% - 40px))', margin: '0 auto', textAlign: 'center' }}>
        <header className="walima-section-heading walima-reveal" style={{ marginBottom: 0 }}>
          <span className="walima-eyebrow">Will you join us?</span>
          <h2>RSVP</h2>
          <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(0.9rem,1.7vw,1.1rem)', color: 'color-mix(in srgb, var(--text-primary) 55%, transparent)', marginBottom: '40px' }}>
            {rsvpConfig.message || 'Will you celebrate with us?'}
          </p>
        </header>

        {status === 'success' ? (
          <p
            className="walima-reveal"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 'clamp(1rem,2vw,1.25rem)', color: 'var(--rose-dark)', lineHeight: 1.8, padding: '32px 0' }}
          >
            JazakAllahu Khayran — we look forward to celebrating with you. 🌸
          </p>
        ) : (
          <form
            className="walima-reveal"
            style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}
            onSubmit={submit}
            noValidate
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="rsvp-name" className="walima-rsvp-label">Your Full Name</label>
              <input
                id="rsvp-name"
                type="text"
                className="walima-rsvp-input"
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Enter your name"
                required
                autoComplete="name"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label className="walima-rsvp-label">Will you attend?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: '✓ Yes, I will attend', value: true },
                  { label: '✗ Unable to attend', value: false },
                ].map(({ label, value }) => (
                  <label key={String(value)} className="walima-rsvp-radio">
                    <input
                      type="radio"
                      name="attending"
                      style={{ width: '16px', height: '16px', accentColor: 'var(--rose-dark)' }}
                      checked={formData.attending === value}
                      onChange={() => setFormData({ ...formData, attending: value })}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {formData.attending === true && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label htmlFor="rsvp-guests" className="walima-rsvp-label">Number of Guests</label>
                <select
                  id="rsvp-guests"
                  className="walima-rsvp-input"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="rsvp-message" className="walima-rsvp-label">A message for the couple (optional)</label>
              <textarea
                id="rsvp-message"
                className="walima-rsvp-input"
                style={{ resize: 'vertical', minHeight: '88px' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your blessings…"
                rows={3}
              />
            </div>

            {error && (
              <p style={{ fontSize: '0.85rem', color: 'var(--blush-deep)', textAlign: 'center' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="walima-rsvp-submit"
            >
              {status === 'loading' ? 'Sending…' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
