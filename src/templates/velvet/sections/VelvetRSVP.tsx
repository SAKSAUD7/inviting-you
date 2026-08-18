'use client'
import { useState } from 'react'
import { RSVPConfig } from '@/types/wedding'

interface Props {
  weddingId: string
  rsvpConfig?: RSVPConfig | null
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function VelvetRSVP({ weddingId, rsvpConfig }: Props) {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  if (!rsvpConfig?.enabled) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) { setError('Please enter your name.'); return }
    if (attending === null) { setError('Please select attendance.'); return }
    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weddingId, guestName: name, attending, guestCount, message }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="velvet-rsvp">
      <h2 className="velvet-rsvp__heading reveal-hidden">RSVP</h2>
      <p className="velvet-rsvp__sub reveal-hidden">
        {rsvpConfig.message ?? 'Will you celebrate with us?'}
      </p>

      {status === 'success' ? (
        <p className="velvet-rsvp__success reveal-hidden">
          JazakAllahu Khayran — we look forward to seeing you! 🤍
        </p>
      ) : (
        <form className="velvet-rsvp__form reveal-hidden" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="velvet-rsvp__field">
            <label htmlFor="rsvp-name" className="velvet-rsvp__label">Your Full Name</label>
            <input
              id="rsvp-name"
              type="text"
              className="velvet-rsvp__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              autoComplete="name"
            />
          </div>

          {/* Attendance */}
          <div className="velvet-rsvp__field">
            <label className="velvet-rsvp__label">Will you attend?</label>
            <div className="velvet-rsvp__attendance">
              {[
                { label: '✓ Yes, I will attend', value: true },
                { label: '✗ Unable to attend', value: false },
              ].map(({ label, value }) => (
                <label key={String(value)} className="velvet-rsvp__radio">
                  <input
                    type="radio"
                    name="attending"
                    checked={attending === value}
                    onChange={() => setAttending(value)}
                  />
                  <span className="velvet-rsvp__radio-label">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Guest count */}
          {attending === true && (
            <div className="velvet-rsvp__field">
              <label htmlFor="rsvp-guests" className="velvet-rsvp__label">Number of Guests</label>
              <select
                id="rsvp-guests"
                className="velvet-rsvp__select"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
              >
                {[1,2,3,4,5,6].map((n) => (
                  <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                ))}
              </select>
            </div>
          )}

          {/* Message */}
          <div className="velvet-rsvp__field">
            <label htmlFor="rsvp-message" className="velvet-rsvp__label">A message for the couple (optional)</label>
            <textarea
              id="rsvp-message"
              className="velvet-rsvp__textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your blessings..."
              rows={3}
            />
          </div>

          {error && (
            <p style={{ color: '#F0A0A0', fontFamily: 'var(--font-elegant)', fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="velvet-rsvp__submit"
            disabled={status === 'loading'}
            id="rsvp-submit-btn"
          >
            {status === 'loading' ? 'Sending...' : 'Send RSVP'}
          </button>
        </form>
      )}
    </section>
  )
}
