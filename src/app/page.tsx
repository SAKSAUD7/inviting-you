'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import './home.css'

// ─── WhatsApp config ────────────────────────────────────────────────────────
const WA_NUMBER = '917411091256'
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

// ─── Template catalogue ──────────────────────────────────────────────────────
const weddingTemplates = [
  {
    id: 'velvet',
    name: 'Velvet',
    tagline: 'Cinematic midnight luxury',
    desc: 'Deep crimson and gold — a dramatic, immersive invitation that commands attention.',
    color: '#1A0404',
    accent: '#C9971A',
    demo: '/i/demo-velvet',
    badge: 'LIVE',
    tags: ['Islamic', 'Luxury', 'Cinematic'],
    price: 1999,
  },
  {
    id: 'sultan',
    name: 'Sultan',
    tagline: 'Royal, majestic, commanding',
    desc: 'Deep navy and gold with a palace door reveal — a declaration, not just an invitation.',
    color: '#0A0A2D',
    accent: '#D4AC5A',
    demo: '/i/demo-sultan',
    badge: 'LIVE',
    tags: ['Islamic', 'Royal', 'Nikah'],
    price: 1999,
  },
  {
    id: 'walima',
    name: 'Petal',
    tagline: 'Soft floral elegance',
    desc: 'Blush pastels, floating petals, and a custom intertwined monogram — grace in every detail.',
    color: '#1C0F14',
    accent: '#D4A5A5',
    demo: '/i/demo-petal',
    badge: 'LIVE',
    tags: ['Islamic', 'Romantic', 'Walima'],
    price: 1999,
  },
  {
    id: 'noor',
    name: 'Noor',
    tagline: 'Light, elegant, serene',
    desc: 'Ivory and sage with Islamic arch motifs — graceful, editorial, and quietly beautiful.',
    color: '#161210',
    accent: '#C9A96E',
    demo: '/i/demo-noor',
    badge: 'LIVE',
    tags: ['Islamic', 'Editorial', 'Elegant'],
    price: 1999,
  },
  { id: 'zariya', name: 'Zariya', tagline: 'Modern editorial luxury', desc: 'Stark contrasts, editorial typography, and precise design.', color: '#0D0D0D', accent: '#E8E0D5', demo: null, badge: 'COMING SOON', tags: ['Modern', 'Editorial'], price: 1999 },
  { id: 'meher', name: 'Meher', tagline: 'Dreamy and romantic', desc: 'Soft blush, hand-drawn florals, and dreamy calligraphy.', color: '#140A0A', accent: '#D4A5A5', demo: null, badge: 'COMING SOON', tags: ['Romantic', 'Floral'], price: 1999 },
  { id: 'sukoon', name: 'Sukoon', tagline: 'Minimal and meditative', desc: 'Clean lines, breathing space, and quiet sophistication.', color: '#0C0C0A', accent: '#B8964A', demo: null, badge: 'COMING SOON', tags: ['Minimal', 'Modern'], price: 1999 },
  { id: 'pearl', name: 'Pearl', tagline: 'Classic white & gold', desc: 'Timeless pearl tones with gold flourishes for the grand reception.', color: '#111008', accent: '#E8D5A0', demo: null, badge: 'COMING SOON', tags: ['Classic', 'Reception'], price: 1999 },
]

const celebrationTemplates = [
  {
    id: 'birthday-interactive-01',
    name: 'Birthday Surprise',
    tagline: 'Playful, interactive, emotional',
    desc: 'Balloon popping games, an interactive candle, and an emotional message reveal — a celebration your loved one will never forget.',
    color: '#0A0A1A',
    accent: '#7C6AFA',
    demo: '/i/demo-birthday',
    badge: 'LIVE',
    tags: ['Birthday', 'Interactive', 'Playful'],
    price: 1999,
  },
  { id: 'anniversary', name: 'Anniversary', tagline: 'A love that grows', desc: 'Celebrate years of togetherness with a cinematic digital anniversary card.', color: '#12080A', accent: '#F4A0B0', demo: null, badge: 'COMING SOON', tags: ['Anniversary', 'Romantic'], price: 1999 },
  { id: 'baby-shower', name: 'Baby Shower', tagline: 'Soft, sweet, joyful', desc: 'Pastel clouds and gentle animations for your little one\'s arrival.', color: '#080C14', accent: '#A0C4F4', demo: null, badge: 'COMING SOON', tags: ['Baby Shower', 'Pastel'], price: 1999 },
]

