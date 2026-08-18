'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import './home.css'

const templates = [
  {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Cinematic midnight luxury',
    desc: 'Deep crimson and gold — a dramatic, immersive invitation that commands attention.',
    color: '#3D0A0A',
    accent: '#C9971A',
    href: '/templates/velvet',
    live: '/i/iqra-mufassir',
    badge: 'LIVE',
  },
  {
    id: 'noor',
    name: 'Noor',
    tagline: 'Light, elegant, serene',
    desc: 'Ivory and sage with Islamic arch motifs — grace personified.',
    color: '#FFFEF9',
    accent: '#C9A96E',
    href: '/templates/noor',
    live: null,
    badge: 'COMING SOON',
  },
  {
    id: 'meher',
    name: 'Meher',
    tagline: 'Floral and romantic',
    desc: 'Soft blush, hand-drawn florals, and dreamy calligraphy.',
    color: '#FAF0F0',
    accent: '#D4A5A5',
    href: null,
    live: null,
    badge: 'COMING SOON',
  },
  {
    id: 'zariya',
    name: 'Zariya',
    tagline: 'Modern editorial luxury',
    desc: 'Stark contrasts, editorial typography, and precise design.',
    color: '#0D0D0D',
    accent: '#E8E0D5',
    href: null,
    live: null,
    badge: 'COMING SOON',
  },
  {
    id: 'sukoon',
    name: 'Sukoon',
    tagline: 'Minimal and meditative',
    desc: 'Clean lines, breathing space, and quiet sophistication.',
    color: '#F5F2EE',
    accent: '#B8964A',
    href: null,
    live: null,
    badge: 'COMING SOON',
  },
  {
    id: 'sultan',
    name: 'Sultan',
    tagline: 'Regal and commanding',
    desc: 'Deep navy and gold — a declaration rather than an invitation.',
    color: '#0A0A2D',
    accent: '#D4AC5A',
    href: null,
    live: null,
    badge: 'COMING SOON',
  },
]

const features = [
  { icon: '🎬', title: 'Cinematic Opening', desc: 'Every invitation begins with a dramatic reveal your guests will remember.' },
  { icon: '🎵', title: 'Background Music', desc: 'Set the mood with a carefully chosen soundtrack that plays as they read.' },
  { icon: '📸', title: 'Photo Gallery', desc: 'Showcase your story with a curated gallery of your most precious moments.' },
  { icon: '⏳', title: 'Live Countdown', desc: 'Build anticipation with a real-time countdown to your special day.' },
  { icon: '📍', title: 'Venue & Events', desc: 'All events, venues, timings, and map links in one beautiful page.' },
  { icon: '✅', title: 'RSVP Collection', desc: 'Collect guest confirmations elegantly — no forms, no spreadsheets.' },
  { icon: '💫', title: 'Scratch Reveal', desc: 'An interactive moment: guests scratch to reveal your wedding date.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Perfected for every screen — guests share it directly from WhatsApp.' },
]

const steps = [
  { n: '01', title: 'Choose a template', desc: 'Browse our curated collection and find the aesthetic that speaks to your love story.' },
  { n: '02', title: 'Share your details', desc: 'We collect your names, photos, event details, and preferred music.' },
  { n: '03', title: 'We craft it', desc: 'Your entire invitation is built, personalised, and polished to perfection.' },
  { n: '04', title: 'Share the link', desc: 'Receive your unique invitation URL in 2–3 days. Share it with everyone.' },
]

