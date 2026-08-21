import React, { useState, useEffect, useRef } from 'react'

interface Props {
  music: any
  opened: boolean
}

export default function NoorMusicPlayer({ music, opened }: Props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [mounted, setMounted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const url = music?.url || '/assets/audio/velvet-bgm.mp3'

  useEffect(() => {
    setMounted(true)
    audioRef.current = new Audio(url)
    audioRef.current.loop = true
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  }, [url])

  useEffect(() => {
    if (opened && music?.autoplay !== false && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  if (!mounted || !opened) return null

  return (
    <div className={`noor-music-player`} onClick={togglePlay} title={music?.title || 'Background Music'}>
      <div className={`noor-music-icon ${isPlaying ? 'playing' : ''}`}>
        {/* Simple music note icon */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
    </div>
  )
}
