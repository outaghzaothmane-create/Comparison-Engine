'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = '/' }: PaginationProps) {
    const searchParams = useSearchParams();

    if (totalPages <= 1) {
        return null;
    }

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `${basePath}?${params.toString()}`;
    };

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const showAround = 2; // Pages to show around current

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || // First page
                i === totalPages || // Last page
                (i >= currentPage - showAround && i <= currentPage + showAround) // Around current
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== 'ellipsis') {
                pages.push('ellipsis');
            }
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
            {/* Previous */}
            <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-zinc-900/50 hover:bg-zinc-800"
                disabled={currentPage <= 1}
                asChild={currentPage > 1}
            >
                {currentPage > 1 ? (
                    <Link href={createPageUrl(currentPage - 1)}>
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
                    </Link>
                ) : (
                    <span>
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
                    </span>
                )}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-2 text-zinc-500">
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <Button
                            key={page}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            className={
                                isActive
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'border-white/10 bg-zinc-900/50 hover:bg-zinc-800'
                            }
                            asChild={!isActive}
                        >
                            {isActive ? (
                                <span>{page}</span>
                            ) : (
                                <Link href={createPageUrl(page)}>{page}</Link>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Next */}
            <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-zinc-900/50 hover:bg-zinc-800"
                disabled={currentPage >= totalPages}
                asChild={currentPage < totalPages}
            >
                {currentPage < totalPages ? (
                    <Link href={createPageUrl(currentPage + 1)}>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                ) : (
                    <span>
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                )}
            </Button>
        </nav>
    );
}