const faqs = [
  { q: 'What is the price?', a: 'Every theme in the current Inviting You collection is ₹1,999. A 50% advance is required to begin.' },
  { q: 'How long does delivery take?', a: 'Your invitation is delivered within 2–3 days after you select a theme, pay the advance, and submit all details.' },
  { q: 'What does each invitation include?', a: 'A cinematic intro, couple reveal, interactive date scratch, photo gallery, event countdown, venue details, event schedule, dress code, and a personalised closing.' },
  { q: 'Can anything be personalised?', a: 'Almost everything. Names, photos, music, events, venues, colors — and any section you don\'t need can be removed.' },
  { q: 'Can you build a completely custom design?', a: 'Yes. Share your visual references and we\'ll quote based on the complexity of the custom request.' },
]

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="iy-home">
      {/* ─── HEADER ─── */}
      <header className="iy-header">
        <div className="iy-header__inner">
          <Link href="/" className="iy-brand">
            <svg className="iy-brand__mark" viewBox="0 0 48 48">
              <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
              <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
              <circle cx="24" cy="24" r="2.2" />
            </svg>
            <span className="iy-brand__name">
              <strong>Inviting</strong>
              <em>You</em>
            </span>
          </Link>

          <nav className="iy-nav">
            <Link href="#templates">Templates</Link>
            <Link href="#how-it-works">How It Works</Link>
            <Link href="#faq">FAQ</Link>
            <Link href="/admin/login" className="iy-nav__cta">
              Studio
            </Link>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="iy-hero" ref={heroRef}>
        <div className="iy-hero__noise" aria-hidden />
        <div className="iy-hero__orb iy-hero__orb--1" aria-hidden />
        <div className="iy-hero__orb iy-hero__orb--2" aria-hidden />

        <div className="iy-hero__content">
          <p className="iy-hero__eyebrow">Cinematic wedding invitations</p>
          <h1 className="iy-hero__title">
            Designed to be<br />
            <em>opened, felt,</em><br />
            and remembered.
          </h1>
          <p className="iy-hero__lead">
            Premium digital wedding invitations personalised with your story,
            your music, and every celebration detail — beautifully delivered to
            every guest's phone.
          </p>
          <div className="iy-hero__actions">
            <Link href="#templates" className="iy-btn iy-btn--gold">
              Explore Templates
            </Link>
            <Link href="/i/iqra-mufassir" className="iy-btn iy-btn--ghost" target="_blank">
              Live Demo ↗
            </Link>
          </div>

          <div className="iy-hero__trust">
            <span>Mobile-first</span>
            <span>·</span>
            <span>Private invitation link</span>
            <span>·</span>
            <span>2–3 day delivery</span>
          </div>
        </div>

        <div className="iy-hero__preview">
          <div className="iy-phone-mockup">
            <div className="iy-phone-mockup__screen">
              <div className="iy-phone-mockup__velvet">
                <div className="iy-phone-velvet__bg" />
                <p className="iy-phone-velvet__eyebrow">The Wedding of</p>
                <h3 className="iy-phone-velvet__names">Iqra<br />&<br />Mufassir</h3>
                <p className="iy-phone-velvet__date">02 · 10 · 2026</p>
                <button className="iy-phone-velvet__open">Open Invitation</button>
              </div>
            </div>
            <div className="iy-phone-mockup__notch" />
          </div>
        </div>
      </section>

      {/* ─── TEMPLATES ─── */}
      <section className="iy-section" id="templates">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Choose your theme</p>
            <h2>The Inviting You Collection</h2>
          </div>

          <div className="iy-template-grid">
            {templates.map((t, i) => (
              <div
                key={t.id}
                className={`iy-template-card animate-on-scroll ${t.live ? 'iy-template-card--live' : ''}`}
                style={{ animationDelay: `${i * 0.1}s`, '--card-color': t.color, '--card-accent': t.accent } as React.CSSProperties}
              >
                <div className="iy-template-card__preview" style={{ background: t.color }}>
                  <div className="iy-template-card__inner">
                    <div className="iy-template-card__badge" style={{ color: t.accent, borderColor: t.accent }}>
                      {t.badge}
                    </div>
                    <h3 className="iy-template-card__name" style={{ color: t.accent }}>{t.name}</h3>
                    <p className="iy-template-card__tagline" style={{ color: t.id === 'velvet' || t.id === 'zariya' || t.id === 'sultan' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)' }}>
                      {t.tagline}
                    </p>
                  </div>
                </div>
                <div className="iy-template-card__info">
                  <p>{t.desc}</p>
                  <div className="iy-template-card__actions">
                    {t.live ? (
                      <Link href={t.live} target="_blank" className="iy-template-card__btn iy-template-card__btn--live">
                        Experience Live ↗
                      </Link>
                    ) : t.href ? (
                      <Link href={t.href} className="iy-template-card__btn">
                        Preview
                      </Link>
                    ) : (
                      <span className="iy-template-card__soon">Coming soon</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="iy-section iy-section--dark">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Invitation highlights</p>
            <h2>Made to feel special.</h2>
          </div>

          <div className="iy-features-grid">
            {features.map((f, i) => (
              <div key={i} className="iy-feature-card animate-on-scroll" style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="iy-feature-card__icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="iy-section" id="how-it-works">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Simple by design</p>
            <h2>How it works</h2>
          </div>

          <div className="iy-steps">
            {steps.map((s, i) => (
              <div key={i} className="iy-step animate-on-scroll" style={{ animationDelay: `${i * 0.15}s` }}>
                <span className="iy-step__num">{s.n}</span>
                <div className="iy-step__content">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
                {i < steps.length - 1 && <div className="iy-step__line" aria-hidden />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="iy-cta-banner animate-on-scroll">
        <div className="iy-cta-banner__orb" aria-hidden />
        <div className="iy-cta-banner__content">
          <p className="iy-kicker">Start your invitation</p>
          <h2>Found a theme you love?</h2>
          <p>Message us with its name and your wedding date and we'll create something unforgettable.</p>
          <div className="iy-cta-banner__actions">
            <a
              href="https://wa.me/919739700723?text=Hi%2C%20I%20am%20interested%20in%20a%20digital%20wedding%20invitation."
              target="_blank"
              rel="noopener noreferrer"
              className="iy-btn iy-btn--gold"
            >
              Enquire on WhatsApp
            </a>
            <Link href="#templates" className="iy-btn iy-btn--ghost">
              Explore Templates
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="iy-section iy-section--dark" id="faq">
        <div className="iy-container iy-container--narrow">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Good to know</p>
            <h2>Frequently asked</h2>
          </div>

          <div className="iy-faq animate-on-scroll">
            {faqs.map((f, i) => (
              <div key={i} className={`iy-faq__item ${openFaq === i ? 'open' : ''}`}>
                <button className="iy-faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="iy-faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="iy-faq__a">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="iy-footer">
        <div className="iy-container">
          <div className="iy-footer__top">
            <div className="iy-footer__brand">
              <svg className="iy-brand__mark" viewBox="0 0 48 48">
                <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
                <circle cx="24" cy="24" r="2.2" />
              </svg>
              <div>
                <strong>Inviting You</strong>
                <p>Premium digital wedding invitations</p>
              </div>
            </div>
            <nav className="iy-footer__nav">
              <Link href="#templates">Templates</Link>
              <Link href="#how-it-works">How It Works</Link>
              <Link href="#faq">FAQ</Link>
              <Link href="/admin/login">Studio Login</Link>
            </nav>
          </div>
          <div className="iy-footer__bottom">
            <p>© {new Date().getFullYear()} Inviting You. All rights reserved.</p>
            <p>
              <a href="https://wa.me/919739700723" target="_blank" rel="noopener noreferrer">
                WhatsApp: 9739700723
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
