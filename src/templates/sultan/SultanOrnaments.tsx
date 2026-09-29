import React from 'react'

// ============================================================
// SULTAN ORNAMENTS — All decorative SVG and layout components
// ============================================================

// ---- Gold Divider ----
export const SultanDivider = ({ style, width = 200 }: { style?: React.CSSProperties, width?: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', ...style }}>
    <div style={{ height: '1px', width: width * 0.35, background: 'linear-gradient(to right, transparent, var(--sultan-gold))' }} />
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="6" y="0" width="4" height="4" fill="var(--sultan-gold)" transform="rotate(45 8 8)" />
      <rect x="1" y="6" width="2" height="2" fill="var(--sultan-gold)" transform="rotate(45 8 8)" />
      <rect x="11" y="6" width="2" height="2" fill="var(--sultan-gold)" transform="rotate(45 8 8)" />
    </svg>
    <div style={{ height: '1px', width: width * 0.35, background: 'linear-gradient(to left, transparent, var(--sultan-gold))' }} />
  </div>
)

// ---- Crown ----
export const SultanCrown = ({ style, size = 40 }: { style?: React.CSSProperties, size?: number }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 60 40" fill="none" style={style}>
    <path d="M5 35 L5 18 L15 28 L30 5 L45 28 L55 18 L55 35 Z" fill="var(--sultan-gold)" opacity="0.9"/>
    <path d="M5 35 L55 35" stroke="var(--sultan-gold)" strokeWidth="2"/>
    <circle cx="30" cy="5" r="3" fill="var(--sultan-gold)"/>
    <circle cx="5" cy="18" r="2.5" fill="var(--sultan-gold)"/>
    <circle cx="55" cy="18" r="2.5" fill="var(--sultan-gold)"/>
    <circle cx="15" cy="28" r="2" fill="var(--sultan-gold)" opacity="0.7"/>
    <circle cx="45" cy="28" r="2" fill="var(--sultan-gold)" opacity="0.7"/>
  </svg>
)

// ---- Corner Ornament ----
export const SultanCornerOrnament = ({ position, style }: { position?: string, style?: React.CSSProperties }) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" style={style}>
    <path d="M2 2 L2 25 M2 2 L25 2" stroke="var(--sultan-gold)" strokeWidth="1.5" opacity="0.6"/>
    <path d="M2 2 L15 15" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.4"/>
    <circle cx="2" cy="2" r="2" fill="var(--sultan-gold)" opacity="0.8"/>
    <circle cx="8" cy="8" r="1.5" fill="var(--sultan-gold)" opacity="0.5"/>
    <path d="M12 2 Q2 12 2 22" stroke="var(--sultan-gold)" strokeWidth="0.8" opacity="0.3" fill="none"/>
  </svg>
)

// ---- Lantern ----
export const SultanLantern = ({ style }: { style?: React.CSSProperties }) => (
  <svg width="30" height="60" viewBox="0 0 30 60" fill="none" style={{ ...style, animation: 'sultan-flicker 3s ease-in-out infinite' }}>
    {/* Chain */}
    <line x1="15" y1="0" x2="15" y2="8" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.7"/>
    {/* Top cap */}
    <path d="M8 8 Q15 4 22 8 L22 12 Q15 9 8 12 Z" fill="var(--sultan-gold)" opacity="0.9"/>
    {/* Body */}
    <path d="M9 12 Q5 20 5 32 Q5 44 9 50 L21 50 Q25 44 25 32 Q25 20 21 12 Z" fill="rgba(203,164,93,0.15)" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.9"/>
    {/* Glow */}
    <ellipse cx="15" cy="32" rx="6" ry="10" fill="rgba(255, 200, 80, 0.4)"/>
    {/* Bottom */}
    <path d="M9 50 Q15 56 21 50" stroke="var(--sultan-gold)" strokeWidth="1" fill="none" opacity="0.8"/>
    <line x1="15" y1="50" x2="15" y2="58" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.5"/>
    {/* Ribs */}
    <line x1="15" y1="12" x2="5" y2="32" stroke="var(--sultan-gold)" strokeWidth="0.5" opacity="0.4"/>
    <line x1="15" y1="12" x2="25" y2="32" stroke="var(--sultan-gold)" strokeWidth="0.5" opacity="0.4"/>
    <line x1="15" y1="12" x2="15" y2="50" stroke="var(--sultan-gold)" strokeWidth="0.5" opacity="0.3"/>
  </svg>
)

