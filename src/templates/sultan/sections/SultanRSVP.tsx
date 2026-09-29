'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { SultanDivider, SultanCrown, SultanLantern, SultanMoon } from '../SultanOrnaments'

interface Props {
  weddingId: string
  phoneNumber?: string
}

export default function SultanRSVP({ weddingId, phoneNumber }: Props) {
  const [form, setForm] = useState({ name: '', guests: '1 Guest', attending: true as boolean | null, message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber) {
      const msg = `*RSVP — Royal Celebration*%0A%0A*Name:* ${form.name}%0A*Attending:* ${form.attending ? 'Joyfully Accept ✓' : 'Regretfully Decline ✗'}%0A*Guests:* ${form.attending ? form.guests : '0'}%0A${form.message ? `*Message:* ${form.message}` : ''}`
      window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank')
    }
    setSubmitted(true)
  }

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-ivory)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Parchment texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover', opacity: 0.5 }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '320px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '180px', height: '250px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '180px', height: '250px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Palace image (right side) — as seen in reference */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--sultan-ivory) 55%, transparent 100%)' }}/>

      {/* Gold border */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.4)', pointerEvents: 'none', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '22px', border: '1px solid rgba(203,164,93,0.2)', pointerEvents: 'none', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.8)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.8)' }}/>

      {/* Moon */}
      <SultanMoon size={40} style={{ position: 'absolute', top: '18%', right: '25%', zIndex: 2, opacity: 0.7 }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, width: '100%', maxWidth: '500px', margin: '0 auto', padding: '5rem 2rem' }}
      >
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <SultanCrown size={38} style={{ marginBottom: '1rem' }}/>
          <h2 className="sultan-heading" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--sultan-brown)', fontStyle: 'normal', margin: '0 0 0.5rem' }}>
            RSVP
          </h2>
          <div className="sultan-label" style={{ color: 'rgba(42,28,18,0.65)', lineHeight: 1.8 }}>
            YOUR PRESENCE MEANS<br/>THE WORLD TO US
          </div>
          <SultanDivider style={{ margin: '1.5rem auto 0' }} width={200}/>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div className="sultan-script" style={{ fontSize: '3rem', color: 'var(--sultan-gold)', marginBottom: '1rem' }}>Thank You</div>
            <p className="sultan-body" style={{ color: 'rgba(42,28,18,0.75)', fontStyle: 'italic' }}>
              Jazakallahu Khayran — We look forward to celebrating with you.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Name */}
            <div>
              <label className="sultan-label" style={{ display: 'block', color: 'rgba(42,28,18,0.7)', marginBottom: '0.6rem' }}>Your Name</label>
              <input
                type="text" required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your full name"
                className="sultan-input"
                style={{ color: 'var(--sultan-brown)' }}
              />
            </div>

            {/* Number of guests */}
            <div>
              <label className="sultan-label" style={{ display: 'block', color: 'rgba(42,28,18,0.7)', marginBottom: '0.6rem' }}>Number of Guests</label>
              <select
                value={form.guests}
                onChange={e => setForm({ ...form, guests: e.target.value })}
                className="sultan-select"
                style={{ color: 'var(--sultan-brown)' }}
              >
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
            </div>

            {/* Attendance */}
            <div>
              <label className="sultan-label" style={{ display: 'block', color: 'rgba(42,28,18,0.7)', marginBottom: '1rem' }}>Will you attend?</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {/* Accept */}
                <button type="button" onClick={() => setForm({ ...form, attending: true })} style={{
                  flex: 1, padding: '0.9rem 1rem', cursor: 'pointer',
                  border: `2px solid ${form.attending === true ? 'var(--sultan-gold)' : 'rgba(203,164,93,0.3)'}`,
                  backgroundColor: form.attending === true ? 'rgba(203,164,93,0.15)' : 'transparent',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: form.attending === true ? 'var(--sultan-gold)' : 'transparent',
                    border: '1px solid var(--sultan-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={form.attending === true ? 'var(--sultan-ivory)' : 'var(--sultan-gold)'} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="sultan-label" style={{ color: 'rgba(42,28,18,0.7)', fontSize: '0.6rem' }}>Joyfully Accept</span>
                </button>

                {/* Decline */}
                <button type="button" onClick={() => setForm({ ...form, attending: false })} style={{
                  flex: 1, padding: '0.9rem 1rem', cursor: 'pointer',
                  border: `2px solid ${form.attending === false ? 'var(--sultan-gold)' : 'rgba(203,164,93,0.3)'}`,
                  backgroundColor: form.attending === false ? 'rgba(203,164,93,0.1)' : 'transparent',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    backgroundColor: 'transparent',
                    border: '1px solid var(--sultan-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--sultan-gold)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <span className="sultan-label" style={{ color: 'rgba(42,28,18,0.7)', fontSize: '0.6rem' }}>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* Additional message */}
            <div>
              <label className="sultan-label" style={{ display: 'block', color: 'rgba(42,28,18,0.7)', marginBottom: '0.6rem' }}>Additional Message (Optional)</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Share your message or blessings..."
                rows={3}
                className="sultan-textarea"
                style={{ color: 'var(--sultan-brown)' }}
              />
            </div>

            {/* Submit */}
            <button type="submit" className="sultan-btn-whatsapp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.502 3.935 1.385 5.617L0 24l6.545-1.367A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.005-1.374l-.359-.213-3.723.778.793-3.624-.234-.372A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
              CONFIRM VIA WHATSAPP
            </button>

          </form>
        )}
      </motion.div>
    </section>
  )
}
