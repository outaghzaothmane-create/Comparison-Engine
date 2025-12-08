import { Search } from "lucide-react"
import { SearchBar } from "@/components/ui/search-bar"

export function SearchHero() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-24 px-4 text-center relative overflow-visible">
            {/* Animated pulsing radial gradient background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] animate-pulse [animation-duration:4s]" />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold tracking-tighter text-white md:text-5xl lg:text-6xl animate-float">
                    Find <span className="text-blue-400 text-glow">Open Source</span> Alternatives
                </h1>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed md:text-lg md:max-w-2xl">
                    Stop paying for enterprise SaaS. Discover free, self-hostable tools that respect your privacy and data.
                </p>

                <div className="relative w-full max-w-[90%] md:max-w-lg mx-auto mt-8 group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/50 to-purple-600/50 rounded-xl opacity-30 group-hover:opacity-60 transition duration-500 blur-xl" />
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-1.5 flex items-center shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] ring-1 ring-transparent focus-within:ring-blue-500/50 transition-all duration-300">
                        <Search className="absolute left-5 w-5 h-5 text-zinc-400" />
                        <SearchBar
                            placeholder="Find an alternative to Slack, Jira, Docker..."
                            className="pl-12 h-14 w-full bg-transparent border-none text-white placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 text-base rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
