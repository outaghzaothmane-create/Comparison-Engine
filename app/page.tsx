import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllTools } from '@/lib/data';
import { ToolCard } from '@/components/tool-card';
import { Pagination } from '@/components/pagination';
import { SearchHero } from '@/components/search-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Open Source Alternatives to Enterprise SaaS | Find Free Tools',
  description: 'Discover 1000+ open source alternatives to expensive enterprise software. Self-hostable, privacy-focused replacements for Slack, Notion, Jira, and more.',
};

// ... existing imports ...

export default async function Home() {
  const currentPage = 1;
  const query = '';
  const { data: tools, total, page, totalPages } = getAllTools(currentPage, 20, query);

  return (
    <div className="flex flex-col bg-black text-white">
      <SearchHero />

      <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-20 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }]} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">
              Open Source Tools
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              Self-hostable alternatives to enterprise software
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/categories"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Browse by category →
            </Link>
            <span className="text-sm text-zinc-500">
              Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, total)} of {total} tools
            </span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8 mb-12">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Pagination - Disabled for Static Export */}
        {/* <Suspense fallback={<div className="h-10" />}>
          <Pagination currentPage={page} totalPages={totalPages} />
        </Suspense> */}
        <div className="flex justify-center mt-8">
          <Link href="/categories" className="px-6 py-2 rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors text-sm text-zinc-400">
            View All Categories
          </Link>
        </div>
      </div>

    </div>
  );
}
