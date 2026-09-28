import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { weddingTemplates, celebrationTemplates } from '@/data/templates'
import { blogPosts } from '@/data/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://inviting-you-eta.vercel.app'

  // 1. Static Public Pages
  const staticRoutes = [
    '', 
    '/templates', 
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/wedding-invitations',
    '/muslim-wedding-invitations',
    '/islamic-wedding-invitations',
    '/nikah-invitations',
    '/walima-invitations',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Public Template Details Pages (/templates/[id])
  const allTemplates = [...weddingTemplates, ...celebrationTemplates]
  const templateDetailRoutes = allTemplates
    .filter(t => t.demo !== null) // Only include live templates
    .map((template) => ({
      url: `${baseUrl}/templates/${template.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // 3. Public Blog Articles (/blog/[slug])
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modified || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // 4. Public Demo Invitations (/i/[slug])
  // NEVER INCLUDE PRIVATE INVITATIONS HERE!
  const publicDemos = await prisma.wedding.findMany({
    where: {
      visibility: 'PUBLIC_DEMO',
      status: 'PUBLISHED',
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const demoRoutes = publicDemos.map((demo) => ({
    url: `${baseUrl}/i/${demo.slug}`,
    lastModified: demo.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...templateDetailRoutes, ...blogRoutes, ...demoRoutes]
}
