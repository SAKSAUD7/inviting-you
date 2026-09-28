import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import PublicTemplateCards from '@/components/PublicTemplateCards'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Islamic Wedding Invitations | Elegant Digital Wedding Invites',
  description: 'Explore elegant digital Islamic wedding invitations designed for Nikah, Walima and wedding celebrations. Personalize your invitation and share it easily on WhatsApp.',
  alternates: {
    canonical: `${SEO.siteUrl}/islamic-wedding-invitations`,
  },
  openGraph: {
    title: 'Islamic Wedding Invitations | Elegant Digital Wedding Invites',
    description: 'Explore elegant digital Islamic wedding invitations designed for Nikah, Walima and wedding celebrations. Personalize your invitation and share it easily on WhatsApp.',
    url: `${SEO.siteUrl}/islamic-wedding-invitations`,
    images: [SEO.defaultOgImage],
  },
}

export default function IslamicWeddingInvitationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I add Bismillah to my digital Islamic wedding invitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Islamic-inspired designs gracefully accommodate Bismillah or other preferred introductory text before your main invitation details."
        }
      },
      {
        "@type": "Question",
        "name": "Are these designs suitable for a Nikah ceremony?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Our designs are beautifully suited for Nikah ceremonies, featuring elegant typography, appropriate spacing, and tasteful color palettes."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get my digital invitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you select your design and provide your details, our team will personalize your invitation and deliver the final link to you within 2-3 days."
        }
      }
    ]
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Islamic Wedding Invitations", "item": `${SEO.siteUrl}/islamic-wedding-invitations` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Islamic Wedding Invitations">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Inviting You</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Islamic Wedding<br /><em>Invitations</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Explore elegant digital Islamic wedding invitations designed for Nikah, Walima and wedding celebrations. Personalize your invitation and share it easily on WhatsApp.
            </p>
          </div>
        </section>

        {/* INTRODUCTION / DESIGNS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>Elegant & Refined</span>
              <h2 className="iy-heading">Elegant Islamic-Inspired Designs</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '700px', margin: '1rem auto 0' }}>
                Our Islamic-inspired digital invitations are crafted with deep respect for tradition and a passion for modern aesthetics. Expect tasteful geometry, sophisticated arch motifs, and stunning editorial typography that honors your sacred occasion.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Nikah Ceremonies</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Communicate the serene and blessed nature of your Nikah with our graceful <Link href="/nikah-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Nikah invitations</Link>.
                </p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.1s' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Walima Receptions</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Set the perfect tone for your celebration of joy and unity with a tailored <Link href="/walima-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Walima invitation</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
          <div className="iy-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="iy-fade-in">
              <span className="iy-kicker">Interactive Features</span>
              <h2 className="iy-heading" style={{ marginBottom: '1.5rem' }}>A Modern Experience</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Combine timeless aesthetics with modern convenience. Share your customized link on WhatsApp and give your guests a stunning visual experience.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Respectful Formatting:</strong> Beautiful typography perfect for including Bismillah and your heartfelt welcome.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Guest RSVP:</strong> Allow guests to confirm their attendance for your Walima smoothly.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Map Integration:</strong> Guide guests directly to the mosque or banquet hall.
                </li>
              </ul>
            </div>
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <img src="/tpl-noor.png" alt="Noor elegant Islamic-inspired digital wedding invitation template" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Collection</span>
              <h2 className="iy-heading">Template Collection</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                Explore designs that resonate with grace and tradition. From the royal Sultan to the peaceful Noor, find your perfect match.
              </p>
            </div>
            <PublicTemplateCards />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <h2 className="iy-heading">How It Works</h2>
            </div>
            <div className="iy-steps iy-fade-in" style={{ marginTop: '3rem' }}>
              <div className="iy-step">
                <span className="iy-step__num">01</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Choose your design</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Browse our premium templates and select the one that fits your aesthetic.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">02</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Share your details</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Send us your names, event schedules, photos, and chosen music.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">03</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>We personalize</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Our team expertly crafts your invitation to perfection.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">04</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Receive & share</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Get your unique invitation link and share it instantly on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--surface-2)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="iy-heading">Frequently Asked Questions</h2>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
              {[
                { q: "Can I add Bismillah to my digital Islamic wedding invitation?", a: "Yes, our Islamic-inspired designs gracefully accommodate Bismillah or other preferred introductory text before your main invitation details." },
                { q: "Are these designs suitable for a Nikah ceremony?", a: "Absolutely. Our designs are beautifully suited for Nikah ceremonies, featuring elegant typography, appropriate spacing, and tasteful color palettes." },
                { q: "How quickly can I get my digital invitation?", a: "Once you select your design and provide your details, our team will personalize your invitation and deliver the final link to you within 2-3 days." },
                { q: "Can I include both Nikah and Walima details?", a: "Yes. Our invitations are designed to beautifully present multiple events, including both your Nikah and Walima, with full details for each." }
              ].map((faq, i) => (
                <div key={i} className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.75rem' }}>{faq.q}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SeoPageShell>
    </>
  )
}
