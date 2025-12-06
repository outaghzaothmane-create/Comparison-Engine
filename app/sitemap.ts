import { MetadataRoute } from 'next'
import items from '@/data/items.json'

const BASE_URL = process.env.Base_URL || 'https://opensource-alternatives.com'

export default function sitemap(): MetadataRoute.Sitemap {
    // Get unique paid tools
    const uniqueSlugs = Array.from(new Set(items.map((item) => item.paid_alternative_slug)))

    const alternativeRoutes = uniqueSlugs.map((slug) => ({
        url: `${BASE_URL}/alternative-to/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...alternativeRoutes,
    ]
}
