'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAllTemplates } from '@/templates/registry'
import Link from 'next/link'

type Step = 'basics' | 'couple' | 'family' | 'events' | 'music' | 'rsvp' | 'template' | 'publish'

const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 'basics', label: 'Basics', icon: '📋' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧' },
  { id: 'events', label: 'Events', icon: '📅' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'rsvp', label: 'RSVP', icon: '✅' },
  { id: 'template', label: 'Template', icon: '🎨' },
  { id: 'publish', label: 'Publish', icon: '🚀' },
]

interface EventForm {
  name: string; type: string; date: string; timeDisplay: string
  description: string; venueName: string; venueAddress: string; mapsUrl: string
}

const defaultEvent: EventForm = {
  name: '', type: 'NIKAH', date: '', timeDisplay: '',
  description: '', venueName: '', venueAddress: '', mapsUrl: '',
}

export default function NewWeddingPage() {
  const router = useRouter()
  const templates = getAllTemplates()
  const [step, setStep] = useState<Step>('basics')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdId, setCreatedId] = useState<string | null>(null)

  // Form state
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
  const [islamicVerse, setIslamicVerse] = useState('In the Name of Allah\nthe Most Gracious the Most Merciful')
  const [invitationMsg, setInvitationMsg] = useState('Request the honour of your gracious presence at the Nikah Ceremony of their beloved daughter')

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
  const [events, setEvents] = useState<EventForm[]>([{ ...defaultEvent }])

  // Music
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [musicTitle, setMusicTitle] = useState('')
  const [musicUrl, setMusicUrl] = useState('')

  // RSVP
  const [rsvpEnabled, setRsvpEnabled] = useState(true)
  const [rsvpMsg, setRsvpMsg] = useState('We would be honoured by your presence. Please let us know if you can attend.')

  const loadSampleData = () => {
    setTitle('Iqra & Mohammed Mufassir')
    setSlug('iqra-mufassir')
    setTemplateId('velvet')
    setBrideName('Iqra Bismi')
    setBrideQual('B.Com')
    setGroomName('Mohammed Mufassir')
    setGroomQual('B.Sc')
    setGregorianDate('2026-10-02')
    setGregorianDisplay('Friday, 2 October 2026')
    setHijriDate('20th Jamadu Al Awal 1448 Hijri')
    setBrideParents('Mrs. & Mr. Mohammed Asif')
    setBridePGF('Janab Haji Abdul Rasheed Saheb')
    setBrideMGF('Late Janab Mohammed Ismail Shariff Saheb')
    setGroomFather('Nawaz Ahmed')
    setGroomPGF('Late Janab Abdul Wahab Saheb')
    setGroomMGF('Late Janab Syed Yusuf Saheb')
    setFromName('Mrs. & Mr. Mohammed Asif')
    setFromOrg('New Unique Collection')
    setFromAddress('Diamond Plaza, Commercial Street, Shivajinagar, Bangalore')
    setFromPhone('9739700723')
    setEvents([
      { name: 'INSHA ALLAH Mehfil-e-Nikah', type: 'NIKAH', date: '2026-10-02', timeDisplay: '5:00 PM', description: 'After Namaz-e-Asar', venueName: 'Khadriya Masjid', venueAddress: 'Millers Road, Benson Town, Bangalore', mapsUrl: '' },
      { name: 'Dinner', type: 'RECEPTION', date: '2026-10-02', timeDisplay: '8:00 PM onwards', description: '', venueName: 'CMA Royal', venueAddress: '#72/1, Thanisandra Main Road, Near Uqba Masjid, Near Elements Mall, Bengaluru – 560077', mapsUrl: '' },
    ])
    setMusicTitle('Wedding Nasheed')
    setMusicUrl('/assets/audio/velvet-bgm.mp3')
  }

  const addEvent = () => setEvents([...events, { ...defaultEvent }])
  const removeEvent = (i: number) => setEvents(events.filter((_, idx) => idx !== i))
  const updateEvent = (i: number, field: keyof EventForm, val: string) => {
    const copy = [...events]
    copy[i] = { ...copy[i], [field]: val }
    setEvents(copy)
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  const handleCreate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/weddings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title, slug, templateId, status,
          couple: { brideName, brideQualification: brideQual, groomName, groomQualification: groomQual, gregorianDate: gregorianDate ? new Date(gregorianDate) : null, gregorianDisplay, hijriDate, islamicVerse, invitationMessage: invitationMsg },
          family: { brideParents, bridePaternalGrandfather: bridePGF, brideMaternalGrandfather: brideMGF, groomFather, groomPaternalGrandfather: groomPGF, groomMaternalGrandfather: groomMGF, invitationFromName: fromName, invitationFromOrg: fromOrg, invitationFromAddress: fromAddress, invitationFromPhone: fromPhone },
          events: events.map((e, i) => ({ ...e, order: i + 1, enabled: true, date: e.date ? new Date(e.date + 'T00:00:00Z') : null })),
          music: musicEnabled ? { title: musicTitle, url: musicUrl, enabled: true } : undefined,
          rsvpConfig: { enabled: rsvpEnabled, message: rsvpMsg },
        }),
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed')
      }
      const data = await res.json()
      setCreatedId(data.id)
      setStep('publish')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', background: 'var(--admin-bg)',
    border: '1px solid var(--admin-border)', color: 'var(--admin-text)',
    borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'var(--font-sans)',
    outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.4rem', fontSize: '0.78rem',
    textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--admin-muted)', fontWeight: 600,
  }
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0.4rem' }
  const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }

  const renderStep = () => {
    switch (step) {
      case 'basics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={loadSampleData} style={{ padding: '0.5rem 1rem', background: 'rgba(201,151,26,0.1)', color: 'var(--admin-gold)', border: '1px solid var(--admin-gold)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                Load Sample Data
              </button>
              <button onClick={() => {
                const data = prompt('Paste your complete wedding details JSON here:')
                if (data) {
                  try {
                    const parsed = JSON.parse(data)
                    // Basics
                    if (parsed.title) setTitle(parsed.title)
                    if (parsed.slug) setSlug(parsed.slug)
                    if (parsed.templateId) setTemplateId(parsed.templateId)
                    if (parsed.status) setStatus(parsed.status)
                    
                    // Couple
                    if (parsed.couple) {
                      if (parsed.couple.brideName) setBrideName(parsed.couple.brideName)
                      if (parsed.couple.brideQualification) setBrideQual(parsed.couple.brideQualification)
                      if (parsed.couple.groomName) setGroomName(parsed.couple.groomName)
                      if (parsed.couple.groomQualification) setGroomQual(parsed.couple.groomQualification)
                      if (parsed.couple.gregorianDate) setGregorianDate(parsed.couple.gregorianDate)
                      if (parsed.couple.gregorianDisplay) setGregorianDisplay(parsed.couple.gregorianDisplay)
                      if (parsed.couple.hijriDate) setHijriDate(parsed.couple.hijriDate)
                      if (parsed.couple.islamicVerse) setIslamicVerse(parsed.couple.islamicVerse)
                      if (parsed.couple.invitationMessage) setInvitationMsg(parsed.couple.invitationMessage)
                    }

                    // Family
                    if (parsed.family) {
                      if (parsed.family.brideParents) setBrideParents(parsed.family.brideParents)
                      if (parsed.family.bridePaternalGrandfather) setBridePGF(parsed.family.bridePaternalGrandfather)
                      if (parsed.family.brideMaternalGrandfather) setBrideMGF(parsed.family.brideMaternalGrandfather)
                      if (parsed.family.groomFather) setGroomFather(parsed.family.groomFather)
                      if (parsed.family.groomPaternalGrandfather) setGroomPGF(parsed.family.groomPaternalGrandfather)
                      if (parsed.family.groomMaternalGrandfather) setGroomMGF(parsed.family.groomMaternalGrandfather)
                      if (parsed.family.invitationFromName) setFromName(parsed.family.invitationFromName)
                      if (parsed.family.invitationFromOrg) setFromOrg(parsed.family.invitationFromOrg)
                      if (parsed.family.invitationFromAddress) setFromAddress(parsed.family.invitationFromAddress)
                      if (parsed.family.invitationFromPhone) setFromPhone(parsed.family.invitationFromPhone)
                    }

                    // Events
                    if (parsed.events && Array.isArray(parsed.events)) {
                      setEvents(parsed.events.map((e: any) => ({
                        name: e.name || '',
                        type: e.type || 'CUSTOM',
                        date: e.date || '',
                        timeDisplay: e.timeDisplay || '',
                        description: e.description || '',
                        venueName: e.venueName || '',
                        venueAddress: e.venueAddress || '',
                        mapsUrl: e.mapsUrl || ''
                      })))
                    }

                    // Music
                    if (parsed.music) {
                      if (parsed.music.enabled !== undefined) setMusicEnabled(parsed.music.enabled)
                      if (parsed.music.title) setMusicTitle(parsed.music.title)
                      if (parsed.music.url) setMusicUrl(parsed.music.url)
                    }

                    // RSVP
                    if (parsed.rsvpConfig) {
                      if (parsed.rsvpConfig.enabled !== undefined) setRsvpEnabled(parsed.rsvpConfig.enabled)
                      if (parsed.rsvpConfig.message) setRsvpMsg(parsed.rsvpConfig.message)
                    }

                    alert('All data imported successfully!')
                  } catch (e) {
                    alert('Invalid JSON format. Please ensure it is properly formatted.')
                  }
                }
              }} style={{ padding: '0.5rem 1rem', background: 'transparent', color: 'var(--admin-muted)', border: '1px solid var(--admin-border)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                Quick Import JSON
              </button>
            </div>
            
            <div style={fieldStyle}>
              <label style={labelStyle}>Wedding Title</label>
              <input style={inputStyle} value={title} onChange={(e) => { setTitle(e.target.value); setSlug(e.target.value.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')) }} placeholder="e.g. Asfiya & Zuhaib" />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Public URL Slug</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--admin-muted)', fontSize: '0.85rem', flexShrink: 0 }}>/i/</span>
                <input style={{ ...inputStyle, flex: 1 }} value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="asfiya-zuhaib" />
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="DRAFT">Draft</option>
                <option value="CLIENT_REVIEW">Client Review</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>
        )

      case 'couple':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Bride</h3>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Bride Name</label><input style={inputStyle} value={brideName} onChange={(e) => setBrideName(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Qualification</label><input style={inputStyle} value={brideQual} onChange={(e) => setBrideQual(e.target.value)} placeholder="B.Com" /></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Groom</h3>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Groom Name</label><input style={inputStyle} value={groomName} onChange={(e) => setGroomName(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Qualification</label><input style={inputStyle} value={groomQual} onChange={(e) => setGroomQual(e.target.value)} placeholder="B.Sc" /></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Date</h3>
              <div style={gridStyle}>
                <div style={fieldStyle}><label style={labelStyle}>Wedding Date</label><input style={inputStyle} type="date" value={gregorianDate} onChange={(e) => setGregorianDate(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Display Format</label><input style={inputStyle} value={gregorianDisplay} onChange={(e) => setGregorianDisplay(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Hijri Date</label><input style={inputStyle} value={hijriDate} onChange={(e) => setHijriDate(e.target.value)} /></div>
              </div>
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Islamic Verse / Opening</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={islamicVerse} onChange={(e) => setIslamicVerse(e.target.value)} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Invitation Message</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={invitationMsg} onChange={(e) => setInvitationMsg(e.target.value)} />
            </div>
          </div>
        )

      case 'family':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Bride's Family</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Parents</label><input style={inputStyle} value={brideParents} onChange={(e) => setBrideParents(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Paternal Grandfather</label><input style={inputStyle} value={bridePGF} onChange={(e) => setBridePGF(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Bride's Maternal Grandfather</label><input style={inputStyle} value={brideMGF} onChange={(e) => setBrideMGF(e.target.value)} /></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Groom's Family</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Father</label><input style={inputStyle} value={groomFather} onChange={(e) => setGroomFather(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Paternal Grandfather</label><input style={inputStyle} value={groomPGF} onChange={(e) => setGroomPGF(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Groom's Maternal Grandfather</label><input style={inputStyle} value={groomMGF} onChange={(e) => setGroomMGF(e.target.value)} /></div>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400, fontSize: '1.2rem' }}>Invitation From</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={gridStyle}>
                  <div style={fieldStyle}><label style={labelStyle}>Name</label><input style={inputStyle} value={fromName} onChange={(e) => setFromName(e.target.value)} /></div>
                  <div style={fieldStyle}><label style={labelStyle}>Organisation / Business</label><input style={inputStyle} value={fromOrg} onChange={(e) => setFromOrg(e.target.value)} /></div>
                </div>
                <div style={fieldStyle}><label style={labelStyle}>Address</label><input style={inputStyle} value={fromAddress} onChange={(e) => setFromAddress(e.target.value)} /></div>
                <div style={fieldStyle}><label style={labelStyle}>Phone</label><input style={inputStyle} value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} /></div>
              </div>
            </div>
          </div>
        )

      case 'events':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {events.map((ev, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--admin-border)', borderRadius: '6px', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', fontSize: '1rem', fontWeight: 400 }}>Event {i + 1}</span>
                  {events.length > 1 && (
                    <button onClick={() => removeEvent(i)} style={{ background: 'none', border: 'none', color: 'var(--admin-muted)', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={gridStyle}>
                    <div style={fieldStyle}><label style={labelStyle}>Event Name</label><input style={inputStyle} value={ev.name} onChange={(e) => updateEvent(i, 'name', e.target.value)} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Type</label>
                      <select style={inputStyle} value={ev.type} onChange={(e) => updateEvent(i, 'type', e.target.value)}>
                        {['NIKAH','RECEPTION','MEHENDI','SANGEET','WALIMA','ENGAGEMENT','CUSTOM'].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div style={fieldStyle}><label style={labelStyle}>Date</label><input style={inputStyle} type="date" value={ev.date} onChange={(e) => updateEvent(i, 'date', e.target.value)} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Time</label><input style={inputStyle} value={ev.timeDisplay} onChange={(e) => updateEvent(i, 'timeDisplay', e.target.value)} placeholder="5:00 PM" /></div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>Description (optional)</label><input style={inputStyle} value={ev.description} onChange={(e) => updateEvent(i, 'description', e.target.value)} placeholder="After Namaz-e-Asar" /></div>
                  <div style={gridStyle}>
                    <div style={fieldStyle}><label style={labelStyle}>Venue Name</label><input style={inputStyle} value={ev.venueName} onChange={(e) => updateEvent(i, 'venueName', e.target.value)} /></div>
                    <div style={fieldStyle}><label style={labelStyle}>Google Maps URL</label><input style={inputStyle} value={ev.mapsUrl} onChange={(e) => updateEvent(i, 'mapsUrl', e.target.value)} /></div>
                  </div>
                  <div style={fieldStyle}><label style={labelStyle}>Venue Address</label><input style={inputStyle} value={ev.venueAddress} onChange={(e) => updateEvent(i, 'venueAddress', e.target.value)} /></div>
                </div>
              </div>
            ))}
            <button onClick={addEvent} style={{ padding: '0.75rem', background: 'transparent', border: '1px dashed var(--admin-border)', color: 'var(--admin-gold)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', transition: 'border-color 0.2s' }}>
              + Add Another Event
            </button>
          </div>
        )

      case 'music':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="musicEnabled" checked={musicEnabled} onChange={(e) => setMusicEnabled(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="musicEnabled" style={{ cursor: 'pointer', fontSize: '0.95rem' }}>Enable background music</label>
            </div>
            {musicEnabled && (
              <>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Track Title</label>
                  <input style={inputStyle} value={musicTitle} onChange={(e) => setMusicTitle(e.target.value)} placeholder="e.g. Ya Nabi Salam Alayka" />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Audio URL (direct link to MP3)</label>
                  <input style={inputStyle} value={musicUrl} onChange={(e) => setMusicUrl(e.target.value)} placeholder="https://..." />
                  <p style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginTop: '0.4rem' }}>
                    Upload audio to a file host and paste the direct URL here, or use a local path like `/assets/audio/velvet-bgm.mp3`.
                  </p>
                </div>
              </>
            )}
          </div>
        )

      case 'rsvp':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="rsvpEnabled" checked={rsvpEnabled} onChange={(e) => setRsvpEnabled(e.target.checked)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="rsvpEnabled" style={{ cursor: 'pointer', fontSize: '0.95rem' }}>Enable RSVP collection</label>
            </div>
            {rsvpEnabled && (
              <div style={fieldStyle}>
                <label style={labelStyle}>RSVP Message</label>
                <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={rsvpMsg} onChange={(e) => setRsvpMsg(e.target.value)} />
              </div>
            )}
          </div>
        )

      case 'template':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {templates.map((t) => (
              <div
                key={t.id}
                onClick={() => setTemplateId(t.id)}
                style={{
                  border: `2px solid ${templateId === t.id ? 'var(--admin-gold)' : 'var(--admin-border)'}`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                  background: templateId === t.id ? 'rgba(201,151,26,0.05)' : 'transparent',
                }}
              >
                <div style={{ height: 120, background: t.id === 'velvet' ? 'linear-gradient(135deg, #3D0A0A, #1A0404)' : 'linear-gradient(135deg, #FFFEF9, #F8F3E8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: t.id === 'velvet' ? '#C9971A' : '#C9A96E' }}>{t.name}</span>
                </div>
                <div style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-text)' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--admin-muted)', marginTop: '0.2rem' }}>{t.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'publish':
        if (createdId) {
          return (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--admin-gold)', marginBottom: '1rem', fontWeight: 400 }}>Invitation Created!</h2>
              <p style={{ color: 'var(--admin-muted)', marginBottom: '2rem' }}>Your invitation has been saved. Visit the live URL or edit further.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`/i/${slug}`} target="_blank" style={{ padding: '0.9rem 2rem', background: 'var(--admin-gold)', color: 'var(--admin-bg)', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  View Live Invitation ↗
                </Link>
                <Link href="/admin/dashboard" style={{ padding: '0.9rem 2rem', background: 'transparent', color: 'var(--admin-text)', border: '1px solid var(--admin-border)', borderRadius: '4px', textDecoration: 'none', fontSize: '0.875rem' }}>
                  Back to Dashboard
                </Link>
              </div>
            </div>
          )
        }
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(201,151,26,0.05)', border: '1px solid rgba(201,151,26,0.2)', borderRadius: '8px', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', marginBottom: '0.75rem', fontWeight: 400 }}>Review Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--admin-muted)' }}>
                <div><strong style={{ color: 'var(--admin-text)' }}>Title:</strong> {title}</div>
                <div><strong style={{ color: 'var(--admin-text)' }}>URL:</strong> /i/{slug}</div>
                <div><strong style={{ color: 'var(--admin-text)' }}>Template:</strong> {templateId}</div>
                <div><strong style={{ color: 'var(--admin-text)' }}>Couple:</strong> {brideName} & {groomName}</div>
                <div><strong style={{ color: 'var(--admin-text)' }}>Events:</strong> {events.length}</div>
                <div><strong style={{ color: 'var(--admin-text)' }}>RSVP:</strong> {rsvpEnabled ? 'Enabled' : 'Disabled'}</div>
              </div>
            </div>

            {error && <p style={{ color: 'var(--admin-error)', fontSize: '0.875rem', background: 'rgba(139,26,26,0.1)', padding: '0.75rem', borderRadius: '4px' }}>{error}</p>}

            <button
              onClick={handleCreate}
              disabled={loading}
              style={{ padding: '1rem', background: loading ? 'var(--admin-muted)' : 'var(--admin-gold)', color: 'var(--admin-bg)', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            >
              {loading ? 'Creating Invitation...' : '🚀 Create Invitation'}
            </button>
          </div>
        )
    }
  }

  return (
    <div style={{ maxWidth: '900px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--admin-gold)', fontWeight: 400, marginBottom: '0.25rem' }}>
          New Invitation
        </h1>
        <p style={{ color: 'var(--admin-muted)', fontSize: '0.9rem' }}>Complete each step to build a personalised digital wedding invitation.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
        {/* Step sidebar */}
        <div>
          {STEPS.map((s, i) => {
            const isCurrent = s.id === step
            const isDone = i < stepIndex
            return (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  width: '100%', padding: '0.7rem 1rem', background: isCurrent ? 'rgba(201,151,26,0.08)' : 'transparent',
                  border: 'none', borderLeft: `2px solid ${isCurrent ? 'var(--admin-gold)' : 'transparent'}`,
                  color: isCurrent ? 'var(--admin-gold)' : isDone ? 'var(--admin-text)' : 'var(--admin-muted)',
                  cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', textAlign: 'left',
                  fontWeight: isCurrent ? 600 : 400, transition: 'all 0.2s',
                }}
              >
                <span>{isDone ? '✓' : s.icon}</span>
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Step content */}
        <div>
          <div style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '2rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--admin-text)', fontWeight: 400, marginBottom: '1.5rem' }}>
              {STEPS[stepIndex]?.icon} {STEPS[stepIndex]?.label}
            </h2>
            {renderStep()}
          </div>

          {/* Navigation */}
          {step !== 'publish' && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(STEPS[Math.max(0, stepIndex - 1)].id)}
                disabled={stepIndex === 0}
                style={{ padding: '0.7rem 1.5rem', background: 'transparent', border: '1px solid var(--admin-border)', color: 'var(--admin-muted)', borderRadius: '4px', cursor: stepIndex === 0 ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', opacity: stepIndex === 0 ? 0.4 : 1 }}
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(STEPS[Math.min(STEPS.length - 1, stepIndex + 1)].id)}
                style={{ padding: '0.7rem 1.5rem', background: 'var(--admin-gold)', border: 'none', color: 'var(--admin-bg)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.875rem', fontWeight: 600 }}
              >
                {stepIndex === STEPS.length - 2 ? 'Review →' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
