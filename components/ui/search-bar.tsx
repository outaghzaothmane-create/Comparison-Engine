'use client';

import { Suspense, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { Loader2, Search, X } from 'lucide-react';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

interface Suggestion {
    id: string;
    name: string;
    slug: string;
    category: string;
    paid_alternative: string;
    description: string;
}

function SearchInput({ placeholder, className }: SearchBarProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const initialQuery = searchParams.get('query')?.toString() || '';
    const [inputValue, setInputValue] = useState(initialQuery);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
            fetchSuggestions(term);
        } else {
            params.delete('query');
            setSuggestions([]);
            setIsOpen(false);
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const fetchSuggestions = async (term: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
            const data = await res.json();
            setSuggestions(data.results || []);
            setIsOpen(true);
            setSelectedIndex(-1); // Reset selection on new results
        } catch (error) {
            console.error('Failed to fetch suggestions', error);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const onInputChange = (val: string) => {
        setInputValue(val);
        handleSearch(val);
        if (!val) {
            setSuggestions([]);
            setIsOpen(false);
        }
    };

    const clearSearch = () => {
        setInputValue('');
        handleSearch('');
        inputRef.current?.focus();
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        submitSearch(suggestion.name);
    };

    const submitSearch = (term: string) => {
        setInputValue(term);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.set('query', term);
        replace(`${pathname}?${params.toString()}`);
        setIsOpen(false);
        setSelectedIndex(-1);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIndex > -1) {
                submitSearch(suggestions[selectedIndex].name);
            } else {
                // If no suggestion selected, submit current input
                setIsOpen(false);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    // Helper to bold matching text
    const HighlightMatch = ({ text, match }: { text: string; match: string }) => {
        if (!match) return <>{text}</>;
        const parts = text.split(new RegExp(`(${match})`, 'gi'));
        return (
            <>
                {parts.map((part, i) =>
                    part.toLowerCase() === match.toLowerCase() ? (
                        <span key={i} className="font-bold text-white">{part}</span>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </>
        );
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
                <Input
                    ref={inputRef}
                    className={`${className} pl-11 pr-10 text-base md:text-sm`} // Added pr-10 for clear button, text-base for mobile input zoom prevention
                    placeholder={placeholder}
                    onChange={(e) => onInputChange(e.target.value)}
                    value={inputValue}
                    onFocus={() => {
                        if (inputValue) setIsOpen(true);
                    }}
                    onKeyDown={onKeyDown}
                />
                {inputValue && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-colors"
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <X className="h-4 w-4" />
                        )}
                    </button>
                )}
            </div>

            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden backdrop-blur-xl ring-1 ring-white/5">
                    <ul className="py-2">
                        {suggestions.map((item, index) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleSuggestionClick(item)}
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${index === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                                        }`}
                                >
                                    <Search className={`w-4 h-4 mt-1 shrink-0 ${index === selectedIndex ? 'text-white' : 'text-zinc-500'
                                        }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-zinc-200 font-medium text-sm truncate">
                                            <HighlightMatch text={item.name} match={inputValue} />
                                        </p>
                                        <p className="text-zinc-500 text-xs truncate mt-0.5">
                                            Alternative to <HighlightMatch text={item.paid_alternative} match={inputValue} />
                                        </p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export function SearchBar(props: SearchBarProps) {
    return (
        <Suspense fallback={<Input {...props} disabled />}>
            <SearchInput {...props} />
        </Suspense>
    );
}

