import type { Metadata } from 'next'
import '@/styles/globals.css'
import Providers from './Providers'
import PublicAnalytics from '@/components/PublicAnalytics'

import { SEO } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.defaultTitle,
    template: `%s | ${SEO.siteName}`
  },
  description: SEO.defaultDescription,
  verification: {
    google: 'lwi5-zHj69LaLhdNua0HRbC-TzOK5yYRIn8xcatB59Y',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    url: SEO.siteUrl,
    siteName: SEO.siteName,
    images: [{ url: SEO.defaultOgImage, width: 1200, height: 630, alt: 'Inviting You - Digital Wedding Invitations' }],
    locale: SEO.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO.defaultTitle,
    description: SEO.defaultDescription,
    images: [SEO.defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <PublicAnalytics />
      </body>
    </html>
  )
}
