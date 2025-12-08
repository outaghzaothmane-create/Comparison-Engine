'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const pathname = usePathname();

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <div className="sticky top-6 z-50 flex justify-center w-full px-4">
            <nav className="w-full max-w-5xl rounded-full border border-white/10 bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-md shadow-lg relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none rounded-full" />
                <div className="relative z-10 flex h-14 items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <Box className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="font-bold text-lg text-white tracking-tight">OS Directory</span>
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
                        <Button asChild variant="outline" size="sm" className="h-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white px-4">
                            <Link href="/submit">
                                <Github className="mr-2 h-3.5 w-3.5" />
                                Submit Tool
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-zinc-400 hover:text-white hover:bg-white/5 rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 flex flex-col gap-2 shadow-2xl md:hidden animate-in slide-in-from-top-2 fade-in duration-200 overflow-hidden">
                        <Link
                            href="/categories"
                            className="text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Categories
                        </Link>
                        <Link
                            href="/about"
                            className="text-base font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all px-4 py-2 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Button asChild variant="outline" className="w-full justify-start border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white rounded-lg mt-2">
                            <Link href="/submit" onClick={() => setIsMobileMenuOpen(false)}>
                                <Github className="mr-2 h-4 w-4" />
                                Submit Tool
                            </Link>
                        </Button>
                    </div>
                )}
            </nav>
        </div >
    );
}
