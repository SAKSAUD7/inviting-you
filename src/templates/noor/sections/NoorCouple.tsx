import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { NoorArchFrame, NoorGoldLine, NoorJasmineGarland, NoorIslamicGeometry } from '../NoorOrnaments'

interface Props {
  couple: any
}

const getInitial = (name?: string | null) => {
  if (!name) return ''
  const words = name.split(' ')
  const titles = ['syed', 'syeda', 'mohammed', 'muhammad', 'mr', 'mrs', 'dr']
  if (words.length > 1 && titles.includes(words[0].toLowerCase())) {
    return words[1][0]
  }
  return words[0][0]
}

export default function NoorCouple({ couple }: Props) {
  if (!couple) return null

  // If no explicit image provided, we default to STATIONERY MODE.
  const hasPhoto = !!couple.imageUrl
  const coupleImage = couple.imageUrl
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section className="noor-section noor-shell" style={{ padding: '7rem 1.5rem 6rem', position: 'relative', overflow: 'hidden' }}>

      {/* ── Background Botanical & Geometry ── */}
      <NoorIslamicGeometry style={{ top: '10%', left: '-50px', width: '300px', opacity: 0.05 }} />
      <NoorIslamicGeometry style={{ bottom: '10%', right: '-50px', width: '300px', opacity: 0.05 }} />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}
      >
        
        <motion.div variants={itemVariants} style={{ position: 'relative', width: 'min(88vw, 420px)', marginBottom: '3.5rem' }}>
          
          <NoorArchFrame style={{ aspectRatio: hasPhoto ? '3/4' : '4/5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            {hasPhoto ? (
              // PHOTO MODE
              <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--noor-emerald-deep)' }}>
                <motion.div
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
                >
                  <Image 
                    src={coupleImage}
                    alt="The Couple"
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(0.9) contrast(1.05)' }}
                  />
                </motion.div>
              </div>
            ) : (
              // STATIONERY MODE
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '2rem', textAlign: 'center' }}>
                <NoorJasmineGarland className="noor-sway-slow" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120px', opacity: 0.7 }} />
                
                <div className="noor-gold-foil" style={{
                  width: '100px', height: '100px', display: 'grid', placeItems: 'center', 
                  border: '1px solid rgba(212, 175, 55, 0.4)', borderRadius: '50%',
                  fontFamily: 'var(--font-display)', letterSpacing: '.15em', 
                  fontSize: '28px', marginTop: '40px', marginBottom: '20px'
                }}>
                  {getInitial(couple?.brideName)} & {getInitial(couple?.groomName)}
                </div>

                <div className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                  {couple.brideName}
                </div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--noor-gold)', margin: '1rem 0' }}>
                  And
                </div>
                <div className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: 1.1 }}>
                  {couple.groomName}
                </div>
              </div>
            )}
          </NoorArchFrame>

        </motion.div>

        {/* Outer Typography (Only shown if Photo Mode, because Stationery mode has it inside the arch) */}
        {hasPhoto && (
          <div style={{ textAlign: 'center' }}>
            <motion.h2 variants={itemVariants} className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, margin: 0 }}>
              {couple.brideName}
            </motion.h2>
            <motion.div variants={itemVariants} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--noor-ink-light)', margin: '1.5rem 0' }}>
              With
            </motion.div>
            <motion.h2 variants={itemVariants} className="noor-gold-foil" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.1, margin: 0 }}>
              {couple.groomName}
            </motion.h2>
          </div>
        )}

        <motion.div variants={itemVariants} style={{ textAlign: 'center', width: '100%' }}>
          <NoorGoldLine active={true} vertical style={{ height: '60px', margin: '2.5rem auto' }} />

          <p className="noor-letterpress" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', letterSpacing: '0.1em' }}>
            {couple.gregorianDisplay?.replace(/\n/g, ' ')}
          </p>
        </motion.div>

      </motion.div>
    </section>
  )
}
