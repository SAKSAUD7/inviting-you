'use client'
import { useEffect, useRef, useState } from 'react'

interface Props { musicUrl?: string }

export default function WalimaMusicPlayer({ musicUrl }: Props) {
  // Use the custom uploaded audio as the default fallback
  const src = musicUrl || '/assets/audio/walima-mufassir-iqra.mp3'
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!audioRef.current) return

    const handlePlay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
          setIsVisible(true)
        }).catch(() => {
          setIsVisible(true) // Show button for manual play if autoplay blocked
        })
      }
    }

    window.addEventListener('walima-music-play', handlePlay)
    return () => window.removeEventListener('walima-music-play', handlePlay)
  }, [src])

  const toggleMute = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" />
      {isVisible && (
        <button 
          className={`walima-music-btn ${isPlaying ? 'playing' : ''}`}
          onClick={toggleMute}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={isPlaying ? 'Pause music' : 'Play music'}
        >
          <div className="walima-music-bars">
            <span />
            <span />
            <span />
          </div>
        </button>
      )}
    </>
  )
}
