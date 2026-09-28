'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

export default function PublicAnalytics() {
  const pathname = usePathname()

  // Only track public marketing pages. 
  // Exclude admin dashboard and private client invitations.
  const isPublic = pathname && !pathname.startsWith('/admin') && !pathname.startsWith('/i/')

  if (!isPublic) {
    return null
  }

  return <GoogleAnalytics gaId="G-GB8N3V9F47" />
}
