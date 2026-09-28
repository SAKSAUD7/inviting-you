import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import PublicTemplateCards from '@/components/PublicTemplateCards'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Digital Wedding Invitations in India | Inviting You',
  description: 'Create beautiful digital wedding invitations with photos, music, events, RSVP and WhatsApp sharing. Explore premium wedding invitation designs by Inviting You.',
  alternates: {
    canonical: `${SEO.siteUrl}/wedding-invitations`,
  },
  openGraph: {
    title: 'Digital Wedding Invitations in India | Inviting You',
    description: 'Create beautiful digital wedding invitations with photos, music, events, RSVP and WhatsApp sharing. Explore premium wedding invitation designs by Inviting You.',
    url: `${SEO.siteUrl}/wedding-invitations`,
    images: [SEO.defaultOgImage],
  },
}

export default function WeddingInvitationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a digital wedding invitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A digital wedding invitation is an elegant, mobile-friendly website personalized with your photos, event details, music, and RSVP options, designed to be shared instantly via WhatsApp."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add photos to my digital wedding invitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our templates include beautiful photo galleries where you can showcase your favorite moments."
        }
      },
      {
        "@type": "Question",
        "name": "Can guests open the invitation on WhatsApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You will receive a unique link that you can send directly through WhatsApp, allowing guests to open and experience your invitation on any device instantly."
        }
      }
    ]
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Wedding Invitations", "item": `${SEO.siteUrl}/wedding-invitations` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Wedding Invitations">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Inviting You</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Digital Wedding<br /><em>Invitations</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Create a beautiful digital wedding invitation that brings your wedding story to life. Choose a design, personalize it with your photos and event details, and share one elegant invitation link with your guests.
            </p>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>Modern & Elegant</span>
              <h2 className="iy-heading">Why Choose a Digital Wedding Invitation?</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                Traditional cards are beautiful, but an online wedding invitation provides a cinematic, immersive experience that guests truly remember. With zero printing delays and instant WhatsApp sharing, it's the perfect choice for modern couples.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>WhatsApp Ready</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Share your unique wedding invitation link directly via WhatsApp. Your guests tap the link and instantly experience your story.</p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.1s' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Fast Delivery</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>No printing or shipping required. Receive your personalized digital wedding invite in just 2-3 days.</p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.2s' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎵</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Cinematic Experience</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Impress guests with beautiful animations, your chosen background music, and a premium editorial layout.</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IT INCLUDES */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
          <div className="iy-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="iy-fade-in">
              <span className="iy-kicker">Features</span>
              <h2 className="iy-heading" style={{ marginBottom: '1.5rem' }}>What Your Invitation Can Include</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                A digital wedding invitation acts as a complete wedding website for your guests. Everything they need to know is elegantly presented in one place.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                {['Couple names & heartfelt welcome message', 'Beautiful wedding photos gallery', 'Complete event details (Haldi, Mehendi, Wedding)', 'Venue information and Google Map links', 'Personalized background music', 'Live wedding countdown', 'Seamless RSVP collection'].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <img src="/hero-phone.png" alt="Features of a digital wedding invitation on a mobile phone" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Collection</span>
              <h2 className="iy-heading">Explore Wedding Invitation Designs</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                From royal and cinematic to minimal and floral, find the perfect design for your celebration.
              </p>
            </div>
            <PublicTemplateCards />
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/muslim-wedding-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline', fontSize: '0.95rem' }}>
                Planning a Nikah or Walima? View our Muslim Wedding Invitations →
              </Link>
            </div>
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
                { q: "What is a digital wedding invitation?", a: "A digital wedding invitation is an elegant, mobile-friendly website personalized with your photos, event details, music, and RSVP options, designed to be shared instantly via WhatsApp." },
                { q: "Can I add photos to my digital wedding invitation?", a: "Yes! Our templates include beautiful photo galleries where you can showcase your favorite moments." },
                { q: "Can guests open the invitation on WhatsApp?", a: "Absolutely. You will receive a unique link that you can send directly through WhatsApp, allowing guests to open and experience your invitation on any device instantly." },
                { q: "Can I include multiple wedding events?", a: "Yes, our invitations comfortably support multiple events, complete with dates, timings, and specific venue locations for each." },
                { q: "Can I add venue and map information?", a: "Yes, we integrate Google Maps links directly into the invitation so your guests can navigate to your venues effortlessly." },
                { q: "How does the personalization process work?", a: "Once you choose a template and pay the ₹999 advance, we'll collect your details and photos. We then personalize the design for you and deliver the final link within 2-3 days." }
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
