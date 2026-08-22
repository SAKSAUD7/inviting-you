import React from 'react'
import { motion } from 'framer-motion'
import { NoorBotanicalCorner, NoorJasmine, NoorBotanicalStem } from '../NoorOrnaments'

interface Props {
  couple: any
}

export default function NoorClosing({ couple }: Props) {
  return (
    <section className="noor-section" style={{ position: 'relative', overflow: 'hidden', padding: '12rem 2rem', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--noor-white)' }}>
      
      {/* ── Subtle Ivory Gradient Backdrop ── */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, var(--noor-ivory) 0%, var(--noor-white) 100%)', pointerEvents: 'none' }} />

      {/* Large Corner Botanicals to frame the closing softly */}
      {/* Large Corner Botanicals to frame the closing softly */}
      <NoorBotanicalCorner position="top-left" style={{ top: 0, left: 0, opacity: 0.15, pointerEvents: 'none' }} />
      <NoorBotanicalCorner position="bottom-right" style={{ bottom: 0, right: 0, opacity: 0.15, pointerEvents: 'none' }} />

      <motion.div 
        initial="hidden"
        whileInView="revealed"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: { opacity: 0 },
          revealed: { opacity: 1, transition: { duration: 2, ease: [0.25, 1, 0.5, 1] } }
        }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        
        {/* The Blooming Farewell Ornament */}
        <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            variants={{
              hidden: { scale: 0.9, opacity: 0, y: 20 },
              revealed: { scale: 1, opacity: 0.9, y: 0, transition: { delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] } }
            }}
          >
            <motion.img 
              src="/images/noor_bouquet_isolated.png" 
              alt="" 
              style={{ width: '260px', height: 'auto', mixBlendMode: 'multiply', pointerEvents: 'none', maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)', WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)' }}
              animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <motion.p 
          variants={{
            hidden: { opacity: 0, y: 20 },
            revealed: { opacity: 1, y: 0, transition: { delay: 1.5, duration: 1.5 } }
          }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '3rem' }}
        >
          With Love &amp; Blessings
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.98 },
            revealed: { opacity: 1, scale: 1, transition: { delay: 2, duration: 2, ease: "easeOut" } }
          }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 1, margin: 0, fontWeight: 400 }}>
            {couple?.brideName}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '2rem 0' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.4 }} />
            <div style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-gold-antique)', fontSize: '1.5rem', fontStyle: 'italic' }}>
              &
            </div>
            <div style={{ width: '40px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.4 }} />
          </div>
          <h2 className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(3rem, 10vw, 5.5rem)', lineHeight: 1, margin: 0, fontWeight: 400 }}>
            {couple?.groomName}
          </h2>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, height: 0 },
            revealed: { opacity: 1, height: '80px', transition: { delay: 3, duration: 1.5 } }
          }}
          style={{ width: '1px', background: 'linear-gradient(to bottom, var(--noor-gold-champagne), transparent)', margin: '4rem auto 3rem', opacity: 0.5 }} 
        />

        <motion.p 
          variants={{
            hidden: { opacity: 0 },
            revealed: { opacity: 1, transition: { delay: 3.5, duration: 1.5 } }
          }}
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--noor-emerald)', fontSize: '1.1rem', fontStyle: 'italic', lineHeight: 2, marginBottom: '3rem', letterSpacing: '0.05em' }}
        >
          Thank you for celebrating this blessed occasion with us.
          <br />Your presence, prayers, and blessings mean the world to us.
        </motion.p>

      </motion.div>
    </section>
  )
}
