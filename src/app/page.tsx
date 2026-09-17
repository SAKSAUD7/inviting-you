'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import './home.css'

// ─── WhatsApp config ────────────────────────────────────────────────────────
const WA_NUMBER = '917411091256'
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

import { weddingTemplates, celebrationTemplates } from '@/data/templates'

const features = [
  { icon: '🎬', title: 'Cinematic Animations', desc: 'A dramatic animated reveal your guests will genuinely want to share.' },
  { icon: '🎵', title: 'Background Music', desc: 'Set the mood with a handpicked soundtrack that plays as they scroll.' },
  { icon: '📸', title: 'Photo Gallery', desc: 'Curated gallery of your most precious moments, beautifully presented.' },
  { icon: '📍', title: 'All Events & Venues', desc: 'Every event, timing, venue and map link — all in one elegant page.' },
  { icon: '✅', title: 'RSVP Collection', desc: 'Collect guest confirmations gracefully, without spreadsheets.' },
  { icon: '⏳', title: 'Live Countdown', desc: 'Real-time countdown to your big day builds the excitement.' },
  { icon: '💫', title: 'Scratch to Reveal', desc: 'Guests scratch to reveal your wedding date — an interactive moment.' },
  { icon: '📱', title: 'WhatsApp Ready', desc: 'Share one link on WhatsApp — guests open it instantly on any device.' },
]

const steps = [
  { n: '01', title: 'Choose a Template', desc: 'Pick your favourite design from our signature collection.' },
  { n: '02', title: 'Share Your Details', desc: 'Send us your content, photos, and music choice.' },
  { n: '03', title: 'We Personalize', desc: 'Our team crafts your invitation beautifully.' },
  { n: '04', title: 'Receive & Share', desc: 'Get your unique link in 2-3 days, ready to send.' },
]

