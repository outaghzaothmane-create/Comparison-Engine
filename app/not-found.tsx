import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LayoutGrid } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <h1 className="text-8xl font-bold tracking-tighter text-zinc-900 select-none">
                404
            </h1>
            <h2 className="text-3xl font-semibold text-white mt-4 tracking-tight">
                Page Not Found
            </h2>
            <p className="text-zinc-400 max-w-md mt-4 mb-8 text-lg">
                Sorry, we couldn&apos;t find the page or tool you were looking for.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800">
                    <Link href="/categories">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Browse Categories
                    </Link>
                </Button>
            </div>
        </div>
    );
}
