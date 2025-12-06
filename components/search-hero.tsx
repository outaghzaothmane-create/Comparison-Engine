import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchHero() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24 px-4 text-center bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                    Find <span className="text-blue-400">Open Source</span> Alternatives
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                    Stop paying for enterprise SaaS. Discover free, self-hostable tools that respect your privacy and data.
                </p>

                <div className="relative w-full max-w-lg mx-auto mt-8 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 group-hover:opacity-40 transition duration-500 blur-lg" />
                    <div className="relative bg-zinc-950 rounded-lg p-1 flex items-center shadow-xl">
                        <Search className="absolute left-4 w-5 h-5 text-zinc-500" />
                        <Input
                            placeholder="Find an alternative to Slack, Jira, Docker..."
                            className="pl-11 h-12 bg-transparent border-transparent text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
