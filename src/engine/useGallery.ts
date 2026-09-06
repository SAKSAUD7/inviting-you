'use client'

import { useState, useCallback, useEffect } from 'react'
import { GalleryImage } from '@/types/wedding'

// ---------------------------------------------------------------------------
// useGallery — Shared gallery lightbox behavior hook
//
// Philosophy: This hook manages IMAGE SELECTION STATE, NAVIGATION, and
// KEYBOARD ACCESSIBILITY. It does NOT contain CSS, HTML structure, colors,
// height, grid layout, or any visual decisions.
//
// Templates own: grid layout, image sizes, borders, overlays, animations,
// typography, color palette, and all artistic presentation.
//
// Usage:
//   const { selectedImage, selectedIndex, open, close, next, prev } = useGallery(images)
// ---------------------------------------------------------------------------

export interface UseGalleryResult {
  images: GalleryImage[]
  selectedImage: GalleryImage | null
  selectedIndex: number
  isOpen: boolean
  open: (index: number) => void
  close: () => void
  next: () => void
  prev: () => void
}

export function useGallery(images: GalleryImage[]): UseGalleryResult {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const isOpen = selectedIndex >= 0
  const selectedImage = isOpen ? (images[selectedIndex] ?? null) : null

  const open = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setSelectedIndex(index)
      }
    },
    [images.length]
  )

  const close = useCallback(() => {
    setSelectedIndex(-1)
  }, [])

  const next = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation — accessibility behavior belongs in the engine
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, next, prev, close])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return { images, selectedImage, selectedIndex, isOpen, open, close, next, prev }
}
