'use client'

import React from 'react'
import { motion } from 'framer-motion'

export type CharacterState = 'idle' | 'walk' | 'run' | 'happy' | 'celebrate' | 'surprised' | 'thinking' | 'hug' | 'pointing'

// ─────────────────────────────────────────────────────────────────────────────
//  AYMAN — Player Character (girl with pink outfit, brown curly hair, pink bow)
// ─────────────────────────────────────────────────────────────────────────────
export function AymanCharacter({
  state = 'idle',
  facingRight = true,
  scale = 1,
}: {
  state?: CharacterState
  facingRight?: boolean
  scale?: number
}) {
  const isWalking = state === 'walk' || state === 'run'
  const isCelebrating = state === 'celebrate' || state === 'happy'

  return (
    <motion.div
      style={{
        width: 90 * scale,
        height: 130 * scale,
        position: 'relative',
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transformOrigin: 'center bottom',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      animate={
        state === 'idle' ? { y: [0, -4, 0] } :
        isCelebrating ? { y: [0, -12, 0, -8, 0], rotate: [-3, 3, -3, 3, 0] } :
        state === 'surprised' ? { scale: [1, 1.08, 1] } :
        {}
      }
      transition={{
        duration: state === 'idle' ? 2.5 : isCelebrating ? 0.6 : 0.4,
        repeat: state === 'idle' || isWalking ? Infinity : isCelebrating ? 3 : 0,
        ease: 'easeInOut',
      }}
    >
      <svg
        width={90 * scale}
        height={130 * scale}
        viewBox="0 0 90 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === Shadow === */}
        <ellipse cx="45" cy="128" rx="22" ry="4" fill="rgba(0,0,0,0.12)" />

        {/* === HAIR (back layer) === */}
        <ellipse cx="45" cy="30" rx="28" ry="26" fill="#3D1F0A" />
        {/* Long flowing hair */}
        <path d="M20 35 Q10 70 15 100 Q22 110 28 105 Q20 75 25 45 Z" fill="#3D1F0A" />
        <path d="M70 35 Q80 70 75 100 Q68 110 62 105 Q70 75 65 45 Z" fill="#3D1F0A" />
        {/* Hair detail highlights */}
        <path d="M22 28 Q25 22 30 20" stroke="#6B3A1F" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M68 28 Q65 22 60 20" stroke="#6B3A1F" strokeWidth="1.5" fill="none" opacity="0.6" />

        {/* === PINK BOW === */}
        <g transform="translate(55, 12)">
          <path d="M0 4 Q-8 0 -10 4 Q-8 8 0 4Z" fill="#FF9EB5" />
          <path d="M0 4 Q8 0 10 4 Q8 8 0 4Z" fill="#FF758C" />
          <circle cx="0" cy="4" r="3" fill="#FF9EB5" />
          <path d="M-10 4 Q-8 0 -10 4 Q-8 8 -10 4Z" fill="#E05070" opacity="0.5" />
        </g>

        {/* === HEAD === */}
        <ellipse cx="45" cy="34" rx="24" ry="22" fill="#FDDBB4" />

        {/* === FACE DETAILS === */}
        {/* Eyebrows */}
        <path d="M34 25 Q37 23 40 24" stroke="#4A2210" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M50 24 Q53 23 56 25" stroke="#4A2210" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="37" cy="31" rx="5" ry="5.5" fill="#3D1F0A" />
        <ellipse cx="53" cy="31" rx="5" ry="5.5" fill="#3D1F0A" />
        <ellipse cx="35.5" cy="29.5" rx="2" ry="2" fill="white" opacity="0.8" />
        <ellipse cx="51.5" cy="29.5" rx="2" ry="2" fill="white" opacity="0.8" />
        <circle cx="35" cy="29" r="0.8" fill="white" opacity="0.9" />
        <circle cx="51" cy="29" r="0.8" fill="white" opacity="0.9" />

        {/* Eyelashes */}
        <path d="M32 27 Q33 24 35 25" stroke="#3D1F0A" strokeWidth="1.2" fill="none" />
        <path d="M41 27 Q41 24 39 25" stroke="#3D1F0A" strokeWidth="1.2" fill="none" />
        <path d="M48 27 Q49 24 51 25" stroke="#3D1F0A" strokeWidth="1.2" fill="none" />
        <path d="M57 27 Q57 24 55 25" stroke="#3D1F0A" strokeWidth="1.2" fill="none" />

        {/* Nose */}
        <ellipse cx="45" cy="36" rx="2" ry="1.5" fill="#F4A680" opacity="0.6" />

        {/* Mouth — changes by state */}
        {(state === 'idle' || state === 'walk' || state === 'run') && (
          <path d="M40 41 Q45 45 50 41" stroke="#E05070" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}
        {(state === 'happy' || state === 'celebrate') && (
          <>
            <path d="M38 40 Q45 47 52 40" stroke="#E05070" strokeWidth="2" fill="#FF9EB5" fillOpacity="0.4" strokeLinecap="round" />
            <path d="M38 40 Q45 47 52 40" fill="#FF9EB5" fillOpacity="0.3" />
          </>
        )}
        {state === 'surprised' && (
          <ellipse cx="45" cy="42" rx="4" ry="5" fill="#E05070" opacity="0.7" />
        )}
        {state === 'thinking' && (
          <path d="M40 41 Q43 39 46 41" stroke="#E05070" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}
        {state === 'hug' && (
          <path d="M38 40 Q45 48 52 40" stroke="#E05070" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        )}

        {/* Blush */}
        <ellipse cx="28" cy="37" rx="7" ry="5" fill="#FFB3C1" opacity="0.45" />
        <ellipse cx="62" cy="37" rx="7" ry="5" fill="#FFB3C1" opacity="0.45" />

        {/* === BODY — Pink sweater === */}
        <rect x="30" y="54" width="30" height="28" rx="8" fill="#FF9EB5" />
        {/* Sweater detail */}
        <rect x="30" y="54" width="30" height="8" rx="4" fill="#FF758C" />
        {/* Heart on sweater */}
        <path d="M42 62 Q43.5 60 45 62 Q46.5 60 48 62 Q48 65 45 68 Q42 65 42 62Z" fill="#E05070" opacity="0.6" />

        {/* === ARMS === */}
        {/* Left arm */}
        <motion.g
          animate={isWalking ? { rotate: [-20, 20] } : isCelebrating ? { rotate: [-30, 30] } : {}}
          transition={{ duration: state === 'run' ? 0.3 : 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: '26px 60px' }}
        >
          <path d="M30 60 Q22 70 20 78" stroke="#FF9EB5" strokeWidth="8" strokeLinecap="round" />
          <circle cx="19" cy="79" r="5" fill="#FDDBB4" />
        </motion.g>

        {/* Right arm — holds bag */}
        <motion.g
          animate={isWalking ? { rotate: [20, -20] } : isCelebrating ? { rotate: [30, -30] } : {}}
          transition={{ duration: state === 'run' ? 0.3 : 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: '64px 60px' }}
        >
          <path d="M60 60 Q68 70 70 78" stroke="#FF9EB5" strokeWidth="8" strokeLinecap="round" />
          <circle cx="71" cy="79" r="5" fill="#FDDBB4" />
        </motion.g>

        {/* === SKIRT — White pleated === */}
        <path d="M28 78 Q32 100 38 102 L52 102 Q58 100 62 78 Z" fill="#F8F8FF" />
        <path d="M32 78 Q33 98 36 102" stroke="#E0E0F0" strokeWidth="0.8" opacity="0.7" />
        <path d="M38 78 Q39 100 42 102" stroke="#E0E0F0" strokeWidth="0.8" opacity="0.7" />
        <path d="M45 78 Q45 101 45 102" stroke="#E0E0F0" strokeWidth="0.8" opacity="0.7" />
        <path d="M52 78 Q51 100 48 102" stroke="#E0E0F0" strokeWidth="0.8" opacity="0.7" />
        <path d="M57 78 Q55 98 52 102" stroke="#E0E0F0" strokeWidth="0.8" opacity="0.7" />
        {/* Skirt hem */}
        <path d="M34 102 Q45 106 56 102" stroke="#E8E8FF" strokeWidth="1.5" fill="none" />

        {/* === LEGS === */}
        <motion.g
          animate={isWalking ? { rotate: [15, -15] } : {}}
          transition={{ duration: state === 'run' ? 0.25 : 0.45, repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: '38px 102px' }}
        >
          {/* Left leg */}
          <rect x="33" y="102" width="10" height="16" rx="5" fill="#FDDBB4" />
          {/* Left sock */}
          <rect x="33" y="115" width="10" height="5" rx="3" fill="white" />
          {/* Left shoe */}
          <path d="M31 118 Q33 124 40 122 Q42 118 38 118 Z" fill="#FF758C" />
          <path d="M31 118 Q30 122 33 124" fill="#FF9EB5" />
        </motion.g>

        <motion.g
          animate={isWalking ? { rotate: [-15, 15] } : {}}
          transition={{ duration: state === 'run' ? 0.25 : 0.45, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
          style={{ transformOrigin: '52px 102px' }}
        >
          {/* Right leg */}
          <rect x="47" y="102" width="10" height="16" rx="5" fill="#FDDBB4" />
          {/* Right sock */}
          <rect x="47" y="115" width="10" height="5" rx="3" fill="white" />
          {/* Right shoe */}
          <path d="M45 118 Q47 124 54 122 Q56 118 52 118 Z" fill="#FF758C" />
          <path d="M45 118 Q44 122 47 124" fill="#FF9EB5" />
        </motion.g>

        {/* === CELEBRATE extras === */}
        {isCelebrating && (
          <>
            <path d="M15 50 L10 42" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="40" r="3" fill="#FFD166" />
            <path d="M75 50 L80 42" stroke="#FF9EB5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="80" cy="40" r="3" fill="#FF9EB5" />
          </>
        )}

        {/* HUG arms extended */}
        {state === 'hug' && (
          <>
            <path d="M30 60 Q10 65 8 72" stroke="#FF9EB5" strokeWidth="9" strokeLinecap="round" />
            <path d="M60 60 Q80 65 82 72" stroke="#FF9EB5" strokeWidth="9" strokeLinecap="round" />
          </>
        )}
      </svg>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  SAUD — Companion Character (boy with hoodie, backpack, brown hair)
// ─────────────────────────────────────────────────────────────────────────────
export function SaudCharacter({
  state = 'idle',
  facingRight = true,
  scale = 1,
}: {
  state?: CharacterState
  facingRight?: boolean
  scale?: number
}) {
  const isWalking = state === 'walk' || state === 'run'
  const isCelebrating = state === 'celebrate' || state === 'happy'

  return (
    <motion.div
      style={{
        width: 85 * scale,
        height: 125 * scale,
        position: 'relative',
        transform: `scaleX(${facingRight ? 1 : -1})`,
        transformOrigin: 'center bottom',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
      animate={
        state === 'idle' ? { y: [0, -3, 0] } :
        isCelebrating ? { y: [0, -10, 0, -6, 0] } :
        state === 'surprised' ? { x: [-3, 3, -3, 0] } :
        {}
      }
      transition={{
        duration: state === 'idle' ? 2.8 : 0.5,
        repeat: state === 'idle' ? Infinity : isCelebrating ? 3 : 0,
        ease: 'easeInOut',
        delay: 0.3,
      }}
    >
      <svg
        width={85 * scale}
        height={125 * scale}
        viewBox="0 0 85 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="42" cy="123" rx="20" ry="3.5" fill="rgba(0,0,0,0.12)" />

        {/* === HAIR === */}
        <ellipse cx="42" cy="28" rx="26" ry="24" fill="#2C1505" />
        {/* Hair side */}
        <path d="M18 32 Q14 24 18 18 Q22 14 28 16" fill="#2C1505" />
        <path d="M66 32 Q70 24 66 18 Q62 14 56 16" fill="#2C1505" />
        {/* Hair highlight */}
        <path d="M32 16 Q38 12 44 14" stroke="#5C3010" strokeWidth="2" fill="none" opacity="0.5" />

        {/* === HEAD === */}
        <ellipse cx="42" cy="30" rx="22" ry="20" fill="#FDDBB4" />

        {/* Eyebrows */}
        <path d="M31 22 Q34 20 37 21" stroke="#2C1505" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M47 21 Q50 20 53 22" stroke="#2C1505" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Eyes */}
        <ellipse cx="34" cy="28" rx="4.5" ry="5" fill="#2C1505" />
        <ellipse cx="50" cy="28" rx="4.5" ry="5" fill="#2C1505" />
        <ellipse cx="32.5" cy="26.5" rx="1.8" ry="1.8" fill="white" opacity="0.8" />
        <ellipse cx="48.5" cy="26.5" rx="1.8" ry="1.8" fill="white" opacity="0.8" />
        <circle cx="32" cy="26" r="0.7" fill="white" opacity="0.9" />
        <circle cx="48" cy="26" r="0.7" fill="white" opacity="0.9" />

        {/* Nose */}
        <ellipse cx="42" cy="33" rx="1.8" ry="1.3" fill="#F4A680" opacity="0.5" />

        {/* Mouth */}
        {(state === 'idle' || state === 'walk' || state === 'run') && (
          <path d="M37 38 Q42 42 47 38" stroke="#C0605A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        )}
        {(state === 'happy' || state === 'celebrate' || state === 'hug') && (
          <path d="M35 37 Q42 44 49 37" stroke="#C0605A" strokeWidth="2" fill="#FFB3B0" fillOpacity="0.3" strokeLinecap="round" />
        )}
        {state === 'surprised' && (
          <ellipse cx="42" cy="39" rx="3.5" ry="4" fill="#C0605A" opacity="0.7" />
        )}
        {state === 'thinking' && (
          <path d="M38 38 Q40 36 43 38" stroke="#C0605A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        )}

        {/* Blush */}
        <ellipse cx="26" cy="34" rx="6" ry="4" fill="#FFB3C1" opacity="0.4" />
        <ellipse cx="58" cy="34" rx="6" ry="4" fill="#FFB3C1" opacity="0.4" />

        {/* === BACKPACK === */}
        <rect x="15" y="52" width="12" height="20" rx="4" fill="#C8A8D8" />
        <rect x="17" y="56" width="8" height="12" rx="2" fill="#B090C8" />
        <circle cx="21" cy="68" r="2" fill="#D8B8E8" />
        {/* Straps */}
        <path d="M27 52 Q30 55 27 72" stroke="#C8A8D8" strokeWidth="3" strokeLinecap="round" />

        {/* === BODY — Hoodie (light pink/white with M logo) === */}
        <path d="M26 54 Q22 56 20 58 L19 78 Q20 82 25 84 Q30 86 42 86 Q54 86 59 84 Q64 82 65 78 L64 58 Q62 56 58 54 Z" fill="#FFF0F4" />
        {/* Hoodie pocket */}
        <path d="M32 74 Q42 76 52 74 Q52 82 42 83 Q32 82 32 74Z" fill="#FFE0EC" />
        {/* Hoodie seam */}
        <line x1="42" y1="54" x2="42" y2="83" stroke="#FFD0E0" strokeWidth="1" />
        {/* M logo */}
        <text x="38" y="68" fontSize="8" fill="#FF758C" fontFamily="Arial" fontWeight="bold" opacity="0.8">M</text>
        {/* Hood */}
        <path d="M26 54 Q20 48 22 42 Q26 40 30 44 Q32 50 42 50 Q52 50 54 44 Q58 40 62 42 Q64 48 58 54 Z" fill="#FFF0F4" />

        {/* === ARMS === */}
        <motion.g
          animate={isWalking ? { rotate: [-18, 18] } : isCelebrating ? { rotate: [-25, 25] } : {}}
          transition={{ duration: state === 'run' ? 0.28 : 0.5, repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: '24px 58px' }}
        >
          <path d="M26 56 Q18 68 16 76" stroke="#FFF0F4" strokeWidth="8" strokeLinecap="round" />
          <circle cx="15" cy="77" r="5" fill="#FDDBB4" />
        </motion.g>

        <motion.g
          animate={isWalking ? { rotate: [18, -18] } : isCelebrating ? { rotate: [25, -25] } : {}}
          transition={{ duration: state === 'run' ? 0.28 : 0.5, repeat: Infinity, repeatType: 'reverse', delay: 0.1 }}
          style={{ transformOrigin: '60px 58px' }}
        >
          <path d="M58 56 Q66 68 68 76" stroke="#FFF0F4" strokeWidth="8" strokeLinecap="round" />
          <circle cx="69" cy="77" r="5" fill="#FDDBB4" />
        </motion.g>

        {/* === PANTS — Dark === */}
        <rect x="27" y="84" width="15" height="24" rx="6" fill="#2C3E50" />
        <rect x="43" y="84" width="15" height="24" rx="6" fill="#2C3E50" />

        {/* Leg animation */}
        <motion.g
          animate={isWalking ? { rotate: [12, -12] } : {}}
          transition={{ duration: state === 'run' ? 0.28 : 0.45, repeat: Infinity, repeatType: 'reverse' }}
          style={{ transformOrigin: '34px 84px' }}
        >
          <rect x="27" y="84" width="15" height="24" rx="6" fill="#2C3E50" />
          {/* Shoe */}
          <path d="M25 105 Q28 112 36 110 Q39 106 35 106 Z" fill="#F0F0F0" />
          <path d="M25 105 Q24 109 28 112" fill="#E0E0E0" />
        </motion.g>

        <motion.g
          animate={isWalking ? { rotate: [-12, 12] } : {}}
          transition={{ duration: state === 'run' ? 0.28 : 0.45, repeat: Infinity, repeatType: 'reverse', delay: 0.12 }}
          style={{ transformOrigin: '50px 84px' }}
        >
          <rect x="43" y="84" width="15" height="24" rx="6" fill="#2C3E50" />
          {/* Shoe */}
          <path d="M42 105 Q44 112 52 110 Q55 106 51 106 Z" fill="#F0F0F0" />
          <path d="M42 105 Q41 109 44 112" fill="#E0E0E0" />
        </motion.g>

        {/* HUG arms extended */}
        {state === 'hug' && (
          <>
            <path d="M26 56 Q5 62 3 70" stroke="#FFF0F4" strokeWidth="9" strokeLinecap="round" />
            <path d="M58 56 Q79 62 81 70" stroke="#FFF0F4" strokeWidth="9" strokeLinecap="round" />
          </>
        )}
      </svg>
    </motion.div>
  )
}
