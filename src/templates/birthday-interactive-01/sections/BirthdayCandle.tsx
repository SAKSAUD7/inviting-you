'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onComplete: () => void
}

export default function BirthdayCandle({ data, onComplete }: Props) {
  const [blownOut, setBlownOut] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Attempt to get mic permission for blowing interaction
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        streamRef.current = stream
        setMicEnabled(true)
        
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()
        analyserRef.current = audioContextRef.current.createAnalyser()
        sourceRef.current = audioContextRef.current.createMediaStreamSource(stream)
        sourceRef.current.connect(analyserRef.current)
        
        analyserRef.current.fftSize = 256
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        const checkAudioLevel = () => {
          if (blownOut) return
          analyserRef.current?.getByteFrequencyData(dataArray)
          
          let sum = 0
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i]
          }
          const average = sum / bufferLength

          // If average volume is high enough, consider it a blow
          if (average > 100) {
            handleBlowOut()
          } else {
            rafRef.current = requestAnimationFrame(checkAudioLevel)
          }
        }
        
        checkAudioLevel()
      } catch (err) {
        console.warn('Microphone access denied or unavailable. Fallback to tap enabled.', err)
        setMicEnabled(false)
      }
    }

    initMic()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [blownOut])

  const handleBlowOut = () => {
    if (blownOut) return
    setBlownOut(true)
    
    // Trigger confetti fountain
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: ['#ff758c', '#ffd166']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: ['#a2d2ff', '#b9fbc0']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(onComplete, 3500) // Move to next screen after smoke clears and confetti finishes
  }

  return (
    <motion.section 
      className="birthday-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: '1rem', textAlign: 'center' }}
      >
        Make a wish...
      </motion.h2>

      <motion.div
        style={{ 
          position: 'relative', 
          width: '280px', 
          height: '280px',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onClick={handleBlowOut}
        onPointerDown={handleBlowOut}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
      >
        <img 
          src="/templates/birthday/hero_bears.png" 
          alt="Birthday Cake" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: 1 }}
        />

        {/* Interactive Flame - Positioned over the candle in the image */}
        <AnimatePresence>
          {!blownOut && (
            <motion.div
              exit={{ opacity: 0, scale: 0, y: -20 }}
              style={{
                width: '18px',
                height: '35px',
                background: 'linear-gradient(to top, #ffcc00, #ff6600)',
                borderRadius: '50% 50% 20% 20%',
                position: 'absolute',
                top: '42%',
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 20px #ff9900, 0 0 40px #ff6600',
                zIndex: 2
              }}
              animate={{
                scale: [1, 1.1, 0.9, 1.05, 1],
                rotate: [0, -5, 5, -2, 0],
                borderRadius: ['50% 50% 20% 20%', '40% 60% 20% 20%', '60% 40% 20% 20%']
              }}
              transition={{
                repeat: Infinity,
                duration: 0.5,
                ease: 'easeInOut'
              }}
            />
          )}
        </AnimatePresence>

        {/* Smoke (appears when blown out) */}
        {blownOut && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 0, y: -100, scale: 3 }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: 'rgba(150,150,150,0.6)',
              filter: 'blur(4px)',
              zIndex: 3
            }}
          />
        )}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ marginTop: '2rem', fontSize: '1rem', opacity: 0.7, textAlign: 'center' }}
      >
        {micEnabled ? "Blow into the mic 🎤 (or tap the cake)" : "Tap the cake to blow out the candle 👆"}
      </motion.p>
    </motion.section>
  )
}


