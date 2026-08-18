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
    PUBLISHED: '#2A6B3A',
    DRAFT: '#4A4A20',
    CLIENT_REVIEW: '#3A4A6B',
    APPROVED: '#2A5A6B',
    ARCHIVED: '#3A3A3A',
  }

  return (
    <div>
      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Invitations', value: stats.total, icon: '💌' },
          { label: 'Published', value: stats.published, icon: '🌐' },
          { label: 'Drafts', value: stats.drafts, icon: '📝' },
          { label: 'Total RSVPs', value: stats.rsvps, icon: '✅' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', fontWeight: 400 }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--admin-text)', fontWeight: 400 }}>
          All Invitations
        </h2>
        <Link href="/admin/weddings/new" style={{
          padding: '0.7rem 1.4rem',
          background: 'var(--admin-gold)',
          color: 'var(--admin-bg)',
          fontWeight: 700,
          borderRadius: '4px',
          textDecoration: 'none',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          + New Invitation
        </Link>
      </div>

      {/* Table */}
      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
        {weddings.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-muted)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>💌</p>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--admin-text)', marginBottom: '0.5rem', fontWeight: 400 }}>No invitations yet</h3>
            <p style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>Create your first digital wedding invitation to get started.</p>
            <Link href="/admin/weddings/new" style={{
              padding: '0.75rem 1.5rem', background: 'var(--admin-gold)', color: 'var(--admin-bg)',
              fontWeight: 700, borderRadius: '4px', textDecoration: 'none',
            }}>
              Create First Invitation
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                {['Wedding', 'Template', 'Status', 'RSVPs', 'Actions'].map((h) => (
                  <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weddings.map((w, i) => (
                <tr key={w.id} style={{ borderBottom: i < weddings.length - 1 ? '1px solid var(--admin-border)' : 'none', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--admin-text)', fontSize: '0.95rem' }}>{w.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginTop: '0.2rem' }}>
                      invitingyou.in/i/{w.slug}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(201,151,26,0.1)', color: 'var(--admin-gold)', borderRadius: '3px', textTransform: 'capitalize' }}>
                      {w.templateId}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.7rem', background: statusColors[w.status] || '#3A3A3A', color: '#fff', borderRadius: '3px', fontWeight: 600 }}>
                      {w.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--admin-muted)', fontSize: '0.9rem' }}>
                    {w._count.rsvpResponses}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <Link href={`/admin/weddings/${w.id}/edit`} style={{ fontSize: '0.8rem', color: 'var(--admin-gold)', textDecoration: 'none', fontWeight: 600 }}>
                        Edit
                      </Link>
                      <Link href={`/i/${w.slug}`} target="_blank" style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', textDecoration: 'none' }}>
                        View ↗
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
