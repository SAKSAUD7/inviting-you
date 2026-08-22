import React from 'react'
import { motion } from 'framer-motion'
import { GalleryImage } from '@/types/wedding'
import { NoorGoldLine } from '../NoorOrnaments'
import Image from 'next/image'

interface Props {
  gallery: GalleryImage[]
}

export default function NoorGallery({ gallery }: Props) {
  const activeImages = gallery.sort((a, b) => a.order - b.order)

  if (activeImages.length === 0) return null

  return (
    <section className="noor-section" style={{ backgroundColor: 'var(--noor-ivory)', padding: '8rem 1.5rem 10rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* ── Background Atmospheric Effects ── */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none', background: 'radial-gradient(circle at 80% 20%, var(--noor-gold-champagne), transparent 40%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none', background: 'radial-gradient(circle at 20% 80%, var(--noor-gold-champagne), transparent 40%)' }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: 'center', marginBottom: '6rem', position: 'relative', zIndex: 1 }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1.5rem' }}>
          Captured Moments
        </p>
        <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', margin: 0, color: 'var(--noor-emerald-deep)', fontWeight: 400 }}>
          Memories
        </h2>
        <NoorGoldLine active={true} vertical style={{ height: '50px', margin: '2rem auto 0', opacity: 0.8 }} />
      </motion.div>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', padding: '0 1rem' }}>
        {activeImages.map((img, idx) => {
          // Create asymmetric varying heights and alignments
          const heights = ['400px', '500px', '350px', '450px'];
          const margins = ['0', '3rem 0 0', '1.5rem 0 0', '4rem 0 0'];
          
          return (
            <motion.figure 
              key={img.id} 
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                position: 'relative', 
                height: heights[idx % heights.length],
                margin: margins[idx % margins.length],
                borderRadius: '4px',
                border: '1px solid rgba(193, 160, 99, 0.4)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                padding: '6px',
                backgroundColor: 'var(--noor-ivory-dim)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                <Image 
                  src={img.url} 
                  alt={img.caption || `Gallery image ${idx + 1}`} 
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  className="noor-3d-tilt"
                />
                {/* Light Ivory vignette instead of dark overlay */}
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.4) 100%)' }} />
              </div>
            </motion.figure>
          )
        })}
      </div>
    </section>
  )
}
