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

// --- MAIN SCRAPER ---
async function scrape(): Promise<void> {
    console.log('🚀 Starting awesome-selfhosted scraper...\n');

    // 1. Fetch the raw README
    const url = 'https://raw.githubusercontent.com/awesome-selfhosted/awesome-selfhosted/master/README.md';
    console.log(`📥 Fetching: ${url}`);

    const response = await axios.get<string>(url);
    const markdown = response.data;
    console.log(`✅ Fetched ${markdown.length} bytes\n`);

    // 2. Parse categories and items
    const tools: Tool[] = [];
    let currentCategory = 'Uncategorized';

    // Split by lines and process
    const lines = markdown.split('\n');

    // Regex patterns
    const categoryPattern = /^###\s+(.+)$/;
    const itemPattern = /^-\s+\[([^\]]+)\]\(([^)]+)\)\s*(?:`[^`]*`\s*)?-\s*(.+)$/;

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

            // Clean description: remove source code links, demos, license badges, tech stack
            let description = rawDescription
                // Remove markdown links entirely: [text](url)
                .replace(/\[([^\]]*)\]\([^)]*\)/g, '')
                // Remove standalone source code/demo mentions
                .replace(/,?\s*Source Code\s*\)?/gi, '')
                .replace(/,?\s*Demo\s*\)?/gi, '')
                // Remove backtick content (license, tech)
                .replace(/`[^`]+`/g, '')
                // Clean up parentheses
                .replace(/\(\s*,\s*/g, '(')
                .replace(/,\s*\)/g, ')')
                .replace(/\(\s*\)/g, '')
                .replace(/\(\s*,?\s*\)/g, '')
                // Clean up whitespace and punctuation
                .replace(/\s+/g, ' ')
                .replace(/,\s*,/g, ',')
                .replace(/\s+\./g, '.')
                .replace(/\.\s*\)/g, ')')
                .trim();

            // Remove trailing period if present
            if (description.endsWith('.')) {
                description = description.slice(0, -1);
            }

            // Skip if no valid URL or description
            if (!websiteUrl || !description || websiteUrl.startsWith('#')) {
                continue;
            }

            const paidAlt = findPaidAlternative(name, description, currentCategory);
            const tool: Tool = {
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
            };

            tools.push(tool);
        }
    }

    console.log(`\n✅ Parsed ${tools.length} tools across categories\n`);

    // 3. Save to data/items.json
    const outputPath = path.join(__dirname, '..', 'data', 'items.json');
    fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2), 'utf-8');
    console.log(`💾 Saved to: ${outputPath}`);

    // 4. Print summary
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
