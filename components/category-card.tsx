import Link from 'next/link';
import { FolderOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/data';

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link href={`/category/${category.slug}`}>
            <Card className="bg-zinc-900/50 border-white/10 hover:border-blue-500/50 hover:bg-zinc-900 transition-all duration-300 cursor-pointer group h-full">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <FolderOpen className="w-5 h-5 text-blue-400" />
                        </div>
                        <Badge variant="secondary" className="bg-white/5 text-zinc-300 font-normal">
                            {category.count} tools
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardTitle className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {category.name}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </CardTitle>
                    <p className="text-sm text-zinc-500">
                        Browse {category.count} open source alternatives
                    </p>
                </CardContent>
            </Card>
        </Link>
    );
}
