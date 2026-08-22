import React from 'react'
import { motion } from 'framer-motion'
import { NoorBotanicalStem, NoorJasmine } from '../NoorOrnaments'

interface Props {
  couple: any
}

export default function NoorStory({ couple }: Props) {
  // Only render if there's actually a story to tell
  if (!couple?.story && !couple?.howTheyMet) return null

  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '10rem 1.5rem', backgroundColor: 'var(--noor-white)' }}>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1.5rem', textAlign: 'center' }}>
          Our Story
        </div>
        
        <h2 style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: 'var(--noor-emerald-deep)', lineHeight: 1.1, margin: '0 0 3rem', fontWeight: 400, textAlign: 'center' }}>
          Two Stories,<br />One Beginning
        </h2>

        <NoorBotanicalStem animated={true} style={{ height: '80px', margin: '0 auto 4rem', transform: 'rotate(180deg)' }} />

        {couple.howTheyMet && (
          <div style={{ marginBottom: couple.story ? '5rem' : '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '2rem' }}>
              The Beginning
            </h3>
            
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              color: 'var(--noor-emerald-deep)', 
              fontSize: '1.1rem', 
              lineHeight: 2.2, 
              margin: 0, 
              textAlign: 'justify',
              maxWidth: '600px'
            }}>
              <span style={{ 
                float: 'left', 
                fontSize: '4rem', 
                lineHeight: '0.8', 
                paddingRight: '0.8rem', 
                paddingTop: '0.5rem',
                fontFamily: 'var(--font-names)', 
                color: 'var(--noor-gold-champagne)' 
              }}>
                {couple.howTheyMet.charAt(0)}
              </span>
              {couple.howTheyMet.substring(1)}
            </p>
          </div>
        )}

        {couple.howTheyMet && couple.story && (
          <div style={{ margin: '0 auto 5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.3 }} />
            <NoorJasmine />
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.3 }} />
          </div>
        )}

        {couple.story && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-emerald)', marginBottom: '2rem' }}>
              The Journey
            </h3>
            
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              color: 'var(--noor-emerald-deep)', 
              fontSize: '1.1rem', 
              lineHeight: 2.2, 
              margin: 0, 
              textAlign: 'justify',
              maxWidth: '600px'
            }}>
              {couple.story}
            </p>
          </div>
        )}

      </motion.div>
    </section>
  )
}
