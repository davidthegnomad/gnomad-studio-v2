import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastMod = new Date('2026-02-20');
    return [
        { url: 'https://gnomadstudio.org', lastModified: lastMod, changeFrequency: 'weekly', priority: 1.0 },
        { url: 'https://gnomadstudio.org/#mission', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://gnomadstudio.org/#services', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.9 },
        { url: 'https://gnomadstudio.org/#manifesto', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
    ];
}
