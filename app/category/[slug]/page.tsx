import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getToolsByCategory, getAllCategories } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FolderOpen, ArrowLeft } from 'lucide-react';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const result = getToolsByCategory(slug);

    if (!result) {
        return { title: 'Category Not Found' };
    }

    return {
        title: `Open Source ${result.categoryName} Tools | ${result.tools.length} Alternatives`,
        description: `Discover ${result.tools.length} open source ${result.categoryName.toLowerCase()} tools. Self-hostable, privacy-focused alternatives to enterprise software.`,
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { slug } = await params;
    const result = getToolsByCategory(slug);

    if (!result) {
        notFound();
    }

    const { tools, categoryName } = result;

    // JSON-LD for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `Open Source ${categoryName} Tools`,
        description: `Collection of ${tools.length} open source ${categoryName.toLowerCase()} tools.`,
        numberOfItems: tools.length,
        mainEntity: {
            '@type': 'ItemList',
            itemListElement: tools.slice(0, 10).map((tool, index) => ({
                '@type': 'SoftwareApplication',
                position: index + 1,
                name: tool.name,
                applicationCategory: categoryName,
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'USD',
                },
            })),
        },
    };

    return (
        <div className="bg-background text-foreground">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero */}
            <div className="bg-gradient-to-b from-zinc-900 to-background border-b border-white/5 py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Categories', href: '/categories' },
                            { label: categoryName },
                        ]}
                    />

                    <Link
                        href="/categories"
                        className="inline-flex items-center text-zinc-400 hover:text-white mt-4 mb-6 transition-colors text-sm"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        All Categories
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <FolderOpen className="w-7 h-7 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {categoryName}
                            </h1>
                            <p className="text-zinc-400 mt-1">
                                {tools.length} open source {tools.length === 1 ? 'tool' : 'tools'} available
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools Grid */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>
            </div>

        </div>
    );
}
