import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--admin-bg)', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        flexShrink: 0,
        background: 'var(--admin-surface)',
        borderRight: '1px solid var(--admin-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--admin-border)' }}>
          <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <svg style={{ width: 28, height: 28, fill: 'var(--admin-gold)', flexShrink: 0 }} viewBox="0 0 48 48">
              <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
              <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
              <circle cx="24" cy="24" r="2.2" />
            </svg>
            <div>
              <div style={{ fontSize: '0.95rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-text)', fontWeight: 400, lineHeight: 1.2 }}>
                Inviting You
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--admin-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Studio</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1.25rem 0', overflowY: 'auto' }}>
          {[
            { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
            { href: '/admin/weddings/new', icon: '✨', label: 'New Invitation', highlight: true },
            { href: '/', icon: '🌐', label: 'Public Site', newTab: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.newTab ? '_blank' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 1.5rem',
                fontSize: '0.875rem',
                color: item.highlight ? 'var(--admin-gold)' : 'var(--admin-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s, background 0.2s',
                fontWeight: item.highlight ? 600 : 400,
              }}
            >
              <span style={{ fontSize: '1rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid var(--admin-border)', fontSize: '0.75rem', color: 'var(--admin-muted)' }}>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--admin-muted)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', padding: 0 }}>
              Sign out →
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '2.5rem 3rem', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}
