"use client";
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export function ToolLogo({
    slug,
    url,
    customLogo,
    size = 48
}: {
    slug: string;
    url: string;
    customLogo?: string;
    size?: number;
}) {
    const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // 1. Clean the slug to match Simple Icons naming convention
    const cleanSlug = slug.toLowerCase()
        .replace("-ce", "")
        .replace("-enterprise", "")
        .replace("-community", "")
        .replace("self-hosted-", "");

    // 2. Define URLs in priority order
    // Priority: Custom -> Simple Icons -> Google Favicons -> Fallback (Globe)
    const domain = url.replace(/(^\w+:|^)\/\//, '').replace('www.', '').split('/')[0];

    const logoUrls = [
        customLogo ? `/Comparison-Engine/logos/${customLogo}` : null,
        `https://cdn.simpleicons.org/${cleanSlug}/white`,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    ].filter(Boolean) as string[];

    const currentSrc = logoUrls[currentUrlIndex];

    const handleError = () => {
        if (currentUrlIndex < logoUrls.length - 1) {
            setCurrentUrlIndex(prev => prev + 1);
            setImageLoaded(false); // Reset loading state for next image
        } else {
            setHasError(true);
        }
    };

    // Reset state if props change
    useEffect(() => {
        setCurrentUrlIndex(0);
        setImageLoaded(false);
        setHasError(false);
    }, [slug, url, customLogo]);

    return (
        <div
            className="relative flex-shrink-0 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 shadow-sm overflow-hidden"
            style={{ width: size, height: size }}
        >
            {/* Skeleton Loader - Visible while loading and no error yet */}
            {!imageLoaded && !hasError && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse z-10" />
            )}

            {!hasError ? (
                <img
                    key={currentSrc} // Force re-render on src change
                    src={currentSrc}
                    alt={`${slug} logo`}
                    className={`w-full h-full object-contain p-2 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={handleError}
                    loading="lazy"
                />
            ) : (
                // Fallback Globe Icon
                <Globe className="w-1/2 h-1/2 text-zinc-500" />
            )}
        </div>
    );
}
