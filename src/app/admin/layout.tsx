import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import './admin.css'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        {/* Logo */}
        <div className="admin-logo-area">
          <Link href="/admin/dashboard" className="admin-logo-link">
            <svg style={{ width: 28, height: 28, fill: 'var(--admin-gold)', flexShrink: 0 }} viewBox="0 0 48 48">
              <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
              <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
              <circle cx="24" cy="24" r="2.2" />
            </svg>
            <div>
              <div className="admin-logo-title">Inviting You</div>
              <div className="admin-logo-subtitle">Studio Admin</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="admin-nav">
          {[
            { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
            { href: '/admin/weddings/new', icon: '✨', label: 'New Invitation', highlight: true },
            { href: '/admin/offers', icon: '🏷️', label: 'Offers & Discounts' },
            { href: '/', icon: '🌐', label: 'Public Site', newTab: true },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.newTab ? '_blank' : undefined}
              className={`admin-nav-link ${item.highlight ? 'admin-nav-link--highlight' : ''}`}
            >
              <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="admin-footer">
          <span style={{ fontSize: '0.75rem', color: 'var(--admin-muted)' }}>{session.user?.email || 'Admin'}</span>
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="admin-signout" title="Sign Out">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {children}
      </main>
    </div>
  )
}
