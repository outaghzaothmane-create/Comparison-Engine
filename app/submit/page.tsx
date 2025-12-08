import { Metadata } from 'next';
import { SubmitToolForm } from '@/components/submit-tool-form';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
    title: 'Submit a Tool | Open Source Alternatives Directory',
    description: 'Submit a new open source alternative to our directory.',
};

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl relative overflow-visible">
            {/* Animated pulsing radial gradient background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] blur-3xl animate-pulse [animation-duration:4s] pointer-events-none -z-10" />

            <div className="mb-8 relative z-20">
                <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Submit Tool' }]} />
            </div>

            <div className="max-w-xl mx-auto relative z-10">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 animate-float">
                        Submit a <span className="text-blue-400 text-glow">Tool</span>
                    </h1>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Found a great open-source alternative? Let us know!
                        <br />
                        We manage submissions via GitHub Issues to keep the data transparent and community-verified.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative group">
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 -z-10" />

                    <SubmitToolForm />
                </div>
            </div>
        </div>
    );
}
