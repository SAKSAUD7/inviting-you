import React from 'react'
import { motion } from 'framer-motion'
import { SultanDivider } from '../SultanOrnaments'

interface Props {
  photos: string[]
}

export default function SultanGallery({ photos }: Props) {
  if (!photos || photos.length === 0) return null

  return (
    <div style={{ width: '100%', position: 'relative', backgroundColor: 'var(--sultan-crimson-dark)' }}>
      <section className="sultan-section" style={{ padding: '8rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="sultan-h2">The Royal Portraits</h2>
          <SultanDivider style={{ margin: '1.5rem auto' }} />
        </motion.div>

        <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {photos.map((photo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1.2, delay: (index % 3) * 0.2, ease: "easeOut" }}
              style={{ 
                width: '100%', 
                aspectRatio: index % 2 === 0 ? '3/4' : '4/5', 
                position: 'relative',
                border: '1px solid var(--sultan-gold-metallic)',
                padding: '0.5rem',
                backgroundColor: 'var(--sultan-crimson)'
              }}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={photo} 
                  alt="Gallery" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--sultan-gold-metallic)', mixBlendMode: 'color', opacity: 0.2, pointerEvents: 'none' }} />
              </div>
            </motion.div>
          ))}
        </div>

      </section>
    </div>
  )
}
