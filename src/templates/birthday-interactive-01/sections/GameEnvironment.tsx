'use client'

import React from 'react'

// ─────────────────────────────────────────────────────────────────────────────
//  GAME WORLD ENVIRONMENT — Moonlight Love Garden
//  Multi-layer parallax: Sky → Castle → Trees → Ground → Foreground
// ─────────────────────────────────────────────────────────────────────────────

// Stars generator (deterministic for SSR)
export const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: ((i * 137.508 + 23) % 3000),
  y: ((i * 89.3 + 17) % 40),
  r: 0.8 + (i % 4) * 0.5,
  opacity: 0.4 + (i % 5) * 0.12,
}))

// Fireflies (floating particles)
const FIREFLIES = Array.from({ length: 30 }, (_, i) => ({
  x: ((i * 211.3 + 50) % 3000),
  y: 30 + ((i * 73.1) % 40),
  delay: (i * 0.4) % 3,
  size: 3 + (i % 4),
}))

// ── Sky & Background layer (moves at 0.2x speed) ─────────────────────────────
export function SkyLayer({ worldX }: { worldX: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #0D0628 0%, #1A0A3A 30%, #2D0F4A 55%, #4A1A5A 75%, #6B2560 90%, #A03070 100%)',
      transform: `translateX(${-worldX * 0.15}px)`,
      width: '120%', left: '-10%',
      zIndex: 0,
    }}>
      {/* Moon */}
      <div style={{
        position: 'absolute', top: '8%', left: `${50 + worldX * 0.02}%`,
        width: 80, height: 80,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFF8DC, #FFE066, #FFCC00)',
        boxShadow: '0 0 40px 15px rgba(255,220,100,0.35), 0 0 80px 30px rgba(255,180,50,0.15)',
        transform: 'translateX(-50%)',
      }}/>
      {/* Moon glow ring */}
      <div style={{
        position: 'absolute', top: 'calc(8% - 15px)', left: `${50 + worldX * 0.02}%`,
        width: 110, height: 110, borderRadius: '50%',
        border: '1px solid rgba(255,220,100,0.15)',
        transform: 'translateX(-50%)',
      }}/>
      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: s.x / 30 + '%',
          top: s.y + '%',
          width: s.r * 2, height: s.r * 2,
          borderRadius: '50%',
          background: 'white',
          opacity: s.opacity,
          animation: `star-twinkle ${2 + (i % 3)}s ease-in-out infinite`,
          animationDelay: `${(i * 0.3) % 3}s`,
        }}/>
      ))}
    </div>
  )
}

// ── Castle + Floating islands layer (0.4x speed) ─────────────────────────────
export function CastleLayer({ worldX }: { worldX: number }) {
  return (
    <div style={{
      position: 'absolute', bottom: '25%', left: 0, right: 0, height: '55%',
      transform: `translateX(${-worldX * 0.35}px)`,
      zIndex: 1,
    }}>
      {/* Distant castle */}
      <svg viewBox="0 0 400 220" style={{ position: 'absolute', right: '5%', bottom: 0, width: 300, height: 220, opacity: 0.6 }} fill="none">
        {/* Main tower */}
        <rect x="140" y="60" width="120" height="160" rx="4" fill="#3D1060"/>
        {/* Side towers */}
        <rect x="100" y="100" width="55" height="120" rx="3" fill="#4A1470"/>
        <rect x="245" y="100" width="55" height="120" rx="3" fill="#4A1470"/>
        {/* Battlements */}
        {[120,140,160,180,200,220,240].map((x,i) => <rect key={i} x={x} y={50} width={14} height={14} rx={2} fill="#3D1060"/>)}
        {/* Windows */}
        <path d="M180 85 Q190 75 200 85 L200 115 L180 115 Z" fill="#FFD166" opacity="0.8"/>
        <rect x="182" y="115" width="16" height="20" rx="2" fill="#FFD166" opacity="0.6"/>
        <path d="M180 85 Q190 75 200 85" fill="#FFE89A" opacity="0.5"/>
        {/* Side windows */}
        <ellipse cx="127" cy="130" rx="8" ry="10" fill="#FFD166" opacity="0.6"/>
        <ellipse cx="272" cy="130" rx="8" ry="10" fill="#FFD166" opacity="0.6"/>
        {/* Flags */}
        <line x1="190" y1="60" x2="190" y2="20" stroke="#B060A0" strokeWidth="2"/>
        <path d="M190 20 L210 28 L190 36 Z" fill="#FF9EB5"/>
        <line x1="127" y1="100" x2="127" y2="70" stroke="#B060A0" strokeWidth="1.5"/>
        <path d="M127 70 L143 76 L127 82 Z" fill="#FF9EB5" opacity="0.8"/>
        {/* Castle glow */}
        <rect x="140" y="60" width="120" height="160" rx="4" fill="rgba(255,200,100,0)" stroke="#FFD166" strokeWidth="1" opacity="0.3"/>
      </svg>

      {/* Floating island left */}
      <div style={{
        position: 'absolute', left: '8%', top: '10%',
        width: 120, height: 60,
        background: 'linear-gradient(180deg, #5A2080 0%, #3D1060 100%)',
        borderRadius: '60% 60% 50% 50% / 60% 60% 40% 40%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        opacity: 0.7,
      }}>
        {/* Trees on island */}
        <div style={{ position: 'absolute', left: 20, top: -20, width: 20, height: 30, background: 'linear-gradient(180deg, #FF9EB5, #FF758C)', borderRadius: '50% 50% 0 0' }}/>
        <div style={{ position: 'absolute', right: 20, top: -15, width: 16, height: 24, background: 'linear-gradient(180deg, #FFB3C6, #FF9EB5)', borderRadius: '50% 50% 0 0' }}/>
      </div>

      {/* Floating island right */}
      <div style={{
        position: 'absolute', right: '28%', top: '5%',
        width: 90, height: 45,
        background: 'linear-gradient(180deg, #6A2590 0%, #4D1870 100%)',
        borderRadius: '60% 60% 50% 50% / 60% 60% 40% 40%',
        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
        opacity: 0.6,
      }}>
        <div style={{ position: 'absolute', left: '30%', top: -16, width: 16, height: 22, background: 'linear-gradient(180deg, #FF9EB5, #FF758C)', borderRadius: '50% 50% 0 0' }}/>
      </div>

      {/* Waterfall (right side) */}
      <div style={{
        position: 'absolute', right: '18%', top: '20%', bottom: 0, width: 3,
        background: 'linear-gradient(180deg, rgba(180,160,255,0.8), rgba(100,80,200,0.3))',
        borderRadius: '2px',
        filter: 'blur(1px)',
      }}/>
    </div>
  )
}

