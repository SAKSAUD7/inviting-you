import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/api/'
      ],
    },
    sitemap: 'https://inviting-you-eta.vercel.app/sitemap.xml',
  }
}
