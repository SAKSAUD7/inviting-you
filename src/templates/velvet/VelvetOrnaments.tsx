import React from 'react'

export const VelvetFloralDivider = () => (
  <div className="floral-divider" aria-hidden="true" style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '4rem 0', pointerEvents: 'none' }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/assets/images/floral-divider.webp" alt="" style={{ maxWidth: '300px', width: '80%', filter: 'brightness(0.9) contrast(1.2)' }} />
  </div>
)

export const VelvetGoldLine = ({ height = '60px', margin = '2rem auto' }: { height?: string, margin?: string }) => (
  <div style={{ width: '1px', height, background: 'linear-gradient(to bottom, var(--champagne), transparent)', margin, opacity: 0.6 }} aria-hidden="true" />
)
