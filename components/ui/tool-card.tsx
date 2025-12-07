import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Tool {
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
}

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    // Generate category slug for internal linking
    const categorySlug = tool.category
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return (
        <Link
            href={`/alternative-to/${tool.paid_alternative_slug}`}
            className="group block"
        >
            <article className="h-full bg-zinc-900/50 border border-white/10 rounded-xl p-5 transition-all duration-300 hover:border-blue-500/50 hover:scale-[1.02] hover:bg-zinc-900">
                {/* Top Row: Name + License */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {tool.name}
                    </h3>
                    <Badge
                        variant="outline"
                        className="shrink-0 border-white/10 bg-transparent text-zinc-400 text-xs font-normal"
                    >
                        {tool.license}
                    </Badge>
                </div>

                {/* Middle: Description (2-line clamp) */}
                <p className="text-sm text-zinc-400 line-clamp-2 mb-4 min-h-[2.5rem]">
                    {tool.description}
                </p>

                {/* Bottom Row: Category + vs Paid Alternative */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-md">
                        {tool.category}
                    </span>
                    <span className="bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md">
                        vs {tool.paid_alternative}
                    </span>
                </div>
            </article>
        </Link>
    );
}
