'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../home.css'

const WA_NUMBER = '917411091256'
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export default function ContactPage() {
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
      <a href={waLink("Hi! I'm interested in a digital wedding invitation.")} target="_blank" rel="noopener noreferrer" className="iy-wa-float" aria-label="Chat on WhatsApp">
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
            <a href={waLink("Hi! I'm interested in ordering a digital wedding invitation.")} target="_blank" rel="noopener noreferrer" className="iy-nav__cta">Order on WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* ─── CONTACT HERO ─── */}
      <section className="iy-hero" style={{ minHeight: '40vh', paddingBottom: '2rem', paddingTop: '10rem', background: 'var(--surface-2)' }}>
        <div className="iy-hero__noise" aria-hidden />
        <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Get in Touch</span>
          <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', marginBottom: '1.5rem' }}>
            We'd love to hear<br /><em>from you</em>
          </h1>
          <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '540px' }}>
            Whether you need a custom design, have a question about an order, or just want to say hello.
          </p>
        </div>
      </section>

      {/* ─── CONTACT INFO ─── */}
      <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
        <div className="iy-wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            
            {/* WhatsApp Card */}
            <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '3rem 2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-dark)', boxShadow: '0 20px 40px rgba(36,24,22,0.05)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}>
                <svg viewBox="0 0 24 24" fill="var(--brown)" width="32" height="32"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.25a.75.75 0 00.916.916l5.403-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.932-1.349l-.354-.21-3.665.998.997-3.593-.228-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>WhatsApp</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>The fastest way to reach us. We usually reply within an hour.</p>
              <a href={waLink("Hi! I have a question about Inviting You.")} target="_blank" rel="noopener noreferrer" className="iy-btn iy-btn--burg" style={{ width: '100%', justifyContent: 'center' }}>
                Chat Now →
              </a>
            </div>

            {/* Email Card */}
            <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '3rem 2rem', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--border-dark)', boxShadow: '0 20px 40px rgba(36,24,22,0.05)', animationDelay: '0.1s' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid var(--border)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--brown)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Email Us</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>For business inquiries, partnerships, or detailed requests.</p>
              <a href="mailto:hello@invitingyou.com" className="iy-btn iy-btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                hello@invitingyou.com
              </a>
            </div>

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
