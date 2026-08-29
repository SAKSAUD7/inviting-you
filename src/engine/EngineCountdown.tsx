'use client'

import React, { useState, useEffect } from 'react'

interface EngineCountdownProps {
  targetDate: Date | string | null
  containerClassName?: string
  blockClassName?: string
  numberClassName?: string
  labelClassName?: string
}

export default function EngineCountdown({ 
  targetDate, 
  containerClassName, 
  blockClassName, 
  numberClassName, 
  labelClassName 
}: EngineCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    if (!targetDate) return

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        }
      }
      return newTimeLeft
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!targetDate) return null

  const renderBlock = (value: number, label: string) => (
    <div className={blockClassName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={numberClassName}>{value.toString().padStart(2, '0')}</div>
      <div className={labelClassName}>{label}</div>
    </div>
  )

  return (
    <div className={containerClassName} style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
      {renderBlock(timeLeft.days, 'Days')}
      {renderBlock(timeLeft.hours, 'Hours')}
      {renderBlock(timeLeft.minutes, 'Minutes')}
      {renderBlock(timeLeft.seconds, 'Seconds')}
    </div>
  )
}
