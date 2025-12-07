import Link from 'next/link';

export function SiteFooter() {
    return (
        <footer className="border-t border-white/10 bg-black py-8 md:py-12">
            <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-zinc-500 text-center md:text-left">
                    &copy; {new Date().getFullYear()} Open Source Directory. All rights reserved.
                </p>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/categories"
                        className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                    >
                        Categories
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
