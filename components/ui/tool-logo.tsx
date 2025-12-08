"use client";
import { useState } from "react";
import { Globe } from "lucide-react";

export function ToolLogo({ slug, url, customLogo }: { slug: string; url: string; customLogo?: string }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [errorCount, setErrorCount] = useState(0);

    // 1. Clean the slug to match Simple Icons naming convention
    const cleanSlug = slug.toLowerCase()
        .replace("-ce", "")
        .replace("-enterprise", "")
        .replace("-community", "")
        .replace("self-hosted-", "");

    // 2. Define URLs
    // Ensure we handle the basePath for GitHub Pages hosting
    const customUrl = customLogo ? `/Comparison-Engine/logos/${customLogo}` : null;
    const simpleIconsUrl = `https://cdn.simpleicons.org/${cleanSlug}/white`;

    // 3. Determine which URL to show based on error count
    // Priority: Custom -> Simple Icons -> Globe (fallback)
    let currentSrc: string | null = null;

    if (customUrl) {
        if (errorCount === 0) currentSrc = customUrl;
        else if (errorCount === 1) currentSrc = simpleIconsUrl;
    } else {
        if (errorCount === 0) currentSrc = simpleIconsUrl;
    }

    return (
        <div className="relative h-12 w-12 mr-4 flex-shrink-0 bg-zinc-900 rounded-xl flex items-center justify-center p-2.5 border border-zinc-800 shadow-sm overflow-hidden">
            {/* Skeleton Loader */}
            {!imageLoaded && currentSrc && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse z-10" />
            )}

            {currentSrc ? (
                <img
                    key={currentSrc} // Force re-render on src change
                    src={currentSrc}
                    alt={`${slug} logo`}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageLoaded(false);
                        setErrorCount(prev => prev + 1);
                    }}
                    loading="lazy"
                />
            ) : (
                <Globe className="w-6 h-6 text-zinc-600 animate-in fade-in duration-300" />
            )}
        </div>
    );
}
