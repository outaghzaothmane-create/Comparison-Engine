import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ToolLogo } from "@/components/ui/tool-logo"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface Item {
    id: string
    name: string
    description: string
    paid_alternative: string
    paid_alternative_slug: string
    license: string
    slug: string
    website_url: string
    category?: string
    stars?: number
    logo?: string
}

export function ComparisonCard({ item }: { item: Item }) {
    return (
        <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            <a
                href={item.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
            >
                <span className="sr-only">Visit {item.name} website</span>
            </a>
            <CardHeader className="pb-3 text-left">
                <div className="flex items-start min-w-0 gap-4">
                    <ToolLogo slug={item.slug} url={item.website_url} customLogo={item.logo} />
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                            <CardTitle className="text-lg font-bold text-white tracking-tight flex-1 min-w-0 pr-2">
                                <span className="truncate block">
                                    {item.name}
                                </span>
                            </CardTitle>
                            <Badge variant="outline" className="border-white/10 text-zinc-400 font-normal shrink-0 max-w-[40%] block truncate">
                                {item.license}
                            </Badge>
                        </div>
                        {item.category && (
                            <p className="text-xs text-blue-400 mt-1 font-medium bg-blue-500/10 block w-fit max-w-full truncate px-2 py-0.5 rounded-md">
                                {item.category}
                            </p>
                        )}
                    </div>
                </div>
                <CardDescription className="text-zinc-400 line-clamp-3 mt-3 text-sm leading-relaxed overflow-hidden text-ellipsis h-[4.5em]">
                    {item.description}
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 pt-0 min-h-0 text-left">
                <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-white/5 text-zinc-400 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap max-w-full truncate block w-fit">
                        vs {item.paid_alternative}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="mt-auto pt-4 flex justify-between items-center gap-2 border-t border-white/5 bg-white/[0.02]">
                <div
                    className="text-sm text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1"
                >
                    Visit Website
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
            </CardFooter>
        </Card>
    )
}