// ---- Crescent Moon ----
export const SultanMoon = ({ style, size = 40 }: { style?: React.CSSProperties, size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
    <path d="M28 8 Q36 16 34 26 Q32 36 22 38 Q14 40 8 34 Q14 36 20 32 Q28 26 28 16 Q28 12 28 8 Z" fill="var(--sultan-gold)" opacity="0.9"/>
    <circle cx="26" cy="6" r="1.5" fill="var(--sultan-champagne)" opacity="0.8"/>
    <circle cx="32" cy="10" r="1" fill="var(--sultan-champagne)" opacity="0.6"/>
    <circle cx="30" cy="4" r="0.8" fill="var(--sultan-champagne)" opacity="0.5"/>
  </svg>
)

// ---- The Grand Arch Border (drawn over entire section) ----
export const SultanArchBorder = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    viewBox="0 0 400 900"
    preserveAspectRatio="none"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="sg-gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CBA45D" stopOpacity="0.3"/>
        <stop offset="50%" stopColor="#E6C97A" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#CBA45D" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="sg-gold-v" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#CBA45D" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="#E6C97A" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#CBA45D" stopOpacity="0.1"/>
      </linearGradient>
    </defs>
    
    {/* Outer border */}
    <rect x="10" y="10" width="380" height="880" stroke="url(#sg-gold)" strokeWidth="1.5"/>
    {/* Inner border */}
    <rect x="18" y="18" width="364" height="864" stroke="url(#sg-gold)" strokeWidth="0.8" opacity="0.5"/>
    
    {/* Top arch */}
    <path d="M 18 250 L 18 18 Q 200 -80 382 18 L 382 250" stroke="url(#sg-gold-v)" strokeWidth="2" fill="none"/>
    <path d="M 26 260 L 26 26 Q 200 -60 374 26 L 374 260" stroke="url(#sg-gold-v)" strokeWidth="0.8" fill="none" opacity="0.4"/>
    
    {/* Top finial / crown */}
    <path d="M190 8 L200 -10 L210 8" stroke="var(--sultan-gold)" strokeWidth="1.5" fill="none" opacity="0.8"/>
    <circle cx="200" cy="-12" r="4" fill="var(--sultan-gold)" opacity="0.8"/>
    
    {/* Top corners */}
    <path d="M10 10 L40 10 M10 10 L10 40" stroke="var(--sultan-gold)" strokeWidth="2" opacity="0.8"/>
    <path d="M390 10 L360 10 M390 10 L390 40" stroke="var(--sultan-gold)" strokeWidth="2" opacity="0.8"/>
    <path d="M10 890 L40 890 M10 890 L10 860" stroke="var(--sultan-gold)" strokeWidth="2" opacity="0.8"/>
    <path d="M390 890 L360 890 M390 890 L390 860" stroke="var(--sultan-gold)" strokeWidth="2" opacity="0.8"/>
    
    {/* Corner diamonds */}
    <rect x="10" y="10" width="6" height="6" fill="var(--sultan-gold)" transform="rotate(45 13 13)" opacity="0.8"/>
    <rect x="384" y="10" width="6" height="6" fill="var(--sultan-gold)" transform="rotate(45 387 13)" opacity="0.8"/>
    <rect x="10" y="884" width="6" height="6" fill="var(--sultan-gold)" transform="rotate(45 13 887)" opacity="0.8"/>
    <rect x="384" y="884" width="6" height="6" fill="var(--sultan-gold)" transform="rotate(45 387 887)" opacity="0.8"/>
    
    {/* Side decorative line (repeating) */}
    <line x1="10" y1="450" x2="18" y2="450" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.6"/>
    <line x1="382" y1="450" x2="390" y2="450" stroke="var(--sultan-gold)" strokeWidth="1" opacity="0.6"/>
  </svg>
)

