import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import PublicTemplateCards from '@/components/PublicTemplateCards'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Nikah Invitations | Digital Nikah Wedding Invitations',
  description: 'Create a beautiful digital Nikah invitation with event details, photos, music, venue information, RSVP and WhatsApp sharing.',
  alternates: {
    canonical: `${SEO.siteUrl}/nikah-invitations`,
  },
  openGraph: {
    title: 'Nikah Invitations | Digital Nikah Wedding Invitations',
    description: 'Create a beautiful digital Nikah invitation with event details, photos, music, venue information, RSVP and WhatsApp sharing.',
    url: `${SEO.siteUrl}/nikah-invitations`,
    images: [SEO.defaultOgImage],
  },
}

export default function NikahInvitationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can a Nikah invitation include multiple events?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our digital Nikah invitations can feature multiple events, meaning you can comfortably include both the Nikah ceremony and the Walima reception in one elegant invitation link."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add the Nikah venue map?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You can add a Google Maps link directly to the invitation, making it easy for guests to find the mosque or venue."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add photos and music?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Our designs support beautiful photo galleries and custom background music to make your Nikah invite truly special."
        }
      },
      {
        "@type": "Question",
        "name": "Can I share the invitation through WhatsApp?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, sharing is effortless. You will receive a unique link that you can send to all your contacts on WhatsApp."
        }
      }
    ]
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Nikah Invitations", "item": `${SEO.siteUrl}/nikah-invitations` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Nikah Invitations">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Inviting You</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Nikah<br /><em>Invitations</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Create a beautiful digital Nikah invitation with event details, photos, music, venue information, RSVP and WhatsApp sharing.
            </p>
          </div>
        </section>

        {/* INTRODUCTION / DESIGNS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Sacred Union</span>
              <h2 className="iy-heading">Digital Nikah Invitation</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '700px', margin: '1rem auto 0' }}>
                Announce your Nikah with grace. At Inviting You, we offer premium online Nikah invitations that respect tradition while offering the convenience of a modern digital experience.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Complete Event Details</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Share the specific timings for the Nikah ceremony alongside other events like the Mehndi or <Link href="/walima-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Walima</Link>.
                </p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.1s' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Beautiful Typography</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Our designs carefully balance gorgeous English typography with space for Bismillah or respectful introductory text for your Nikah wedding invitation.
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
              <h2 className="iy-heading" style={{ marginBottom: '1.5rem' }}>What You Can Add</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Make your digital Nikah invitation truly yours with comprehensive personalization.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Venue Map:</strong> Give guests instant directions to the mosque or hall.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>RSVP Collection:</strong> Easily gather responses directly through your Nikah invite.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Photo Galleries:</strong> Share your favorite engagement or pre-wedding photos.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Background Music:</strong> Set the tone with soothing instrumental or appropriate Nasheed tracks.
                </li>
              </ul>
            </div>
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <img src="/tpl-noor.png" alt="Noor Nikah wedding invitation design" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Collection</span>
              <h2 className="iy-heading">Explore Suitable Designs</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                View our premium templates. Looking for more? See all our <Link href="/muslim-wedding-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Muslim wedding invitations</Link>.
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
                { q: "Can a Nikah invitation include multiple events?", a: "Yes, our digital Nikah invitations can feature multiple events, meaning you can comfortably include both the Nikah ceremony and the Walima reception in one elegant invitation link." },
                { q: "Can I add the Nikah venue map?", a: "Absolutely. You can add a Google Maps link directly to the invitation, making it easy for guests to find the mosque or venue." },
                { q: "Can I add photos and music?", a: "Yes. Our designs support beautiful photo galleries and custom background music to make your Nikah invite truly special." },
                { q: "Can I share the invitation through WhatsApp?", a: "Yes, sharing is effortless. You will receive a unique link that you can send to all your contacts on WhatsApp." }
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
