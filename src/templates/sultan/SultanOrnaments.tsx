import React from 'react'
import { motion } from 'framer-motion'

export const SultanArch = ({ className, style }: { className?: string, style?: React.CSSProperties }) => {
  return (
    <svg className={className} style={style} viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 300 L 0 150 C 0 50, 150 0, 200 0 C 250 0, 400 50, 400 150 L 400 300" stroke="var(--sultan-gold-metallic)" strokeWidth="2" fill="none" />
      <path d="M 20 300 L 20 150 C 20 70, 160 20, 200 20 C 240 20, 380 70, 380 150 L 380 300" stroke="var(--sultan-gold-metallic)" strokeWidth="1" fill="none" opacity="0.6" />
      
      {/* Decorative center piece */}
      <path d="M 200 20 L 200 60" stroke="var(--sultan-gold-metallic)" strokeWidth="1.5" />
      <circle cx="200" cy="65" r="5" fill="var(--sultan-gold-metallic)" />
    </svg>
  )
}

export const SultanDivider = ({ className, style }: { className?: string, style?: React.CSSProperties }) => {
  return (
    <svg className={className} style={{ width: '100%', maxWidth: '300px', ...style }} viewBox="0 0 300 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="15" x2="110" y2="15" stroke="var(--sultan-gold-metallic)" strokeWidth="1" opacity="0.5" />
      <path d="M 150 5 L 160 15 L 150 25 L 140 15 Z" fill="var(--sultan-gold-bright)" />
      <path d="M 125 10 L 130 15 L 125 20 L 120 15 Z" fill="var(--sultan-gold-metallic)" opacity="0.7" />
      <path d="M 175 10 L 180 15 L 175 20 L 170 15 Z" fill="var(--sultan-gold-metallic)" opacity="0.7" />
      <line x1="190" y1="15" x2="300" y2="15" stroke="var(--sultan-gold-metallic)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}