// ── Cherry Blossom Trees layer (0.6x speed) ───────────────────────────────────
function Tree({ x, height = 120, pink = true }: { x: number, height?: number, pink?: boolean }) {
  return (
    <g transform={`translate(${x}, 0)`}>
      {/* Trunk */}
      <rect x={-8} y={height * 0.4} width={16} height={height * 0.6} rx={6} fill="#5C2D0A"/>
      <rect x={-4} y={height * 0.4} width={4} height={height * 0.6} fill="#7A3D12" opacity="0.5"/>
      {/* Foliage layers */}
      <ellipse cx={0} cy={height * 0.2} rx={45} ry={35} fill={pink ? '#FF9EB5' : '#FFB3C6'} opacity={0.9}/>
      <ellipse cx={-18} cy={height * 0.28} rx={30} ry={25} fill={pink ? '#FF758C' : '#FF9EB5'} opacity={0.85}/>
      <ellipse cx={20} cy={height * 0.28} rx={30} ry={25} fill={pink ? '#FFB3C6' : '#FFCCD6'} opacity={0.85}/>
      <ellipse cx={0} cy={height * 0.1} rx={28} ry={22} fill={pink ? '#FFCCD6' : '#FFDDE5'} opacity={0.9}/>
      {/* Petals falling */}
      {[...Array(5)].map((_, i) => (
        <ellipse key={i}
          cx={(i - 2) * 14}
          cy={height * 0.4 + i * 10}
          rx={4} ry={3}
          fill={pink ? '#FFB3C6' : '#FFCCD6'}
          opacity={0.6}
          transform={`rotate(${i * 25})`}
        />
      ))}
    </g>
  )
}

export function TreeLayer({ worldX }: { worldX: number }) {
  const trees = [
    { x: 80, h: 130, pink: true },
    { x: 250, h: 150, pink: false },
    { x: 450, h: 120, pink: true },
    { x: 650, h: 140, pink: false },
    { x: 850, h: 130, pink: true },
    { x: 1100, h: 120, pink: false },
    { x: 1350, h: 140, pink: true },
    { x: 1580, h: 130, pink: false },
    { x: 1800, h: 150, pink: true },
    { x: 2050, h: 120, pink: false },
    { x: 2280, h: 140, pink: true },
    { x: 2500, h: 130, pink: false },
    { x: 2750, h: 120, pink: true },
  ]
  const groundY = 380 // px from top of the svg viewbox

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: '70%',
      transform: `translateX(${-worldX * 0.6}px)`,
      zIndex: 2,
    }}>
      <svg width="3000" height="420" viewBox="0 0 3000 420" style={{ position: 'absolute', bottom: 0 }}>
        {trees.map((t, i) => (
          <g key={i} transform={`translate(0, ${groundY - t.h})`}>
            <Tree x={t.x} height={t.h} pink={t.pink}/>
          </g>
        ))}
      </svg>
    </div>
  )
}

