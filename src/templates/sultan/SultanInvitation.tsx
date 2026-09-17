'use client'

import React, { useState, useEffect } from 'react'
import './sultan.css'
import SultanHero from './sections/SultanHero'
import SultanEvents from './sections/SultanEvents'
import SultanGallery from './sections/SultanGallery'
import { motion, AnimatePresence } from 'framer-motion'
import { WeddingData } from '@/types/wedding'

interface SultanInvitationProps {
  wedding: WeddingData
}

export default function SultanInvitation({ wedding }: SultanInvitationProps) {
  const [opened, setOpened] = useState(false)

  // Prevent scroll when closed
  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [opened])

  const handleOpen = () => {
    setOpened(true)
  }

  return (
    <div className="sultan-shell">
      <SultanHero opened={opened} onOpen={handleOpen} data={wedding} />
      
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="sultan-main"
          >
            {wedding.events && wedding.events.length > 0 && <SultanEvents events={wedding.events} />}
            {wedding.gallery && wedding.gallery.length > 0 && <SultanGallery photos={wedding.gallery.map((g) => g.url)} />}
            
            <footer style={{ padding: '4rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--sultan-crimson-dark)', borderTop: '1px solid rgba(193, 154, 91, 0.2)' }}>
              <h2 className="sultan-h2" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {wedding.couple?.brideName} & {wedding.couple?.groomName}
              </h2>
              <div style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                THANK YOU
              </div>
            </footer>

            {/* ── Call to Action / Branding ── */}
            <div style={{
              backgroundColor: 'var(--sultan-crimson-dark)',
              padding: '3rem 1rem 4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              borderTop: '1px solid rgba(193, 154, 91, 0.15)'
            }}>
              <p style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.05em',
                margin: 0
              }}>
                Create your own premium digital invitation
              </p>
              <a
                href="https://inviting-you-eta.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.6rem 1.5rem',
                  border: '1px solid var(--sultan-gold)',
                  borderRadius: '4px',
                  color: 'var(--sultan-gold)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-sans, sans-serif)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  background: 'transparent'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(193, 154, 91, 0.1)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Visit Inviting You
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
