"use client";
import { useState } from "react";

export function ToolLogo({ slug, url, customLogo }: { slug: string; url: string; customLogo?: string }) {
    const [errorCount, setErrorCount] = useState(0);

    // 1. Clean the slug to match Simple Icons naming convention
    const cleanSlug = slug.toLowerCase()
        .replace("-ce", "")
        .replace("-enterprise", "")
        .replace("-community", "")
        .replace("self-hosted-", "");

    // Extract hostname
    let hostname = "example.com";
    try {
        hostname = new URL(url).hostname;
    } catch (e) {
        // ignore
    }

    // 2. Define URLs in priority order
    const customUrl = customLogo ? `/logos/${customLogo}` : null;
    const clearbitUrl = `https://logo.clearbit.com/${hostname}`;
    const simpleIconsUrl = `https://cdn.simpleicons.org/${cleanSlug}/white`; // Keep white for dark mode
    const googleUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;

    // 3. Determine which URL to show based on error count
    // Priority: Custom -> Clearbit -> Simple Icons -> Google
    let currentSrc = customUrl || clearbitUrl;

    // Adjust logic based on whether customUrl exists
    if (customUrl) {
        if (errorCount === 1) currentSrc = clearbitUrl;
        if (errorCount === 2) currentSrc = simpleIconsUrl;
        if (errorCount >= 3) currentSrc = googleUrl;
    } else {
        if (errorCount === 1) currentSrc = simpleIconsUrl;
        if (errorCount >= 2) currentSrc = googleUrl;
    }

    return (
        <div className="relative h-12 w-12 mr-4 flex-shrink-0 bg-zinc-900 rounded-xl flex items-center justify-center p-2.5 border border-zinc-800 shadow-sm overflow-hidden">
            <img
                key={currentSrc} // Force re-render on src change
                src={currentSrc}
                alt={`${slug} logo`}
                className={`w-full h-full object-contain transition-opacity duration-300 ${errorCount >= 2 ? 'opacity-80' : 'opacity-100'}`}
                onError={() => setErrorCount(prev => prev + 1)}
                loading="lazy"
            />
        </div>
    );
}
