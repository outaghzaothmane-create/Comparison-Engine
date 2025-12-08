import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Github, ExternalLink, ShieldCheck, Database, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About | Open Source Alternatives Directory',
    description: 'Learn about the mission behind the Open Source Alternatives Directory and how to contribute.',
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl relative overflow-visible">
            {/* Animated pulsing radial gradient background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] blur-3xl animate-pulse [animation-duration:4s] pointer-events-none -z-10" />

            <div className="mb-8 relative z-20">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white animate-float">
                        About the <span className="text-blue-400 text-glow">Directory</span>
                    </h1>
                    <div className="prose prose-invert prose-zinc max-w-none mx-auto">
                        <p className="lead text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                            The Open Source Alternatives Directory is a community-driven resource designed to help developers, startups, and enterprises find high-quality, self-hostable replacements for popular SaaS products.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:-translate-y-1 hover:border-blue-500/30 transition-all duration-300 group">
                        <ShieldCheck className="h-8 w-8 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
                        <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Own your data by choosing self-hostable solutions that don't track your every move.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:-translate-y-1 hover:border-purple-500/30 transition-all duration-300 group">
                        <Database className="h-8 w-8 text-purple-400 mb-4 group-hover:text-purple-300 transition-colors" />
                        <h3 className="text-lg font-semibold text-white mb-2">No Vendor Lock-in</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Switch between tools easily with open standards and full database access.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:-translate-y-1 hover:border-yellow-500/30 transition-all duration-300 group">
                        <Zap className="h-8 w-8 text-yellow-400 mb-4 group-hover:text-yellow-300 transition-colors" />
                        <h3 className="text-lg font-semibold text-white mb-2">Cost Effective</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Save significantly on enterprise licensing fees by hosting robust alternatives.
                        </p>
                    </div>
                </div>

                <div className="space-y-16">
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-zinc-400 mb-6 leading-relaxed text-lg">
                            In an era of fragmentation and subscription fatigue, we believe in the power of open source software. Our goal is to make it effortless to discover tools that respect your privacy, give you control over your data, and save you money.
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            Whether you need a replacement for Slack, Jira, Notion, or Datadog, we aim to list the best community-verified options available, powered by data from
                            <a href="https://github.com/awesome-selfhosted/awesome-selfhosted" className="text-blue-400 hover:text-blue-300 mx-1 inline-flex items-center hover:underline" target="_blank" rel="noopener noreferrer">
                                awesome-selfhosted <ExternalLink className="h-3 w-3 ml-0.5" />
                            </a>.
                        </p>
                    </div>

                    <div className="relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl p-8 md:p-12 text-center group">
                        {/* Gradient Glow Border effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Contribute to the Project
                            </h2>
                            <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
                                This directory is open source itself. If you'd like to submit a new tool, fix a typo, or improve the code, check out our repository.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Button asChild size="lg" className="rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all shadow-lg hover:shadow-blue-500/20">
                                    <Link href="https://outaghzaothmane-create.github.io/Comparison-Engine/submit">
                                        <Github className="mr-2 h-5 w-5" />
                                        Submit a Tool
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
