import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
    stars?: number
}

export function ComparisonCard({ item }: { item: Item }) {
    return (
        <Card className="bg-zinc-900/50 border-white/10 hover:border-white/20 transition-all duration-300">
            <CardHeader>
                <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-bold text-white tracking-tight">
                        {item.name}
                    </CardTitle>
                    <Badge variant="outline" className="border-white/10 text-zinc-400 font-normal">
                        {item.license}
                    </Badge>
                </div>
                <CardDescription className="text-zinc-400 line-clamp-2 mt-1.5 h-10">
                    {item.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <span className="font-medium text-zinc-300">Replaces</span>
                    <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5 text-zinc-300 flex items-center gap-1.5">
                        {item.paid_alternative}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Link
                    href={`/alternative-to/${item.paid_alternative_slug}`}
                    className="group flex items-center gap-1 text-sm font-medium text-white hover:text-blue-400 transition-colors"
                >
                    Compare vs {item.paid_alternative}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </CardFooter>
        </Card>
    )
}
