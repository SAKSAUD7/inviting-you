import React from 'react'

export const NoorBotanicalWatermark = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  // We keep this as a soft background texture, but update it to use the rosette/pattern if desired, 
  // or just a soft div if we are relying on the new ivory/emerald backgrounds.
  // We'll leave it simple here, but most large watermarks will now use the textures directly.
  <div className={className} style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none', background: 'url(/images/noor-islamic-rosette.png) center/400px repeat', ...style }} />
)

export const NoorIslamicGeometry = ({ style }: { style?: React.CSSProperties }) => (
  <img 
    src="/images/noor-islamic-rosette.png" 
    alt="" 
    aria-hidden="true" 
    style={{ position: 'absolute', opacity: 0.1, pointerEvents: 'none', width: '200px', mixBlendMode: 'multiply', ...style }} 
  />
)

export const NoorGoldMehrab = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <img 
    src="/images/noor-mehrab-gold.png" 
    alt="" 
    aria-hidden="true" 
    className={className}
    style={{ display: 'block', width: '100%', maxWidth: '600px', height: 'auto', margin: '0 auto', pointerEvents: 'none', mixBlendMode: 'multiply', ...style }} 
  />
)

export const NoorJasmineGarland = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
  <img 
    src="/images/noor-jasmine-garland.png" 
    alt="" 
    aria-hidden="true" 
    className={className}
    style={{ display: 'block', width: '100%', maxWidth: '300px', height: 'auto', pointerEvents: 'none', mixBlendMode: 'multiply', ...style }} 
  />
)

export const NoorArchFrame = ({ children, style, className }: { children: React.ReactNode, style?: React.CSSProperties, className?: string }) => (
  <div className={className} style={{ position: 'relative', padding: '10px', maxWidth: '600px', margin: '0 auto', ...style }}>
    {/* Use the new gold Mehrab asset as the frame border by placing it absolute at zIndex 0 so it stays behind the text */}
    <NoorGoldMehrab style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', zIndex: 0, opacity: 0.9 }} />
    
    {/* Arch content container with a semi-transparent ivory background to mask the dense pattern in the center of the Mehrab */}
    <div style={{ position: 'relative', borderRadius: '134px 134px 0 0', overflow: 'hidden', height: '100%', background: 'rgba(248, 245, 240, 0.85)', zIndex: 1, padding: '2rem 1rem' }}>
      {children}
    </div>
  </div>
)

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
