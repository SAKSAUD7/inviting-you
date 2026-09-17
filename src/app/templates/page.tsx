'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../home.css'
import { weddingTemplates, celebrationTemplates } from '@/data/templates'

const WA_NUMBER = '917411091256'
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

interface TemplateOffer { label: string; discountPct: number; expiresAt: string | null }

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState<'wedding' | 'celebrations'>('wedding')
  const [offers, setOffers] = useState<Record<string, TemplateOffer>>({})
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
  }, [activeCategory])

  useEffect(() => {
    fetch('/api/offers')
      .then(r => r.json())
      .then(data => { if (data.offers) setOffers(data.offers) })
      .catch(() => {})
  }, [])

  const templates = activeCategory === 'wedding' ? weddingTemplates : celebrationTemplates
  const getDiscountedPrice = (original: number, pct: number) => Math.round(original * (1 - pct / 100))

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
            <a href={waLink("Hi! I'm interested in ordering a digital wedding invitation.")} target="_blank" rel="noopener noreferrer" className="iy-nav__cta">Order on WhatsApp</a>
          </nav>
        </div>
      </header>

      {/* ─── PAGE HERO ─── */}
      <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '10rem', background: 'var(--surface-2)' }}>
        <div className="iy-hero__noise" aria-hidden />
        <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>The Collection</span>
          <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', marginBottom: '1.5rem' }}>
            Choose a design that<br /><em>tells your story</em>
          </h1>
          <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '540px' }}>
            Every template is fully customized with your names, photos, music, and details. Delivered as a cinematic experience in 2-3 days.
          </p>
        </div>
      </section>

      {/* ─── TEMPLATES GRID ─── */}
      <section className="iy-templates" style={{ paddingTop: '4rem' }}>
        <div className="iy-wrap">
          <div className="iy-cat-tabs iy-fade-in" style={{ justifyContent: 'center', borderBottom: 'none', marginBottom: '4rem' }}>
            <button className={`iy-cat-tab ${activeCategory === 'wedding' ? 'active' : ''}`} onClick={() => setActiveCategory('wedding')}>
              Wedding Invitations
            </button>
            <button className={`iy-cat-tab ${activeCategory === 'celebrations' ? 'active' : ''}`} onClick={() => setActiveCategory('celebrations')}>
              Celebrations
            </button>
          </div>

          <div className="iy-template-grid">
            {templates.map((t, i) => {
              const offer = offers[t.id]
              const discountedPrice = offer ? getDiscountedPrice(t.price, offer.discountPct) : null
              const isLive = t.demo !== null

              if (!isLive) {
                return (
                  <div key={t.id} className="iy-tpl-card-soon-thin iy-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="iy-tpl-card-soon-thin__name">{t.name}</span>
                    <span className="iy-tpl-card-soon-thin__badge">Coming Soon</span>
                  </div>
                )
              }

              return (
                <div key={t.id} className={`iy-tpl-card iy-fade-in ${t.themeClass} iy-tpl-card--live`} style={{ animationDelay: `${i * 0.1}s` }}>
                  {offer && (
                    <div className="iy-template-card__offer-badge" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15, background: 'linear-gradient(90deg, #B8860B, #C9971A, #E8C060, #C9971A, #B8860B)', backgroundSize: '200% auto', color: '#0A0A0C', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', padding: '0.28rem', animation: 'shimmerBadge 2.5s linear infinite' }}>
                      {offer.label} — {offer.discountPct}% OFF
                    </div>
                  )}

                  <div className="iy-tpl-card__preview">
                    {t.previewImg && <img src={t.previewImg} alt={t.name} />}
                    <div className="iy-tpl-card__overlay">
                      <Link href={t.demo!} target="_blank" className="iy-tpl-card__overlay-btn">
                        <span>Experience</span><span>→</span>
                      </Link>
                      <a href={t.previewImg || '#'} target="_blank" className="iy-tpl-card__overlay-btn iy-tpl-card__overlay-btn--outline">
                        <span>Preview Image</span><span>→</span>
                      </a>
                    </div>
                    <div className="iy-tpl-card__live">{t.badge}</div>
                  </div>

                  <div className="iy-tpl-card__body">
                    <h3 className="iy-tpl-card__name">{t.name}</h3>
                    <p className="iy-tpl-card__sub">{t.tagline}</p>

                    <div className="iy-tpl-card__price">
                      {offer ? (
                        <><span className="iy-tpl-card__price--original">₹{t.price.toLocaleString('en-IN')}</span><span>₹{discountedPrice?.toLocaleString('en-IN')}</span></>
                      ) : (
                        <span>₹{t.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>

                    <div className="iy-tpl-card__actions">
                      {isLive ? (
                        <a href={waLink(`Hi! I love the ${t.name} template. I want to order it for my wedding. Can you help me?`)} target="_blank" rel="noopener noreferrer" className="iy-tpl-card__action">Order Now</a>
                      ) : (
                        <div className="iy-tpl-card__action iy-tpl-card__action--outline" style={{ cursor: 'default', opacity: 0.6 }}>Coming Soon</div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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
