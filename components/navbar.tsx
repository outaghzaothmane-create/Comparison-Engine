import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Open Source Directory"
                        width={180}
                        height={32}
                        className="h-8 w-auto"
                        priority
                    />
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/categories"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        All Tools
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm" className="hidden sm:flex border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        <Link href="/submit">
                            <Github className="mr-2 h-4 w-4" />
                            Submit Tool
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
