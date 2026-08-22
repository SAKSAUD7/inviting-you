import React from 'react'
import { motion } from 'framer-motion'

// =========================================================================
// NOOR BOTANICAL SVG SYSTEM (Phase 02)
// =========================================================================

export const NoorBotanicalStem = ({ style, className, animated = false }: { style?: React.CSSProperties, className?: string, animated?: boolean }) => {
  const pathVariants: any = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { duration: 2, ease: [0.25, 1, 0.5, 1] } }
  }
  return (
    <svg className={className} style={{ width: '40px', height: 'auto', ...style }} viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path 
        d="M20,100 C15,70 30,40 20,0" 
        stroke="var(--noor-gold-champagne)" 
        strokeWidth="0.5" 
        fill="none"
        initial={animated ? "hidden" : "visible"}
        whileInView="visible"
        viewport={{ once: true }}
        variants={pathVariants}
      />
      <motion.path 
        d="M22,60 Q30,55 35,45 Q28,48 22,60" 
        fill="var(--noor-emerald-deep)"
        opacity="0.6"
        initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.6 }}
        whileInView={animated ? { scale: 1, opacity: 0.6, transition: { delay: 1, duration: 1 } } : undefined}
        viewport={{ once: true }}
        style={{ transformOrigin: '22px 60px' }}
      />
      <motion.path 
        d="M18,30 Q10,25 5,15 Q12,18 18,30" 
        fill="var(--noor-emerald-deep)"
        opacity="0.6"
        initial={animated ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 0.6 }}
        whileInView={animated ? { scale: 1, opacity: 0.6, transition: { delay: 1.5, duration: 1 } } : undefined}
        viewport={{ once: true }}
        style={{ transformOrigin: '18px 30px' }}
      />
    </svg>
  )
}

export const NoorFlowerSmall = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <svg className={className} style={{ width: '16px', height: '16px', ...style }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12,2 C14,8 18,10 22,12 C18,14 14,16 12,22 C10,16 6,14 2,12 C6,10 10,8 12,2 Z" fill="var(--noor-gold-champagne)" opacity="0.8" />
    <circle cx="12" cy="12" r="2" fill="var(--noor-ivory)" />
  </svg>
)

export const NoorJasmine = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <svg className={className} style={{ width: '24px', height: '24px', ...style }} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4C18 10 22 12 28 16C22 20 18 22 16 28C14 22 10 20 4 16C10 12 14 10 16 4Z" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" fill="var(--noor-white)" />
    <circle cx="16" cy="16" r="3" fill="var(--noor-gold-champagne)" />
  </svg>
)

export const NoorFloralDivider = ({ style, className, variant = 1 }: { style?: React.CSSProperties, className?: string, variant?: 1 | 2 | 3 | 4 }) => {
  if (variant === 1) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '0 2rem', ...style }}>
        <img 
          src="/images/noor_white_floral_divider_transparent.png" 
          alt="Floral Divider" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </div>
    )
  }
  if (variant === 2) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', ...style }}>
        <div style={{ height: '1px', width: '40px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }} />
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0L24 12H0L12 0Z" fill="var(--noor-emerald)" opacity="0.1" />
          <path d="M12 2L20 10H4L12 2Z" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" />
        </svg>
        <div style={{ height: '1px', width: '40px', background: 'var(--noor-gold-champagne)', opacity: 0.5 }} />
      </div>
    )
  }
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', ...style }}>
      <NoorBotanicalStem style={{ transform: 'rotate(90deg)' }} />
    </div>
  )
}

export const NoorBotanicalCrest = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
    <NoorJasmine style={{ marginBottom: '8px' }} />
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,10 Q20,-10 40,10" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" fill="none" />
      <path d="M10,10 Q20,20 30,10" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" fill="none" />
    </svg>
  </div>
)

export const NoorBotanicalCorner = ({ style, className, position = 'top-left' }: { style?: React.CSSProperties, className?: string, position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
      default: return 'none';
    }
  }
  
  return (
    <svg className={className} style={{ position: 'absolute', width: '80px', height: '80px', transform: getTransform(), opacity: 0.8, pointerEvents: 'none', ...style }} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L100,0 C100,50 50,100 0,100 L0,0 Z" fill="var(--noor-gold-whisper)" />
      <path d="M0,20 Q40,20 60,60" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" fill="none" />
      <path d="M20,0 Q20,40 60,60" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" fill="none" />
      <circle cx="60" cy="60" r="3" fill="var(--noor-white)" stroke="var(--noor-gold-champagne)" strokeWidth="0.5" />
    </svg>
  )
}

// =========================================================================
// BACKWARD COMPATIBILITY / UTILITIES
// =========================================================================

export const NoorGoldLine = ({ active = false, vertical = false, style }: { active?: boolean, vertical?: boolean, style?: React.CSSProperties }) => {
  return (
    <div 
      className={`noor-gold-line ${active ? 'drawn' : ''}`} 
      style={{ 
        [vertical ? 'width' : 'height']: '1px', 
        [vertical ? 'height' : 'width']: '0',
        background: 'linear-gradient(to bottom, transparent, var(--noor-gold-champagne), transparent)',
        transition: `${vertical ? 'height' : 'width'} 1.5s cubic-bezier(0.16, 1, 0.3, 1)`,
        ...style 
      }} 
    />
  )
}

export const NoorIslamicGeometry = ({ style }: { style?: React.CSSProperties }) => (
  <img 
    src="/images/noor-islamic-rosette.png" 
    alt="" 
    aria-hidden="true" 
    style={{ position: 'absolute', opacity: 0.05, pointerEvents: 'none', width: '200px', mixBlendMode: 'multiply', ...style }} 
  />
)

// Kept for backward compatibility if used anywhere
export const NoorBotanicalWatermark = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <div className={className} style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', background: 'url(/images/noor-islamic-rosette.png) center/400px repeat', ...style }} />
)
