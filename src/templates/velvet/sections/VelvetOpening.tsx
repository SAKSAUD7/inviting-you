'use client'

import { WeddingCouple } from '@/types/wedding'

interface Props {
  couple?: WeddingCouple | null
  onOpen: () => void
  isOpening: boolean
  isOpened: boolean
}

export default function VelvetOpening({ couple, onOpen, isOpening, isOpened }: Props) {
  return (
    <div
      className={`velvet-opening ${isOpening ? 'exiting' : ''} ${isOpened ? 'exited' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Open invitation"
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    >
      {/* Background */}
      <div className="velvet-opening__bg" />
      <div className="velvet-opening__overlay" />

      {/* Decorative: chandelier SVG left */}
      <svg className="velvet-opening__chandelier" viewBox="0 0 300 500" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g opacity="0.85">
          {/* Candle flames */}
          <ellipse cx="80" cy="45" rx="6" ry="10" fill="#F5C842" opacity="0.9"/>
          <ellipse cx="150" cy="25" rx="6" ry="12" fill="#F5C842" opacity="0.95"/>
          <ellipse cx="220" cy="45" rx="6" ry="10" fill="#F5C842" opacity="0.9"/>
          {/* Candle bodies */}
          <rect x="76" y="54" width="8" height="40" rx="2" fill="#EDE0C4"/>
          <rect x="146" y="36" width="8" height="40" rx="2" fill="#EDE0C4"/>
          <rect x="216" y="54" width="8" height="40" rx="2" fill="#EDE0C4"/>
          {/* Arms */}
          <path d="M150 76 Q100 90 80 100" stroke="#C9971A" strokeWidth="3" fill="none"/>
          <path d="M150 76 Q200 90 220 100" stroke="#C9971A" strokeWidth="3" fill="none"/>
          {/* Center column */}
          <line x1="150" y1="76" x2="150" y2="200" stroke="#C9971A" strokeWidth="4"/>
          {/* Crystals */}
          {[60, 90, 120, 150, 180, 210, 240].map((x, i) => (
            <g key={i}>
              <line x1={x} y1={100 + (i % 2) * 20} x2={x} y2={130 + (i % 2) * 20} stroke="#C9971A" strokeWidth="1" opacity="0.6"/>
              <ellipse cx={x} cy={135 + (i % 2) * 20} rx="4" ry="6" fill="#F0D080" opacity="0.7"/>
            </g>
          ))}
          {/* Lower ornaments */}
          <circle cx="150" cy="220" r="12" stroke="#C9971A" strokeWidth="2" fill="none"/>
          <circle cx="150" cy="220" r="4" fill="#C9971A"/>
          {[120, 135, 150, 165, 180].map((x, i) => (
            <g key={i}>
              <line x1={x} y1="232" x2={x} y2={255 + (i % 2) * 15} stroke="#C9971A" strokeWidth="1" opacity="0.5"/>
              <ellipse cx={x} cy={260 + (i % 2) * 15} rx="3" ry="5" fill="#F0D080" opacity="0.6"/>
            </g>
          ))}
        </g>
      </svg>

      {/* Decorative: baroque frame right */}
      <svg className="velvet-opening__frame" viewBox="0 0 140 600" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="#C9971A" opacity="0.75">
          <rect x="10" y="0" width="6" height="600" rx="3"/>
          {[30, 80, 140, 200, 270, 340, 410, 480, 530, 570].map((y, i) => (
            <g key={i}>
              <path d={`M16 ${y} Q40 ${y+15} 55 ${y+30} Q40 ${y+45} 16 ${y+60}`} stroke="#C9971A" strokeWidth="2" fill="none" opacity="0.6"/>
              <circle cx="55" cy={y + 30} r="5" fill="#C9971A" opacity="0.5"/>
              <circle cx="35" cy={y + 15} r="2.5" fill="#D4B060" opacity="0.6"/>
              <circle cx="35" cy={y + 45} r="2.5" fill="#D4B060" opacity="0.6"/>
            </g>
          ))}
        </g>
      </svg>

      {/* Floral garland bottom */}
      <div className="velvet-opening__florals" aria-hidden="true">
        <svg viewBox="0 0 1200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground stems */}
          <path d="M0 160 Q300 100 600 120 Q900 140 1200 100" stroke="#2D4A1A" strokeWidth="3" fill="none" opacity="0.6"/>
          {/* Roses - large */}
          {[100, 200, 320, 430, 560, 670, 780, 900, 1020, 1120].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${115 + (i % 3) * 12})`}>
              <circle r="16" fill={i % 2 === 0 ? '#8B1A1A' : '#6B0F10'} opacity="0.9"/>
              <circle r="10" fill={i % 2 === 0 ? '#A02020' : '#801515'} opacity="0.8"/>
              <circle r="5" fill={i % 2 === 0 ? '#C03030' : '#A02020'} opacity="0.7"/>
            </g>
          ))}
          {/* Gold botanical leaves */}
          {[60, 160, 260, 370, 490, 610, 720, 840, 960, 1080].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${125 + (i % 2) * 8})`}>
              <path d={`M0 0 Q${i % 2 === 0 ? 15 : -15} -20 0 -35`} stroke="#C9971A" strokeWidth="2" fill="none" opacity="0.7"/>
              <ellipse cx={i % 2 === 0 ? 8 : -8} cy="-18" rx="7" ry="4" fill="#C9971A" opacity="0.5" transform={`rotate(${i % 2 === 0 ? 30 : -30})`}/>
            </g>
          ))}
          {/* Small white flowers */}
          {[140, 280, 450, 600, 740, 880, 1050].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${118 + (i % 2) * 10})`}>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <ellipse key={deg} cx={Math.cos(deg * Math.PI/180) * 8} cy={Math.sin(deg * Math.PI/180) * 8} rx="4" ry="2.5" fill="white" opacity="0.8" transform={`rotate(${deg})`}/>
              ))}
              <circle r="3" fill="#F5E040" opacity="0.9"/>
            </g>
          ))}
        </svg>
      </div>

      {/* Center content */}
      <div className="velvet-opening__content">
        <p className="velvet-opening__label">Inviting You</p>

        <button
          className="velvet-opening__tap-btn"
          onClick={onOpen}
          aria-label="Open your invitation"
        >
          <span className="velvet-opening__tap-icon" />
        </button>

        <p className="velvet-opening__tap-label">
          {couple
            ? `${couple.brideName.split(' ')[0]} & ${couple.groomName.split(' ')[0]}`
            : 'Open Invitation'}
        </p>
      </div>
    </div>
  )
}
