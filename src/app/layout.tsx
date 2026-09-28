import type { Metadata } from 'next'
import '@/styles/globals.css'
import Providers from './Providers'
import PublicAnalytics from '@/components/PublicAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://inviting-you-eta.vercel.app'),
  title: 'Inviting You - Premium Digital Wedding Invitations',
  description: 'Create unforgettable digital wedding invitations with cinematic luxury and elegance.',
  verification: {
    google: 'lwi5-zHj69LaLhdNua0HRbC-TzOK5yYRIn8xcatB59Y',
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
