'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SultanDivider, SultanCrown, SultanLantern, SultanMoon } from '../SultanOrnaments'

interface Props {
  brideName: string
  groomName: string
}

export default function SultanClosing({ brideName, groomName }: Props) {
  const bFirst = brideName.split(' ')[0]
  const gFirst = groomName.split(' ')[0]

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      backgroundColor: 'var(--sultan-midnight)',
      overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      {/* Palace BG */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/noor-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center bottom', opacity: 0.35, filter: 'brightness(0.7)' }}/>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center 60%, rgba(7,20,33,0.2) 0%, rgba(7,20,33,0.88) 80%)' }}/>

      {/* Florals */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '220px', height: '340px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', opacity: 0.8, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', top: 0, right: 0, width: '220px', height: '340px', backgroundImage: 'url(/images/noor-floral-tl.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transform: 'scaleX(-1)', opacity: 0.8, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '200px', height: '280px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom left', opacity: 0.6, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '200px', height: '280px', backgroundImage: 'url(/images/noor-floral.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right', transform: 'scaleX(-1)', opacity: 0.6, pointerEvents: 'none' }}/>

      {/* Arch border */}
      <div style={{ position: 'absolute', inset: '14px', border: '1.5px solid rgba(203,164,93,0.4)', pointerEvents: 'none', borderRadius: '200px 200px 0 0', zIndex: 1 }}/>
      <div style={{ position: 'absolute', inset: '24px', border: '1px solid rgba(203,164,93,0.2)', pointerEvents: 'none', borderRadius: '190px 190px 0 0', zIndex: 1 }}/>

      {/* Lanterns */}
      <SultanLantern style={{ position: 'absolute', top: '60px', left: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '60px', right: '30px', zIndex: 2, transform: 'scale(0.9)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '40px', left: '18%', zIndex: 2, transform: 'scale(0.7)' }}/>
      <SultanLantern style={{ position: 'absolute', top: '40px', right: '18%', zIndex: 2, transform: 'scale(0.7)' }}/>

      {/* Moon */}
      <SultanMoon size={50} style={{ position: 'absolute', top: '20%', right: '15%', zIndex: 2, opacity: 0.9 }}/>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 3, textAlign: 'center', padding: '5rem 2rem', maxWidth: '500px', margin: '0 auto' }}
      >
        <SultanCrown size={45} style={{ marginBottom: '1.5rem' }}/>

        {/* Thank You script */}
        <div className="sultan-script" style={{ fontSize: 'clamp(2.8rem, 8vw, 4rem)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
          Thank You
        </div>
        <div className="sultan-label" style={{ opacity: 0.7, lineHeight: 2, marginBottom: '2.5rem' }}>
          FOR BEING A PART OF<br/>OUR JOURNEY
        </div>

        <SultanDivider style={{ margin: '0 auto 2.5rem' }} width={200}/>

        {/* Couple names in script */}
        <div className="sultan-script" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', color: 'var(--sultan-champagne)', lineHeight: 1.2 }}>
          {gFirst} &amp; {bFirst}
        </div>

        <SultanDivider style={{ margin: '2rem auto 2rem' }} width={150}/>

        {/* Closing dua */}
        <p className="sultan-body" style={{ fontSize: '0.82rem', opacity: 0.6, fontStyle: 'italic', letterSpacing: '0.05em', lineHeight: 1.8 }}>
          &ldquo;May Allah bless our union<br/>and keep you in His grace.&rdquo;
        </p>

        {/* Floral divider */}
        <div style={{ marginTop: '2.5rem' }}>
          <div style={{ width: '160px', height: '40px', backgroundImage: 'url(/images/noor-floral-divider.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', margin: '0 auto', opacity: 0.7 }}/>
        </div>
      </motion.div>
    </section>
  )
}
