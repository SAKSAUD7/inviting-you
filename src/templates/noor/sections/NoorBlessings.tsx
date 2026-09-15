'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { NoorJasmine } from '../NoorOrnaments'

interface Props {
  family: any
}

const FamilyBlock = ({ label, name, lineDelay = 0 }: { label: string; name: string; lineDelay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay: lineDelay, ease: [0.25, 1, 0.5, 1] }}
    style={{ textAlign: 'center' }}
  >
    <div style={{
      fontFamily: 'var(--font-sans)',
      fontSize: '0.6rem',
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: 'var(--noor-gold-champagne)',
      marginBottom: '0.4rem',
    }}>
      {label}
    </div>
    <div style={{
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
      color: 'var(--noor-emerald-deep)',
      lineHeight: 1.6,
      fontStyle: 'italic',
    }}>
      {name}
    </div>
  </motion.div>
)

export default function NoorBlessings({ family }: Props) {
  if (!family) return null

  const hasBrideSide = !!(family.brideParents || family.bridePaternalGrandfather || family.brideMaternalGrandfather)
  const hasGroomSide = !!(family.groomFather || family.groomPaternalGrandfather || family.groomMaternalGrandfather)

  if (!hasBrideSide && !hasGroomSide) return null

  return (
    <section className="noor-section" style={{
      padding: '8rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--noor-ivory)',
    }}>
      {/* Subtle background watermark */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/images/noor-floral.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.04,
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.5 }}
        style={{
          maxWidth: '800px', margin: '0 auto',
          textAlign: 'center', position: 'relative', zIndex: 1,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          style={{ marginBottom: '4rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--noor-gold-champagne)',
            marginBottom: '1.5rem',
          }}>
            With the Blessings of
          </p>
          <h2 style={{
            fontFamily: 'var(--font-names)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--noor-emerald-deep)',
            fontWeight: 400,
            margin: '0 0 1.5rem',
          }}>
            Our Families
          </h2>
          <div style={{ width: '50px', height: '1px', background: 'var(--noor-gold-champagne)', margin: '0 auto', opacity: 0.5 }} />
        </motion.div>

        {/* Two-column family layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start',
        }}>
          {/* BRIDE SIDE */}
          {hasBrideSide && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--noor-emerald)',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(199,168,107,0.2)',
              }}>
                Bride's Side
              </div>

              {family.brideParents && (
                <FamilyBlock label="Parents" name={family.brideParents} lineDelay={0.1} />
              )}
              {family.bridePaternalGrandfather && (
                <FamilyBlock label="Paternal Grandfather" name={family.bridePaternalGrandfather} lineDelay={0.2} />
              )}
              {family.brideMaternalGrandfather && (
                <FamilyBlock label="Maternal Grandfather" name={family.brideMaternalGrandfather} lineDelay={0.3} />
              )}
            </div>
          )}

          {/* Divider ornament between columns (hidden on mobile stack) */}
          {hasBrideSide && hasGroomSide && (
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: '1rem',
              gridColumn: 'auto',
            }}>
              <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)', opacity: 0.4 }} />
              <NoorJasmine style={{ width: '20px', height: '20px' }} />
              <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)', opacity: 0.4 }} />
            </div>
          )}

          {/* GROOM SIDE */}
          {hasGroomSide && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--noor-emerald)',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(199,168,107,0.2)',
              }}>
                Groom's Side
              </div>

              {family.groomFather && (
                <FamilyBlock label="Parents" name={family.groomFather} lineDelay={0.1} />
              )}
              {family.groomPaternalGrandfather && (
                <FamilyBlock label="Paternal Grandfather" name={family.groomPaternalGrandfather} lineDelay={0.2} />
              )}
              {family.groomMaternalGrandfather && (
                <FamilyBlock label="Maternal Grandfather" name={family.groomMaternalGrandfather} lineDelay={0.3} />
              )}
            </div>
          )}
        </div>

        {/* Invitation From */}
        {family.invitationFromName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              marginTop: '5rem',
              padding: '3rem 2rem',
              border: '1px solid rgba(199,168,107,0.2)',
              borderRadius: '4px',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', top: '-0.6rem', left: '50%', transform: 'translateX(-50%)',
              background: 'var(--noor-ivory)',
              padding: '0 1rem',
            }}>
              <NoorJasmine style={{ width: '18px', height: '18px' }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--noor-gold-champagne)',
              marginBottom: '1rem',
            }}>
              Invitation By
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
              color: 'var(--noor-emerald-deep)',
              fontStyle: 'italic',
              lineHeight: 1.6,
            }}>
              {family.invitationFromName}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
