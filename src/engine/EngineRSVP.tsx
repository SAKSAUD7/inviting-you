'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface EngineRSVPProps {
  weddingId: string
  containerClassName?: string
  formClassName?: string
  inputClassName?: string
  buttonClassName?: string
  titleComponent?: React.ReactNode
}

export default function EngineRSVP({ 
  weddingId, 
  containerClassName, 
  formClassName, 
  inputClassName, 
  buttonClassName,
  titleComponent 
}: EngineRSVPProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    guestName: '',
    attending: 'true',
    guestCount: 1,
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // In a real app, this would be an actual API call to /api/rsvp
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className={containerClassName} style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Thank You!</h3>
          <p>Your RSVP has been successfully received.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      {titleComponent}
      
      <form onSubmit={handleSubmit} className={formClassName} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <input
            type="text"
            required
            placeholder="Full Name"
            className={inputClassName}
            value={formData.guestName}
            onChange={e => setFormData({...formData, guestName: e.target.value})}
            style={{ width: '100%', padding: '1rem' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="attending" 
              value="true" 
              checked={formData.attending === 'true'}
              onChange={e => setFormData({...formData, attending: e.target.value})}
            />
            Joyfully Accepts
          </label>
          <label style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input 
              type="radio" 
              name="attending" 
              value="false"
              checked={formData.attending === 'false'}
              onChange={e => setFormData({...formData, attending: e.target.value})}
            />
            Regretfully Declines
          </label>
        </div>

        {formData.attending === 'true' && (
          <div>
            <select
              className={inputClassName}
              value={formData.guestCount}
              onChange={e => setFormData({...formData, guestCount: Number(e.target.value)})}
              style={{ width: '100%', padding: '1rem' }}
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <textarea
            placeholder="Leave a message for the couple (optional)"
            className={inputClassName}
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            style={{ width: '100%', padding: '1rem', minHeight: '100px' }}
          />
        </div>

        <button 
          type="submit" 
          className={buttonClassName}
          disabled={status === 'loading'}
          style={{ width: '100%', padding: '1rem', opacity: status === 'loading' ? 0.7 : 1 }}
        >
          {status === 'loading' ? 'Sending...' : 'Send RSVP'}
        </button>
        
        {status === 'error' && (
          <p style={{ color: 'red', textAlign: 'center' }}>Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  )
}
