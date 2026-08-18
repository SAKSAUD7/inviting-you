import { getAllTemplates } from '@/templates/registry'
import Link from 'next/link'

export const metadata = {
  title: 'Template Gallery - Inviting You',
  description: 'Browse our premium collection of digital wedding invitation templates.',
}

export default function TemplatesPage() {
  const templates = getAllTemplates()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
      <header style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--admin-border)', background: 'var(--admin-surface)' }}>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem' }}>
          Template Gallery
        </h1>
        <p style={{ color: 'var(--admin-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          A premium digital wedding design showroom. Find the perfect aesthetic for your celebration.
        </p>
      </header>
      
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
          {templates.map(template => (
            <div key={template.id} style={{
              background: 'var(--admin-surface)',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--admin-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '240px', background: 'var(--admin-border)', position: 'relative' }}>
                {/* Fallback for thumbnail */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-muted)', fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>
                  {template.name}
                </div>
              </div>
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', margin: 0 }}>
                    {template.name}
                  </h2>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'var(--admin-bg)', padding: '0.2rem 0.6rem', borderRadius: '4px', border: '1px solid var(--admin-border)' }}>
                    {template.category}
                  </span>
                </div>
                <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {template.description}
                </p>
                <Link href={`/templates/${template.id}`} style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.8rem',
                  background: 'transparent',
                  color: 'var(--admin-text)',
                  border: '1px solid var(--admin-gold)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.85rem',
                  transition: 'background 0.3s'
                }}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
