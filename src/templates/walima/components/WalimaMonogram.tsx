'use client'

interface Props {
  brideInitial: string
  groomInitial: string
}

/**
 * WalimaMonogram
 * Pastel-toned intertwined initials monogram for the Walima template.
 * Uses blush/rose/champagne gradient instead of Velvet's dark gold.
 */
export default function WalimaMonogram({ brideInitial, groomInitial }: Props) {
  return (
    <div className="walima-monogram-wrap" aria-hidden="true">
      {/* Outer rotating decorative ring — pastel rose/champagne */}
      <svg className="walima-monogram-ring" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Rose-champagne gradient for this template */}
          <linearGradient id="walimaRoseRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#c8906a" stopOpacity="0.8"/>
            <stop offset="35%"  stopColor="#e8b88a" stopOpacity="1"/>
            <stop offset="65%"  stopColor="#d4a96a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#b07850" stopOpacity="0.7"/>
          </linearGradient>
          <linearGradient id="walimaRoseRing2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#e8c4c4" stopOpacity="0.7"/>
            <stop offset="50%"  stopColor="#d4888a" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#c87c7c" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="walimaBlushRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#d4888a" stopOpacity="0.55"/>
            <stop offset="50%"  stopColor="#e8b88a" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#d4888a" stopOpacity="0.55"/>
          </linearGradient>
        </defs>

        {/* Outer thin dashed ring */}
        <circle cx="150" cy="150" r="143" stroke="url(#walimaBlushRing)" strokeWidth="0.7" strokeDasharray="3 7" strokeLinecap="round"/>
        {/* Middle solid ring */}
        <circle cx="150" cy="150" r="132" stroke="url(#walimaRoseRing)" strokeWidth="1.1"/>
        {/* Inner dashed ring */}
        <circle cx="150" cy="150" r="122" stroke="url(#walimaRoseRing2)" strokeWidth="0.5" strokeDasharray="2 9"/>

        {/* 4 small petal ornaments at compass points */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const r = 132
          const cx = 150 + r * Math.cos(rad)
          const cy = 150 + r * Math.sin(rad)
          return (
            <g key={i} transform={`translate(${cx},${cy}) rotate(${deg + 45})`}>
              <rect x="-4" y="-4" width="8" height="8" fill="url(#walimaRoseRing)" opacity="0.85"/>
              <rect x="-2" y="-2" width="4" height="4" fill="#e8c4c4" opacity="0.5"/>
            </g>
          )
        })}

        {/* Delicate circles at 45° positions */}
        {[45, 135, 225, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const r = 128
          const cx = 150 + r * Math.cos(rad)
          const cy = 150 + r * Math.sin(rad)
          return (
            <circle key={i} cx={cx} cy={cy} r="2" fill="url(#walimaRoseRing)" opacity="0.55"/>
          )
        })}

        {/* Subtle petal leaf motifs at top and bottom */}
        <path d="M150 16 C144 10 138 18 150 24 C162 18 156 10 150 16 Z" fill="#d4888a" opacity="0.35"/>
        <path d="M150 284 C144 290 138 282 150 276 C162 282 156 290 150 284 Z" fill="#d4888a" opacity="0.35"/>
      </svg>

      {/* Blush glow behind the letters */}
      <div className="walima-monogram-glow" />

      {/* The initials */}
      <div className="walima-monogram-letters">
        <span className="walima-monogram-initial walima-monogram-bride">{brideInitial}</span>

        {/* Ornamental vertical divider */}
        <div className="walima-monogram-divider">
          <svg viewBox="0 0 28 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="walimaDivGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#d4888a" stopOpacity="0"/>
                <stop offset="30%"  stopColor="#e8b88a" stopOpacity="1"/>
                <stop offset="70%"  stopColor="#d4888a" stopOpacity="1"/>
                <stop offset="100%" stopColor="#c8906a" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Main vertical line */}
            <line x1="14" y1="2" x2="14" y2="58" stroke="url(#walimaDivGrad)" strokeWidth="0.9"/>
            {/* Top diamond */}
            <path d="M14 8 L17 12 L14 16 L11 12 Z" fill="#d4888a" opacity="0.8"/>
            {/* Bottom diamond */}
            <path d="M14 44 L17 48 L14 52 L11 48 Z" fill="#d4888a" opacity="0.8"/>
            {/* Center circle */}
            <circle cx="14" cy="30" r="2.5" fill="#e8b88a" opacity="0.9"/>
            <circle cx="14" cy="30" r="1" fill="#fff" opacity="0.4"/>
          </svg>
        </div>

        <span className="walima-monogram-initial walima-monogram-groom">{groomInitial}</span>
      </div>

      {/* Bottom flourish */}
      <svg className="walima-monogram-flourish" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="walimaFlourish" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#d4888a" stopOpacity="0"/>
            <stop offset="30%"  stopColor="#e8b88a" stopOpacity="0.85"/>
            <stop offset="50%"  stopColor="#d4888a" stopOpacity="1"/>
            <stop offset="70%"  stopColor="#e8b88a" stopOpacity="0.85"/>
            <stop offset="100%" stopColor="#d4888a" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M10 10 Q45 3 90 10 Q135 17 170 10" stroke="url(#walimaFlourish)" strokeWidth="0.75" fill="none"/>
        <path d="M30 10 Q55 7 90 10 Q125 13 150 10" stroke="url(#walimaFlourish)" strokeWidth="0.35" fill="none" opacity="0.45"/>
        {/* Petal accents */}
        <circle cx="90" cy="10" r="2" fill="#d4888a" opacity="0.7"/>
        <circle cx="60"  cy="9"  r="1.2" fill="#d4888a" opacity="0.45"/>
        <circle cx="120" cy="9"  r="1.2" fill="#d4888a" opacity="0.45"/>
        {/* Small leaf motifs */}
        <path d="M90 10 C87 6 84 8 90 5 C96 8 93 6 90 10 Z" fill="#d4888a" opacity="0.3"/>
      </svg>
    </div>
  )
}
