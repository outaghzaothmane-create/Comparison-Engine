import { NextResponse } from 'next/server';
import { searchTools } from '@/lib/data';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ results: [] });
    }

    const results = searchTools(query).slice(0, 5); // Limit to top 5 results

    return NextResponse.json({ results });
}
