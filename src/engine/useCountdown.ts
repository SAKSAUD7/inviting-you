'use client'

import { useState, useEffect, useCallback } from 'react'

// ---------------------------------------------------------------------------
// useCountdown — Shared countdown behavior hook
//
// Philosophy: This hook is BEHAVIOR ONLY. It manages time calculation and
// interval cleanup. Templates own all visual decisions (font, color, layout).
//
// Usage:
//   const { days, hours, minutes, seconds, isPast } = useCountdown(targetDate)
// ---------------------------------------------------------------------------

export interface CountdownResult {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True when the target date has already passed */
  isPast: boolean
  /** True while the initial calculation hasn't run yet (SSR safe) */
  isLoading: boolean
}

function calculate(target: Date): Omit<CountdownResult, 'isLoading'> {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isPast: false,
  }
}

export function useCountdown(targetDate: Date | string | null | undefined): CountdownResult {
  const [result, setResult] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    isLoading: true,
  })

  const tick = useCallback(() => {
    if (!targetDate) return
    const target = targetDate instanceof Date ? targetDate : new Date(targetDate)
    setResult({ ...calculate(target), isLoading: false })
  }, [targetDate])

  useEffect(() => {
    if (!targetDate) return
    tick()
    const id = setInterval(tick, 1_000)
    return () => clearInterval(id)
  }, [targetDate, tick])

  return result
}
