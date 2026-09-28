import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SEO } from '@/lib/seo'
import SeoPageShell from '@/components/SeoPageShell'
import Link from 'next/link'
import { blogPosts, BlogPost } from '@/data/blog'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug)
  
  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${post.title} | InvitingYou Blog`,
    description: post.description,
    alternates: {
      canonical: `${SEO.siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | InvitingYou Blog`,
      description: post.description,
      url: `${SEO.siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified || post.date,
      authors: [post.author],
      images: [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = post.relatedSlugs
    .map(slug => blogPosts.find(p => p.slug === slug))
    .filter((p): p is BlogPost => p !== undefined)
    .slice(0, 2)

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": [
      SEO.siteUrl + post.image
    ],
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": SEO.siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "InvitingYou",
      "url": SEO.siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${SEO.siteUrl}/hero-phone.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SEO.siteUrl}/blog/${post.slug}`
    }
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": SEO.siteUrl },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SEO.siteUrl}/blog` },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `${SEO.siteUrl}/blog/${post.slug}` }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      
      <SeoPageShell pageName={`Blog: ${post.title}`}>
        <article style={{ background: 'var(--ivory)', padding: '8rem 0 4rem' }}>
          
          {/* Article Header */}
          <header className="iy-wrap" style={{ maxWidth: '800px', textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              <Link href="/blog" style={{ color: 'var(--brown)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}>Blog</Link>
              <span style={{ color: 'var(--muted)' }}>/</span>
              <span style={{ color: 'var(--muted)' }}>{post.category}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--burgundy)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              {post.title}
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', color: 'var(--muted)', fontSize: '0.95rem' }}>
              <span>By <strong>{post.author}</strong></span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="iy-wrap" style={{ maxWidth: '1000px', marginBottom: '4rem' }}>
            <div style={{ width: '100%', height: 'clamp(300px, 50vw, 500px)', borderRadius: '16px', background: `url('${post.image}') center/cover no-repeat`, border: '1px solid var(--border)' }}></div>
          </div>

          {/* Article Content */}
          <div className="iy-wrap" style={{ maxWidth: '720px' }}>
            <div className="iy-article-content" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--body)' }}>
              <style dangerouslySetInnerHTML={{__html: `
                .iy-article-content p { margin-bottom: 1.5rem; }
                .iy-article-content h2 { font-family: var(--font-display); font-size: 1.8rem; color: var(--brown); margin: 3rem 0 1rem; line-height: 1.3; }
                .iy-article-content h3 { font-family: var(--font-display); font-size: 1.4rem; color: var(--brown); margin: 2rem 0 1rem; }
                .iy-article-content ul { padding-left: 1.5rem; margin-bottom: 2rem; }
                .iy-article-content li { margin-bottom: 0.75rem; }
                .iy-article-content a { color: var(--brown); text-decoration: underline; font-weight: 500; }
                .iy-article-content a:hover { color: var(--burgundy); }
                .iy-article-content strong { color: var(--brown); font-weight: 600; }
              `}} />
              {post.content}
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="iy-wrap" style={{ maxWidth: '1000px', marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--brown)', marginBottom: '2rem', textAlign: 'center' }}>Keep Reading</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} href={`/blog/${rp.slug}`} style={{ textDecoration: 'none', background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'block' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{rp.category}</div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--burgundy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>{rp.title}</h4>
                    <span style={{ color: 'var(--brown)', fontSize: '0.9rem', fontWeight: 500 }}>Read Article →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </article>
      </SeoPageShell>
    </>
  )
}