// ---- Arch shape for portraits (arch-shaped photos) ----
export const SultanPortraitArch = ({ children, width = 240, height = 360, style }: {
  children: React.ReactNode, width?: number, height?: number, style?: React.CSSProperties
}) => {
  const r = width / 2
  return (
    <div style={{
      width, height, position: 'relative', flexShrink: 0,
      borderRadius: `${r}px ${r}px 0 0`,
      border: '2px solid var(--sultan-gold)',
      overflow: 'hidden',
      backgroundColor: 'var(--sultan-midnight)',
      ...style
    }}>
      {/* Inner border */}
      <div style={{
        position: 'absolute', inset: '5px',
        borderRadius: `${r - 5}px ${r - 5}px 0 0`,
        border: '1px solid rgba(203, 164, 93, 0.35)',
        pointerEvents: 'none', zIndex: 2
      }} />
      {children}
    </div>
  )
}

// ---- Arch card for events ----
export const SultanArchCard = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <svg className={className} style={style} viewBox="0 0 300 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="arc-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--sultan-ivory)"/>
        <stop offset="100%" stopColor="transparent"/>
      </linearGradient>
    </defs>
    <path d="M10 400 L10 140 Q150 0 290 140 L290 400" fill="url(#arc-grad)" stroke="var(--sultan-gold)" strokeWidth="2"/>
    <path d="M20 400 L20 150 Q150 20 280 150 L280 400" fill="none" stroke="rgba(203,164,93,0.3)" strokeWidth="1"/>
  </svg>
)

// ---- Hero Arch Frame ----
export const SultanArchHero = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={{ width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    viewBox="0 0 400 700"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="gold-grad-h" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="var(--sultan-gold)" stopOpacity="0.8"/>
        <stop offset="50%" stopColor="var(--sultan-champagne)" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="var(--sultan-gold)" stopOpacity="0.8"/>
      </linearGradient>
    </defs>
    
    {/* Outer Frame */}
    <rect x="15" y="15" width="370" height="670" stroke="url(#gold-grad-h)" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <rect x="25" y="25" width="350" height="650" stroke="url(#gold-grad-h)" strokeWidth="0.8" fill="none" opacity="0.4"/>
    
    {/* The Grand Arch */}
    <path d="M25 680 L25 280 C25 80 200 10 200 10 C200 10 375 80 375 280 L375 680" stroke="url(#gold-grad-h)" strokeWidth="3" fill="none"/>
    <path d="M40 680 L40 295 C40 110 200 45 200 45 C200 45 360 110 360 295 L360 680" stroke="url(#gold-grad-h)" strokeWidth="1" fill="none" opacity="0.4"/>
    
    {/* Top Finial */}
    <path d="M185 8 L200 -5 L215 8" stroke="var(--sultan-gold)" strokeWidth="2" fill="none" opacity="0.9"/>
    <circle cx="200" cy="-5" r="5" fill="var(--sultan-gold)" opacity="0.9"/>
    <circle cx="200" cy="-5" r="3" fill="var(--sultan-champagne)" opacity="0.5"/>
    
    {/* Corner Accents */}
    <path d="M15 15 L50 15 M15 15 L15 50" stroke="var(--sultan-gold)" strokeWidth="2.5" opacity="0.9"/>
    <path d="M385 15 L350 15 M385 15 L385 50" stroke="var(--sultan-gold)" strokeWidth="2.5" opacity="0.9"/>
    <path d="M15 685 L50 685 M15 685 L15 650" stroke="var(--sultan-gold)" strokeWidth="2.5" opacity="0.9"/>
    <path d="M385 685 L350 685 M385 685 L385 650" stroke="var(--sultan-gold)" strokeWidth="2.5" opacity="0.9"/>
  </svg>
)
