'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
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

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="/categories"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                    >
                        About
                    </Link>
                    <Button asChild variant="outline" size="sm" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        <Link href="/submit">
                            <Github className="mr-2 h-4 w-4" />
                            Submit Tool
                        </Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-zinc-400 hover:text-white hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </div>

            {/* Mobile Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 w-full border-b border-white/10 bg-zinc-950 p-4 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-2 fade-in duration-200">
                    <Link
                        href="/categories"
                        className="text-base font-medium text-zinc-400 hover:text-white transition-colors px-2 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-base font-medium text-zinc-400 hover:text-white transition-colors px-2 py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Button asChild variant="outline" className="w-full justify-start border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        <Link href="/submit" onClick={() => setIsMobileMenuOpen(false)}>
                            <Github className="mr-2 h-4 w-4" />
                            Submit Tool
                        </Link>
                    </Button>
                </div>
            )}
        </nav>
    );
}
