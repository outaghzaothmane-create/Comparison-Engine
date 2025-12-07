import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    // JSON-LD for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.href ? `https://yourdomain.com${item.href}` : undefined,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-zinc-400">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <div key={item.label} className="flex items-center gap-1">
                            {index === 0 && <Home className="w-3.5 h-3.5 mr-1" />}
                            {item.href && !isLast ? (
                                <Link
                                    href={item.href}
                                    className="hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={isLast ? 'text-zinc-300' : ''}>{item.label}</span>
                            )}
                            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />}
                        </div>
                    );
                })}
            </nav>
        </>
    );
}
