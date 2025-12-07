import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories } from '@/lib/data';
import { CategoryCard } from '@/components/category-card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { FolderOpen } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Browse Categories | Open Source Alternatives Directory',
    description: 'Explore open source alternatives by category. Find self-hostable tools for DevOps, Analytics, CRM, Communication, and more.',
};

export default function CategoriesPage() {
    const categories = getAllCategories();
    const totalTools = categories.reduce((sum, cat) => sum + cat.count, 0);

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <div className="bg-gradient-to-b from-zinc-900 to-background border-b border-white/5 py-12 md:py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Categories' },
                        ]}
                    />

                    <div className="mt-6 flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <FolderOpen className="w-7 h-7 text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                Browse by Category
                            </h1>
                            <p className="text-zinc-400 mt-1">
                                {categories.length} categories • {totalTools.toLocaleString()} tools
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {categories.map((category) => (
                        <CategoryCard key={category.slug} category={category} />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto border-t border-white/5 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
                        <p>© 2025 Open Source Directory. All rights reserved.</p>
                        <nav className="flex gap-4">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
                        </nav>
                    </div>
                </div>
            </footer>
        </main>
    );
}
