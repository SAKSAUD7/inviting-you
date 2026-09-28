import { Metadata } from 'next'
import { SEO } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Digital Wedding Invitation Templates',
  description: 'Explore premium digital wedding invitation templates for weddings, Nikah and Walima. Preview elegant designs and choose an invitation to personalize.',
  alternates: {
    canonical: '/templates',
  },
  openGraph: {
    title: 'Digital Wedding Invitation Templates | Inviting You',
    description: 'Explore premium digital wedding invitation templates for weddings, Nikah and Walima. Preview elegant designs and choose an invitation to personalize.',
    url: `${SEO.siteUrl}/templates`,
  }
}

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
