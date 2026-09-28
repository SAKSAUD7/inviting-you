import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import PublicTemplateCards from '@/components/PublicTemplateCards'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Muslim Wedding Invitations | Digital Nikah & Walima Invites',
  description: 'Create elegant Muslim wedding invitations for Nikah, Walima and wedding celebrations. Personalize your digital invitation with photos, events, music, RSVP and more.',
  alternates: {
    canonical: `${SEO.siteUrl}/muslim-wedding-invitations`,
  },
  openGraph: {
    title: 'Muslim Wedding Invitations | Digital Nikah & Walima Invites',
    description: 'Create elegant Muslim wedding invitations for Nikah, Walima and wedding celebrations. Personalize your digital invitation with photos, events, music, RSVP and more.',
    url: `${SEO.siteUrl}/muslim-wedding-invitations`,
    images: [SEO.defaultOgImage],
  },
}

export default function MuslimWeddingInvitationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are your digital invitations suitable for a Muslim wedding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our collection includes elegant, Islamic-inspired digital invitations perfectly suited for Muslim wedding celebrations, including dedicated spaces for Bismillah or Islamic verses."
        }
      },
      {
        "@type": "Question",
        "name": "Can I include both Nikah and Walima events in one invitation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can include multiple events in a single digital invitation, such as the Nikah ceremony and the Walima reception, with specific dates, times, and venue maps for each."
        }
      },
      {
        "@type": "Question",
        "name": "How do I share my Muslim wedding invite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide you with a unique, personalized link that you can share instantly with all your guests on WhatsApp."
        }
      }
    ]
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Muslim Wedding Invitations", "item": `${SEO.siteUrl}/muslim-wedding-invitations` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Muslim Wedding Invitations">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Inviting You</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Muslim Wedding<br /><em>Invitations</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Create elegant Muslim wedding invitations for Nikah, Walima and wedding celebrations. Personalize your digital invitation with photos, events, music, RSVP and more.
            </p>
          </div>
        </section>

        {/* INTRODUCTION / DESIGNS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>Grace & Elegance</span>
              <h2 className="iy-heading">Muslim Wedding Invitation Designs</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '700px', margin: '1rem auto 0' }}>
                At Inviting You, we create digital invitations perfectly suited for Muslim wedding celebrations. Whether you are planning an intimate Nikah or a grand Walima, our <Link href="/islamic-wedding-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Islamic-inspired</Link> designs combine traditional elegance with modern cinematic experiences.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Nikah Invitations</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Celebrate the sacred union with a dedicated <Link href="/nikah-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Nikah invitation</Link>. Include specific timings, the mosque or venue details, and beautiful Islamic typography.
                </p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.1s' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Walima Invitations</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Invite guests to the wedding feast with an elegant <Link href="/walima-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Walima invitation</Link>. Easily collect RSVPs to manage your guest list effectively.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
          <div className="iy-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div className="iy-fade-in">
              <span className="iy-kicker">Personalization</span>
              <h2 className="iy-heading" style={{ marginBottom: '1.5rem' }}>Features</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Make your digital Muslim wedding invite truly your own with extensive personalization options.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Islamic Verses:</strong> Begin your invitation beautifully with Bismillah or a preferred verse.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Multiple Events:</strong> Seamlessly list details for the Nikah, Walima, and any other pre-wedding celebrations.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Event Navigation:</strong> Give guests instant Google Maps directions to every venue.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>WhatsApp Ready:</strong> Share your invitation link instantly with all your contacts on WhatsApp.
                </li>
              </ul>
            </div>
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <img src="/tpl-sultan.png" alt="Sultan royal Muslim wedding invitation template" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Collection</span>
              <h2 className="iy-heading">Explore Templates</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                Discover elegant templates designed with timeless grace. Every design is customized specifically for you.
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
                { q: "Are your digital invitations suitable for a Muslim wedding?", a: "Yes. Our collection includes elegant, Islamic-inspired digital invitations perfectly suited for Muslim wedding celebrations, including dedicated spaces for Bismillah or Islamic verses." },
                { q: "Can I include both Nikah and Walima events in one invitation?", a: "Yes, you can include multiple events in a single digital invitation, such as the Nikah ceremony and the Walima reception, with specific dates, times, and venue maps for each." },
                { q: "How do I share my Muslim wedding invite?", a: "We provide you with a unique, personalized link that you can share instantly with all your guests on WhatsApp." },
                { q: "Can guests RSVP through the invitation?", a: "Yes, our invitations feature a built-in RSVP system. Your guests can easily confirm their attendance, making it easier for you to plan your Walima seating and catering." }
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
