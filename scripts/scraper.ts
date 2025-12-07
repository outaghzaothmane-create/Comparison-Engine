import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

// --- TYPES ---
interface Tool {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    paid_alternative: string;
    paid_alternative_slug: string;
    license: string;
    category: string;
    website_url: string;
    stars?: number;
    last_updated?: string;
    logo?: string;
}

// --- PAID ALTERNATIVE KEYWORD MAP ---
const PAID_ALTERNATIVE_MAP: { keywords: string[]; alternative: string }[] = [
    { keywords: ['slack', 'team chat', 'mattermost'], alternative: 'Slack' },
    { keywords: ['calendly', 'scheduling', 'appointment', 'booking'], alternative: 'Calendly' },
    { keywords: ['dropbox', 'file sync', 'file sharing'], alternative: 'Dropbox' },
    { keywords: ['google analytics', 'analytics', 'web statistics'], alternative: 'Google Analytics' },
    { keywords: ['notion', 'note-taking', 'notes', 'knowledge base'], alternative: 'Notion' },
    { keywords: ['jira', 'issue tracking', 'bug tracking'], alternative: 'Jira' },
    { keywords: ['zoom', 'video conferencing', 'video call', 'webrtc'], alternative: 'Zoom' },
    { keywords: ['confluence', 'wiki', 'documentation'], alternative: 'Confluence' },
    { keywords: ['trello', 'kanban', 'board'], alternative: 'Trello' },
    { keywords: ['asana', 'task management', 'project management'], alternative: 'Asana' },
    { keywords: ['github', 'gitlab', 'git hosting', 'code hosting'], alternative: 'GitHub' },
    { keywords: ['drive', 'cloud storage', 'object storage'], alternative: 'Google Drive' },
    { keywords: ['gmail', 'email', 'mail server', 'webmail'], alternative: 'Gmail' },
    { keywords: ['hootsuite', 'buffer', 'social media management'], alternative: 'Hootsuite' },
    { keywords: ['zapier', 'automation', 'workflow'], alternative: 'Zapier' },
    { keywords: ['shopify', 'e-commerce', 'ecommerce', 'online store'], alternative: 'Shopify' },
    { keywords: ['salesforce', 'crm', 'customer relationship'], alternative: 'Salesforce' },
    { keywords: ['intercom', 'chat support', 'help desk', 'ticketing'], alternative: 'Intercom' },
    { keywords: ['lastpass', 'password manager', '1password'], alternative: 'LastPass' },
    { keywords: ['airtable', 'database', 'spreadsheet'], alternative: 'Airtable' },
    { keywords: ['figma', 'design', 'prototyping'], alternative: 'Figma' },
    { keywords: ['plex', 'media server', 'streaming'], alternative: 'Plex' },
    { keywords: ['jenkins', 'ci/cd', 'continuous integration'], alternative: 'Jenkins' },
    { keywords: ['docker', 'container', 'kubernetes'], alternative: 'Docker Hub' },
    { keywords: ['grafana', 'monitoring', 'dashboard', 'metrics'], alternative: 'Datadog' },
];

// --- UTILITY FUNCTIONS ---
function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function toTagline(description: string): string {
    const words = description.split(/\s+/).slice(0, 10);
    let tagline = words.join(' ');
    if (description.split(/\s+/).length > 10) {
        tagline += '...';
    }
    return tagline;
}

function findPaidAlternative(name: string, description: string, category: string): string {
    const searchText = `${name} ${description} ${category}`.toLowerCase();

    for (const mapping of PAID_ALTERNATIVE_MAP) {
        for (const keyword of mapping.keywords) {
            if (searchText.includes(keyword.toLowerCase())) {
                return mapping.alternative;
            }
        }
    }

    return 'Generic Enterprise Tool';
}

function extractLicense(rawDescription: string): string {
    // Licenses in awesome-selfhosted are in backticks like `MIT` or `AGPL-3.0`
    const licenseMatch = rawDescription.match(/`([A-Z][A-Za-z0-9.-]+)`/);
    if (licenseMatch) {
        return licenseMatch[1];
    }
    return 'OSS';
}

