import type { MetadataRoute } from 'next'
import { parseStringPromise } from 'xml2js'

// Ensure Node.js runtime (xml2js relies on Node APIs)
export const runtime = 'nodejs'
// Revalidate daily when running in dynamic contexts (doesn't affect static export)
export const revalidate = 86400

type WpImage = { 'image:loc': string[] }
type WpUrlEntry = {
  loc: string[]
  lastmod: string[]
  'image:image'?: WpImage[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Resolve base URL de forma segura para evitar exceções em build/export
  const envSite =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'http://localhost:3000'
  const siteBase = envSite.replace(/\/$/, '')

  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
  const wpSitemapUrl = apiBase ? `${apiBase}/post/sitemap` : ''

  let wpUrls: Array<{ url: string; lastModified: string; images: string[] }> = []

  try {
    if (wpSitemapUrl) {
      const response = await fetch(wpSitemapUrl)
      if (!response.ok) throw new Error(`Failed to fetch WP sitemap: ${response.status}`)
      const xmlData = await response.text()

      const trimmedXml = xmlData.trim()

      if (!trimmedXml.includes('<?xml') || !trimmedXml.includes('<urlset')) {
        console.error('Invalid XML response:', xmlData.substring(0, 200)) // Log only first 200 chars
      } else {
        const parsedXml = await parseStringPromise(xmlData, {
          trim: true,
          explicitArray: true,
          normalizeTags: true,
          strict: false // be more lenient with XML parsing
        })

        if (parsedXml?.urlset?.url) {
          wpUrls = (parsedXml.urlset.url as WpUrlEntry[]).map((item) => {
            const images: string[] = []

            const imgArr = Array.isArray(item['image:image']) ? item['image:image'] : []
            imgArr.forEach((image) => {
              if (Array.isArray(image['image:loc'])) images.push(...image['image:loc'])
            })

            return {
              url: item.loc?.[0] || '',
              lastModified: item.lastmod?.[0] || new Date().toISOString(),
              images
            }
          })
        }
      }
    }
  } catch (error) {
    console.error('Erro ao buscar ou parsear o sitemap do WordPress:', error)
  }

  const nextPages: MetadataRoute.Sitemap[number][] = [
    {
      url: `${siteBase}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
      // images: [],
    },
    {
      url: `${siteBase}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // images: ['https://seusite.com/image-sobre.jpg'],
    },
    {
      url: `${siteBase}/termos-de-uso`,
      lastModified: new Date('2025-09-19'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteBase}/politica-de-privacidade`,
      lastModified: new Date('2025-09-19'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  const wpEntries: MetadataRoute.Sitemap[number][] = wpUrls.map(item => {
    const regex = new RegExp(`^https?:\/\/(www\.)?${process.env.POST_SITEMAP_DOMAIN || ''}\/`)
    let url = item.url.replace(regex, `${siteBase}/`)
    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://');
    }

    return {
      url,
      lastModified: item.lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
      images: item.images,
    }
  })

  const combinedSitemap: MetadataRoute.Sitemap = [
    ...nextPages,
    ...wpEntries,
  ]

  return combinedSitemap
}
