import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About InvitingYou | Digital Wedding Invitations',
  description: 'Learn about InvitingYou and our approach to creating premium digital wedding invitations designed for weddings, Nikah and Walima.',
  alternates: {
    canonical: `${SEO.siteUrl}/about`,
  },
  openGraph: {
    title: 'About InvitingYou | Digital Wedding Invitations',
    description: 'Learn about InvitingYou and our approach to creating premium digital wedding invitations designed for weddings, Nikah and Walima.',
    url: `${SEO.siteUrl}/about`,
    images: [SEO.defaultOgImage],
  },
}

export default function AboutPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "About", "item": `${SEO.siteUrl}/about` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="About">
        {/* HERO */}
        <section className="iy-hero" style={{ minHeight: '50vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Our Story</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              About<br /><em>InvitingYou</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '700px' }}>
              Invitations designed to be opened, felt, and remembered. We create personalized digital wedding invitations for modern couples and families.
            </p>
          </div>
        </section>

        {/* OUR APPROACH */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <span className="iy-kicker" style={{ justifyContent: 'center' }}>Philosophy</span>
              <h2 className="iy-heading">Our Approach</h2>
              <p style={{ marginTop: '1.5rem', color: 'var(--muted)', maxWidth: '700px', margin: '1.5rem auto 0', fontSize: '1.1rem', lineHeight: 1.7 }}>
                We believe that a wedding invitation is the very first glimpse your guests get into your celebration. It should set the perfect tone. 
                That's why we focus on cinematic presentation, thoughtful typography, and elegant visual design. 
                Our mobile-first experience ensures that sharing your joy is as easy as sending a WhatsApp message.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT WE CREATE & WHY DIGITAL */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0' }}>
          <div className="iy-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            
            <div className="iy-fade-in" style={{ background: 'var(--surface-2)', padding: '3rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: '1rem' }}>What We Create</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>
                We craft personalized digital wedding invitations that act as an interactive hub for your guests.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                {['Personalized event details', 'Photo galleries', 'Background music', 'Live countdowns', 'Venue and map integration', 'RSVP collection', 'Seamless WhatsApp sharing', 'A premium mobile-first experience'].map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="iy-fade-in" style={{ padding: '3rem 0' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: '1rem' }}>Why Digital Invitations?</h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Digital invitations are the perfect complement to modern celebrations. They are incredibly easy to share with guests around the world, completely mobile-friendly, and beautifully interactive.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.7 }}>
                Unlike a printed card, a digital invite allows you to combine multiple event details in one cohesive link, include your favorite photos, and let guests navigate to your venue with a single tap.
              </p>
            </div>
            
          </div>
        </section>

        {/* MEANINGFUL MOMENTS & PRIVACY */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--surface)' }}>
          <div className="iy-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            <div className="iy-fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Designed for Meaningful Moments</h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Our templates are thoughtfully created for diverse celebrations. We offer dedicated designs perfect for traditional weddings, as well as specialized elegant formatting tailored for <Link href="/nikah-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Nikah</Link> and <Link href="/walima-invitations" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>Walima</Link> events.
              </p>
            </div>
            <div className="iy-fade-in">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--brown)', marginBottom: '1rem' }}>Built With Privacy in Mind</h3>
              <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6 }}>
                Your special moments belong to you. We strictly ensure that customer invitation pages remain entirely private. Real client names, photographs, phone numbers, and event details are never publicly indexed or displayed in our public portfolio without explicit permission.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            <div className="iy-section-head iy-fade-in" style={{ textAlign: 'center' }}>
              <h2 className="iy-heading">How It Works</h2>
            </div>
            <div className="iy-steps iy-fade-in" style={{ marginTop: '3rem' }}>
              <div className="iy-step">
                <span className="iy-step__num">01</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Choose a design</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Browse our <Link href="/templates" style={{ color: 'var(--brown)', textDecoration: 'underline' }}>collection</Link> and select a template.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">02</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Share details</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Provide your event details, photos, and chosen music.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">03</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>We personalize</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Our team expertly crafts and builds your invitation.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">04</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Review & delivery</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>You review the final product. We hand over your unique link.</p>
              </div>
              <div className="iy-step">
                <span className="iy-step__num">05</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.5rem' }}>Share with guests</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Easily send your invitation to friends and family via WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

      </SeoPageShell>
    </>
  )
}
