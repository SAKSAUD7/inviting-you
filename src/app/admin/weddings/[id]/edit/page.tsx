'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { getAllTemplates } from '@/templates/registry'
import Link from 'next/link'

type Tab = 'basics' | 'couple' | 'family' | 'events' | 'music' | 'rsvp' | 'seo' | 'template'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'basics', label: 'Basics', icon: '📋' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'rsvp', label: 'RSVP', icon: '✅' },
  { id: 'template', label: 'Template', icon: '🎨' },
  { id: 'seo', label: 'SEO', icon: '🔍' },
]

interface WeddingData {
  id: string; slug: string; title: string; templateId: string; status: string
  couple?: any; family?: any; events?: any[]; music?: any; rsvpConfig?: any; seo?: any
  _count?: { rsvpResponses: number }
}

export default function EditWeddingPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const templates = getAllTemplates()
  const [data, setData] = useState<WeddingData | null>(null)
  const [tab, setTab] = useState<Tab>('basics')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [publishing, setPublishing] = useState(false)

  // Form fields
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [templateId, setTemplateId] = useState('velvet')
  const [status, setStatus] = useState('DRAFT')

  // Couple
  const [brideName, setBrideName] = useState('')
  const [brideQual, setBrideQual] = useState('')
  const [groomName, setGroomName] = useState('')
  const [groomQual, setGroomQual] = useState('')
  const [gregorianDate, setGregorianDate] = useState('')
  const [gregorianDisplay, setGregorianDisplay] = useState('')
  const [hijriDate, setHijriDate] = useState('')
  const [islamicVerse, setIslamicVerse] = useState('')
  const [invitationMsg, setInvitationMsg] = useState('')

  // Family
  const [brideParents, setBrideParents] = useState('')
  const [bridePGF, setBridePGF] = useState('')
  const [brideMGF, setBrideMGF] = useState('')
  const [groomFather, setGroomFather] = useState('')
  const [groomPGF, setGroomPGF] = useState('')
  const [groomMGF, setGroomMGF] = useState('')
  const [fromName, setFromName] = useState('')
  const [fromOrg, setFromOrg] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [fromPhone, setFromPhone] = useState('')

  // Events
  const [events, setEvents] = useState<any[]>([])

  // Music
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [musicTitle, setMusicTitle] = useState('')
  const [musicUrl, setMusicUrl] = useState('')

  // RSVP
  const [rsvpEnabled, setRsvpEnabled] = useState(true)
  const [rsvpMsg, setRsvpMsg] = useState('')

  // SEO
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDesc, setSeoDesc] = useState('')

  // Load data
  useEffect(() => {
    fetch(`/api/weddings/${params.id}`)
      .then((r) => r.json())
      .then((d: WeddingData) => {
        setData(d)
        setTitle(d.title || '')
        setSlug(d.slug || '')
        setTemplateId(d.templateId || 'velvet')
        setStatus(d.status || 'DRAFT')

        const c = d.couple
        if (c) {
          setBrideName(c.brideName || '')
          setBrideQual(c.brideQualification || '')
          setGroomName(c.groomName || '')
          setGroomQual(c.groomQualification || '')
          setGregorianDate(c.gregorianDate ? c.gregorianDate.slice(0, 10) : '')
          setGregorianDisplay(c.gregorianDisplay || '')
          setHijriDate(c.hijriDate || '')
          setIslamicVerse(c.islamicVerse || '')
          setInvitationMsg(c.invitationMessage || '')
        }

        const f = d.family
        if (f) {
          setBrideParents(f.brideParents || '')
          setBridePGF(f.bridePaternalGrandfather || '')
          setBrideMGF(f.brideMaternalGrandfather || '')
          setGroomFather(f.groomFather || '')
          setGroomPGF(f.groomPaternalGrandfather || '')
          setGroomMGF(f.groomMaternalGrandfather || '')
          setFromName(f.invitationFromName || '')
          setFromOrg(f.invitationFromOrg || '')
          setFromAddress(f.invitationFromAddress || '')
          setFromPhone(f.invitationFromPhone || '')
        }

        setEvents(d.events || [])

        if (d.music) {
          setMusicEnabled(d.music.enabled ?? true)
          setMusicTitle(d.music.title || '')
          setMusicUrl(d.music.url || '')
        }

        if (d.rsvpConfig) {
          setRsvpEnabled(d.rsvpConfig.enabled ?? true)
          setRsvpMsg(d.rsvpConfig.message || '')
        }

        if (d.seo) {
          setSeoTitle(d.seo.title || '')
          setSeoDesc(d.seo.description || '')
        }
      })
  }, [params.id])

  const save = useCallback(async () => {
    setSaving(true)
    setSaveStatus('saving')
    try {
      const res = await fetch(`/api/weddings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, slug, templateId, status,
          couple: { brideName, brideQualification: brideQual, groomName, groomQualification: groomQual, gregorianDate, gregorianDisplay, hijriDate, islamicVerse, invitationMessage: invitationMsg },
          family: { brideParents, bridePaternalGrandfather: bridePGF, brideMaternalGrandfather: brideMGF, groomFather, groomPaternalGrandfather: groomPGF, groomMaternalGrandfather: groomMGF, invitationFromName: fromName, invitationFromOrg: fromOrg, invitationFromAddress: fromAddress, invitationFromPhone: fromPhone },
          events: events.map((e, i) => ({ ...e, order: i + 1 })),
          music: { title: musicTitle, url: musicUrl, autoplay: true },
          rsvpConfig: { enabled: rsvpEnabled, message: rsvpMsg },
          seo: { title: seoTitle, description: seoDesc },
        }),
      })
      if (!res.ok) throw new Error('Save failed')
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setSaving(false)
    }
  }, [title, slug, templateId, status, brideName, brideQual, groomName, groomQual, gregorianDate, gregorianDisplay, hijriDate, islamicVerse, invitationMsg, brideParents, bridePGF, brideMGF, groomFather, groomPGF, groomMGF, fromName, fromOrg, fromAddress, fromPhone, events, musicTitle, musicUrl, rsvpEnabled, rsvpMsg, seoTitle, seoDesc, params.id])

  const publish = async () => {
    setPublishing(true)
    try {
      await fetch(`/api/weddings/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'PUBLISHED' }),
      })
      setStatus('PUBLISHED')
      router.refresh()
    } finally {
      setPublishing(false)
    }
  }

  const deleteWedding = async () => {
    if (!confirm('Delete this invitation permanently? This cannot be undone.')) return
    await fetch(`/api/weddings/${params.id}`, { method: 'DELETE' })
    router.push('/admin/dashboard')
  }

  const addEvent = () => setEvents([...events, { name: '', type: 'CUSTOM', date: '', timeDisplay: '', description: '', venueName: '', venueAddress: '', mapsUrl: '', enabled: true }])
  const removeEvent = (i: number) => setEvents(events.filter((_, idx) => idx !== i))
  const updateEvent = (i: number, field: string, val: any) => {
    const copy = [...events]
    copy[i] = { ...copy[i], [field]: val }
    setEvents(copy)
  }

  if (!data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--admin-muted)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <p>Loading invitation...</p>
        </div>
      </div>
    )
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '0.75rem', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', color: 'var(--admin-text)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none' }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.4rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--admin-muted)', fontWeight: 600 }
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.4rem' }
  const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }
  const sectionHead: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--admin-gold)', fontWeight: 400, marginBottom: '1.25rem' }

  const renderTab = () => {
    switch (tab) {
      case 'basics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={fieldStyle}><label style={labelStyle}>Wedding Title</label><input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Public URL Slug</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--admin-muted)', fontSize: '0.85rem', flexShrink: 0 }}>/i/</span>
                <input style={{ ...inputStyle, flex: 1 }} value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} />
              </div>
            </div>
            <div style={gridStyle}>
              <div style={fieldStyle}>
                <label style={labelStyle}>Template</label>
                <select style={inputStyle} value={templateId} onChange={e => setTemplateId(e.target.value)}>
                  {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} value={status} onChange={e => setStatus(e.target.value)}>
                  {['DRAFT','CLIENT_REVIEW','PUBLISHED','ARCHIVED'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ background: 'rgba(201,151,26,0.05)', border: '1px solid rgba(201,151,26,0.15)', borderRadius: '8px', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--admin-muted)', marginBottom: '0.75rem' }}>Public invitation URL:</p>
              <a href={`/i/${slug}`} target="_blank" style={{ color: 'var(--admin-gold)', fontSize: '0.9rem', fontWeight: 600 }}>
                {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/i/{slug} ↗
              </a>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--admin-muted)' }}>RSVPs received: <strong style={{ color: 'var(--admin-text)' }}>{data._count?.rsvpResponses ?? 0}</strong></p>
          </div>
        )

      case 'couple':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p style={sectionHead}>🌸 Bride</p>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Bride Name</label><input style={inputStyle} value={brideName} onChange={e => setBrideName(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Qualification</label><input style={inputStyle} value={brideQual} onChange={e => setBrideQual(e.target.value)} placeholder="B.Com" /></div>
              </div>
            </div>
            <div>
              <p style={sectionHead}>🌿 Groom</p>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Groom Name</label><input style={inputStyle} value={groomName} onChange={e => setGroomName(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Qualification</label><input style={inputStyle} value={groomQual} onChange={e => setGroomQual(e.target.value)} placeholder="B.Sc" /></div>
              </div>
            </div>
            <div>
              <p style={sectionHead}>📅 Date</p>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Wedding Date</label><input style={inputStyle} type="date" value={gregorianDate} onChange={e => setGregorianDate(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Display Date</label><input style={inputStyle} value={gregorianDisplay} onChange={e => setGregorianDisplay(e.target.value)} placeholder="Friday, 2 October 2026" /></div>
                <div style={fieldStyle}><label style={labelStyle}>Hijri Date</label><input style={inputStyle} value={hijriDate} onChange={e => setHijriDate(e.target.value)} /></div>
              </div>
            </div>
            <div style={fieldStyle}><label style={labelStyle}>Islamic Verse (opening lines)</label><textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={islamicVerse} onChange={e => setIslamicVerse(e.target.value)} /></div>
            <div style={fieldStyle}><label style={labelStyle}>Invitation Message</label><textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={invitationMsg} onChange={e => setInvitationMsg(e.target.value)} /></div>
          </div>
        )

      case 'family':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <p style={sectionHead}>🌸 Bride's Family</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Parents</label><input style={inputStyle} value={brideParents} onChange={e => setBrideParents(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Paternal Grandfather</label><input style={inputStyle} value={bridePGF} onChange={e => setBridePGF(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Maternal Grandfather</label><input style={inputStyle} value={brideMGF} onChange={e => setBrideMGF(e.target.value)} /></div>
              </div>
            </div>
            <div>
              <p style={sectionHead}>🌿 Groom's Family</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Father</label><input style={inputStyle} value={groomFather} onChange={e => setGroomFather(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Paternal Grandfather</label><input style={inputStyle} value={groomPGF} onChange={e => setGroomPGF(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Maternal Grandfather</label><input style={inputStyle} value={groomMGF} onChange={e => setGroomMGF(e.target.value)} /></div>
              </div>
            </div>
            <div>
              <p style={sectionHead}>📬 Invitation From</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={gridStyle}>
                  <div style={fieldStyle}><label style={labelStyle}>Name</label><input style={inputStyle} value={fromName} onChange={e => setFromName(e.target.value)} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>Organisation</label><input style={inputStyle} value={fromOrg} onChange={e => setFromOrg(e.target.value)} /></div>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Address</label><input style={inputStyle} value={fromAddress} onChange={e => setFromAddress(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Phone</label><input style={inputStyle} value={fromPhone} onChange={e => setFromPhone(e.target.value)} /></div>
              </div>
            </div>
          </div>
        )

      case 'events':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map((ev, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', borderRadius: '6px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', fontSize: '1rem' }}>Event {i + 1}</span>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <label style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--admin-muted)', cursor: 'pointer' }}>
                      <input type="checkbox" checked={ev.enabled ?? true} onChange={e => updateEvent(i, 'enabled', e.target.checked)} />
                      Enabled
                    </label>
                    {events.length > 1 && <button onClick={() => removeEvent(i)} style={{ background: 'none', border: 'none', color: 'var(--admin-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={gridStyle}>
                    <div style={fieldStyle}><label style={labelStyle}>Name</label><input style={inputStyle} value={ev.name} onChange={e => updateEvent(i, 'name', e.target.value)} /></div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Type</label>
                      <select style={inputStyle} value={ev.type || 'CUSTOM'} onChange={e => updateEvent(i, 'type', e.target.value)}>
                        {['NIKAH','RECEPTION','MEHENDI','SANGEET','WALIMA','ENGAGEMENT','CUSTOM'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div style={fieldStyle}><label style={labelStyle}>Date</label><input style={inputStyle} type="date" value={ev.date ? ev.date.slice(0,10) : ''} onChange={e => updateEvent(i, 'date', e.target.value)} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Time</label><input style={inputStyle} value={ev.timeDisplay || ''} onChange={e => updateEvent(i, 'timeDisplay', e.target.value)} placeholder="5:00 PM" /></div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>Description</label><input style={inputStyle} value={ev.description || ''} onChange={e => updateEvent(i, 'description', e.target.value)} placeholder="After Namaz-e-Asar" /></div>
                  <div style={gridStyle}>
                    <div style={fieldStyle}><label style={labelStyle}>Venue Name</label><input style={inputStyle} value={ev.venueName || ''} onChange={e => updateEvent(i, 'venueName', e.target.value)} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Google Maps URL</label><input style={inputStyle} value={ev.mapsUrl || ''} onChange={e => updateEvent(i, 'mapsUrl', e.target.value)} /></div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>Venue Address</label><input style={inputStyle} value={ev.venueAddress || ''} onChange={e => updateEvent(i, 'venueAddress', e.target.value)} /></div>
                </div>
              </div>
            ))}
            <button onClick={addEvent} style={{ padding: '0.75rem', background: 'transparent', border: '1px dashed var(--admin-border)', color: 'var(--admin-gold)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-sans)' }}>
              + Add Another Event
            </button>
          </div>
        )

      case 'music':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="musicEnabledEdit" checked={musicEnabled} onChange={e => setMusicEnabled(e.target.checked)} style={{ width: 18, height: 18 }} />
              <label htmlFor="musicEnabledEdit" style={{ cursor: 'pointer', fontSize: '0.95rem' }}>Enable background music</label>
            </div>
            {musicEnabled && (
              <>
                <div style={fieldStyle}><label style={labelStyle}>Track Title</label><input style={inputStyle} value={musicTitle} onChange={e => setMusicTitle(e.target.value)} placeholder="Ya Nabi Salam Alayka" /></div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Audio URL (direct link to MP3)</label>
                  <input style={inputStyle} value={musicUrl} onChange={e => setMusicUrl(e.target.value)} placeholder="https://..." />
                  <p style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginTop: '0.4rem' }}>
                    Upload audio to a file host and paste the direct URL here. Supported: MP3, OGG, WAV.
                  </p>
                </div>
                {musicUrl && (
                  <div style={{ background: 'rgba(201,151,26,0.05)', border: '1px solid rgba(201,151,26,0.2)', borderRadius: '6px', padding: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', marginBottom: '0.5rem' }}>Preview:</p>
                    <audio controls src={musicUrl} style={{ width: '100%' }} />
                  </div>
                )}
              </>
            )}
          </div>
        )

      case 'rsvp':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="rsvpEnabledEdit" checked={rsvpEnabled} onChange={e => setRsvpEnabled(e.target.checked)} style={{ width: 18, height: 18 }} />
              <label htmlFor="rsvpEnabledEdit" style={{ cursor: 'pointer', fontSize: '0.95rem' }}>Enable RSVP form on invitation</label>
            </div>
            {rsvpEnabled && (
              <div style={fieldStyle}><label style={labelStyle}>RSVP Message</label><textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={rsvpMsg} onChange={e => setRsvpMsg(e.target.value)} /></div>
            )}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Responses received: <span style={{ color: 'var(--admin-gold)' }}>{data._count?.rsvpResponses ?? 0}</span></p>
              <Link href={`/admin/weddings/${params.id}/rsvp`} style={{ fontSize: '0.8rem', color: 'var(--admin-gold)', textDecoration: 'underline' }}>
                View all RSVP responses →
              </Link>
            </div>
          </div>
        )

      case 'template':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
            {templates.map(t => (
              <div
                key={t.id}
                onClick={() => setTemplateId(t.id)}
                style={{ border: `2px solid ${templateId === t.id ? 'var(--admin-gold)' : 'var(--admin-border)'}`, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s', background: templateId === t.id ? 'rgba(201,151,26,0.05)' : 'transparent' }}
              >
                <div style={{ height: 110, background: t.id === 'velvet' ? 'linear-gradient(135deg,#3D0A0A,#1A0404)' : t.id === 'noor' ? 'linear-gradient(135deg,#FFFEF9,#F8F3E8)' : '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: t.id === 'velvet' ? '#C9971A' : '#C9A96E' }}>{t.name}</span>
                </div>
                <div style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)' }}>{t.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'seo':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={fieldStyle}><label style={labelStyle}>Page Title</label><input style={inputStyle} value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder={title} /></div>
            <div style={fieldStyle}><label style={labelStyle}>Meta Description</label><textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={seoDesc} onChange={e => setSeoDesc(e.target.value)} /></div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1rem' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--admin-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Search Preview</p>
              <p style={{ fontSize: '0.9rem', color: '#6FA3EF', marginBottom: '0.25rem' }}>{seoTitle || title}</p>
              <p style={{ fontSize: '0.75rem', color: '#4EA849' }}>invitingyou.in/i/{slug}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--admin-muted)', marginTop: '0.25rem' }}>{seoDesc || `Wedding invitation of ${brideName} and ${groomName}`}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div style={{ maxWidth: '960px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <Link href="/admin/dashboard" style={{ color: 'var(--admin-muted)', fontSize: '0.85rem', textDecoration: 'none' }}>← Dashboard</Link>
            <span style={{ color: 'var(--admin-border)' }}>/</span>
            <span style={{ color: 'var(--admin-muted)', fontSize: '0.85rem' }}>{data.title}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--admin-gold)', fontWeight: 400 }}>{data.title}</h1>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href={`/i/${slug}`} target="_blank" style={{ padding: '0.6rem 1rem', border: '1px solid var(--admin-border)', color: 'var(--admin-muted)', borderRadius: '4px', fontSize: '0.8rem', textDecoration: 'none' }}>
            Preview ↗
          </Link>
          <button
            onClick={save}
            disabled={saving}
            style={{ padding: '0.6rem 1.25rem', background: saveStatus === 'saved' ? '#2A6B3A' : saveStatus === 'error' ? '#8B1A1A' : 'var(--admin-gold)', color: saveStatus === 'saved' || saveStatus === 'error' ? '#fff' : 'var(--admin-bg)', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}
          >
            {saveStatus === 'saving' ? '⏳ Saving...' : saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'error' ? '✗ Error' : '💾 Save'}
          </button>
          {status !== 'PUBLISHED' && (
            <button onClick={publish} disabled={publishing} style={{ padding: '0.6rem 1.25rem', background: '#2A5A6B', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>
              {publishing ? 'Publishing...' : '🚀 Publish'}
            </button>
          )}
          {status === 'PUBLISHED' && (
            <span style={{ padding: '0.4rem 0.8rem', background: '#2A6B3A', color: '#fff', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>● LIVE</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        {/* Tabs sidebar */}
        <div>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.7rem 1rem', background: tab === t.id ? 'rgba(201,151,26,0.08)' : 'transparent', border: 'none', borderLeft: `2px solid ${tab === t.id ? 'var(--admin-gold)' : 'transparent'}`, color: tab === t.id ? 'var(--admin-gold)' : 'var(--admin-muted)', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', textAlign: 'left', fontWeight: tab === t.id ? 600 : 400, transition: 'all 0.2s' }}
            >
              <span>{t.icon}</span>{t.label}
            </button>
          ))}

          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--admin-border)' }}>
            <button onClick={deleteWedding} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: 'rgba(200,80,80,0.7)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
              🗑️ Delete Invitation
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--admin-text)', fontWeight: 400, marginBottom: '1.75rem' }}>
            {TABS.find(t => t.id === tab)?.icon} {TABS.find(t => t.id === tab)?.label}
          </h2>
          {renderTab()}
        </div>
      </div>
    </div>
  )
}
