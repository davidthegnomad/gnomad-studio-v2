import { DEMO_SITES } from '@/config/demo-sites';
import { notFound } from 'next/navigation';
import ShowcaseTemplate from '@/components/showcase/ShowcaseTemplate';

export default async function DemoPage({ params }: { params: Promise<{ clientSlug: string }> }) {
    const { clientSlug } = await params;
    const config = DEMO_SITES[clientSlug];

    if (!config) {
        notFound();
    }

    return <ShowcaseTemplate config={config} />;
}
