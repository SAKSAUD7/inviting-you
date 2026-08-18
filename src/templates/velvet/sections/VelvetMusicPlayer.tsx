'use client'
import { useEffect, useRef, useState } from 'react'
import { WeddingMusic } from '@/types/wedding'

interface Props {
  music: WeddingMusic
  opened: boolean
}

export default function VelvetMusicPlayer({ music, opened }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!opened || !music.url) return
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
    audio.loop = true
    // Try autoplay on open interaction
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false)) // browser may block
  }, [opened, music.url])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  if (!music.url) return null

  return (
    <>
      <audio
        ref={audioRef}
        src={music.url}
        preload="auto"
        onCanPlayThrough={() => setReady(true)}
        aria-label={music.title ?? 'Wedding music'}
      />

      <button
        className="velvet-music-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause music' : 'Play music'}
        title={music.title ?? 'Wedding music'}
        id="music-toggle-btn"
      >
        {playing ? (
          // Pause icon — 3 bars
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(212,172,90,0.85)">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          // Play icon — triangle
          <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(212,172,90,0.85)">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
    </>
  )
}
