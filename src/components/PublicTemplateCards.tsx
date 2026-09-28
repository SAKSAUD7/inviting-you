'use client'

import Link from 'next/link'
import { trackEvent } from '@/lib/analytics'
import { weddingTemplates } from '@/data/templates'

const WA_NUMBER = '917411091256'
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

export default function PublicTemplateCards({ limit }: { limit?: number }) {
  const templates = limit ? weddingTemplates.slice(0, limit) : weddingTemplates

  return (
    <div className="iy-template-grid">
      {templates.map((t, i) => {
        const isLive = t.demo !== null

        if (!isLive) {
          return (
            <div key={t.id} className="iy-tpl-card-soon-thin iy-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="iy-tpl-card-soon-thin__name">{t.name}</span>
              <span className="iy-tpl-card-soon-thin__badge">Coming Soon</span>
            </div>
          )
        }

        return (
          <div key={t.id} className={`iy-tpl-card iy-fade-in ${t.themeClass} iy-tpl-card--live`} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="iy-tpl-card__preview">
              {t.previewImg && <img src={t.previewImg} alt={`${t.name} digital wedding invitation template`} />}
              <div className="iy-tpl-card__overlay">
                <Link href={t.demo!} target="_blank" className="iy-tpl-card__overlay-btn" onClick={() => trackEvent('template_demo_view', { template_name: t.name, template_slug: t.id })}>
                  <span>Experience</span><span>→</span>
                </Link>
                <Link href={`/templates/${t.id}`} className="iy-tpl-card__overlay-btn iy-tpl-card__overlay-btn--outline">
                  <span>View Details</span><span>→</span>
                </Link>
              </div>
              <div className="iy-tpl-card__live">{t.badge}</div>
            </div>

            <div className="iy-tpl-card__body">
              <h3 className="iy-tpl-card__name">{t.name}</h3>
              <p className="iy-tpl-card__sub">{t.tagline}</p>

              <div className="iy-tpl-card__price">
                <span>₹{t.price.toLocaleString('en-IN')}</span>
              </div>

              <div className="iy-tpl-card__actions">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                  <Link
                    href={`/templates/${t.id}`}
                    className="iy-tpl-card__action iy-tpl-card__action--outline"
                    style={{ justifyContent: 'center' }}
                  >
                    Details
                  </Link>
                  <a
                    href={waLink(`Hi! I love the ${t.name} template. I want to order it for my wedding.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="iy-tpl-card__action"
                    style={{ justifyContent: 'center' }}
                    onClick={() => { trackEvent('whatsapp_click', { location: 'template_card', template_name: t.name, template_slug: t.id, cta_text: 'Order Now' }); trackEvent('order_cta_click', { location: 'template_card', template_name: t.name, template_slug: t.id, cta_text: 'Order Now' }); }}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
