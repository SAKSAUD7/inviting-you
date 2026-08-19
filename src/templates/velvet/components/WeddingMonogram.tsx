'use client'

interface Props {
  brideInitial: string
  groomInitial: string
}

export default function WeddingMonogram({ brideInitial, groomInitial }: Props) {
  return (
    <div className="monogram-wrap" aria-hidden="true">
      {/* Outer rotating ring */}
      <svg className="monogram-ring" viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#c9a96e" stopOpacity="0.9"/>
            <stop offset="40%"  stopColor="#f0d49a" stopOpacity="1"/>
            <stop offset="70%"  stopColor="#c9a96e" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#8a6a2e" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="goldRing2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#8a6a2e" stopOpacity="0.6"/>
            <stop offset="50%"  stopColor="#c9a96e" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#f0d49a" stopOpacity="0.7"/>
          </linearGradient>
        </defs>

        {/* Outer decorative ring */}
        <circle cx="160" cy="160" r="152" stroke="url(#goldRing)" strokeWidth="0.8" strokeDasharray="4 6" strokeLinecap="round"/>
        {/* Middle solid ring */}
        <circle cx="160" cy="160" r="140" stroke="url(#goldRing)" strokeWidth="1.2"/>
        {/* Inner dashed ring */}
        <circle cx="160" cy="160" r="130" stroke="url(#goldRing2)" strokeWidth="0.6" strokeDasharray="2 8"/>

        {/* 4 diamond corner ornaments */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const r = 140
          const cx = 160 + r * Math.cos(rad)
          const cy = 160 + r * Math.sin(rad)
          return (
            <g key={i} transform={`translate(${cx},${cy}) rotate(${deg + 45})`}>
              <rect x="-4" y="-4" width="8" height="8" fill="url(#goldRing)" opacity="0.9"/>
              <rect x="-2" y="-2" width="4" height="4" fill="#f0d49a" opacity="0.5"/>
            </g>
          )
        })}

        {/* Delicate flourish arcs between diamonds */}
        {[45, 135, 225, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const r = 136
          const cx = 160 + r * Math.cos(rad)
          const cy = 160 + r * Math.sin(rad)
          return (
            <circle key={i} cx={cx} cy={cy} r="2" fill="url(#goldRing)" opacity="0.6"/>
          )
        })}
      </svg>

      {/* Glow layer */}
      <div className="monogram-glow" />

      {/* The actual letters */}
      <div className="monogram-letters">
        <span className="monogram-initial monogram-bride">{brideInitial}</span>
        <div className="monogram-divider-ornament">
          <svg viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="divGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#c9a96e" stopOpacity="0"/>
                <stop offset="30%"  stopColor="#f0d49a" stopOpacity="1"/>
                <stop offset="70%"  stopColor="#c9a96e" stopOpacity="1"/>
                <stop offset="100%" stopColor="#c9a96e" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {/* Vertical line */}
            <line x1="16" y1="2" x2="16" y2="62" stroke="url(#divGold)" strokeWidth="1"/>
            {/* Top diamond */}
            <path d="M16 8 L19 12 L16 16 L13 12 Z" fill="#c9a96e" opacity="0.9"/>
            {/* Bottom diamond */}
            <path d="M16 48 L19 52 L16 56 L13 52 Z" fill="#c9a96e" opacity="0.9"/>
            {/* Center ampersand dot */}
            <circle cx="16" cy="32" r="2.5" fill="#f0d49a"/>
            <circle cx="16" cy="32" r="1" fill="#fff" opacity="0.4"/>
          </svg>
        </div>
        <span className="monogram-initial monogram-groom">{groomInitial}</span>
      </div>

      {/* Bottom flourish */}
      <svg className="monogram-flourish" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="flourishGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#c9a96e" stopOpacity="0"/>
            <stop offset="30%"  stopColor="#f0d49a" stopOpacity="0.9"/>
            <stop offset="50%"  stopColor="#c9a96e" stopOpacity="1"/>
            <stop offset="70%"  stopColor="#f0d49a" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#c9a96e" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d="M10 12 Q50 4 100 12 Q150 20 190 12" stroke="url(#flourishGold)" strokeWidth="0.8" fill="none"/>
        <path d="M30 12 Q50 8 100 12 Q150 16 170 12" stroke="url(#flourishGold)" strokeWidth="0.4" fill="none" opacity="0.5"/>
        <circle cx="100" cy="12" r="2" fill="#c9a96e" opacity="0.8"/>
        <circle cx="70" cy="11" r="1" fill="#c9a96e" opacity="0.5"/>
        <circle cx="130" cy="11" r="1" fill="#c9a96e" opacity="0.5"/>
      </svg>
    </div>
  )
}
