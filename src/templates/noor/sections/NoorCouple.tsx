'use client'

import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { NoorGoldLine, NoorBotanicalCrest, NoorJasmine } from '../NoorOrnaments'

interface Props {
  couple: any
}

const getInitial = (name?: string | null) => {
  if (!name) return ''
  const words = name.trim().split(' ')
  const titles = ['syed', 'syeda', 'mohammed', 'muhammad', 'mr', 'mrs', 'dr']
  if (words.length > 1 && titles.includes(words[0].toLowerCase())) return words[1][0].toUpperCase()
  return words[0][0].toUpperCase()
}

export default function NoorCouple({ couple }: Props) {
  if (!couple) return null

  const hasPhoto = !!couple.imageUrl

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [0.25, 1, 0.5, 1] } }
  }

  return (
    <section
      className="noor-section noor-shell"
      style={{
        padding: '4rem 1rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--noor-paper)',
      }}
    >
      {/* Ivory paper texture */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/noor-ivory-paper.png)',
        backgroundSize: 'cover',
        opacity: 0.15,
        pointerEvents: 'none',
      }} />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        style={{
          maxWidth: '520px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section label + divider */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--noor-gold-champagne)',
            marginBottom: '1rem',
          }}>
            Written in the Stars
          </div>
          <NoorGoldLine active vertical style={{ height: '40px', margin: '0 auto' }} />
        </motion.div>

        {hasPhoto ? (
          /* ── PHOTO MODE ── */
          <motion.div variants={itemVariants} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              width: 'min(90vw, 420px)',
              aspectRatio: '3/4',
              overflow: 'hidden',
              border: '1px solid rgba(193,160,99,0.3)',
              marginBottom: '3rem',
            }}>
              <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 8, ease: 'easeOut' }}
                style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
              >
                <Image src={couple.imageUrl} alt="The Couple" fill style={{ objectFit: 'cover', filter: 'brightness(1.05) contrast(1.1) sepia(0.05)' }} />
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 60%, rgba(255,255,255,0.3) 100%)', pointerEvents: 'none' }} />
            </div>
            {/* Names — photo mode */}
            <div style={{ textAlign: 'center', width: '100%' }}>
              <motion.h2 variants={itemVariants} style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.7rem,6.5vw,3.5rem)', lineHeight: 1, margin: '0 0 0.4rem', fontWeight: 400, background: 'linear-gradient(135deg,#bd9a33 0%,#e8d070 40%,#a68427 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple.brideName}</motion.h2>
              {couple.brideQualification && <motion.div variants={itemVariants} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--noor-emerald)', opacity: 0.8, marginBottom: '1rem' }}>{couple.brideQualification}</motion.div>}
              <motion.div variants={itemVariants} style={{ margin: '0.6rem 0 1rem', display: 'flex', justifyContent: 'center' }}><NoorBotanicalCrest /></motion.div>
              <motion.h2 variants={itemVariants} style={{ fontFamily: 'var(--font-names)', fontSize: 'clamp(1.7rem,6.5vw,3.5rem)', lineHeight: 1, margin: '0 0 0.4rem', fontWeight: 400, background: 'linear-gradient(135deg,#bd9a33 0%,#e8d070 40%,#a68427 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{couple.groomName}</motion.h2>
              {couple.groomQualification && <motion.div variants={itemVariants} style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', opacity: 0.8 }}>{couple.groomQualification}</motion.div>}
            </div>
          </motion.div>
        ) : (
          /*
           * ═══════════════════════════════════════════════════
           * ILLUSTRATION MODE — Art-directed floral composition
           *
           * FRAME = full card width (up to 520px)
           * TOP corners   → noor-floral-tl.png
           *   TL: natural orientation (cluster at top-left, vines trailing down-right)
           *   TR: scaleX(-1) only — horizontal mirror
           * BOTTOM corners → noor_bouquet_isolated.png
           *   Round bouquet with stems pointing down.
           *   BL: slight CCW tilt (rotate(-15deg)), anchored at bottom-left
           *   BR: slight CW tilt (rotate(15deg)), anchored at bottom-right
           *   NO scaleY(-1) — bouquet grows naturally upward from bottom
           *
           * Z-INDEX:
           *   bg texture:    0
           *   gold border:   1
           *   bottom flowers: 2  (behind content so stems don't cover text)
           *   top flowers:    3  (above content at corners)
           *   content:       3  (same level — flowers are in corners, not center)
           * ═══════════════════════════════════════════════════
           */
          <motion.div
            variants={itemVariants}
            style={{
              position: 'relative',
              width: '100%',
              /* overflow visible so flowers bleed outside border */
              overflow: 'visible',
              /* Apply multiply to the entire stacking context so it blends 
                 with the section background, fixing the white/grey box issue */
              mixBlendMode: 'multiply',
            }}
          >

            {/* ── GOLD BORDER FRAME ── */}
            <div style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid rgba(199,168,107,0.42)',
              zIndex: 1,
              pointerEvents: 'none',
            }} />

            {/* ══════════════════════════════════════
                TOP-LEFT — noor-floral-tl.png
                Natural orientation. Cluster anchored
                at top-left; vines trail inward.
                Bleeds slightly outside the border.
            ══════════════════════════════════════ */}
            <img
              src="/images/noor-floral-tl.png"
              alt="" aria-hidden="true"
              style={{
                position: 'absolute',
                top: 'clamp(-20px, -4vw, -10px)',
                left: 'clamp(-20px, -4vw, -10px)',
                width: 'clamp(140px, 42vw, 220px)',
                height: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
                opacity: 0.92,
                zIndex: 3,
                transformOrigin: 'top left',
                mixBlendMode: 'multiply',
                filter: 'contrast(1.4) brightness(1.15)',
              }}
            />

            {/* TOP-RIGHT — mirrored in place, symmetrical negative offset */}
            <img
              src="/images/noor-floral-tl.png"
              alt="" aria-hidden="true"
              style={{
                position: 'absolute',
                top: 'clamp(-20px, -4vw, -10px)',
                right: 'clamp(-20px, -4vw, -10px)',
                width: 'clamp(140px, 42vw, 220px)',
                height: 'auto',
                pointerEvents: 'none',
                userSelect: 'none',
                transform: 'scaleX(-1)',
                transformOrigin: 'center',
                mixBlendMode: 'multiply',
                filter: 'contrast(1.4) brightness(1.15)',
                opacity: 0.92,
                zIndex: 3,
              }}
            />


            {/* ══════════════════════════════════════
                CONTENT — safe zone inside the frame.
                Generous top padding clears the top flower clusters.
                Generous bottom padding clears the bouquet blooms.
                Left/right padding keeps text away from vines.
            ══════════════════════════════════════ */}
            <div style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              /*
                Top padding: top flower cluster is ~55% of image height
                  = 42vw * 0.55 ≈ on 390px → ~90px. Use 120px to give breathing room.
                Bottom padding: bouquet bloom rises ~60% from bottom of image
                  = 35vw * 0.6 ≈ on 390px → ~82px. Use 110px for breathing room.
              */
              padding: 'clamp(120px, 30vw, 180px) clamp(20px, 6vw, 40px) clamp(110px, 28vw, 160px)',
            }}>

              {/* Couple illustration */}
              <motion.img
                src="/images/noor_couple_illustration.png"
                alt="The Couple"
                style={{
                  width: '100%',
                  maxWidth: '240px',
                  height: 'auto',
                  mixBlendMode: 'multiply',
                  filter: 'drop-shadow(0 8px 24px rgba(160,130,80,0.12))',
                  marginBottom: '1rem',
                }}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
              />

              {/* A – Z monogram */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.4rem' }}>
                <span style={{
                  fontFamily: 'var(--font-names)',
                  fontSize: 'clamp(2.5rem, 9vw, 4rem)',
                  lineHeight: 0.9,
                  background: 'linear-gradient(135deg, #bd9a33 0%, #e8d070 40%, #a68427 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
                }}>
                  {getInitial(couple?.brideName)}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{ width: '18px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }} />
                  <NoorJasmine style={{ width: '13px', height: '13px' }} />
                  <div style={{ width: '18px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }} />
                </div>
                <span style={{
                  fontFamily: 'var(--font-names)',
                  fontSize: 'clamp(2.5rem, 9vw, 4rem)',
                  lineHeight: 0.9,
                  background: 'linear-gradient(135deg, #bd9a33 0%, #e8d070 40%, #a68427 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
                }}>
                  {getInitial(couple?.groomName)}
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: '50px', height: '1px', background: 'var(--noor-gold-champagne)', opacity: 0.3, marginBottom: '1.4rem' }} />

              {/* Bride name */}
              <h2 style={{
                fontFamily: 'var(--font-names)',
                fontSize: 'clamp(1.4rem, 5vw, 2.6rem)',
                lineHeight: 1.1,
                margin: '0 0 0.25rem',
                fontWeight: 400,
                background: 'linear-gradient(135deg, #bd9a33 0%, #e8d070 40%, #a68427 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {couple.brideName}
              </h2>
              {couple.brideQualification && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.57rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--noor-emerald)', opacity: 0.75, marginBottom: '0.8rem' }}>
                  {couple.brideQualification}
                </div>
              )}

              <div style={{ margin: '0.3rem 0 0.8rem', display: 'flex', justifyContent: 'center' }}>
                <NoorBotanicalCrest />
              </div>

              {/* Groom name */}
              <h2 style={{
                fontFamily: 'var(--font-names)',
                fontSize: 'clamp(1.4rem, 5vw, 2.6rem)',
                lineHeight: 1.1,
                margin: '0 0 0.25rem',
                fontWeight: 400,
                background: 'linear-gradient(135deg, #bd9a33 0%, #e8d070 40%, #a68427 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {couple.groomName}
              </h2>
              {couple.groomQualification && (
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--noor-emerald)', opacity: 0.75 }}>
                  {couple.groomQualification}
                </div>
              )}

            </div>{/* end content safe zone */}
          </motion.div>
        )}

      </motion.div>
    </section>
  )
}
