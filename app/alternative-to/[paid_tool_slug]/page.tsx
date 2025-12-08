import { Metadata } from "next"
import Link from "next/link" // Ensure Link is imported if used
import { ArrowLeft, Check, Shield, Server, Coins } from "lucide-react"
import items from "@/data/items.json"
import { ComparisonCard } from "@/components/comparison-card"

interface PageProps {
    params: Promise<{
        paid_tool_slug: string
    }>
}

export async function generateStaticParams() {
    const uniqueSlugs = Array.from(new Set(items.map((item) => item.paid_alternative_slug)))
    return uniqueSlugs.map((slug) => ({
        paid_tool_slug: slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { paid_tool_slug } = await params
    const alternatives = items.filter((item) => item.paid_alternative_slug === paid_tool_slug)

    if (alternatives.length === 0) {
        return {
            title: "Page Not Found",
        }
    }

    const paidToolName = alternatives[0].paid_alternative
    const firstAlt = alternatives[0].name

    return {
        title: `Top Open Source ${paidToolName} Alternatives in 2025`,
        description: `Stop paying for ${paidToolName}. Discover free, self-hostable alternatives like ${firstAlt} that respect your privacy.`,
    }
}

export default async function ComparisonPage({ params }: PageProps) {
    const { paid_tool_slug } = await params
    const alternatives = items.filter((item) => item.paid_alternative_slug === paid_tool_slug)

    if (alternatives.length === 0) {
        return <div className="p-20 text-center">Software not found.</div>
    }

    const paidToolName = alternatives[0].paid_alternative

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": `Open Source Alternatives to ${paidToolName}`,
        "description": `List of open source alternatives to ${paidToolName}.`,
        "mainEntity": alternatives.map(item => ({
            "@type": "SoftwareApplication",
            "name": item.name,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        }))
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="bg-gradient-to-b from-zinc-900 to-background border-b border-white/5 py-12 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
                <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
                    <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors text-sm hover:-translate-x-1 duration-200">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
                    </Link>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Open Source Alternatives to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-glow">{paidToolName}</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
                        Compare the best self-hostable, privacy-focused replacements for {paidToolName}.
                    </p>

                    {/* Visual Comparison Table */}
                    <div className="max-w-3xl mx-auto bg-zinc-950/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-2 text-sm">
                            <div className="p-4 border-b border-r border-white/10 bg-white/5 font-semibold text-zinc-300 text-center">
                                {paidToolName} (Paid)
                            </div>
                            <div className="p-4 border-b border-white/10 bg-blue-500/10 font-bold text-blue-400 text-center">
                                Open Source Styling
                            </div>

                            <div className="p-4 border-b border-r border-white/10 text-zinc-400 flex items-center justify-center gap-2">
                                <span>$$$ / month</span>
                            </div>
                            <div className="p-4 border-b border-white/10 text-white flex items-center justify-center gap-2 bg-blue-500/5">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Free & Self-Hosted</span>
                            </div>

                            <div className="p-4 border-b border-r border-white/10 text-zinc-400 flex items-center justify-center gap-2">
                                <span>Closed Source</span>
                            </div>
                            <div className="p-4 border-b border-white/10 text-white flex items-center justify-center gap-2 bg-blue-500/5">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>Full Code Access</span>
                            </div>

                            <div className="p-4 border-r border-white/10 text-zinc-400 flex items-center justify-center gap-2">
                                <span>Vendor Lock-in</span>
                            </div>
                            <div className="p-4 text-white flex items-center justify-center gap-2 bg-blue-500/5">
                                <Check className="w-4 h-4 text-green-400" />
                                <span>100% Data Ownership</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl -mt-10 mb-20 relative z-20">
                {/* Why Switch Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Shield className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Own Your Data</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">No more vendor lock-in. Host it yourself or pick a provider you trust.</p>
                    </div>
                    <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-white/20 hover:shadow-lg hover:shadow-green-500/5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Coins className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Save Money</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">Stop paying per-seat licensing fees for features you don't use.</p>
                    </div>
                    <div className="bg-zinc-900/40 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:bg-zinc-900/60 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/5 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Server className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Full Control</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">Customize the code, extend functionality, and audit security.</p>
                    </div>
                </div>

                {/* Alternatives List */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                        Top Replacements
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alternatives.map(item => (
                            <ComparisonCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
