import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { NoorGoldLine, NoorBotanicalCorner, NoorBotanicalCrest, NoorJasmine } from '../NoorOrnaments'

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

  const hasPhoto = !!couple.imageUrl
  const coupleImage = couple.imageUrl
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }
  }

  return (
    <section className="noor-section noor-shell" style={{ padding: '8rem 1.5rem 6rem', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--noor-paper)' }}>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}
      >
        
        {/* Header */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', marginBottom: '1rem' }}>
            Written in the Stars
          </div>
          <NoorGoldLine active={true} vertical style={{ height: '40px', margin: '0 auto' }} />
        </motion.div>

        {/* Editorial Composition */}
        <motion.div variants={itemVariants} style={{ position: 'relative', width: 'min(90vw, 500px)', marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {hasPhoto ? (
            // PHOTO MODE: Editorial Portrait
            <div className="noor-editorial-image" style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', marginBottom: '4rem', border: '1px solid rgba(193, 160, 99, 0.3)' }}>
              
              <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', top: '-60px', left: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, zIndex: 3,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', bottom: '-60px', right: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, transform: 'rotate(180deg)', zIndex: 3,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, -8, 0], rotate: [180, 179, 180] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 8, ease: "easeOut" }}
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              >
                <Image 
                  src={coupleImage}
                  alt="The Couple"
                  fill
                  style={{ objectFit: 'cover', filter: 'brightness(1.05) contrast(1.1) sepia(0.05)' }}
                />
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.3) 100%)', pointerEvents: 'none' }}></div>
            </div>
          ) : (
            // STATIONERY MODE: Luxury Botanical Monogram
            <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '4rem' }}>
              
              <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', top: '-60px', left: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, zIndex: 0,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img 
                  src="/images/noor_bouquet_isolated.png"
                  alt=""
                  style={{ 
                    position: 'absolute', bottom: '-60px', right: '-60px', width: '220px', 
                    pointerEvents: 'none', mixBlendMode: 'multiply', opacity: 0.9, transform: 'rotate(180deg)', zIndex: 0,
                    maskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 95%)'
                  }}
                  animate={{ y: [0, -8, 0], rotate: [180, 179, 180] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

              <div style={{ position: 'absolute', inset: '1rem', border: '1px solid var(--noor-gold-soft)' }}></div>
              
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(5rem, 15vw, 8rem)', color: 'var(--noor-gold-champagne)', lineHeight: 0.9 }}>
                  {getInitial(couple?.brideName)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
                  <div style={{ width: '30px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }}></div>
                  <NoorJasmine />
                  <div style={{ width: '30px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }}></div>
                </div>
                <div style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(5rem, 15vw, 8rem)', color: 'var(--noor-gold-champagne)', lineHeight: 0.9 }}>
                  {getInitial(couple?.groomName)}
                </div>
              </div>
            </div>
          )}

          {/* Names Reveal */}
          <div style={{ textAlign: 'center', width: '100%' }}>
            <motion.h2 variants={itemVariants} className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1, margin: 0, fontWeight: 400 }}>
              {couple.brideName}
            </motion.h2>
            <motion.div variants={itemVariants} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--noor-gold-champagne)', margin: '2rem 0' }}>
              <NoorBotanicalCrest />
            </motion.div>
            <motion.h2 variants={itemVariants} className="noor-gold-foil" style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', lineHeight: 1, margin: 0, fontWeight: 400 }}>
              {couple.groomName}
            </motion.h2>
          </div>
        </motion.div>



      </motion.div>
    </section>
  )
}
