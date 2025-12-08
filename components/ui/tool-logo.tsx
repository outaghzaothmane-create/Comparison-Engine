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
    const [finalSrc, setFinalSrc] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    // 1. Clean the slug to match Simple Icons naming convention
    const cleanSlug = slug.toLowerCase()
        .replace("-ce", "")
        .replace("-enterprise", "")
        .replace("-community", "")
        .replace("self-hosted-", "");

    // Resets on prop change
    useEffect(() => {
        let isActive = true;
        setFinalSrc(null);
        setIsLoading(true);
        setHasError(false);

        const checkImage = (src: string): Promise<string> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(src);
                img.onerror = () => reject(src);
            });
        };

        const loadLogos = async () => {
            // 2. Define URLs in priority order
            const domain = url.replace(/(^\w+:|^)\/\//, '').replace('www.', '').split('/')[0];

            const candidates = [
                customLogo ? `/Comparison-Engine/logos/${customLogo}` : null,
                `https://cdn.simpleicons.org/${cleanSlug}/white`,
                `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
            ].filter(Boolean) as string[];

            // Fire off checks in parallel
            const promises = candidates.map(src => checkImage(src));

            // Iterate in priority order, but using the already-started promises
            // This avoids waterfall: we wait for P0. If P0 fails, we check P1 (which started same time as P0).
            for (const p of promises) {
                try {
                    const validSrc = await p;
                    if (isActive) {
                        setFinalSrc(validSrc);
                        setIsLoading(false);
                        return; // Found the best available logo
                    }
                } catch (e) {
                    // This candidate failed, continue to the next lower priority
                    continue;
                }
            }

            // If we get here, all failed
            if (isActive) {
                setHasError(true);
                setIsLoading(false);
            }
        };

        loadLogos();

        return () => {
            isActive = false;
        };
    }, [slug, url, customLogo]); // Re-run if props change

    return (
        <div
            className="relative flex-shrink-0 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 shadow-sm overflow-hidden"
            style={{ width: size, height: size }}
        >
            {/* Skeleton Loader - Visible while loading */}
            {isLoading && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse z-10" />
            )}

            {!isLoading && !hasError && finalSrc ? (
                <img
                    src={finalSrc}
                    alt={`${slug} logo`}
                    className="w-full h-full object-contain p-2 animate-in fade-in duration-300"
                    loading="lazy"
                />
            ) : !isLoading && hasError ? (
                // Fallback Globe Icon or Text if error
                <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500">
                    <Globe className="w-1/2 h-1/2" />
                </div>
            ) : null}
        </div>
    );
}
