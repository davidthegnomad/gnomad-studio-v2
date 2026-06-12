import type { MetadataRoute } from 'next';
import { privacySlugs } from '@/lib/privacy-policies';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastMod = new Date('2026-02-20');
    const privacyMod = new Date('2026-06-12');
    return [
        { url: 'https://gnomadstudio.org', lastModified: lastMod, changeFrequency: 'weekly', priority: 1.0 },
        { url: 'https://gnomadstudio.org/#mission', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://gnomadstudio.org/#services', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.9 },
        { url: 'https://gnomadstudio.org/#manifesto', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.7 },
        ...privacySlugs.map((slug) => ({
            url: `https://gnomadstudio.org/${slug}`,
            lastModified: privacyMod,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        })),
    ];
}
