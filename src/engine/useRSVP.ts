'use client'

import { useState, useCallback } from 'react'

// ---------------------------------------------------------------------------
// useRSVP — Shared RSVP behavior hook
//
// Philosophy: This hook handles FORM STATE, VALIDATION, and REAL API SUBMISSION.
// It does NOT contain any copy ("Joyfully Accepts"), CSS styles, or layout.
// Templates own all visual elements.
//
// Usage:
//   const { formData, setFormData, status, error, submit } = useRSVP(weddingId)
// ---------------------------------------------------------------------------

export type RSVPStatus = 'idle' | 'loading' | 'success' | 'error'

export interface RSVPFormData {
  guestName: string
  attending: boolean | null
  guestCount: number
  message: string
}

export interface UseRSVPResult {
  formData: RSVPFormData
  setFormData: (data: RSVPFormData) => void
  status: RSVPStatus
  error: string
  submit: (e: React.FormEvent) => Promise<void>
  reset: () => void
}

const DEFAULT_FORM: RSVPFormData = {
  guestName: '',
  attending: null,
  guestCount: 1,
  message: '',
}

export function useRSVP(weddingId: string): UseRSVPResult {
  const [formData, setFormData] = useState<RSVPFormData>(DEFAULT_FORM)
  const [status, setStatus] = useState<RSVPStatus>('idle')
  const [error, setError] = useState('')

  const reset = useCallback(() => {
    setFormData(DEFAULT_FORM)
    setStatus('idle')
    setError('')
  }, [])

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError('')

      if (!formData.guestName.trim()) {
        setError('Please enter your name.')
        return
      }
      if (formData.attending === null) {
        setError('Please select your attendance.')
        return
      }

      setStatus('loading')

      try {
        const res = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            weddingId,
            guestName: formData.guestName.trim(),
            attending: formData.attending,
            guestCount: formData.guestCount,
            message: formData.message.trim() || undefined,
          }),
        })

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || `Server error ${res.status}`)
        }

        setStatus('success')
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
        // Allow retry
        setTimeout(() => {
          setStatus('idle')
          setError('')
        }, 4_000)
      }
    },
    [weddingId, formData]
  )

  return { formData, setFormData, status, error, submit, reset }
}
