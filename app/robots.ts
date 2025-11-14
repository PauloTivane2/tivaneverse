import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://tivaneverse.me/sitemap.xml',
    host: 'https://tivaneverse.me',
  }
}
