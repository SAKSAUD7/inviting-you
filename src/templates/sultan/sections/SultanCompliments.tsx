'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SultanDivider } from '../SultanOrnaments'

interface Props {
  compliments: { id?: string; name: string; order: number }[]
}

export default function SultanCompliments({ compliments }: Props) {
  if (!compliments || compliments.length === 0) return null

  // Sort by order
  const sortedCompliments = [...compliments].sort((a, b) => a.order - b.order)

  return (
    <section className="sultan-section" style={{ backgroundColor: 'var(--sultan-crimson-dark)', padding: '6rem 1.5rem', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <h2 className="sultan-h2" style={{ fontSize: '2rem', marginBottom: '1rem' }}>With Best Compliments</h2>
        <SultanDivider style={{ margin: '0 auto 3rem' }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sortedCompliments.map((comp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 1 }}
              style={{
                fontFamily: 'var(--font-sultan-body)',
                color: 'var(--sultan-ivory)',
                fontSize: '1.2rem',
                letterSpacing: '0.05em'
              }}
            >
              {comp.name}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