const reviews = [
  {
    name: 'Aman & Tazeen',
    city: 'Bangalore',
    rating: 5,
    text: 'Absolutely stunning! Our guests loved the invite. It felt so personal and premium. Highly recommended!',
    template: 'Velvet',
    date: 'November 2026',
  },
  {
    name: 'Zainab & Farhan',
    city: 'Hyderabad',
    rating: 5,
    text: 'The whole process was smooth and super fast. The design was exactly what we wanted! The cinematic opening gave me goosebumps.',
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
  { q: 'How long does it take to deliver?', a: 'Your invitation is delivered within 2–3 days after you select a template, pay the advance, and share all details via WhatsApp.' },
  { q: 'Can I request custom changes?', a: 'Yes! We can adjust colors, fonts, and layouts. For completely custom designs, contact us for a quote.' },
  { q: 'Will it work on all devices?', a: 'Absolutely. Our invitations are mobile-first but look beautiful on tablets and desktops too.' },
  { q: 'Can I share it on WhatsApp?', a: 'Yes, just copy the link and paste it into WhatsApp. Your guests tap the link and it opens instantly.' },
  { q: 'Do you offer refunds?', a: 'Since these are personalized digital products, we don\'t offer full refunds once work begins. However, you only pay a ₹999 advance to start.' },
  { q: 'Can you create invites for other events?', a: 'Yes! We have templates for birthdays, anniversaries, and baby showers. Check our Celebrations tab.' },
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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<'wedding' | 'celebrations'>('wedding')
  const [offers, setOffers] = useState<Record<string, TemplateOffer>>({})
  const [scrolled, setScrolled] = useState(false)

  // Scroll animations & Header states
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.iy-fade-in').forEach((el) => observer.observe(el))

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [activeCategory])

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
    <div className="iy">
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
        <span>Order on WhatsApp</span>
      </a>

      {/* ─── HEADER ─── */}
      <header className={`iy-header ${scrolled ? 'iy-header--scrolled' : ''}`}>
        <div className="iy-header__inner">
          <Link href="/" className="iy-brand">
            <svg className="iy-brand__mark" viewBox="0 0 48 48">
              <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
              <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
              <circle cx="24" cy="24" r="2.2" />
            </svg>
            <div className="iy-brand__text">
              <span className="iy-brand__name">Inviting <em>You</em></span>
              <span className="iy-brand__sub">More than an invitation</span>
            </div>
          </Link>

          <nav className="iy-nav">
            <Link href="/templates" className="iy-nav__link">Templates</Link>
            <Link href="#how-it-works" className="iy-nav__link">How It Works</Link>
            <Link href="#reviews" className="iy-nav__link">Reviews</Link>
            <Link href="#faq" className="iy-nav__link">FAQ</Link>
            <a
              href={waLink("Hi! I'm interested in ordering a digital wedding invitation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="iy-nav__cta"
            >
              Order on WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section className="iy-hero">
        <div className="iy-hero__deco-tl">
          <img src="/images/mainwebsiteimages/04-floating-fabric.jpg" alt="" style={{ mixBlendMode: 'multiply' }} />
        </div>

        <div className="iy-hero__content">
          <span className="iy-hero__eyebrow">Digital Invitations for your special moments</span>
          <h1 className="iy-hero__title iy-fade-in">
            Designed to be<br />
            <em>opened, felt,</em><br />
            and remembered.
          </h1>
          <p className="iy-hero__lead iy-fade-in">
            Beautiful, personalized digital invitations for weddings and special occasions.
            Timeless designs. Modern experiences.
          </p>
          <div className="iy-hero__actions iy-fade-in">
            <Link href="/templates" className="iy-btn iy-btn--burg">
              Explore Invitations →
            </Link>
            <a href={waLink("Hi! I'd like to order an invitation.")} className="iy-btn iy-btn--outline" target="_blank" rel="noopener noreferrer">
              Order on WhatsApp
            </a>
          </div>

          <div className="iy-hero__trust iy-fade-in">
            <div className="iy-hero__trust-item">
              <div className="iy-hero__trust-icon">📱</div>
              <div>
                <strong>Mobile First</strong>
                <span>Beautiful on every device</span>
              </div>
            </div>
            <div className="iy-hero__trust-item">
              <div className="iy-hero__trust-icon">⚡</div>
              <div>
                <strong>2-3 Day Delivery</strong>
                <span>Fast & reliable</span>
              </div>
            </div>
            <div className="iy-hero__trust-item">
              <div className="iy-hero__trust-icon">💬</div>
              <div>
                <strong>WhatsApp Ready</strong>
                <span>Share with loved ones</span>
              </div>
            </div>
          </div>
        </div>

        <div className="iy-hero__visual">
          <div className="iy-hero__img-wrap iy-fade-in">
            <img src="/hero-phone.png" alt="Luxury digital invitation preview" className="iy-hero__phone-img" />
            <Link href="/i/demo-velvet" target="_blank" className="iy-hero__play-btn">
              <div className="iy-hero__play-circle">▶</div>
              <span className="iy-hero__play-label">Play Preview</span>
            </Link>
          </div>
          <div className="iy-hero__side-copy">
            More than an Invitation. A Memory to Share.
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="iy-ticker" aria-hidden>
        <div className="iy-ticker__track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="iy-ticker__item">{item}</span>
          ))}
        </div>
      </div>

      {/* ─── TEMPLATES ─── */}
      <section className="iy-templates" id="templates">
        <div className="iy-wrap">
          <div className="iy-templates__head iy-fade-in">
            <div>
              <span className="iy-kicker">Our Signature Collection</span>
              <h2 className="iy-heading">Choose a design that tells your story</h2>
            </div>
            <Link href="/templates" className="iy-templates__view-all">
              View All Templates →
            </Link>
          </div>

          <div className="iy-cat-tabs iy-fade-in">
            <button
              className={`iy-cat-tab ${activeCategory === 'wedding' ? 'active' : ''}`}
              onClick={() => setActiveCategory('wedding')}
            >
              Wedding Invitations
            </button>
            <button
              className={`iy-cat-tab ${activeCategory === 'celebrations' ? 'active' : ''}`}
              onClick={() => setActiveCategory('celebrations')}
            >
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
                <div
                  key={t.id}
                  className={`iy-tpl-card iy-fade-in ${t.themeClass} iy-tpl-card--live`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Offer badge */}
                  {offer && (
                    <div className="iy-template-card__offer-badge" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15, background: 'linear-gradient(90deg, #B8860B, #C9971A, #E8C060, #C9971A, #B8860B)', backgroundSize: '200% auto', color: '#0A0A0C', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center', padding: '0.28rem', animation: 'shimmerBadge 2.5s linear infinite' }}>
                      {offer.label} — {offer.discountPct}% OFF
                    </div>
                  )}

                  <div className="iy-tpl-card__preview">
                    {t.previewImg && (
                      <img src={t.previewImg} alt={t.name} />
                    )}
                    <div className="iy-tpl-card__overlay">
                      <Link href={t.demo!} target="_blank" className="iy-tpl-card__overlay-btn">
                        <span>Experience</span>
                        <span>→</span>
                      </Link>
                      <a href={t.previewImg || '#'} target="_blank" className="iy-tpl-card__overlay-btn iy-tpl-card__overlay-btn--outline">
                        <span>Preview Image</span>
                        <span>→</span>
                      </a>
                    </div>
                    <div className="iy-tpl-card__live">{t.badge}</div>
                  </div>

                  <div className="iy-tpl-card__body">
                    <h3 className="iy-tpl-card__name">{t.name}</h3>
                    <p className="iy-tpl-card__sub">{t.tagline}</p>

                    <div className="iy-tpl-card__price">
                      {offer ? (
                        <>
                          <span className="iy-tpl-card__price--original">₹{t.price.toLocaleString('en-IN')}</span>
                          <span>₹{discountedPrice?.toLocaleString('en-IN')}</span>
                        </>
                      ) : (
                        <span>₹{t.price.toLocaleString('en-IN')}</span>
                      )}
                    </div>

                    <div className="iy-tpl-card__actions">
                      {isLive ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                          <Link
                            href={`/templates/${t.id}`}
                            className="iy-tpl-card__action iy-tpl-card__action--outline"
                            style={{ justifyContent: 'center' }}
                          >
                            Details
                          </Link>
                          <a
                            href={waLink(`Hi! I love the ${t.name} template. I want to order it for my wedding. Can you help me?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="iy-tpl-card__action"
                            style={{ justifyContent: 'center' }}
                          >
                            Order Now
                          </a>
                        </div>
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

      {/* ─── HOW IT WORKS ─── */}
      <section className="iy-how" id="how-it-works">
        <div className="iy-wrap">
          <div className="iy-how__head iy-fade-in">
            <span className="iy-kicker">How it works</span>
            <h2 className="iy-how__tagline">Simple. Beautiful. Hassle-Free.</h2>
          </div>

          <div className="iy-steps iy-fade-in">
            {steps.map((s, i) => (
              <div key={i} className="iy-step">
                <div className="iy-step__icon">
                  {i === 0 && '📋'}
                  {i === 1 && '📝'}
                  {i === 2 && '✨'}
                  {i === 3 && '💌'}
                </div>
                <span className="iy-step__num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEELING DIVIDER ─── */}
      <section className="iy-feeling">
        <div className="iy-wrap">
          <h2 className="iy-feeling__quote iy-fade-in">
            Not just an invitation.<br /><em>A feeling.</em>
          </h2>
          <div className="iy-feeling__features iy-fade-in">
            <div className="iy-feeling__feature">
              <div className="iy-feeling__feature-icon">🎬</div>
              <div style={{ textAlign: 'center' }}>
                <strong>Cinematic Animations</strong>
                <br /><span>That tell your story</span>
              </div>
            </div>
            <div className="iy-feeling__feature">
              <div className="iy-feeling__feature-icon">✨</div>
              <div style={{ textAlign: 'center' }}>
                <strong>Personalized for You</strong>
                <br /><span>Names, photos, events & more</span>
              </div>
            </div>
            <div className="iy-feeling__feature">
              <div className="iy-feeling__feature-icon">🚀</div>
              <div style={{ textAlign: 'center' }}>
                <strong>Share Instantly</strong>
                <br /><span>On WhatsApp & social media</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="iy-reviews" id="reviews">
        <div className="iy-wrap" style={{ maxWidth: '100%' }}>
          <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
            <span className="iy-kicker" style={{ justifyContent: 'center' }}>Kind Words</span>
            <h2 className="iy-heading">Loved by families, everywhere</h2>
          </div>

          <div className="iy-reviews__trust iy-fade-in">
            <div className="iy-reviews__trust-badge">
              <span style={{ fontSize: '1.2rem' }}>🌍</span> Trusted across 15+ countries
            </div>
            <div className="iy-reviews__trust-badge">
              <span style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>★★★★★</span> 5-Star Rated Studio
            </div>
            <div className="iy-reviews__trust-badge">
              <span style={{ fontSize: '1.2rem' }}>💖</span> Over 500+ Happy Couples
            </div>
          </div>

          <div className="iy-reviews__marquee iy-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* We render the content twice to create an infinite scroll effect */}
            <div className="iy-reviews__marquee-content">
              {reviews.map((r, i) => (
                <div key={`a-${i}`} className="iy-review">
                  <div className="iy-review__stars">{'★'.repeat(r.rating)}</div>
                  <blockquote className="iy-review__text">&ldquo;{r.text}&rdquo;</blockquote>
                  <div className="iy-review__footer">
                    <div className="iy-review__person">
                      <strong>{r.name}</strong>
                      <span>{r.city}</span>
                    </div>
                    <div className="iy-review__meta">
                      <span className="iy-review__template">{r.template}</span>
                      <span className="iy-review__date">{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="iy-reviews__marquee-content" aria-hidden="true">
              {reviews.map((r, i) => (
                <div key={`b-${i}`} className="iy-review">
                  <div className="iy-review__stars">{'★'.repeat(r.rating)}</div>
                  <blockquote className="iy-review__text">&ldquo;{r.text}&rdquo;</blockquote>
                  <div className="iy-review__footer">
                    <div className="iy-review__person">
                      <strong>{r.name}</strong>
                      <span>{r.city}</span>
                    </div>
                    <div className="iy-review__meta">
                      <span className="iy-review__template">{r.template}</span>
                      <span className="iy-review__date">{r.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="iy-pricing" style={{ padding: 'clamp(5rem, 9vw, 9rem) 0', background: 'var(--ivory)', position: 'relative' }}>
        <div className="iy-wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="iy-kicker" style={{ justifyContent: 'center' }}>Investment</span>
            <h2 className="iy-heading">One Invitation.<br/><em>A Lifetime of Memories.</em></h2>
          </div>

          <div className="iy-pricing-card iy-fade-in" style={{
            maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: 'var(--surface)', borderRadius: '16px', overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(36,24,22,0.08)', border: '1px solid var(--border-dark)'
          }}>
            <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="iy-kicker">The Premium Package</span>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', color: 'var(--muted)', textDecoration: 'line-through' }}>₹1,999</span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', color: 'var(--burgundy)', lineHeight: 1 }}>₹999</div>
              </div>
              <p style={{ color: 'var(--brown)', fontWeight: 500, marginBottom: '2.5rem' }}>Limited time launch offer.</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  'Your choice of template', 'Full personalization', 'Music & animations',
                  'Photo gallery', 'Countdown & RSVP', 'Unique sharing link'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              
              <a href={waLink("Hi! I'd like to order a digital wedding invitation.")} target="_blank" rel="noopener noreferrer" className="iy-btn iy-btn--burg" style={{ justifyContent: 'center', padding: '1rem' }}>
                Order on WhatsApp →
              </a>
              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                Need something custom? <a href={waLink("Hi! I need a fully custom invitation design.")} style={{ color: 'var(--brown)', fontWeight: 600, textDecoration: 'none' }}>Let's talk →</a>
              </div>
            </div>
            
            <div style={{ background: `url('/images/mainwebsiteimages/10-product-showcase.jpg') center/cover no-repeat` }}>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="iy-cta">
        <div className="iy-wrap iy-cta__inner">
          <div>
            <span className="iy-cta__eyebrow">Ready to begin?</span>
            <h2 className="iy-cta__title">Ready to create your invitation?</h2>
            <p className="iy-cta__sub">Let's make your special moment unforgettable. Message us with your chosen template and we'll handle the rest.</p>
            <div className="iy-cta__actions">
              <a
                href={waLink("Hi! I'm interested in a digital wedding invitation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="iy-btn iy-btn--burg"
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

      {/* ─── FAQ ─── */}
      <section className="iy-faq" id="faq">
        <div className="iy-wrap">
          <div className="iy-faq__head iy-fade-in">
            <div>
              <span className="iy-kicker">Frequently Asked Questions</span>
              <h2 className="iy-heading">You have questions.<br />We have answers.</h2>
            </div>
          </div>

          <div className="iy-faq__grid iy-fade-in">
            <div className="iy-faq__col">
              {faqs.slice(0, 3).map((f, i) => (
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
            <div className="iy-faq__col">
              {faqs.slice(3).map((f, i) => {
                const idx = i + 3;
                return (
                  <div key={idx} className={`iy-faq__item ${openFaq === idx ? 'open' : ''}`}>
                    <button className="iy-faq__q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                      <span>{f.q}</span>
                      <span className="iy-faq__icon">{openFaq === idx ? '−' : '+'}</span>
                    </button>
                    <div className="iy-faq__a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="iy-footer">
        <div className="iy-wrap">
          <div className="iy-footer__top">
            <div className="iy-footer__brand">
              <svg className="iy-brand__mark" viewBox="0 0 48 48">
                <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
                <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
                <circle cx="24" cy="24" r="2.2" />
              </svg>
              <strong className="iy-brand__name">Inviting You</strong>
              <span className="iy-brand__sub">More than an invitation</span>
              <p className="iy-footer__tagline">Because every love story deserves to be beautifully told.</p>
            </div>

            <div>
              <span className="iy-footer__col-title">Explore</span>
              <div className="iy-footer__col-links">
                <Link href="/">Home</Link>
                <Link href="#templates">Templates</Link>
                <Link href="#how-it-works">How It Works</Link>
                <Link href="#reviews">Reviews</Link>
                <Link href="#faq">FAQ</Link>
              </div>
            </div>

            <div>
              <span className="iy-footer__col-title">Studio</span>
              <div className="iy-footer__col-links">
                <a href={waLink("Hi! I'd like to discuss a custom invitation.")}>Custom Design</a>
                <Link href="/admin/login">Admin Login</Link>
              </div>
            </div>

            <div>
              <span className="iy-footer__col-title">Connect</span>
              <div className="iy-footer__col-links">
                <a
                  href={waLink("Hi! I'm interested in a digital wedding invitation.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iy-footer__wa"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.118 1.528 5.847L.057 23.25a.75.75 0 00.916.916l5.403-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 01-4.932-1.349l-.354-.21-3.665.998.997-3.593-.228-.368A9.714 9.714 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  +91 74110 91256
                </a>
              </div>
            </div>
          </div>

          <div className="iy-footer__bottom">
            <p className="iy-footer__copy">© {new Date().getFullYear()} Inviting You. All rights reserved.</p>
            <p className="iy-footer__made">Designed with ❤️ for your special moments.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