// ── Ground + Path + Decorations (1.0x speed, main layer) ─────────────────────
export function GroundLayer() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, width: 3000,
      height: '32%',
      zIndex: 4,
    }}>
      {/* Ground */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%',
        background: 'linear-gradient(180deg, #6B2A80 0%, #4A1060 40%, #35094A 100%)',
        borderRadius: '50% 50% 0 0 / 8% 8% 0 0',
      }}/>
      {/* Glowing path */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(90deg, transparent, rgba(255,180,220,0.12) 20%, rgba(255,200,230,0.18) 50%, rgba(255,180,220,0.12) 80%, transparent)',
        borderRadius: '50% 50% 0 0 / 20% 20% 0 0',
      }}/>
      {/* Ground flowers (scattered) */}
      {[100, 300, 550, 750, 1000, 1200, 1450, 1700, 1950, 2200, 2450, 2700, 2900].map((x, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: x,
          bottom: '30%',
          fontSize: `${10 + (i % 3) * 4}px`,
          opacity: 0.7,
        }}>
          {['🌸', '🌷', '🌺', '💐'][i % 4]}
        </div>
      ))}
    </div>
  )
}

// ── Lanterns (scattered along path) ───────────────────────────────────────────
function Lantern({ x, y, size = 1 }: { x: number, y: number, size?: number }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, transform: `scale(${size})`, transformOrigin: 'top center' }}>
      {/* String */}
      <div style={{ width: 2, height: 16, background: 'rgba(255,180,100,0.5)', margin: '0 auto' }}/>
      {/* Lantern body */}
      <div style={{
        width: 22, height: 32,
        background: 'linear-gradient(180deg, rgba(255,200,80,0.9) 0%, rgba(255,140,60,0.9) 100%)',
        borderRadius: '4px 4px 8px 8px',
        boxShadow: '0 0 15px 6px rgba(255,160,50,0.4), inset 0 0 10px rgba(255,220,100,0.5)',
        border: '1px solid rgba(200,120,30,0.6)',
        position: 'relative',
        animation: 'lantern-flicker 3s ease-in-out infinite',
      }}>
        <div style={{
          position: 'absolute', inset: '3px 4px',
          background: 'linear-gradient(135deg, rgba(255,240,160,0.4), transparent)',
          borderRadius: '2px',
        }}/>
      </div>
      {/* Bottom tassel */}
      <div style={{ width: 10, height: 8, margin: '0 auto 0', background: 'rgba(200,120,30,0.7)', borderRadius: '0 0 4px 4px' }}/>
    </div>
  )
}

export function LanternLayer({ worldX }: { worldX: number }) {
  const lanterns = [
    { x: 180, y: '12%', size: 0.9 }, { x: 420, y: '8%', size: 1.1 },
    { x: 700, y: '14%', size: 0.85 }, { x: 950, y: '10%', size: 1 },
    { x: 1250, y: '9%', size: 1.15 }, { x: 1480, y: '13%', size: 0.9 },
    { x: 1750, y: '8%', size: 1 }, { x: 2000, y: '11%', size: 0.95 },
    { x: 2250, y: '9%', size: 1.1 }, { x: 2500, y: '12%', size: 0.9 },
    { x: 2780, y: '8%', size: 1.05 },
  ]

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: 3000, height: '100%',
      transform: `translateX(${-worldX * 0.75}px)`,
      zIndex: 3, pointerEvents: 'none',
    }}>
      {lanterns.map((l, i) => (
        <Lantern key={i} x={l.x} y={0} size={l.size}/>
      ))}
    </div>
  )
}

