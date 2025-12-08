import { MetadataRoute } from 'next';
import { getAllCategories, getAllPaidAlternativeSlugs } from '@/lib/data';

const BASE_URL = process.env.BASE_URL || 'https://opensource-alternatives.com';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const categories = getAllCategories();
    const paidAlternativeSlugs = getAllPaidAlternativeSlugs();

    // Category routes
    const categoryRoutes = categories.map((cat) => ({
        url: `${BASE_URL}/category/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Alternative-to routes
    const alternativeRoutes = paidAlternativeSlugs.map((slug) => ({
        url: `${BASE_URL}/alternative-to/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...categoryRoutes,
        ...alternativeRoutes,
    ];
}
