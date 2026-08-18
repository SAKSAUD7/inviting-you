'use client'

export default function VelvetIslamicSection() {
  return (
    <section className="velvet-islamic reveal-hidden">
      {/* Arabic Bismillah calligraphy using Unicode */}
      <div className="velvet-islamic__calligraphy" style={{ fontFamily: 'serif', direction: 'rtl' }} aria-label="Bismillah">
        ﷽
      </div>

      <div className="velvet-islamic__ornament" />

      <h2 className="velvet-islamic__title">In The Name Of Allah</h2>
      <p className="velvet-islamic__subtitle">The Most Beneficent &amp; The Most Merciful</p>

      <div className="velvet-islamic__ornament" style={{ marginTop: '2rem' }} />

      {/* Decorative geometric pattern */}
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true"
        style={{ margin: '1rem auto 0', opacity: 0.35 }}>
        <polygon points="40,4 48,28 74,28 53,44 61,68 40,52 19,68 27,44 6,28 32,28" stroke="#C9971A" strokeWidth="1.5" fill="none"/>
        <circle cx="40" cy="40" r="15" stroke="#C9971A" strokeWidth="1" fill="none"/>
        <circle cx="40" cy="40" r="4" fill="#C9971A" opacity="0.6"/>
      </svg>
    </section>
  )
}
