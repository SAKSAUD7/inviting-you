'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * VelvetMusicPlayer
 * Generates a soothing ambient wedding soundscape via Web Audio API.
 * No external file needed — pure synthesized harmonic pads + gentle reverb.
 */
export default function VelvetMusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready,   setReady]   = useState(false)

  const audioCtx = useRef<AudioContext | null>(null)
  const masterGain = useRef<GainNode | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element once on mount
  useEffect(() => {
    const audio = new Audio('/assets/audio/velvet-bgm.mp3')
    audio.loop = true
    audio.volume = 0.6 // default volume
    audioRef.current = audio

    // Listen for global play event (triggered by VelvetInvitation handleOpen)
    const handleGlobalPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
    }

    // Expose a custom event for other components to trigger playback
    window.addEventListener('velvet-music-play', handleGlobalPlay)
    
    return () => {
      window.removeEventListener('velvet-music-play', handleGlobalPlay)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [])

  /* ── Toggle play/pause ── */
  const toggle = useCallback(() => {
    if (!audioRef.current) return

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(console.error)
    }
  }, [playing])

  return (
    <button
      id="musicToggle"
      className={`velvet-music-btn${playing ? ' is-playing' : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause background music' : 'Play background music'}
      title={playing ? 'Pause music' : 'Play soothing music'}
      type="button"
    >
      {playing ? (
        /* Animated bars when playing */
        <span className="music-bars-icon" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
      ) : (
        /* Music note when paused */
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="14" height="14">
          <path
            d="M9 18V5l12-2v13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8"/>
          <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8"/>
        </svg>
      )}
    </button>
  )
}
