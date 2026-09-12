'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { BirthdayConfig } from '@/types/wedding'

interface Props {
  data: BirthdayConfig
  onComplete: () => void
}

export default function BirthdayEnvelope({ data, onComplete }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    setTimeout(() => {
      setShowLetter(true)
      // Burst of love confetti when letter reveals
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff758c', '#d6336c', '#ffc1cc'],
        disableForReducedMotion: true,
        zIndex: 100
      })
    }, 1200) // Wait for envelope flap to open and letter to slide out
  }

  return (
    <motion.section 
      className="birthday-section"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {!showLetter && (
          <motion.div
            exit={{ opacity: 0, y: 50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <h2 style={{ marginBottom: '2rem' }}>A Message From My Heart ❤️</h2>
            
            <motion.div 
              className="envelope-wrapper"
              onClick={handleOpen}
              whileHover={!isOpen ? { scale: 1.05 } : {}}
              whileTap={!isOpen ? { scale: 0.95 } : {}}
            >
              {/* Envelope Back */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                background: '#f8e1e7',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }} />

              {/* The Letter inside the envelope (slides up) */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={isOpen ? { y: -100, opacity: 1 } : { y: 10, opacity: 0 }}
                transition={{ delay: isOpen ? 0.4 : 0, duration: 0.6, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  width: 'calc(100% - 20px)',
                  height: '160px',
                  background: '#fcf9f2',
                  borderRadius: '4px',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '10px'
                }}
              >
                <div style={{ width: '100%', height: '2px', background: '#e0d6c8', marginTop: '10px' }} />
                <div style={{ width: '80%', height: '2px', background: '#e0d6c8', marginTop: '10px' }} />
              </motion.div>

              {/* Envelope Flap (opens) */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, width: '100%', height: '100%',
                  clipPath: 'polygon(0 0, 50% 50%, 100% 0)',
                  background: '#ffc1cc',
                  transformOrigin: 'top',
                  zIndex: 3
                }}
                initial={{ rotateX: 0 }}
                animate={isOpen ? { rotateX: 180, zIndex: 1 } : { rotateX: 0 }}
                transition={{ duration: 0.6 }}
              />

              {/* Envelope Front Left */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                background: '#f1d1d8',
                zIndex: 4
              }} />

              {/* Envelope Front Right */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                background: '#f1d1d8',
                zIndex: 4
              }} />

              {/* Envelope Front Bottom */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                background: '#fad2d9',
                zIndex: 4
              }} />

              {/* Seal */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: '40%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '40px',
                      height: '40px',
                      background: '#ff758c',
                      borderRadius: '50%',
                      zIndex: 5,
                      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px'
                    }}
                  >
                    💌
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <p style={{ marginTop: '1rem', opacity: isOpen ? 0 : 0.6 }}>Tap to open</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="letter-card"
            style={{
              background: '#fffbf0',
              border: '4px solid #fcf2e3',
              borderRadius: '16px',
              padding: '2rem 1.5rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              position: 'relative',
              width: '90%',
              maxWidth: '400px',
              color: 'var(--birthday-text)',
              fontFamily: "'Caveat', cursive",
              fontSize: '1.4rem',
              lineHeight: '1.6',
              textAlign: 'center'
            }}
          >
            <h2 style={{ fontSize: '1.8rem', color: '#ff758c', marginBottom: '1.5rem' }}>A Message From My Heart ❤️</h2>
            
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 1.2, delayChildren: 0.5 }
                }
              }}
              initial="hidden"
              animate="show"
              style={{ textAlign: 'center' }}
            >
              {(data.birthdayMessage || `Dear ${data.birthdayPersonName || 'Sak'},\n\nHappy Birthday to someone truly special!🎂\n\nYou are a Sweet Soul, Super Loyal, My Rock, and I'm so grateful to have you in my life.\n\nLife is so much more fun with you around! Your energy and laughter light up every room.\n\nOn your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.\n\nHere's to celebrating you today and always!🎉`)
                .split('\n')
                .filter(p => p.trim() !== '')
                .map((paragraph, index) => (
                  <motion.p 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
                    }}
                    style={{ marginBottom: '1rem', lineHeight: '1.6' }}
                  >
                    {paragraph}
                  </motion.p>
              ))}
              
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 1 } }
                }}
                style={{ marginTop: '2rem' }}
              >
                {data.signature || "With love and best wishes,"}<br/>
                {data.senderName || "Your Special Someone"} 💝
              </motion.p>
            </motion.div>

            <img 
              src="/templates/birthday/hero_bears.png" 
              alt="Birthday illustration" 
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '80px',
                height: '80px',
                objectFit: 'contain',
                opacity: 0.95,
                filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))'
              }}
            />

            <motion.button 
              className="birthday-btn primary"
              onClick={onComplete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 }}
              style={{ 
                marginTop: '3rem',
                position: 'relative',
                zIndex: 10,
                width: '100%',
                padding: '0.75rem'
              }}
            >
              Continue 🎁
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
