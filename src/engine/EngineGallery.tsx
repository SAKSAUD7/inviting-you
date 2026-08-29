'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface EngineGalleryProps {
  photos: string[]
  containerClassName?: string
  imageClassName?: string
  titleComponent?: React.ReactNode
  overlayClassName?: string
}

export default function EngineGallery({ photos, containerClassName, imageClassName, titleComponent, overlayClassName }: EngineGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <div className={containerClassName}>
      {titleComponent}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', width: '100%', padding: '1rem' }}>
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={imageClassName}
            onClick={() => setSelectedPhoto(photo)}
            style={{ position: 'relative', height: '300px', cursor: 'pointer', overflow: 'hidden' }}
          >
            <Image
              src={photo}
              alt={`Gallery image ${index + 1}`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className={overlayClassName || ''}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              backgroundColor: 'rgba(0,0,0,0.9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'zoom-out'
            }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              style={{ position: 'relative', width: '90vw', height: '90vh' }}
            >
              <Image
                src={selectedPhoto}
                alt="Selected"
                fill
                style={{ objectFit: 'contain' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
