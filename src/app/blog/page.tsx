import { Metadata } from 'next'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Wedding Invitation Guides & Ideas | InvitingYou',
  description: 'Explore our guides, ideas, and wording examples for digital wedding invitations, Nikah, and Walima celebrations.',
  alternates: {
    canonical: `${SEO.siteUrl}/blog`,
  },
  openGraph: {
    title: 'Wedding Invitation Guides & Ideas | InvitingYou',
    description: 'Explore our guides, ideas, and wording examples for digital wedding invitations, Nikah, and Walima celebrations.',
    url: `${SEO.siteUrl}/blog`,
    images: [SEO.defaultOgImage],
  },
}

export default function BlogIndexPage() {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SEO.siteUrl}/blog` }
    ]
  }

  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName="Blog">
        <section className="iy-hero" style={{ minHeight: '40vh', paddingBottom: '3rem', paddingTop: '8rem', background: 'var(--surface-2)' }}>
          <div className="iy-hero__noise" aria-hidden />
          <div className="iy-wrap" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <span className="iy-hero__eyebrow" style={{ justifyContent: 'center' }}>Resources & Inspiration</span>
            <h1 className="iy-hero__title iy-fade-in" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
              Wedding Invitation<br /><em>Guides & Ideas</em>
            </h1>
            <p className="iy-hero__lead iy-fade-in" style={{ margin: '0 auto', maxWidth: '700px' }}>
              Expert advice, wording examples, and tips for creating the perfect digital invitation for your special day.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--ivory)' }}>
          <div className="iy-wrap">
            {/* Featured Post */}
            <div className="iy-fade-in" style={{ marginBottom: '5rem' }}>
              <Link href={`/blog/${featuredPost.slug}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'center', background: 'var(--surface)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border)', textDecoration: 'none' }}>
                <div style={{ height: '100%', minHeight: '300px', background: `url('${featuredPost.image}') center/cover no-repeat` }}></div>
                <div style={{ padding: '3rem 3rem 3rem 0' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--brown)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{featuredPost.category}</span>
                    <span style={{ color: 'var(--muted)' }}>•</span>
                    <span style={{ color: 'var(--muted)' }}>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--burgundy)', marginBottom: '1rem', lineHeight: 1.2 }}>{featuredPost.title}</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>{featuredPost.description}</p>
                  <span className="iy-btn iy-btn--outline" style={{ display: 'inline-flex' }}>Read Article →</span>
                </div>
              </Link>
            </div>

            {/* Other Posts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
              {otherPosts.map((post, i) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="iy-fade-in" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', animationDelay: `${i * 0.1}s` }}>
                  <div style={{ height: '240px', borderRadius: '12px', background: `url('${post.image}') center/cover no-repeat`, marginBottom: '1.5rem', border: '1px solid var(--border)' }}></div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--brown)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category}</span>
                    <span style={{ color: 'var(--muted)' }}>•</span>
                    <span style={{ color: 'var(--muted)' }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--burgundy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{post.description}</p>
                </Link>
              ))}
            </div>

          </div>
        </section>
      </SeoPageShell>
    </>
  )
}
