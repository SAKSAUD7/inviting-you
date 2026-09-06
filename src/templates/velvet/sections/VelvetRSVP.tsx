'use client'
import { RSVPConfig } from '@/types/wedding'
import { useRSVP } from '@/engine/useRSVP'

interface Props {
  weddingId: string
  rsvpConfig?: RSVPConfig | null
}

export default function VelvetRSVP({ weddingId, rsvpConfig }: Props) {
  const { formData, setFormData, status, error, submit } = useRSVP(weddingId)

  if (!rsvpConfig?.enabled) return null

  return (
    <section className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="section-shell" style={{ width: 'min(560px, calc(100% - 40px))', margin: '0 auto', textAlign: 'center' }}>
        <header className="section-heading reveal" style={{ marginBottom: 0 }}>
          <span className="eyebrow">Will you join us?</span>
          <h2 style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.8rem, 7vw, 4.6rem)', color: 'var(--plum)', fontWeight: 400, margin: '13px 0 16px' }}>RSVP</h2>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(0.9rem, 1.7vw, 1.1rem)', color: 'color-mix(in srgb, var(--plum) 60%, transparent)', marginBottom: '40px' }}>
            {rsvpConfig.message || 'Will you celebrate with us?'}
          </p>
        </header>

        {status === 'success' ? (
          <p className="reveal" style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--plum)', lineHeight: 1.8, padding: '32px 0' }}>
            JazakAllahu Khayran — we look forward to celebrating with you. 🤍
          </p>
        ) : (
          <form className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} onSubmit={submit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="rsvp-name" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--plum) 65%, transparent)' }}>Your Full Name</label>
              <input
                id="rsvp-name"
                type="text"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid color-mix(in srgb, var(--plum) 22%, transparent)', background: 'color-mix(in srgb, var(--ivory) 60%, var(--cream))', color: 'var(--plum)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 0, outline: 'none' }}
                value={formData.guestName}
                onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                placeholder="Enter your name"
                required
                autoComplete="name"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--plum) 65%, transparent)' }}>Will you attend?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { label: '✓ Yes, I will attend', value: true },
                  { label: '✗ Unable to attend', value: false },
                ].map(({ label, value }) => (
                  <label key={String(value)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', border: '1px solid color-mix(in srgb, var(--plum) 22%, transparent)', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--plum)', background: 'color-mix(in srgb, var(--ivory) 60%, var(--cream))' }}>
                    <input
                      type="radio"
                      name="attending"
                      style={{ width: '16px', height: '16px', accentColor: 'var(--plum)' }}
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
                <label htmlFor="rsvp-guests" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--plum) 65%, transparent)' }}>Number of Guests</label>
                <select
                  id="rsvp-guests"
                  style={{ width: '100%', padding: '14px 16px', border: '1px solid color-mix(in srgb, var(--plum) 22%, transparent)', background: 'color-mix(in srgb, var(--ivory) 60%, var(--cream))', color: 'var(--plum)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 0, outline: 'none' }}
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                >
                  {[1,2,3,4,5,6].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="rsvp-message" style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'color-mix(in srgb, var(--plum) 65%, transparent)' }}>A message for the couple (optional)</label>
              <textarea
                id="rsvp-message"
                style={{ width: '100%', padding: '14px 16px', border: '1px solid color-mix(in srgb, var(--plum) 22%, transparent)', background: 'color-mix(in srgb, var(--ivory) 60%, var(--cream))', color: 'var(--plum)', fontFamily: 'var(--font-body)', fontSize: '0.95rem', borderRadius: 0, outline: 'none', resize: 'vertical', minHeight: '90px' }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your blessings…"
                rows={3}
              />
            </div>

            {error && <p style={{ fontSize: '0.85rem', color: 'var(--rose)', textAlign: 'center' }}>{error}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ width: '100%', padding: '16px', background: 'var(--plum)', color: 'var(--ivory)', border: 'none', fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', cursor: 'pointer', marginTop: '8px' }}
            >
              {status === 'loading' ? 'Sending…' : 'Send RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
