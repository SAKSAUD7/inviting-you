import { getTemplateMetadata, getAllTemplates } from '@/templates/registry'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TemplateId } from '@/types/wedding'

interface Props {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return getAllTemplates().map((t) => ({ id: t.id }))
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const template = getTemplateMetadata(params.id as TemplateId)
  if (!template) return {}
  return { title: `${template.name} Template - Inviting You` }
}

export default async function TemplateShowcasePage(props: Props) {
  const params = await props.params;
  const template = getTemplateMetadata(params.id as TemplateId)
  if (!template) notFound()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--admin-bg)', color: 'var(--admin-text)' }}>
      <header style={{ padding: '4rem 2rem', textAlign: 'center', borderBottom: '1px solid var(--admin-border)', background: 'var(--admin-surface)' }}>
        <Link href="/templates" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--admin-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
          &larr; Back to Gallery
        </Link>
        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem' }}>
          {template.name}
        </h1>
        <p style={{ color: 'var(--admin-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          {template.description}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link href={`/i/iqra-mufassir`} style={{
            padding: '1rem 2rem',
            background: 'var(--admin-gold)',
            color: 'var(--admin-bg)',
            fontWeight: 600,
            borderRadius: '4px',
            textDecoration: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.9rem'
          }}>
            Preview Live Demo
          </Link>
        </div>
      </header>
      
      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '2rem' }}>
            Features & Mood
          </h2>
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--admin-text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Features</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {template.features.map((f, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--admin-muted)', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--admin-gold)' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', color: 'var(--admin-text)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Mood</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {template.mood.map((m, i) => (
                <span key={i} style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--admin-muted)' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ flex: '2 1 600px', background: 'var(--admin-surface)', borderRadius: '8px', padding: '2rem', border: '1px solid var(--admin-border)', textAlign: 'center' }}>
          <div style={{ padding: '4rem 0', color: 'var(--admin-muted)' }}>
            <p>To use this template for your wedding, create a new wedding in your dashboard and select <strong>{template.name}</strong> from the design options.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
