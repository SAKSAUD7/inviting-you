import type { Metadata } from 'next'
import '@/styles/globals.css'
import Providers from './Providers'

export const metadata: Metadata = {
  title: 'Inviting You - Premium Digital Wedding Invitations',
  description: 'Create unforgettable digital wedding invitations with cinematic luxury and elegance.',
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
      </body>
    </html>
  )
}
