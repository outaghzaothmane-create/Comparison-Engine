'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, ExternalLink, Loader2 } from 'lucide-react';

export function SubmitToolForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        license: '',
        description: '',
        paidAlternative: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { name, url, license, description, paidAlternative } = formData;

        // Construct GitHub Issue Body
        const body = `
### Tool Name
${name}

### Website URL
${url}

### Open Source License
${license}

### Description
${description}

### Alternative To (Paid Tool)
${paidAlternative}
        `.trim();

        const title = `[Tool] ${name}`;

        // Encode for URL
        const encodedTitle = encodeURIComponent(title);
        const encodedBody = encodeURIComponent(body);

        // GitHub Issue URL
        const githubUrl = `https://github.com/outaghzaothmane-create/Comparison-Engine/issues/new?title=${encodedTitle}&body=${encodedBody}`;

        // Open in new tab
        window.open(githubUrl, '_blank');
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-zinc-300">
                    Tool Name <span className="text-red-500">*</span>
                </label>
                <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Plausible Analytics"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg h-12"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="url" className="text-sm font-medium text-zinc-300">
                    Website URL <span className="text-red-500">*</span>
                </label>
                <Input
                    id="url"
                    name="url"
                    type="url"
                    required
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg h-12"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="license" className="text-sm font-medium text-zinc-300">
                    Open Source License
                </label>
                <Input
                    id="license"
                    name="license"
                    placeholder="e.g. MIT, AGPLv3, Apache 2.0"
                    value={formData.license}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg h-12"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="paidAlternative" className="text-sm font-medium text-zinc-300">
                    Paid Alternative <span className="text-zinc-500">(Optional)</span>
                </label>
                <Input
                    id="paidAlternative"
                    name="paidAlternative"
                    placeholder="e.g. Google Analytics, Slack, Jira"
                    value={formData.paidAlternative}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-lg h-12"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-zinc-300">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Briefly describe what this tool does..."
                    value={formData.description}
                    onChange={handleChange}
                    className="flex w-full rounded-lg border border-white/10 bg-black/40 px-3 py-3 text-sm text-white shadow-sm placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-y"
                />
            </div>

            <div className="pt-4">
                <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 py-6 text-base font-semibold shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 border border-white/10 rounded-xl"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Redirecting...
                        </>
                    ) : (
                        <>
                            <Github className="mr-2 h-5 w-5" />
                            Submit to GitHub
                        </>
                    )}
                </Button>
                <p className="text-xs text-center text-zinc-500 mt-4">
                    Clicking submit will open a GitHub issue format for review. No account access required.
                </p>
            </div>
        </form>
    );
}
