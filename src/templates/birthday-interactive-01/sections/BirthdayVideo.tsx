'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  videoSrc: string
  name?: string
  onComplete: () => void
}

export default function BirthdayVideo({ videoSrc, name, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [muted, setMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [buffering, setBuffering] = useState(false)

  // Try autoplay on mount
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = false
    const p = v.play()
    if (p) {
      p.then(() => {
        setPlaying(true)
        setHasStarted(true)
      }).catch(() => {
        // Autoplay blocked — user must tap
        setPlaying(false)
      })
    }
  }, [])

  const handlePlayPause = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
      setHasStarted(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const handleEnded = () => {
    setEnded(true)
    setPlaying(false)
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    setProgress((v.currentTime / v.duration) * 100)
  }

  const handleLoadedMetadata = () => {
    const v = videoRef.current
    if (v) setDuration(v.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current
    if (!v) return
    const newTime = (parseFloat(e.target.value) / 100) * v.duration
    v.currentTime = newTime
    setProgress(parseFloat(e.target.value))
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(!muted)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  return (
    <motion.section
      className="birthday-section"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
      style={{ justifyContent: 'center', padding: '1.5rem', gap: '1.2rem' }}
    >
      {/* Title */}
      <motion.div
        style={{ textAlign: 'center', zIndex: 10 }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 style={{ fontSize: 'clamp(1.3rem, 6vw, 1.8rem)', color: '#e05070', margin: '0 0 0.2rem' }}>
          A Special Message 🎬
        </h2>
        <p style={{
          fontFamily: 'var(--font-birthday-heading)',
          fontSize: 'clamp(0.8rem, 3vw, 0.95rem)',
          color: '#d06080',
          opacity: 0.8,
          margin: 0,
        }}>
          {name ? `Just for you, ${name} 💕` : 'Just for you 💕'}
        </p>
      </motion.div>

      {/* Video Player — full-width portrait card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, type: 'spring', bounce: 0.3 }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '340px',
          borderRadius: '20px',
          overflow: 'hidden',
          background: '#000',
          boxShadow: '0 20px 60px rgba(255,117,140,0.3), 0 8px 25px rgba(0,0,0,0.2)',
          border: '2.5px solid rgba(255,117,140,0.35)',
          zIndex: 10,
          alignSelf: 'center',
        }}
      >
        {/* Video fills frame with proper portrait ratio */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '177.77%' /* 9:16 */ }}>
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setBuffering(true)}
            onCanPlay={() => setBuffering(false)}
            onClick={handlePlayPause}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              cursor: 'pointer',
            }}
          />

          {/* Tap-to-play overlay (before first play) */}
          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handlePlayPause}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(26, 10, 16, 0.52)',
                  cursor: 'pointer', gap: '0.8rem',
                  backdropFilter: 'blur(2px)',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: '72px', height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(255,117,140,0.6)',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </motion.div>
                <span style={{
                  color: 'white', fontSize: '0.9rem',
                  fontFamily: 'var(--font-birthday-heading)',
                  opacity: 0.9, textShadow: '0 1px 4px rgba(0,0,0,0.5)'
                }}>
                  Tap to play 🎥
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buffering spinner */}
          {buffering && hasStarted && (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.3)',
                borderTopColor: '#ff758c',
                animation: 'birthday-spin 0.8s linear infinite',
              }}/>
            </div>
          )}

          {/* Big play/pause tap area (when started) */}
          {hasStarted && !buffering && (
            <div
              onClick={handlePlayPause}
              style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
            />
          )}

          {/* Mute toggle (top right) */}
          <button
            onClick={e => { e.stopPropagation(); toggleMute() }}
            style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white', zIndex: 20,
            }}
          >
            {muted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>

        {/* Controls bar — below video, inside card */}
        <div style={{
          padding: '0.65rem 1rem',
          background: 'rgba(255,255,255,0.97)',
          display: 'flex', flexDirection: 'column', gap: '0.45rem',
        }}>
          {/* Progress bar */}
          <div style={{ position: 'relative', height: '4px', borderRadius: '4px', background: 'rgba(255,117,140,0.15)' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              width: `${progress}%`, borderRadius: '4px',
              background: 'linear-gradient(90deg, #ff758c, #ff7eb3)',
              transition: 'width 0.1s linear',
            }}/>
            <input
              type="range" min="0" max="100" value={progress}
              onChange={handleSeek}
              style={{
                position: 'absolute', inset: '-6px 0',
                width: '100%', opacity: 0, cursor: 'pointer', height: '20px'
              }}
            />
          </div>

          {/* Play/pause + time */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={handlePlayPause}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
                border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,117,140,0.35)',
              }}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <span style={{
              fontFamily: 'var(--font-birthday-body)',
              fontSize: '0.8rem', color: '#d06080', opacity: 0.8,
            }}>
              {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'}
              {duration > 0 && ` / ${formatTime(duration)}`}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Continue button */}
      <AnimatePresence>
        {(ended || hasStarted) && (
          <motion.button
            className="birthday-btn primary"
            onClick={onComplete}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            {ended ? 'Continue 💌' : 'Continue 💝'}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Spin keyframe */}
      <style>{`
        @keyframes birthday-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.section>
  )
}