// --- HELPER TO SLEEP ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- GITHUB API HELPER ---
async function getGitHubStats(url: string): Promise<{ stars: number; last_updated: string } | null> {
    try {
        // 1. Check if it's a valid GitHub URL
        if (!url.includes('github.com')) return null;

        // 2. Extract owner/repo
        // e.g., https://github.com/owner/repo
        const parts = url.replace('https://github.com/', '').replace('http://github.com/', '').split('/');
        if (parts.length < 2) return null;

        const owner = parts[0];
        const repo = parts[1].replace('.git', '').replace(/\/$/, ''); // clean up

        // 3. Rate Limit Sleep (600ms to be safe ~100 requests/min without token)
        await sleep(600);

        // 4. Fetch from API
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
        console.log(`   ⭐ Fetching stats for ${owner}/${repo}...`);

        const response = await axios.get(apiUrl, {
            headers: {
                // Optional: valid User-Agent is good practice
                'User-Agent': 'Awesome-Selfhosted-Scraper-v1'
            },
            validateStatus: (status) => status < 500 // Handle 404s/403s manually
        });

        if (response.status === 200) {
            return {
                stars: response.data.stargazers_count,
                last_updated: response.data.pushed_at
            };
        } else if (response.status === 403 || response.status === 429) {
            console.warn(`   ⚠️ Rate limit hit for ${owner}/${repo}. Skipping.`);
            return null;
        } else {
            // 404 or other
            return null;
        }

    } catch (e: any) {
        // Silently fail for individual repos to keep scraper running
        // console.warn(`   Error fetching GitHub stats: ${e.message}`);
        return null;
    }
}


