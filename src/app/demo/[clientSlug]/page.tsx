import { demoConfig, resolveDemoIframe } from "@/lib/resolve-demo-iframe";
import { DEMO_SITES } from "@/config/demo-sites";
import { notFound } from "next/navigation";
import ShowcaseTemplate from "@/components/showcase/ShowcaseTemplate";

export function generateStaticParams() {
    const fromConfig = Object.keys(DEMO_SITES);
    return fromConfig.map((clientSlug) => ({ clientSlug }));
}

export default async function DemoPage({ params }: { params: Promise<{ clientSlug: string }> }) {
    const { clientSlug } = await params;
    const config = demoConfig(clientSlug);
    const iframeSrc = resolveDemoIframe(clientSlug);

    if (!config || !iframeSrc) {
        notFound();
    }

    return <ShowcaseTemplate config={config} iframeSrc={iframeSrc} />;
}