const features = [
  { icon: '🎬', title: 'Cinematic Opening', desc: 'A dramatic animated reveal your guests will genuinely want to share.' },
  { icon: '🎵', title: 'Background Music', desc: 'Set the mood with a handpicked soundtrack that plays as they scroll.' },
  { icon: '📸', title: 'Photo Gallery', desc: 'Curated gallery of your most precious moments, beautifully presented.' },
  { icon: '⏳', title: 'Live Countdown', desc: 'Real-time countdown to your big day builds the excitement.' },
  { icon: '📍', title: 'All Events & Venues', desc: 'Every event, timing, venue and map link — all in one page.' },
  { icon: '✅', title: 'RSVP Collection', desc: 'Collect guest confirmations elegantly, no spreadsheets needed.' },
  { icon: '💫', title: 'Scratch to Reveal', desc: 'Guests scratch to reveal your wedding date — an interactive moment.' },
  { icon: '📱', title: 'WhatsApp Ready', desc: 'Share one link on WhatsApp — guests open it instantly on mobile.' },
]

const steps = [
  { n: '01', title: 'Choose a template', desc: 'Browse our collection and find the aesthetic that speaks to your love story.' },
  { n: '02', title: 'Share your details', desc: 'We collect names, photos, event details, music choice — everything we need.' },
  { n: '03', title: 'We craft it', desc: 'Your invitation is built, personalised, and polished within 2–3 days.' },
  { n: '04', title: 'Share the link', desc: 'Get your unique URL. Copy it to WhatsApp and let the excitement begin.' },
]

const reviews = [
  {
    name: 'Aman & Tazeen',
    city: 'Bangalore',
    rating: 5,
    text: 'Our guests were genuinely surprised — several called us just to say how beautiful the invitation was. Worth every rupee!',
    template: 'Velvet',
    date: 'November 2026',
  },
  {
    name: 'Zainab & Farhan',
    city: 'Hyderabad',
    rating: 5,
    text: 'The cinematic opening literally gave me goosebumps the first time I saw it. Such a premium feel for a digital invitation.',
    template: 'Sultan',
    date: 'October 2026',
  },
  {
    name: 'Nida & Yasir',
    city: 'Mumbai',
    rating: 5,
    text: 'Every single guest complimented the invite. The music, the photos, the countdown — it was like a mini wedding film.',
    template: 'Petal',
    date: 'September 2026',
  },
  {
    name: 'Sana & Umar',
    city: 'Pune',
    rating: 5,
    text: 'Delivered in exactly 2 days. The personalisation was spot on. Even our elders loved how easy it was to open on WhatsApp.',
    template: 'Velvet',
    date: 'August 2026',
  },
]

const faqs = [
  { q: 'What is the price?', a: 'All templates are ₹1,999. A 50% advance (₹999) is required to begin. The remaining ₹1,000 is paid on delivery.' },
  { q: 'How long does delivery take?', a: 'Your invitation is delivered within 2–3 days after you select a template, pay the advance, and share all details via WhatsApp.' },
  { q: 'What does each invitation include?', a: 'A cinematic opening, couple reveal, interactive date scratch, photo gallery, event countdown, venue details, event schedule, and a personalised closing — all in one link.' },
  { q: 'Can anything be personalised?', a: 'Almost everything. Names, photos, music, events, venues, colours — and any section you don\'t need can simply be removed.' },
  { q: 'Do guests need to install an app?', a: 'No. The invitation opens directly in any browser — guests just tap the link on WhatsApp.' },
  { q: 'Can I get a completely custom design?', a: 'Yes. Share your references and we\'ll quote based on the complexity of the custom request.' },
]

const marqueeItems = [
  '✦ Premium Digital Invitations',
  '✦ WhatsApp Ready',
  '✦ 2–3 Day Delivery',
  '✦ Mobile First',
  '✦ Cinematic Opening',
  '✦ Custom Music',
  '✦ Live Countdown',
  '✦ RSVP Collection',
  '✦ Photo Gallery',
  '✦ Scratch to Reveal',
]

// ─── Offer type ───────────────────────────────────────────────────────────────
interface TemplateOffer { label: string; discountPct: number; expiresAt: string | null }

