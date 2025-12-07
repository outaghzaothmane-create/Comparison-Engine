import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ToolLogo } from '@/components/ui/tool-logo';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Tool } from '@/lib/data';

interface ToolCardProps {
    tool: Tool;
}

function formatStars(count?: number): string {
    if (!count) return '';
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
}

export function ToolCard({ tool }: ToolCardProps) {
    return (
        <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full group relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Link
                href={`/alternative-to/${tool.paid_alternative_slug}`}
                className="absolute inset-0 z-10"
            >
                <span className="sr-only">View alternatives for {tool.name}</span>
            </Link>
            <CardHeader className="pb-3 text-left">
                <div className="flex items-start min-w-0">
                    <ToolLogo slug={tool.slug} url={tool.website_url} customLogo={tool.logo} />
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg font-bold text-white tracking-tight flex-1 min-w-0 pr-2">
                                <span className="truncate block">
                                    {tool.name}
                                </span>
                            </CardTitle>
                            {/* Star Rating Badge */}
                            {tool.stars ? (
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 font-medium shrink-0 flex items-center gap-1 h-6">
                                    <Star className="w-3 h-3 fill-amber-500" />
                                    {formatStars(tool.stars)}
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="border-white/10 text-zinc-400 font-normal shrink-0 max-w-[40%] block truncate">
                                    {tool.license}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-blue-400 font-medium bg-blue-500/10 block w-fit max-w-full truncate px-2 py-0.5 rounded-md">
                                {tool.category}
                            </p>
                            {tool.stars && (
                                <span className="text-xs text-zinc-500 border border-white/5 px-1.5 rounded bg-white/5">
                                    {tool.license}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <CardDescription className="text-zinc-400 line-clamp-2 mt-3 text-sm leading-relaxed overflow-hidden text-ellipsis h-[3em]">
                    {tool.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pt-0 min-h-0 text-left">
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/5 text-zinc-400 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap max-w-full truncate block w-fit">
                        vs {tool.paid_alternative}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="mt-auto pt-4 flex justify-between items-center gap-2 border-t border-white/5 bg-white/[0.02]">
                <div
                    className="text-sm text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1"
                >
                    View alternatives
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </div>
                <a
                    href={tool.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors relative z-20"
                >
                    Visit Site
                    <ArrowUpRight className="w-3 h-3" />
                </a>
            </CardFooter>
        </Card>
    );
}
