import items from "@/data/items.json"
import { ComparisonCard } from "@/components/comparison-card"
import { SearchHero } from "@/components/search-hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <SearchHero />

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-6">
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Popular Alternatives
          </h2>
          <span className="text-sm text-zinc-500">
            Showing {items.length} tools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ComparisonCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
