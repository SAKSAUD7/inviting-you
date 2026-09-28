import { Metadata } from 'next'
import { SEO } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact Us | Inviting You',
  description: 'Get in touch with Inviting You to order your personalized digital wedding invitation, request custom designs, or ask questions.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Inviting You',
    description: 'Get in touch with Inviting You to order your personalized digital wedding invitation, request custom designs, or ask questions.',
    url: `${SEO.siteUrl}/contact`,
  }
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
