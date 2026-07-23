import type { MetadataRoute } from 'next';
import { privacySlugs } from '@/lib/privacy-policies';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastMod = new Date('2026-07-23');
    const appPagesMod = new Date('2026-06-12');
    return [
        // Core money pages — these are what local search should find
        { url: 'https://gnomadstudio.org', lastModified: lastMod, changeFrequency: 'weekly', priority: 1.0 },
        { url: 'https://gnomadstudio.org/services', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.9 },
        { url: 'https://gnomadstudio.org/examples', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.9 },
        { url: 'https://gnomadstudio.org/contact', lastModified: lastMod, changeFrequency: 'monthly', priority: 0.8 },
        // App / extension pages
        { url: 'https://gnomadstudio.org/gnome-kan-do', lastModified: appPagesMod, changeFrequency: 'monthly', priority: 0.5 },
        { url: 'https://gnomadstudio.org/gnome-kan-do-support', lastModified: appPagesMod, changeFrequency: 'yearly', priority: 0.3 },
        { url: 'https://gnomadstudio.org/gnomad-capture', lastModified: appPagesMod, changeFrequency: 'monthly', priority: 0.5 },
        { url: 'https://gnomadstudio.org/capture-support', lastModified: appPagesMod, changeFrequency: 'yearly', priority: 0.3 },
        ...privacySlugs.map((slug) => ({
            url: `https://gnomadstudio.org/${slug}`,
            lastModified: appPagesMod,
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        })),
    ];
}
