import React from 'react'
import Image from 'next/image'

/**
 * WalimaPetalDivider
 * A delicate botanical/petal SVG divider replacing Velvet's floral-divider.webp.
 * Fully inline SVG so no external assets needed.
 */
export const WalimaPetalDivider = () => (
  <div className="walima-petal-divider" aria-hidden="true">
    <svg viewBox="0 0 240 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wpd-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#d4888a" stopOpacity="0"/>
          <stop offset="30%"  stopColor="#e8b88a" stopOpacity="0.7"/>
          <stop offset="50%"  stopColor="#d4888a" stopOpacity="1"/>
          <stop offset="70%"  stopColor="#e8b88a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#d4888a" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {/* Main horizontal line */}
      <line x1="20" y1="14" x2="220" y2="14" stroke="url(#wpd-grad)" strokeWidth="0.8"/>
      {/* Center petal cluster */}
      <circle cx="120" cy="14" r="3"   fill="#d4888a" opacity="0.6"/>
      <circle cx="120" cy="14" r="1.2" fill="#fff"    opacity="0.4"/>
      {/* Side diamonds */}
      <path d="M100 14 L103 11 L106 14 L103 17 Z" fill="#d4888a" opacity="0.5"/>
      <path d="M134 14 L137 11 L140 14 L137 17 Z" fill="#d4888a" opacity="0.5"/>
      {/* Petal leaves at center */}
      <path d="M120 8 C117 5 114 7 120 3 C126 7 123 5 120 8 Z" fill="#d4888a" opacity="0.3"/>
      <path d="M120 20 C117 23 114 21 120 25 C126 21 123 23 120 20 Z" fill="#d4888a" opacity="0.3"/>
      {/* Small accent circles */}
      <circle cx="82"  cy="14" r="1.5" fill="#d4888a" opacity="0.35"/>
      <circle cx="158" cy="14" r="1.5" fill="#d4888a" opacity="0.35"/>
      <circle cx="60"  cy="14" r="1"   fill="#d4888a" opacity="0.22"/>
      <circle cx="180" cy="14" r="1"   fill="#d4888a" opacity="0.22"/>
    </svg>
  </div>
)

/**
 * WalimaCornerBotanical
 * A subtle SVG corner botanical motif used in the hero corners.
 */
export const WalimaCornerBotanical = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main branch curves */}
    <path d="M8 72 Q20 50 36 36 Q52 22 72 8"
      stroke="#d4888a" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    {/* Secondary branch */}
    <path d="M8 52 Q20 42 30 30"
      stroke="#d4888a" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
    <path d="M28 72 Q38 58 46 44"
      stroke="#d4888a" strokeWidth="0.5" fill="none" strokeLinecap="round"/>
    {/* Small petal blooms */}
    {[
      [18, 60], [30, 44], [44, 30], [58, 18],
    ].map(([x, y], i) => (
      <g key={i} transform={`translate(${x},${y})`}>
        <circle r="4" fill="#f2c4c4" opacity="0.6"/>
        <circle r="2" fill="#d4888a" opacity="0.5"/>
        <circle r="0.8" fill="#fff" opacity="0.4"/>
      </g>
    ))}
    {/* Leaf shapes */}
    {[
      [22, 54, -30], [36, 38, 15], [50, 24, -20],
    ].map(([x, y, rot], i) => (
      <ellipse key={i}
        cx={x as number} cy={y as number}
        rx="5" ry="2.5"
        fill="#9aad96"
        opacity="0.4"
        transform={`rotate(${rot as number},${x as number},${y as number})`}
      />
    ))}
    {/* Small accent dots */}
    <circle cx="14" cy="66" r="1.2" fill="#d4888a" opacity="0.35"/>
    <circle cx="66" cy="14" r="1.2" fill="#d4888a" opacity="0.35"/>
  </svg>
)

/**
 * WalimaIslamicGeometricDivider
 * A subtle geometric Islamic ornamental divider for section separations.
 */
export const WalimaIslamicDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: '0 auto', width: 'min(320px, 80vw)', opacity: 0.5 }} aria-hidden="true">
    <svg viewBox="0 0 120 14" fill="none" style={{ flex: 1 }}>
      <path d="M2 7 Q30 2 60 7 Q90 12 118 7" stroke="#d4888a" strokeWidth="0.7" fill="none"/>
      <circle cx="60" cy="7" r="1.8" fill="#d4888a"/>
      <circle cx="30" cy="6.5" r="1" fill="#d4888a" opacity="0.6"/>
      <circle cx="90" cy="6.5" r="1" fill="#d4888a" opacity="0.6"/>
    </svg>
    {/* Centre geometric star */}
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
      <path d="M10 2L11.8 7.6H17.6L13 11.4L14.8 17L10 13.2L5.2 17L7 11.4L2.4 7.6H8.2Z"
        stroke="#d4888a" strokeWidth="0.8" fill="none"/>
      <circle cx="10" cy="10" r="1.5" fill="#d4888a" opacity="0.6"/>
    </svg>
    <svg viewBox="0 0 120 14" fill="none" style={{ flex: 1 }}>
      <path d="M2 7 Q30 12 60 7 Q90 2 118 7" stroke="#d4888a" strokeWidth="0.7" fill="none"/>
      <circle cx="60" cy="7" r="1.8" fill="#d4888a"/>
      <circle cx="30" cy="7.5" r="1" fill="#d4888a" opacity="0.6"/>
      <circle cx="90" cy="7.5" r="1" fill="#d4888a" opacity="0.6"/>
    </svg>
  </div>
)

/**
 * WalimaFloralDividerImg
 * The raw divider image — used inside WalimaSectionWrap.
 * Positioned absolutely at the boundary by the wrapper.
 */
const WalimaFloralDividerImg = () => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      transform: 'translateY(50%)',   /* Exactly half above, half below the section boundary */
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      pointerEvents: 'none',
    }}
    aria-hidden="true"
  >
    <img
      src="/assets/images/walima-lavender-divider.png?v=3"
      alt=""
      style={{
        width: 'clamp(200px, 38vw, 420px)',
        height: 'auto',
        display: 'block',
        background: 'transparent',
        filter: 'drop-shadow(0 2px 8px rgba(139, 100, 156, 0.15))',
      }}
    />
  </div>
)

/**
 * WalimaSectionWrap
 * Wraps a section and pins the floral divider at its bottom boundary.
 * The next section must NOT clip the divider — it renders on top via z-index.
 */
export const WalimaSectionWrap = ({ children, withDivider = true }: { children: React.ReactNode; withDivider?: boolean }) => (
  <div
    style={{
      position: 'relative',
      overflow: 'visible',
    }}
  >
    {children}
    {withDivider && <WalimaFloralDividerImg />}
  </div>
)

/**
 * WalimaFloralDivider (kept for backward compat — now a no-op spacer)
 * Use WalimaSectionWrap instead for proper boundary positioning.
 */
export const WalimaFloralDivider = () => null

