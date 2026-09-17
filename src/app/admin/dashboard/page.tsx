import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const metadata = { title: 'Studio Dashboard - Inviting You' }

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const [weddings, rsvpCount] = await Promise.all([
    prisma.wedding.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        couple: { select: { brideName: true, groomName: true } },
        _count: { select: { rsvpResponses: true } },
      },
    }),
    prisma.rSVPResponse.count(),
  ])

  const stats = {
    total: weddings.length,
    published: weddings.filter((w) => w.status === 'PUBLISHED').length,
    drafts: weddings.filter((w) => w.status === 'DRAFT').length,
    rsvps: rsvpCount,
  }

  const statusColors: Record<string, string> = {
    PUBLISHED: 'var(--admin-success)',
    DRAFT: '#4A4A20',
    CLIENT_REVIEW: '#3A4A6B',
    APPROVED: '#2A5A6B',
    ARCHIVED: '#3A3A3A',
  }

  return (
    <div>
      <h1 className="admin-header-title">Studio Dashboard</h1>
      <p className="admin-header-desc">Welcome back, manage your clients and premium digital invitations here.</p>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Total Invitations', value: stats.total, icon: '💌' },
          { label: 'Published Live', value: stats.published, icon: '🌐' },
          { label: 'In Drafts', value: stats.drafts, icon: '📝' },
          { label: 'Total RSVPs', value: stats.rsvps, icon: '✅' },
        ].map((s) => (
          <div key={s.label} className="admin-card">
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div className="admin-card-value">{s.value}</div>
            <div className="admin-card-desc">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--admin-text)', fontWeight: 400 }}>
          All Invitations
        </h2>
        <Link href="/admin/weddings/new" className="admin-btn">
          + New Invitation
        </Link>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        {weddings.length === 0 ? (
          <div style={{ padding: '5rem 2rem', textAlign: 'center', color: 'var(--admin-muted)' }}>
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✨</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--admin-gold)', marginBottom: '0.5rem', fontWeight: 400 }}>No invitations yet</h3>
            <p style={{ marginBottom: '2.5rem', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 2.5rem' }}>Create your first premium digital wedding invitation to start building your studio collection.</p>
            <Link href="/admin/weddings/new" className="admin-btn">
              Create First Invitation
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)', background: 'rgba(255,255,255,0.02)' }}>
                {['Wedding', 'Template', 'Status', 'RSVPs', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weddings.map((w, i) => (
                <tr key={w.id} style={{ borderBottom: i < weddings.length - 1 ? '1px solid var(--admin-border)' : 'none', transition: 'background 0.2s' }}>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ fontWeight: 500, color: 'var(--admin-text)', fontSize: '1rem', marginBottom: '0.2rem' }}>{w.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>
                      invitingyou.in/i/{w.slug}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', background: 'rgba(201,151,26,0.1)', color: 'var(--admin-gold)', borderRadius: '50px', textTransform: 'capitalize', border: '1px solid rgba(201,151,26,0.2)' }}>
                      {w.templateId}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem', background: statusColors[w.status] || '#3A3A3A', color: '#fff', borderRadius: '50px', fontWeight: 600, letterSpacing: '0.05em' }}>
                      {w.status}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem', color: 'var(--admin-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                    {w._count.rsvpResponses}
                  </td>
                  <td style={{ padding: '1.25rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                      <Link href={`/admin/weddings/${w.id}/edit`} style={{ fontSize: '0.85rem', color: 'var(--admin-gold)', textDecoration: 'none', fontWeight: 500 }}>
                        Edit
                      </Link>
                      <Link href={`/i/${w.slug}`} target="_blank" style={{ fontSize: '0.85rem', color: 'var(--admin-muted)', textDecoration: 'none' }}>
                        View ↗
                      </Link>
                      <Link href={`/admin/weddings/${w.id}/rsvp`} style={{ fontSize: '0.85rem', color: 'var(--admin-muted)', textDecoration: 'none' }}>
                        RSVPs
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