// --- MAIN SCRAPER ---
async function scrape(): Promise<void> {
    console.log('🚀 Starting awesome-selfhosted scraper with GitHub Enrichment...\n');

    // 1. Fetch the raw README
    const url = 'https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md';
    console.log(`📥 Fetching: ${url}`);

    const response = await axios.get<string>(url);
    const markdown = response.data;
    console.log(`✅ Fetched ${markdown.length} bytes\n`);

    // 1.5 Load Overrides
    const overridesPath = path.join(__dirname, '..', 'data', 'tool-overrides.json');
    let overrides: Record<string, any> = {};
    if (fs.existsSync(overridesPath)) {
        try {
            overrides = JSON.parse(fs.readFileSync(overridesPath, 'utf-8'));
            console.log(`🔧 Loaded ${Object.keys(overrides).length} overrides.`);
        } catch (e) {
            console.warn('⚠️ Failed to load overrides file.');
        }
    }

    // 2. Parse categories and items
    const tools: Tool[] = [];
    let currentCategory = 'Uncategorized';

    // Split by lines and process
    const lines = markdown.split('\n');

    // Regex patterns
    const categoryPattern = /^###\s+(.+)$/;
    const itemPattern = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:`[^`]*`\s*)?-\s*(.+)$/;

    // LIMIT FOR TESTING? (Set to false for full run, or a number to limit)
    // const LIMIT_TOOLS = 20; 
    let processedCount = 0;

    for (const line of lines) {
        // Check for category header
        const categoryMatch = line.match(categoryPattern);
        if (categoryMatch) {
            currentCategory = categoryMatch[1].trim();
            // Skip some non-software categories
            if (currentCategory.includes('back to top') || currentCategory.includes('License')) {
                continue;
            }
            console.log(`📂 Category: ${currentCategory}`);
            continue;
        }

        // Check for item entry
        const itemMatch = line.match(itemPattern);
        if (itemMatch) {
            const [, name, websiteUrl, rawDescription] = itemMatch;

            // Clean description logic (kept same as before)
            let description = rawDescription
                .replace(/\[([^\]]*)\]\([^)]*\)/g, '')
                .replace(/,?\s*Source Code\s*\)?/gi, '')
                .replace(/,?\s*Demo\s*\)?/gi, '')
                .replace(/`[^`]+`/g, '')
                .replace(/\(\s*,\s*/g, '(')
                .replace(/,\s*\)/g, ')')
                .replace(/\(\s*\)/g, '')
                .replace(/\(\s*,?\s*\)/g, '')
                .replace(/\s+/g, ' ')
                .replace(/,\s*,/g, ',')
                .replace(/\s+\./g, '.')
                .replace(/\.\s*\)/g, ')')
                .trim();

            if (description.endsWith('.')) {
                description = description.slice(0, -1);
            }

            if (!websiteUrl || !description || websiteUrl.startsWith('#')) {
                continue;
            }

            // --- ENRICHMENT START ---
            let stars: number | undefined;
            let last_updated: string | undefined;

            // Only fetch for limited number if testing, or all if ready.
            // Given constraint "Detect if website_url is git repo", we do it here.
            // WARNING: Doing this for 1000 items will take ~10 mins at 600ms/req.
            // For this task, user asked to "Detect... If it is... Fetch".
            // We'll proceed but might be slow.

            const ghStats = await getGitHubStats(websiteUrl);
            if (ghStats) {
                stars = ghStats.stars;
                last_updated = ghStats.last_updated;
                console.log(`   ✅ Enriched ${name}: ${stars} stars`);
            }
            // --- ENRICHMENT END ---

            // --- ENRICHMENT END ---

            const paidAlt = findPaidAlternative(name, description, currentCategory);

            // Base tool object
            let tool: Tool = {
                id: uuidv4(),
                name: name.trim(),
                slug: toSlug(name.trim()),
                tagline: toTagline(description),
                description: description,
                paid_alternative: paidAlt,
                paid_alternative_slug: toSlug(paidAlt),
                license: extractLicense(rawDescription),
                category: currentCategory,
                website_url: websiteUrl,
                stars: stars,
                last_updated: last_updated
            };

            // --- OVERRIDES MERGE ---
            // Load overrides if not already loaded (Optimization: load once outside loop, but for now simple)
            // Ideally we load it once at the top. Let's do that in a real implementation.
            // But to minimize diff context issues, I'll assume we can access a 'overrides' variable here 
            // OR I will read it right here for simplicity if 'overrides' isn't available in scope.
            // ALLOWED: Since I am replacing a block, I should probably move the loading to the top or just use a global or local load.

            // BETTER APPROACH: Read overrides at start of scrape function.
            // Since I am already in the loop in this chunk, I will assume I need to load it before the loop.
            // WAITING: I will split this into two edits: (1) Load overrides at top, (2) Merge here.

            // Let's just do the merge here assuming 'overrides' exists, 
            // BUT wait, I haven't defined 'overrides' yet.
            // So for this chunk, I will just do the merge logic using a lazy load or similar?
            // No, best practice is to load it once. 
            // So I will abort this specific replace strategy and use a MultiReplace or two steps.

            // Let's modify the PLAN:
            // 1. Add overrides interface and load logic at top of scrape().
            // 2. Add merge logic in loop.

            // Since I have to output ONE tool call for this step if possible or sequential.
            // I will return "overrides" logic here if I can read the file.

            // Actually, I can just read it synchronously here for simplicity or assume it is loaded.
            // But let's be clean. I will cancel this tool call effectively by doing nothing? No, I must do something.

            // Let's just define the merge logic here effectively. 
            // I will use `overrides[tool.slug]` assuming `overrides` is defined.
            // Wait, I need to define `overrides` first.

            // OK, I will emit TWO tool calls in this turn. One to add the load, one to use it.
            // The user prompt allows parallel.

            // This specific call is for the MERGE. I will reference `overrides`.

            if (overrides[tool.slug]) {
                tool = { ...tool, ...overrides[tool.slug] };
                console.log(`   ✨ Applied override for ${tool.slug}`);
            }

            tools.push(tool);
            processedCount++;

            // Optional: Break early for testing if needed
            // if (processedCount >= 5) break; 
        }
    }

    console.log(`\n✅ Parsed ${tools.length} tools across categories\n`);

    // 3. Save to data/items.json
    const outputPath = path.join(__dirname, '..', 'data', 'items.json');
    fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2), 'utf-8');
    console.log(`💾 Saved to: ${outputPath}`);

    // Summary (kept same)
    const categoryCounts: Record<string, number> = {};
    for (const tool of tools) {
        categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
    }

    console.log('\n📊 Summary by category:');
    const sortedCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    for (const [category, count] of sortedCategories) {
        console.log(`   ${category}: ${count} tools`);
    }

    console.log(`\n🎉 Done! Total: ${tools.length} tools scraped.`);
}

// --- RUN ---
scrape().catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
