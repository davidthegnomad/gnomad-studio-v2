import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // Internal / non-marketing surfaces — keep crawl budget on money pages
            disallow: ['/demo', '/login', '/client-portal', '/api/'],
        },
        sitemap: 'https://gnomadstudio.org/sitemap.xml',
    };
}
