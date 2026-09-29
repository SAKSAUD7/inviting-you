'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { WeddingCouple, WeddingFamily } from '@/types/wedding'
import { SultanDivider, SultanCrown, SultanArchBorder, SultanLantern, SultanPortraitArch } from '../SultanOrnaments'

interface Props {
  couple: WeddingCouple
  family?: WeddingFamily | null
}

export default function SultanCouple({ couple, family }: Props) {
  const groomPhoto = couple.groomPhoto || couple.couplePhoto || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop'
  const bridePhoto = couple.bridePhoto || couple.couplePhoto || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop'

  return (
    <section style={{ position: 'relative', backgroundColor: 'var(--sultan-ivory)', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Parchment texture overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-ivory-paper.png)', backgroundSize: 'cover', opacity: 0.5 }}/>

      {/* Floral decorations — from reference the couple section has ivory bg with florals at top and bottom */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '200px', height: '300px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '300px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.5, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '260px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.5, pointerEvents: 'none' }}/>

      {/* Gold border frame */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.5)', pointerEvents: 'none', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '22px', border: '1px solid rgba(203,164,93,0.25)', pointerEvents: 'none', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.8)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.8)' }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '5rem 2rem', width: '100%', maxWidth: '700px' }}
      >
        {/* The ROYAL UNION heading */}
        <SultanCrown size={38} style={{ marginBottom: '1rem' }}/>
        <div className="sultan-script" style={{ fontSize: '2.5rem', color: 'var(--sultan-brown)', marginBottom: '0.1rem' }}>The</div>
        <h2 className="sultan-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', textTransform: 'uppercase', fontStyle: 'normal', letterSpacing: '0.1em', color: 'var(--sultan-brown)', margin: '0 0 0.3rem' }}>
          ROYAL UNION
        </h2>
        <div className="sultan-label" style={{ color: 'rgba(42,28,18,0.7)', marginBottom: '3rem' }}>
          TWO SOULS • ONE DESTINY
        </div>

        {/* Portrait photos in arches */}
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '3rem' }}>
          
          {/* Groom */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <SultanPortraitArch width={220} height={310}>
              <img src={groomPhoto} alt={couple.groomName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </SultanPortraitArch>
            <div>
              <div className="sultan-heading" style={{ fontSize: '1.8rem', color: 'var(--sultan-brown)', fontStyle: 'normal', marginBottom: '0.2rem' }}>
                {couple.groomName}
              </div>
              {couple.groomQualification && (
                <div className="sultan-body" style={{ fontSize: '0.8rem', color: 'rgba(42,28,18,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                  {couple.groomQualification}
                </div>
              )}
              {family?.groomFather && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div className="sultan-script" style={{ fontSize: '1rem', color: 'var(--sultan-gold)', marginBottom: '0.2rem' }}>Son of</div>
                  <div className="sultan-body" style={{ fontSize: '0.82rem', color: 'rgba(42,28,18,0.8)', lineHeight: 1.6 }}>
                    {family.groomFather.split('\n').map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bride */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <SultanPortraitArch width={220} height={310}>
              <img src={bridePhoto} alt={couple.brideName} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
            </SultanPortraitArch>
            <div>
              <div className="sultan-heading" style={{ fontSize: '1.8rem', color: 'var(--sultan-brown)', fontStyle: 'normal', marginBottom: '0.2rem' }}>
                {couple.brideName}
              </div>
              {couple.brideQualification && (
                <div className="sultan-body" style={{ fontSize: '0.8rem', color: 'rgba(42,28,18,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem' }}>
                  {couple.brideQualification}
                </div>
              )}
              {family?.brideParents && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div className="sultan-script" style={{ fontSize: '1rem', color: 'var(--sultan-gold)', marginBottom: '0.2rem' }}>Daughter of</div>
                  <div className="sultan-body" style={{ fontSize: '0.82rem', color: 'rgba(42,28,18,0.8)', lineHeight: 1.6 }}>
                    {family.brideParents.split('\n').map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider & quote */}
        <SultanDivider style={{ margin: '0 auto 1.5rem' }} width={280}/>

        <p className="sultan-body" style={{ fontSize: '0.95rem', color: 'rgba(42,28,18,0.75)', fontStyle: 'italic', letterSpacing: '0.05em' }}>
          &ldquo;Different paths,<br/>but a destiny written as one.&rdquo;
        </p>
      </motion.div>
    </section>
  )
}
