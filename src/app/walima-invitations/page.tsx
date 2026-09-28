import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import PublicTemplateCards from '@/components/PublicTemplateCards'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Walima Invitations | Digital Walima Wedding Invites',
  description: 'Create elegant digital Walima invitations with event details, venue information, photos, music, RSVP and easy WhatsApp sharing.',
  alternates: {
    canonical: `${SEO.siteUrl}/walima-invitations`,
  },
  openGraph: {
    title: 'Walima Invitations | Digital Walima Wedding Invites',
    description: 'Create elegant digital Walima invitations with event details, venue information, photos, music, RSVP and easy WhatsApp sharing.',
    url: `${SEO.siteUrl}/walima-invitations`,
    images: [SEO.defaultOgImage],
  },
}

export default function WalimaInvitationsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I collect RSVPs for my Walima event?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our digital invitations include a seamless RSVP feature. Your guests can quickly confirm their attendance, making catering and seating arrangements for your Walima much easier."
        }
      },
      {
        "@type": "Question",
        "name": "How is a digital Walima invitation delivered?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your Walima invite will be delivered as a unique, private web link that you can instantly copy and paste into WhatsApp or SMS."
        }
      },
      {
        "@type": "Question",
        "name": "Can I include the Nikah details as well?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. You can include multiple events in one digital invitation, seamlessly presenting both your Nikah and Walima ceremonies with their respective venues."
        }
      }
    ]
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Walima Invitations", "item": `${SEO.siteUrl}/walima-invitations` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Walima Invitations">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Inviting You</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Walima<br /><em>Invitations</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '600px' }}>
              Create elegant digital Walima invitations with event details, venue information, photos, music, RSVP and easy WhatsApp sharing.
            </p>
          </div>
        </section>

        {/* INTRODUCTION / DESIGNS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>Celebrate the Joy</span>
              <h2 className="iy-heading">Digital Walima Invitation</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '700px', margin: '1rem auto 0' }}>
                Welcome your guests to the wedding feast in style. A digital Walima invitation from Inviting You perfectly captures the warmth and grandeur of your celebration, delivered straight to their phones.
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Hassle-Free RSVPs</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Planning the feast is easier when you know exactly who is coming. Use our built-in RSVP feature to collect guest responses smoothly.
                </p>
              </div>
              <div className="iy-fade-in" style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '12px', animationDelay: '0.1s' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Combine Events</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Share the complete wedding schedule. Include details for your <Link href="/nikah-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Nikah</Link> and Walima all within one beautifully cohesive link.
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
              <h2 className="iy-heading" style={{ marginBottom: '1.5rem' }}>Walima Event Details</h2>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                Every element of your online Walima invitation can be customized to match your theme.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Guest Guidance:</strong> Embed a Google Map location directly on your invite for easy venue navigation.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Photo Introductions:</strong> Let guests see your favorite couple portraits before they arrive.
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> <strong>Welcome Note:</strong> Personalize your Walima invite with a heartfelt welcome message from the hosts.
                </li>
              </ul>
            </div>
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <img src="/tpl-sultan.png" alt="Digital Walima wedding invite preview" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px' }} />
            </div>
          </div>
        </section>

        {/* TEMPLATES */}
        <section id="templates" style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>The Collection</span>
              <h2 className="iy-heading">Explore Designs</h2>
              <p style={{ marginTop: '1rem', color: 'var(--muted)', maxWidth: '600px', margin: '1rem auto 0' }}>
                Find the perfect match for your celebration. For a broader range of options, see our <Link href="/islamic-wedding-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Islamic-inspired</Link> collection.
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
                { q: "Can I collect RSVPs for my Walima event?", a: "Yes, our digital invitations include a seamless RSVP feature. Your guests can quickly confirm their attendance, making catering and seating arrangements for your Walima much easier." },
                { q: "How is a digital Walima invitation delivered?", a: "Your Walima invite will be delivered as a unique, private web link that you can instantly copy and paste into WhatsApp or SMS." },
                { q: "Can I include the Nikah details as well?", a: "Absolutely. You can include multiple events in one digital invitation, seamlessly presenting both your Nikah and Walima ceremonies with their respective venues." }
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