// ── Heart Collectible ─────────────────────────────────────────────────────────
export function HeartCollectible({
  x, y, collected, heartNumber, active, isFinal,
}: {
  x: number, y: number, collected: boolean, heartNumber: number, active: boolean, isFinal: boolean
}) {
  if (collected) return null

  return (
    <div style={{
      position: 'absolute',
      left: x - (isFinal ? 30 : 22),
      top: y,
      zIndex: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'none',
    }}>
      {/* Heart */}
      <div style={{
        width: isFinal ? 60 : 44,
        height: isFinal ? 60 : 44,
        background: 'linear-gradient(135deg, #FF758C 0%, #FF4D7A 50%, #E03060 100%)',
        clipPath: 'path("M24 8 C24 4 20 0 16 0 C12 0 8 4 8 8 C8 12 12 20 24 28 C36 20 40 12 40 8 C40 4 36 0 32 0 C28 0 24 4 24 8Z")',
        borderRadius: '50% 50% 0 0 / 40% 40% 0 0',
        transform: `scale(${isFinal ? 1.5 : 1})`,
        animation: `heart-float ${isFinal ? 1.5 : 2}s ease-in-out infinite, heart-pulse ${isFinal ? 0.8 : 1.2}s ease-in-out infinite`,
        boxShadow: active
          ? `0 0 ${isFinal ? '30px' : '20px'} ${isFinal ? '12px' : '8px'} rgba(255,80,120,0.7)`
          : `0 0 ${isFinal ? '20px' : '12px'} ${isFinal ? '6px' : '4px'} rgba(255,80,120,0.4)`,
        filter: active ? 'brightness(1.3)' : 'brightness(1)',
        transition: 'all 0.3s ease',
        fontSize: isFinal ? '2.5rem' : '1.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        ❤️
      </div>
      {/* Glow ring */}
      <div style={{
        position: 'absolute',
        width: isFinal ? 80 : 60,
        height: isFinal ? 80 : 60,
        top: -10, left: -10,
        borderRadius: '50%',
        border: `2px solid rgba(255,120,160,${active ? 0.6 : 0.25})`,
        animation: 'heart-ring 2s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>
      {/* Sparkle particles */}
      {active && ['✦','✧','⋆'].map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '0.6rem',
          color: '#FFD166',
          animation: `sparkle-orbit ${1 + i * 0.3}s linear infinite`,
          animationDelay: `${i * 0.4}s`,
          top: -5 + Math.sin(i * 2.1) * 20,
          left: -8 + Math.cos(i * 2.1) * 20,
        }}>
          {s}
        </div>
      ))}
      {/* Interact prompt */}
      {active && (
        <div style={{
          marginTop: 8, fontSize: '0.6rem',
          fontFamily: 'var(--font-birthday-body)',
          color: '#FFD166', fontWeight: 700,
          background: 'rgba(0,0,0,0.5)',
          padding: '3px 8px', borderRadius: 999,
          backdropFilter: 'blur(4px)',
          whiteSpace: 'nowrap',
          animation: 'fadeInUp 0.3s ease',
        }}>
          ❤️ COLLECT
        </div>
      )}
    </div>
  )
}

// ── Fireflies ─────────────────────────────────────────────────────────────────
export function FireflyLayer({ worldX }: { worldX: number }) {
  return (
    <div style={{
      position: 'absolute', top: '25%', left: 0, width: 3000, height: '50%',
      transform: `translateX(${-worldX * 0.85}px)`,
      zIndex: 5, pointerEvents: 'none',
    }}>
      {FIREFLIES.map((f, i) => (
        <div key={i} style={{
          position: 'absolute', left: f.x, top: `${f.y}%`,
          width: f.size, height: f.size,
          borderRadius: '50%',
          background: 'rgba(255,240,150,0.9)',
          boxShadow: `0 0 ${f.size * 2}px ${f.size}px rgba(255,220,80,0.5)`,
          animation: `firefly-float ${2.5 + f.delay}s ease-in-out infinite`,
          animationDelay: `${f.delay}s`,
        }}/>
      ))}
    </div>
  )
}

// ── Falling petals ────────────────────────────────────────────────────────────
export function PetalLayer() {
  const petals = Array.from({ length: 15 }, (_, i) => ({
    left: ((i * 193 + 30) % 100),
    delay: (i * 0.5) % 6,
    duration: 6 + (i % 4),
    rotate: (i * 37) % 360,
    size: 8 + (i % 5) * 3,
  }))

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none', overflow: 'hidden',
    }}>
      {petals.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.left}%`,
          top: '-20px',
          fontSize: p.size,
          animation: `petal-fall ${p.duration}s linear infinite`,
          animationDelay: `${p.delay}s`,
          opacity: 0.7,
        }}>
          🌸
        </div>
      ))}
    </div>
  )
}

// ── Environment CSS keyframes ─────────────────────────────────────────────────
export const ENV_KEYFRAMES = `
@keyframes star-twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.3); }
}
@keyframes heart-float {
  0%, 100% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
}
@keyframes heart-pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.4) drop-shadow(0 0 8px rgba(255,80,120,0.8)); }
}
@keyframes heart-ring {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.8); }
}
@keyframes lantern-flicker {
  0%, 100% { opacity: 1; }
  45% { opacity: 0.85; }
  50% { opacity: 0.95; }
  75% { opacity: 0.9; }
}
@keyframes firefly-float {
  0%, 100% { transform: translate(0, 0); opacity: 0.8; }
  25% { transform: translate(8px, -12px); opacity: 0.4; }
  75% { transform: translate(-6px, 8px); opacity: 1; }
}
@keyframes petal-fall {
  0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
  10% { opacity: 0.7; }
  90% { opacity: 0.5; }
  100% { transform: translateY(110vh) rotate(360deg) translateX(30px); opacity: 0; }
}
@keyframes sparkle-orbit {
  from { transform: rotate(0deg) translateX(18px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
`
