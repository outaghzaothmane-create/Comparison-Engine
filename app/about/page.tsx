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
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <div className="mb-8">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
            </div>

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
                    About the Directory
                </h1>

                <div className="prose prose-invert prose-zinc max-w-none mb-12">
                    <p className="lead text-xl text-zinc-300">
                        The Open Source Alternatives Directory is a community-driven resource designed to help developers, startups, and enterprises find high-quality, self-hostable replacements for popular SaaS products.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                        <ShieldCheck className="h-8 w-8 text-blue-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
                        <p className="text-sm text-zinc-400">
                            Own your data by choosing self-hostable solutions that don't track your every move.
                        </p>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                        <Database className="h-8 w-8 text-purple-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No Vendor Lock-in</h3>
                        <p className="text-sm text-zinc-400">
                            Switch between tools easily with open standards and full database access.
                        </p>
                    </div>
                    <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
                        <Zap className="h-8 w-8 text-yellow-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">Cost Effective</h3>
                        <p className="text-sm text-zinc-400">
                            Save significantly on enterprise licensing fees by hosting robust alternatives.
                        </p>
                    </div>
                </div>

                <div className="space-y-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                        <p className="text-zinc-400 mb-4 leading-relaxed">
                            In an era of fragmentation and subscription fatigue, we believe in the power of open source software. Our goal is to make it effortless to discover tools that respect your privacy, give you control over your data, and save you money.
                        </p>
                        <p className="text-zinc-400 leading-relaxed">
                            Whether you need a replacement for Slack, Jira, Notion, or Datadog, we aim to list the best community-verified options available, powered by data from
                            <a href="https://github.com/awesome-selfhosted/awesome-selfhosted" className="text-blue-400 hover:text-blue-300 mx-1 inline-flex items-center" target="_blank" rel="noopener noreferrer">
                                awesome-selfhosted <ExternalLink className="h-3 w-3 ml-0.5" />
                            </a>.
                        </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Contribute to the Project
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                            This directory is open source itself. If you'd like to submit a new tool, fix a typo, or improve the code, check out our repository.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
                                <Link href="https://github.com/your-repo/issues" target="_blank" rel="noopener noreferrer">
                                    <Github className="mr-2 h-5 w-5" />
                                    Submit a Tool
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
