import { Metadata } from 'next';
import { SubmitToolForm } from '@/components/submit-tool-form';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
    title: 'Submit a Tool | Open Source Alternatives Directory',
    description: 'Submit a new open source alternative to our directory.',
};

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
            <div className="mb-8">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Submit Tool' }]} />
            </div>

            <div className="max-w-xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                        Submit a Tool
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Found a great open-source alternative? Let us know!
                        <br />
                        We manage submissions via GitHub Issues to keep the data transparent and community-verified.
                    </p>
                </div>

                <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <SubmitToolForm />
                </div>
            </div>
        </div>
    );
}
