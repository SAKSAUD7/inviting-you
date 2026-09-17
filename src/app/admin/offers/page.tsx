'use client'

import { useEffect, useState } from 'react'

interface Offer {
  id: string
  templateId: string
  label: string
  discountPct: number
  active: boolean
  expiresAt: string | null
  createdAt: string
}

const TEMPLATES = [
  { id: 'velvet', name: 'Velvet' },
  { id: 'sultan', name: 'Sultan' },
  { id: 'walima', name: 'Petal (Walima)' },
  { id: 'noor', name: 'Noor' },
  { id: 'birthday-interactive-01', name: 'Birthday Surprise' },
]

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [form, setForm] = useState({
    templateId: 'velvet',
    label: '',
    discountPct: 10,
    expiresAt: '',
  })

  async function loadOffers() {
    setLoading(true)
    const res = await fetch('/api/admin/offers')
    if (res.ok) {
      const data = await res.json()
      setOffers(data.offers)
    }
    setLoading(false)
  }

  useEffect(() => { loadOffers() }, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    const res = await fetch('/api/admin/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        templateId: form.templateId,
        label: form.label,
        discountPct: Number(form.discountPct),
        expiresAt: form.expiresAt || null,
      }),
    })
    if (res.ok) {
      setSuccess('Offer created!')
      setForm({ templateId: 'velvet', label: '', discountPct: 10, expiresAt: '' })
      loadOffers()
    } else {
      setError('Failed to create offer.')
    }
    setSaving(false)
  }

  async function toggleOffer(id: string, active: boolean) {
    await fetch(`/api/admin/offers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    })
    loadOffers()
  }

  async function deleteOffer(id: string) {
    if (!confirm('Delete this offer?')) return
    await fetch(`/api/admin/offers/${id}`, { method: 'DELETE' })
    loadOffers()
  }

  const cell: React.CSSProperties = { padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--admin-text)' }
  const input: React.CSSProperties = {
    width: '100%', padding: '0.6rem 0.8rem', background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)', borderRadius: '4px',
    color: 'var(--admin-text)', fontSize: '0.875rem',
  }
  const label: React.CSSProperties = { display: 'block', fontSize: '0.75rem', color: 'var(--admin-muted)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 400, color: 'var(--admin-text)', marginBottom: '0.5rem' }}>
          Template Offers
        </h1>
        <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>
          Set percentage discounts on templates. Active offers appear as badges on the public website.
        </p>
      </div>

      {/* ── Create Offer Form ── */}
      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '2rem', marginBottom: '2.5rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--admin-text)', marginBottom: '1.5rem' }}>
          Create New Offer
        </h2>
        <form onSubmit={handleCreate}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span style={label}>Template</span>
              <select style={input} value={form.templateId} onChange={e => setForm(f => ({ ...f, templateId: e.target.value }))}>
                {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <span style={label}>Offer Label</span>
              <input style={input} type="text" placeholder="e.g. Launch Offer, Eid Special" value={form.label} required onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <div>
              <span style={label}>Discount %</span>
              <input style={input} type="number" min={1} max={100} value={form.discountPct} required onChange={e => setForm(f => ({ ...f, discountPct: Number(e.target.value) }))} />
            </div>
            <div>
              <span style={label}>Expires At (optional)</span>
              <input style={input} type="datetime-local" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))} />
            </div>
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: '#4ade80', fontSize: '0.85rem', marginBottom: '1rem' }}>{success}</p>}

          <button type="submit" disabled={saving} style={{
            padding: '0.7rem 1.8rem', background: 'var(--admin-gold)', color: '#0C0C0E',
            fontWeight: 700, border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em',
            opacity: saving ? 0.6 : 1,
          }}>
            {saving ? 'Creating…' : 'Create Offer'}
          </button>
        </form>
      </div>

      {/* ── Offers Table ── */}
      <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--admin-border)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 400, color: 'var(--admin-text)' }}>
            Active &amp; Past Offers
          </h2>
        </div>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-muted)' }}>Loading…</div>
        ) : offers.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--admin-muted)' }}>
            <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏷️</p>
            <p>No offers yet. Create one above.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                {['Template', 'Label', 'Discount', 'Expires', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.9rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--admin-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {offers.map((o, i) => (
                <tr key={o.id} style={{ borderBottom: i < offers.length - 1 ? '1px solid var(--admin-border)' : 'none' }}>
                  <td style={cell}>{TEMPLATES.find(t => t.id === o.templateId)?.name ?? o.templateId}</td>
                  <td style={cell}>{o.label}</td>
                  <td style={cell}>
                    <span style={{ background: 'rgba(201,151,26,0.15)', color: 'var(--admin-gold)', padding: '0.2rem 0.6rem', borderRadius: '3px', fontWeight: 700 }}>
                      {o.discountPct}% OFF
                    </span>
                  </td>
                  <td style={{ ...cell, fontSize: '0.8rem', color: 'var(--admin-muted)' }}>
                    {o.expiresAt ? new Date(o.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No expiry'}
                  </td>
                  <td style={cell}>
                    <span style={{
                      padding: '0.2rem 0.6rem', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 600,
                      background: o.active ? '#1a3d2a' : '#2a2a2a', color: o.active ? '#4ade80' : '#888',
                    }}>
                      {o.active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </td>
                  <td style={cell}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => toggleOffer(o.id, o.active)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--admin-gold)', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                        {o.active ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => deleteOffer(o.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: '0.8rem', fontWeight: 600, padding: 0 }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Preview note */}
      <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(201,151,26,0.05)', border: '1px solid rgba(201,151,26,0.2)', borderRadius: '6px' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--admin-muted)' }}>
          💡 <strong style={{ color: 'var(--admin-gold)' }}>How it works:</strong> Active offers appear as &quot;X% OFF&quot; badges on the public website template cards. The original price (₹1,999) is shown crossed out with the discounted price.
        </p>
      </div>
    </div>
  )
}
