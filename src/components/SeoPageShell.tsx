'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'
import '@/app/home.css'

const WA_NUMBER = '917411091256'
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export default function SeoPageShell({ children, pageName }: { children: React.ReactNode, pageName: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.iy-fade-in').forEach((el) => observer.observe(el))

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="iy">
      {/* ─── FLOATING WHATSAPP ─── */}
      <a href={waLink(`Hi! I'm interested in ordering a digital invitation. (From ${pageName})`)} target="_blank" rel="noopener noreferrer" className="iy-wa-float" aria-label="Chat on WhatsApp" onClick={() => { trackEvent('whatsapp_click', { location: 'floating', cta_text: 'Order on WhatsApp' }); trackEvent('order_cta_click', { location: 'floating', cta_text: 'Order on WhatsApp' }); }}>
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.25a.75.75 0 00.916.916l5.403-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.932-1.349l-.354-.21-3.665.998.997-3.593-.228-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
        <span>Order on WhatsApp</span>
      </a>

      {/* ─── HEADER ─── */}
      <header className={`iy-header ${scrolled ? 'iy-header--scrolled' : ''}`}>
        <div className="iy-header__inner">
          <Link href="/" className="iy-brand">
            <svg className="iy-brand__mark" viewBox="0 0 48 48"><path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z"/><path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z"/><circle cx="24" cy="24" r="2.2"/></svg>
            <div className="iy-brand__text">
              <span className="iy-brand__name">Inviting <em>You</em></span>
              <span className="iy-brand__sub">More than an invitation</span>
            </div>
          </Link>
          <nav className="iy-nav">
            <Link href="/" className="iy-nav__link">Home</Link>
            <Link href="/templates" className="iy-nav__link">Templates</Link>
            <Link href="/contact" className="iy-nav__link">Contact</Link>
            <a href={waLink(`Hi! I'm interested in ordering a digital invitation. (From ${pageName})`)} target="_blank" rel="noopener noreferrer" className="iy-nav__cta" onClick={() => { trackEvent('whatsapp_click', { location: 'header', cta_text: 'Order on WhatsApp' }); trackEvent('order_cta_click', { location: 'header', cta_text: 'Order on WhatsApp' }); }}>Order on WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main>
        {children}
      </main>

      {/* ─── CTA BANNER ─── */}
      <section className="iy-cta">
        <div className="iy-wrap iy-cta__inner">
          <div>
            <span className="iy-cta__eyebrow">Ready to begin?</span>
            <h2 className="iy-cta__title">Ready to create your invitation?</h2>
            <p className="iy-cta__sub">Let's make your special moment unforgettable. Message us with your chosen template and we'll handle the rest.</p>
            <div className="iy-cta__actions">
              <a
                href={waLink(`Hi! I'm interested in ordering a digital invitation. (From ${pageName})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="iy-btn iy-btn--burg"
                onClick={() => { trackEvent('whatsapp_click', { location: 'bottom_cta', cta_text: 'Order on WhatsApp' }); trackEvent('order_cta_click', { location: 'bottom_cta', cta_text: 'Order on WhatsApp' }); }}
              >
                Order on WhatsApp
              </a>
            </div>
            <div className="iy-cta__trust-note">
              <span>🔒 Secure Process</span> · <span>💯 100% Satisfaction</span>
            </div>
          </div>
          <div className="iy-cta__right">
            <div className="iy-cta__right-num">2-3</div>
            <div className="iy-cta__right-label">Days to Deliver</div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="iy-footer">
        <div className="iy-wrap">
          <div className="iy-footer__top">
            <div className="iy-footer__brand">
              <svg className="iy-brand__mark" viewBox="0 0 48 48"><path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z"/><path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z"/><circle cx="24" cy="24" r="2.2"/></svg>
              <strong className="iy-brand__name">Inviting You</strong>
              <span className="iy-brand__sub">More than an invitation</span>
              <p className="iy-footer__tagline">Because every love story deserves to be beautifully told.</p>
            </div>

            <div>
              <span className="iy-footer__col-title">Wedding Invitations</span>
              <div className="iy-footer__col-links">
                <Link href="/wedding-invitations">Digital Wedding Invites</Link>
                <Link href="/muslim-wedding-invitations">Muslim Wedding Invites</Link>
                <Link href="/islamic-wedding-invitations">Islamic Wedding Invites</Link>
                <Link href="/nikah-invitations">Nikah Invitations</Link>
                <Link href="/walima-invitations">Walima Invitations</Link>
              </div>
            </div>

            <div>
              <span className="iy-footer__col-title">Explore</span>
              <div className="iy-footer__col-links">
                <Link href="/">Home</Link>
                <Link href="/templates">Templates</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </div>
          <div className="iy-footer__bottom">
            <p className="iy-footer__copy">© {new Date().getFullYear()} Inviting You. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
