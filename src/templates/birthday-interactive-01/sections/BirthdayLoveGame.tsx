'use client'

/**
 * BirthdayLoveGame — thin wrapper that lazy-loads LoveQuestGame3D.
 * The actual 3-D game (R3F canvas, characters, world) lives in LoveQuestGame3D.tsx.
 */
import dynamic from 'next/dynamic'
import { BirthdayConfig } from '@/types/wedding'
import { motion } from 'framer-motion'

const LoveQuestGame3D = dynamic(() => import('./LoveQuestGame3D'), {
  ssr: false,
  loading: () => (
    <section style={{
      width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #0D0628 0%, #2D0F4A 100%)',
      gap: '1rem',
    }}>
      <div style={{ fontSize: '3rem', animation: 'spin 1s linear infinite' }}>💖</div>
      <p style={{ fontFamily: 'var(--font-birthday-heading)', color: '#FF9EB5', fontSize: '1.1rem' }}>
        Loading Love Quest...
      </p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </section>
  ),
})

export interface BirthdayLoveGameProps {
  data: BirthdayConfig
  onComplete: () => void
}

export default function BirthdayLoveGame({ data, onComplete }: BirthdayLoveGameProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%', height: '100dvh', overflow: 'hidden', position: 'relative' }}
    >
      <LoveQuestGame3D data={data} onComplete={onComplete} />
    </motion.div>
  )
}
