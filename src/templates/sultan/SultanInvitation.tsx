'use client'

import React, { useState, useEffect } from 'react'
import './sultan.css'
import SultanHero from './sections/SultanHero'
import SultanEvents from './sections/SultanEvents'
import SultanGallery from './sections/SultanGallery'
import { motion, AnimatePresence } from 'framer-motion'

interface SultanInvitationProps {
  wedding: any
}

export default function SultanInvitation({ wedding: data }: SultanInvitationProps) {
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
      <SultanHero opened={opened} onOpen={handleOpen} data={data} />
      
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="sultan-main"
          >
            {data.events && data.events.length > 0 && <SultanEvents events={data.events} />}
            {data.gallery && data.gallery.length > 0 && <SultanGallery photos={data.gallery.map((g: any) => g.url)} />}
            
            <footer style={{ padding: '4rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--sultan-crimson-dark)', borderTop: '1px solid rgba(193, 154, 91, 0.2)' }}>
              <h2 className="sultan-h2" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                {data.bride?.firstName} & {data.groom?.firstName}
              </h2>
              <div style={{ fontFamily: 'var(--font-sultan-display)', color: 'var(--sultan-gold-metallic)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
                THANK YOU
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
