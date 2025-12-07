import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import type { Tool } from '@/lib/data';

import Image from 'next/image';

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    const getLogoUrl = (url: string) => {
        try {
            const hostname = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
        } catch (e) {
            return "/window.svg"; // Fallback URL
        }
    };

    return (
        <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            <Link
                href={`/alternative-to/${tool.paid_alternative_slug}`}
                className="absolute inset-0 z-10"
            >
                <span className="sr-only">View alternatives for {tool.name}</span>
            </Link>
            <CardHeader className="pb-3 text-left">
                <div className="flex items-start gap-4 min-w-0">
                    <div className="relative h-12 w-12 shrink-0 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 overflow-hidden">
                        <Image
                            src={getLogoUrl(tool.website_url)}
                            alt={`${tool.name} logo`}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg font-bold text-white tracking-tight flex-1 min-w-0 pr-2">
                                <span className="truncate block">
                                    {tool.name}
                                </span>
                            </CardTitle>
                            <Badge variant="outline" className="border-white/10 text-zinc-400 font-normal shrink-0 max-w-[40%] block truncate">
                                {tool.license}
                            </Badge>
                        </div>
                        <p className="text-xs text-blue-400 mt-1 font-medium bg-blue-500/10 block w-fit max-w-full truncate px-2 py-0.5 rounded-md">
                            {tool.category}
                        </p>
                    </div>
                </div>
                <CardDescription className="text-zinc-400 line-clamp-3 mt-3 text-sm leading-relaxed overflow-hidden text-ellipsis h-[4.5em]">
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