// ─── Main component ──────────────────────────────────────────────────────────
export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<'wedding' | 'celebrations'>('wedding')
  const [offers, setOffers] = useState<Record<string, TemplateOffer>>({})
  const heroRef = useRef<HTMLDivElement>(null)

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Fetch active offers
  useEffect(() => {
    fetch('/api/offers')
      .then(r => r.json())
      .then(data => { if (data.offers) setOffers(data.offers) })
      .catch(() => {})
  }, [])

  const templates = activeCategory === 'wedding' ? weddingTemplates : celebrationTemplates

  function getDiscountedPrice(original: number, pct: number) {
    return Math.round(original * (1 - pct / 100))
  }

  return (
    <div className="iy-home">
      {/* ─── FLOATING WHATSAPP ─── */}
      <a
        href={waLink("Hi! I'm interested in a digital wedding invitation. Can you help me choose a template?")}
        target="_blank"
        rel="noopener noreferrer"
        className="iy-wa-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.25a.75.75 0 00.916.916l5.403-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.932-1.349l-.354-.21-3.665.998.997-3.593-.228-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
        </svg>
        <span>Order Now</span>
      </a>

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
            <Link href="#reviews">Reviews</Link>
            <Link href="#faq">FAQ</Link>
            <a
              href={waLink("Hi! I'm interested in ordering a digital wedding invitation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="iy-nav__wa"
            >
              📲 Order on WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="iy-hero" ref={heroRef}>
        <div className="iy-hero__noise" aria-hidden />
        <div className="iy-hero__orb iy-hero__orb--1" aria-hidden />
        <div className="iy-hero__orb iy-hero__orb--2" aria-hidden />

        <div className="iy-hero__content">
          <p className="iy-hero__eyebrow">Premium Digital Wedding Invitations</p>
          <h1 className="iy-hero__title">
            Designed to be<br />
            <em>opened, felt,</em><br />
            and remembered.
          </h1>
          <p className="iy-hero__lead">
            Beautiful cinematic digital invitations personalised with your names,
            photos, music, and every event detail — delivered in 2–3 days, shared via WhatsApp.
          </p>
          <div className="iy-hero__actions">
            <Link href="#templates" className="iy-btn iy-btn--gold">
              Explore Templates
            </Link>
            <Link href="/i/demo-velvet" className="iy-btn iy-btn--ghost" target="_blank">
              See a Live Demo ↗
            </Link>
          </div>

          <div className="iy-hero__trust">
            <span>📱 Mobile-first</span>
            <span>·</span>
            <span>⚡ 2–3 day delivery</span>
            <span>·</span>
            <span>💬 WhatsApp support</span>
            <span>·</span>
            <span>⭐ 5-star rated</span>
          </div>
        </div>

        <div className="iy-hero__preview">
          <div className="iy-phone-mockup">
            <div className="iy-phone-mockup__screen">
              <div className="iy-phone-mockup__velvet">
                <div className="iy-phone-velvet__bg" />
                <p className="iy-phone-velvet__eyebrow">Wedding Invitation</p>
                <h3 className="iy-phone-velvet__names">Zara<br />&<br />Aryan</h3>
                <p className="iy-phone-velvet__date">15 · 03 · 2025</p>
                <button className="iy-phone-velvet__open">Tap to Open</button>
              </div>
            </div>
            <div className="iy-phone-mockup__notch" />
          </div>
          <div className="iy-hero__price-pill">
            Starting at <strong>₹1,999</strong>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="iy-marquee" aria-hidden>
        <div className="iy-marquee__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="iy-marquee__item">{item}</span>
          ))}
        </div>
      </div>

      {/* ─── STATS ─── */}
      <section className="iy-stats-bar animate-on-scroll">
        {[
          { n: '5+', label: 'Live Templates' },
          { n: '₹1,999', label: 'Flat Price, All Templates' },
          { n: '2–3', label: 'Day Delivery' },
          { n: '100%', label: 'Mobile Optimised' },
        ].map((s) => (
          <div key={s.label} className="iy-stats-bar__item">
            <strong>{s.n}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      {/* ─── FEATURED SPOTLIGHT ─── */}
      <section className="iy-spotlight animate-on-scroll">
        <div className="iy-container">
          <div className="iy-spotlight__inner">
            <div className="iy-spotlight__content">
              <p className="iy-kicker">Featured Template</p>
              <h2 className="iy-spotlight__title">
                Velvet — <em>Cinematic Midnight Luxury</em>
              </h2>
              <p className="iy-spotlight__desc">
                Deep crimson and gold, a dramatic immersive experience that opens like a film.
                Used by couples across India who want their invitation to feel like an event.
              </p>
              <div className="iy-spotlight__tags">
                <span>Islamic Wedding</span>
                <span>Cinematic</span>
                <span>Luxury</span>
                <span>Mobile First</span>
              </div>
              <div className="iy-spotlight__actions">
                <Link href="/i/demo-velvet" target="_blank" className="iy-btn iy-btn--gold">
                  Experience Live ↗
                </Link>
                <a
                  href={waLink('Hi! I love the Velvet template and want to order it for my wedding.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iy-btn iy-btn--wa"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
            <div className="iy-spotlight__preview">
              <div className="iy-phone-mockup iy-phone-mockup--small">
                <div className="iy-phone-mockup__screen">
                  <div className="iy-phone-mockup__velvet">
                    <div className="iy-phone-velvet__bg" />
                    <p className="iy-phone-velvet__eyebrow">The Wedding of</p>
                    <h3 className="iy-phone-velvet__names">Zara<br />&<br />Aryan</h3>
                    <p className="iy-phone-velvet__date">15 · 03 · 2025</p>
                    <button className="iy-phone-velvet__open">Tap to Open</button>
                  </div>
                </div>
                <div className="iy-phone-mockup__notch" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEMPLATES ─── */}
      <section className="iy-section" id="templates">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Choose your experience</p>
            <h2>The Inviting You Collection</h2>
            <p className="iy-section-head__sub">
              Every template is ₹1,999 — fully personalised, delivered in 2–3 days.
            </p>
          </div>

          {/* Category tabs */}
          <div className="iy-cat-tabs animate-on-scroll">
            <button
              className={`iy-cat-tab ${activeCategory === 'wedding' ? 'active' : ''}`}
              onClick={() => setActiveCategory('wedding')}
            >
              💍 Wedding Invitations
            </button>
            <button
              className={`iy-cat-tab ${activeCategory === 'celebrations' ? 'active' : ''}`}
              onClick={() => setActiveCategory('celebrations')}
            >
              🎉 Celebrations
            </button>
          </div>

          <div className="iy-template-grid">
            {templates.map((t, i) => {
              const offer = offers[t.id]
              const discountedPrice = offer ? getDiscountedPrice(t.price, offer.discountPct) : null
              const isDark = ['velvet', 'sultan', 'zariya', 'anniversary', 'birthday-interactive-01'].includes(t.id)

              return (
                <div
                  key={t.id}
                  className={`iy-template-card animate-on-scroll ${t.demo ? 'iy-template-card--live' : ''}`}
                  style={{ animationDelay: `${i * 0.08}s`, '--card-color': t.color, '--card-accent': t.accent } as React.CSSProperties}
                >
                  {/* Offer badge */}
                  {offer && (
                    <div className="iy-template-card__offer-badge">
                      {offer.label} — {offer.discountPct}% OFF
                    </div>
                  )}

                  <div className="iy-template-card__preview" style={{ background: t.color }}>
                    <div className="iy-template-card__inner">
                      <div className="iy-template-card__badge" style={{ color: t.accent, borderColor: `${t.accent}66` }}>
                        {t.badge}
                      </div>
                      <h3 className="iy-template-card__name" style={{ color: t.accent }}>{t.name}</h3>
                      <p className="iy-template-card__tagline" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.45)' }}>
                        {t.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="iy-template-card__info">
                    <div className="iy-template-card__tags">
                      {t.tags.map(tag => <span key={tag} className="iy-tag">{tag}</span>)}
                    </div>
                    <p>{t.desc}</p>

                    {/* Pricing */}
                    <div className="iy-template-card__price">
                      {offer ? (
                        <>
                          <span className="iy-price--original">₹{t.price.toLocaleString('en-IN')}</span>
                          <span className="iy-price--discounted">₹{discountedPrice?.toLocaleString('en-IN')}</span>
                        </>
                      ) : (
                        <span className="iy-price--regular">₹{t.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>

                    <div className="iy-template-card__actions">
                      {t.demo ? (
                        <>
                          <Link href={t.demo} target="_blank" className="iy-template-card__btn iy-template-card__btn--demo">
                            View Demo ↗
                          </Link>
                          <a
                            href={waLink(`Hi! I love the ${t.name} template. I want to order it for my wedding. Can you help me?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iy-template-card__btn iy-template-card__btn--order"
                          >
                            Order Now
                          </a>
                        </>
                      ) : (
                        <span className="iy-template-card__soon">Coming soon</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="iy-section iy-section--dark">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">What's inside every invitation</p>
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

      {/* ─── REVIEWS ─── */}
      <section className="iy-section iy-section--dark" id="reviews">
        <div className="iy-container">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">What couples are saying</p>
            <h2>Words from our families</h2>
          </div>

          <div className="iy-reviews-grid">
            {reviews.map((r, i) => (
              <div key={i} className="iy-review-card animate-on-scroll" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="iy-review-card__stars">
                  {'★'.repeat(r.rating)}
                </div>
                <blockquote className="iy-review-card__text">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <div className="iy-review-card__footer">
                  <div className="iy-review-card__couple">
                    <strong>{r.name}</strong>
                    <span>{r.city}</span>
                  </div>
                  <div className="iy-review-card__meta">
                    <span className="iy-tag">{r.template}</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="iy-reviews-cta animate-on-scroll">
            <p>Join hundreds of couples who made their invitation unforgettable.</p>
            <a
              href={waLink("Hi! I want to create a digital wedding invitation. Can you help?")}
              target="_blank"
              rel="noopener noreferrer"
              className="iy-btn iy-btn--gold"
            >
              Start Your Invitation
            </a>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="iy-section">
        <div className="iy-container iy-container--narrow">
          <div className="iy-section-head animate-on-scroll">
            <p className="iy-kicker">Simple, transparent pricing</p>
            <h2>One price. Everything included.</h2>
          </div>

          <div className="iy-pricing-card animate-on-scroll">
            <div className="iy-pricing-card__badge">Most Popular</div>
            <div className="iy-pricing-card__price">
              <span className="iy-pricing-card__currency">₹</span>
              <span className="iy-pricing-card__amount">1,999</span>
              <span className="iy-pricing-card__note">per invitation</span>
            </div>
            <p className="iy-pricing-card__desc">
              Pay ₹999 advance to begin. Remaining ₹1,000 on delivery.
            </p>
            <ul className="iy-pricing-card__features">
              {[
                'Your choice of any live template',
                'Full personalisation (names, photos, music)',
                'All events, venues & map links',
                'Interactive opening & date reveal',
                'Photo gallery (up to 10 photos)',
                'Live countdown timer',
                'RSVP collection',
                'Unique shareable link',
                '2–3 day delivery',
                '1 round of revisions',
              ].map((f) => (
                <li key={f}>
                  <span className="iy-pricing-card__check">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={waLink("Hi! I'd like to order a digital wedding invitation. Can you tell me how to get started?")}
              target="_blank"
              rel="noopener noreferrer"
              className="iy-btn iy-btn--gold"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
            >
              Order on WhatsApp — ₹1,999
            </a>
            <p className="iy-pricing-card__footer">
              Need something custom? <a href={waLink("Hi! I need a fully custom invitation design. Can we discuss?")}>Let's talk →</a>
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="iy-cta-banner animate-on-scroll">
        <div className="iy-cta-banner__orb" aria-hidden />
        <div className="iy-cta-banner__content">
          <p className="iy-kicker">Ready to begin?</p>
          <h2>Found a template you love?</h2>
          <p>Message us with your chosen template and wedding date. We'll handle everything.</p>
          <div className="iy-cta-banner__actions">
            <a
              href={waLink("Hi! I'm interested in a digital wedding invitation. I've seen your templates and would like to order one.")}
              target="_blank"
              rel="noopener noreferrer"
              className="iy-btn iy-btn--gold"
            >
              📲 Enquire on WhatsApp
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
                <p className="iy-footer__tagline">
                  Designed to be opened, felt, and remembered.
                </p>
              </div>
            </div>

            <div className="iy-footer__links">
              <div className="iy-footer__link-col">
                <span>Templates</span>
                <nav>
                  <Link href="#templates">Wedding Collection</Link>
                  <Link href="#templates" onClick={() => setActiveCategory('celebrations')}>Celebrations</Link>
                  <a href={waLink("Hi! I want to see your templates and order a custom one.")}>Custom Design</a>
                </nav>
              </div>
              <div className="iy-footer__link-col">
                <span>Company</span>
                <nav>
                  <Link href="#how-it-works">How It Works</Link>
                  <Link href="#reviews">Reviews</Link>
                  <Link href="#faq">FAQ</Link>
                  <Link href="/admin/login">Studio Login</Link>
                </nav>
              </div>
            </div>

            <div className="iy-footer__social">
              <span>Get in touch</span>
              <div className="iy-footer__social-links">
                <a
                  href={waLink("Hi! I'm interested in a digital wedding invitation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iy-social-btn iy-social-btn--wa"
                  aria-label="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.25a.75.75 0 00.916.916l5.403-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.932-1.349l-.354-.21-3.665.998.997-3.593-.228-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  WhatsApp: +91 74110 91256
                </a>
              </div>
            </div>
          </div>

          <div className="iy-footer__bottom">
            <p>© {new Date().getFullYear()} Inviting You. All rights reserved.</p>
            <p className="iy-footer__bottom-links">
              <span>Made with ❤️ for beautiful weddings</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
