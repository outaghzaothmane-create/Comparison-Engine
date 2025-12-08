'use client';

import { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Fuse from 'fuse.js';
import items from '@/data/items.json';

// Define the shape of our data items based on items.json
interface Tool {
    id: string;
    name: string;
    slug: string;
    description: string;
    paid_alternative: string;
    paid_alternative_slug: string;
    category: string;
    license: string;
    website_url: string;
    github_url?: string;
}

interface SearchBarProps {
    className?: string;
    placeholder?: string;
}

export function SearchBar({ className, placeholder }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Tool[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const debouncedSearch = useDebouncedCallback((value: string) => {
        if (!value.trim()) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        // Initialize Fuse with the imported data
        const fuse = new Fuse(items as Tool[], {
            keys: ['name', 'description', 'category', 'paid_alternative'],
            threshold: 0.3
        });

        const searchResults = fuse.search(value);
        setResults(searchResults.map(result => result.item));
        setIsLoading(false);
    }, 300);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setIsOpen(true);
        setIsLoading(true);
        debouncedSearch(value);
    };

    const handleSelect = useCallback((tool: Tool) => {
        setQuery('');
        setIsOpen(false);
        router.push(`/alternative-to/${tool.paid_alternative_slug}`);
    }, [router]);

    return (
        <div className="relative w-full max-w-2xl mx-auto z-50">
            <div className="relative relative-group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 pointer-events-none" />
                    <Input
                        type="text"
                        placeholder={placeholder || "Search for a tool (e.g., 'Slack', 'Jira')..."}
                        className={`w-full h-14 pl-12 pr-4 bg-black/80 backdrop-blur-xl border-white/10 text-lg text-white placeholder:text-zinc-500 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 rounded-lg shadow-2xl transition-all ${className || ''}`}
                        value={query}
                        onChange={handleSearch}
                        onFocus={() => query.length > 0 && setIsOpen(true)}
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    />
                    {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                        </div>
                    )}
                </div>
            </div>

            {isOpen && (query.length > 0) && (
                <div className="absolute w-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((tool) => (
                                <li key={tool.id}>
                                    <button
                                        onClick={() => handleSelect(tool)}
                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors text-left group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 shrink-0">
                                                {tool.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-white font-medium group-hover:text-blue-400 transition-colors truncate">
                                                    {tool.name} <span className="text-zinc-500 font-normal">vs {tool.paid_alternative}</span>
                                                </div>
                                                <div className="text-xs text-zinc-500 truncate max-w-[300px]">
                                                    {tool.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : !isLoading ? (
                        <div className="p-4 text-center text-zinc-500 text-sm">No results found.</div>
                    ) : null}
                </div>
            )}
        </div>
    );
}
