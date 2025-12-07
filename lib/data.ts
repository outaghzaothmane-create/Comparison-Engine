import items from '@/data/items.json';

// --- TYPES ---
export interface Tool {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    paid_alternative: string;
    paid_alternative_slug: string;
    license: string;
    category: string;
    website_url: string;
    stars?: number;
    last_updated?: string;
    logo?: string;
}

export interface Category {
    name: string;
    slug: string;
    count: number;
}

export interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// --- UTILITY ---
function toSlug(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// --- DATA FUNCTIONS ---

/**
 * Get all tools with pagination
 */
export function getAllTools(page: number = 1, limit: number = 20, query: string = ''): PaginatedResult<Tool> {
    let filteredItems = items as Tool[];

    if (query) {
        const lowerQuery = query.toLowerCase().trim();
        filteredItems = filteredItems.filter((item) =>
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.paid_alternative?.toLowerCase().includes(lowerQuery)
        );
    }

    const total = filteredItems.length;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (safePage - 1) * limit;
    const data = filteredItems.slice(startIndex, startIndex + limit);

    return {
        data,
        total,
        page: safePage,
        limit,
        totalPages,
    };
}

/**
 * Get all unique categories with counts
 */
export function getAllCategories(): Category[] {
    const categoryMap = new Map<string, number>();

    for (const item of items) {
        const count = categoryMap.get(item.category) || 0;
        categoryMap.set(item.category, count + 1);
    }

    return Array.from(categoryMap.entries())
        .map(([name, count]) => ({
            name,
            slug: toSlug(name),
            count,
        }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get tools by category slug
 */
export function getToolsByCategory(slug: string): { tools: Tool[]; categoryName: string } | null {
    const categories = getAllCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
        return null;
    }

    const tools = (items as Tool[]).filter(item => toSlug(item.category) === slug);

    return {
        tools,
        categoryName: category.name,
    };
}

/**
 * Search tools by name or description
 */
import Fuse from 'fuse.js';

/**
 * Search tools using Fuzzy Search (Fuse.js)
 */
export function searchTools(query: string): Tool[] {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
        return [];
    }

    const fuseOptions = {
        keys: [
            { name: 'name', weight: 0.4 },
            { name: 'paid_alternative', weight: 0.3 },
            { name: 'description', weight: 0.2 },
            { name: 'category', weight: 0.1 }
        ],
        threshold: 0.4, // Tolerance for typos (0.0 = exact, 1.0 = match anything)
        ignoreLocation: true,
        includeScore: true
    };

    const fuse = new Fuse(items as Tool[], fuseOptions);
    const results = fuse.search(trimmedQuery);

    return results.map(result => result.item);
}

/**
 * Get all tools (for sitemap generation)
 */
export function getAllToolsFlat(): Tool[] {
    return items as Tool[];
}

/**
 * Get unique paid alternative slugs (for sitemap generation)
 */
export function getAllPaidAlternativeSlugs(): string[] {
    const slugs = new Set<string>();
    for (const item of items) {
        slugs.add(item.paid_alternative_slug);
    }
    return Array.from(slugs);
}
