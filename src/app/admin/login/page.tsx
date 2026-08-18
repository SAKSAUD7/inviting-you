'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin/dashboard',
    })
    if (res?.error) {
      setError('Invalid credentials. Check your email and password.')
      setLoading(false)
    } else if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--admin-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-sans)' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '0 1.5rem' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <svg style={{ width: 40, height: 40, fill: 'var(--admin-gold)', margin: '0 auto 1rem' }} viewBox="0 0 48 48">
            <path d="M24 3 31.2 16.8 45 24l-13.8 7.2L24 45l-7.2-13.8L3 24l13.8-7.2L24 3Z" />
            <path d="M24 10.5 28.9 19.1 37.5 24l-8.6 4.9L24 37.5l-4.9-8.6L10.5 24l8.6-4.9L24 10.5Z" />
            <circle cx="24" cy="24" r="2.2" />
          </svg>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--admin-text)', fontWeight: 400, marginBottom: '0.25rem' }}>
            Inviting You Studio
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-muted)' }}>Sign in to manage your invitations</p>
        </div>

        <div style={{ background: 'var(--admin-surface)', borderRadius: '10px', border: '1px solid var(--admin-border)', padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-muted)', fontWeight: 600 }}>
                Email
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@invitingyou.in"
                style={{ width: '100%', padding: '0.8rem', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', borderRadius: '5px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--admin-muted)', fontWeight: 600 }}>
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '0.8rem', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', borderRadius: '5px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
              />
            </div>

            {error && (
              <div style={{ padding: '0.75rem', background: 'rgba(139,26,26,0.1)', border: '1px solid rgba(139,26,26,0.3)', borderRadius: '4px', color: '#E06060', fontSize: '0.85rem' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ padding: '0.9rem', background: loading ? 'var(--admin-muted)' : 'var(--admin-gold)', color: 'var(--admin-bg)', border: 'none', borderRadius: '5px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}
            >
              {loading ? 'Signing in...' : 'Sign In to Studio'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', textDecoration: 'none' }}>
            ← Back to Inviting You
          </Link>
        </div>
      </div>
    </div>
  )
}
