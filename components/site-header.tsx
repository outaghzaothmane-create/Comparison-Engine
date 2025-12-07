'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
                {/* Logo */}
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

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Tools
                    </Link>
                    <Link
                        href="/categories"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        About
                    </Link>
                </nav>

                {/* Action Button */}
                <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm" className="hidden sm:flex border-white/10 bg-white/5 hover:bg-white/10">
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
