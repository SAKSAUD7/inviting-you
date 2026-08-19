import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function RSVPPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect('/admin/login')

  const { id } = await params

  const wedding = await prisma.wedding.findUnique({
    where: { id },
    include: {
      rsvpResponses: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!wedding) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--admin-muted)' }}>
        <p>Invitation not found.</p>
      </div>
    )
  }

  const responses = wedding.rsvpResponses
  const attending = responses.filter((r) => r.attending)
  const declined = responses.filter((r) => !r.attending)
  const totalGuests = attending.reduce((sum, r) => sum + r.guestCount, 0)

  return (
    <div style={{ maxWidth: '960px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <Link href="/admin/dashboard" style={{ color: 'var(--admin-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
            <span style={{ color: 'var(--admin-border)' }}>/</span>
            <Link href={`/admin/weddings/${id}/edit`} style={{ color: 'var(--admin-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>{wedding.title}</Link>
            <span style={{ color: 'var(--admin-border)' }}>/</span>
            <span style={{ color: 'var(--admin-text)', fontSize: '0.85rem' }}>RSVPs</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--admin-gold)', fontWeight: 400 }}>
            RSVP Responses
          </h1>
        </div>
        <Link href={`/admin/weddings/${id}/edit`} style={{ padding: '0.6rem 1.25rem', background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', borderRadius: '4px', fontSize: '0.85rem', textDecoration: 'none' }}>
          Back to Editor
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Total Responses', value: responses.length, icon: '📬' },
          { label: 'Attending', value: attending.length, icon: '✅' },
          { label: 'Declined', value: declined.length, icon: '❌' },
          { label: 'Total Guests (Headcount)', value: totalGuests, icon: '👥' },
        ].map((s) => (
          <div key={s.label} style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', fontWeight: 400 }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', marginTop: '0.25rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
        {responses.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--admin-muted)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</p>
            <p>No RSVPs received yet.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                {['Guest Name', 'Status', 'Guests', 'Message', 'Date'].map((h) => (
                  <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-muted)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((r, i) => (
                <tr key={r.id} style={{ borderBottom: i < responses.length - 1 ? '1px solid var(--admin-border)' : 'none' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--admin-text)' }}>
                    {r.guestName}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {r.attending ? (
                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', background: 'rgba(42,107,58,0.2)', color: '#4EA849', borderRadius: '4px', fontWeight: 600 }}>Attending</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', background: 'rgba(139,26,26,0.2)', color: '#E06060', borderRadius: '4px', fontWeight: 600 }}>Declined</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--admin-muted)' }}>
                    {r.attending ? r.guestCount : '-'}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--admin-muted)', fontSize: '0.9rem', maxWidth: '300px' }}>
                    {r.message ? (
                      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '4px', fontStyle: 'italic' }}>
                        "{r.message}"
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--admin-muted)', fontSize: '0.85rem' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
