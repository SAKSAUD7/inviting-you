import { getTemplateById } from '@/data/templates'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import '@/app/home.css'

function waLink(text: string) {
  const phone = '919022634351'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export default async function TemplateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const template = getTemplateById(id)

  if (!template) {
    notFound()
  }

  const isLive = template.demo !== null

  return (
    <div className="iy-layout iy-page">
      {/* ─── NAVBAR ─── */}
      <header className="iy-header">
        <div className="iy-wrap iy-header__inner">
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
            <Link href="/" className="iy-nav__link">Home</Link>
            <Link href="/templates" className="iy-nav__link">Templates</Link>
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

      {/* ─── TEMPLATE DETAILS ─── */}
      <main style={{ minHeight: '100vh', paddingTop: '6rem', background: 'var(--surface)' }}>
        <div className="iy-wrap" style={{ paddingBottom: '6rem' }}>
          
          <Link href="/templates" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', fontWeight: 500 }}>
            <span>←</span> Back to Templates
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Left: Image Preview */}
            <div className="iy-fade-in" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(36,24,22,0.1)' }}>
              {template.previewImg ? (
                <img src={template.previewImg} alt={template.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', aspectRatio: '3/4', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  No Image Available
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="iy-fade-in" style={{ animationDelay: '0.2s', padding: '2rem 0' }}>
              <div style={{ display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', padding: '0.3rem 0.8rem', border: '1px solid var(--gold)', borderRadius: '50px', color: 'var(--gold-dark)', marginBottom: '1.5rem' }}>
                {template.badge === 'Live' ? 'Ready to Customize' : 'Coming Soon'}
              </div>
              
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--brown)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                {template.name}
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--burgundy)', fontStyle: 'italic', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
                {template.tagline}
              </p>
              
              <p style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                {template.desc}
              </p>

              <div style={{ background: 'var(--ivory)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '3rem' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 700, color: 'var(--gold-dark)', marginBottom: '1rem' }}>
                  Pricing
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--brown)', lineHeight: 1 }}>
                    ₹{template.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {isLive ? (
                    <>
                      <a href={template.demo!} target="_blank" className="iy-btn iy-btn--outline" style={{ width: '100%', justifyContent: 'center' }}>
                        Experience Live Demo →
                      </a>
                      <a href={waLink(`Hi! I want to order the ${template.name} template for my event.`)} target="_blank" rel="noopener noreferrer" className="iy-btn iy-btn--burg" style={{ width: '100%', justifyContent: 'center' }}>
                        Order on WhatsApp
                      </a>
                    </>
                  ) : (
                    <button disabled className="iy-btn iy-btn--outline" style={{ opacity: 0.5, cursor: 'not-allowed', width: '100%', justifyContent: 'center' }}>
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--brown)', marginBottom: '1rem' }}>What's Included?</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                  {['Fully responsive on all devices', 'Custom names & typography', 'Interactive event timeline', 'Personalized music', 'Photo gallery integration'].map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="iy-footer">
        <div className="iy-wrap iy-footer__inner">
          <div className="iy-footer__col iy-footer__col--brand">
            <Link href="/" className="iy-brand">
              <svg className="iy-brand__mark" viewBox="0 0 48 48">
                <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" fill="currentColor" />
                <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" fill="var(--gold)" />
              </svg>
              <div className="iy-brand__text">
                <span className="iy-brand__name" style={{ color: '#fff' }}>Inviting <em>You</em></span>
              </div>
            </Link>
            <p className="iy-footer__bio">
              We create cinematic, unforgettable digital invitations that tell your unique story.
            </p>
          </div>
          <div className="iy-footer__col">
            <h4>Explore</h4>
            <Link href="/templates">Templates</Link>
            <Link href="/#how-it-works">How It Works</Link>
            <Link href="/#faq">FAQ</Link>
          </div>
          <div className="iy-footer__col">
            <h4>Support</h4>
            <a href={waLink("Hi! I need help with my digital invitation.")} target="_blank" rel="noopener noreferrer">Contact Us</a>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
        <div className="iy-wrap iy-footer__bottom">
          <p>© {new Date().getFullYear()} Inviting You. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
