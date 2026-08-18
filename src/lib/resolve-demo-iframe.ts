import { existsSync } from "fs";
import path from "path";
import { DEMO_SITES, type DemoSiteConfig } from "@/config/demo-sites";

const FALLBACK: Omit<DemoSiteConfig, "id" | "name"> = {
    category: "Local",
    description: "Gnomad Studio demo pitch.",
    colors: {
        primary: "#17d432",
        backgroundLight: "#ffffff",
        backgroundDark: "#050505",
    },
    fonts: { display: "Inter", sans: "Inter" },
    hero: { title: "Demo", subtitle: "", image: "" },
    features: {},
};

function publicIndex(...parts: string[]): string | null {
    const rel = path.join(process.cwd(), "public", ...parts, "index.html");
    return existsSync(rel) ? `/${parts.join("/")}/index.html` : null;
}

export function resolveDemoIframe(slug: string): string | null {
    return (
        publicIndex("showcase-sites", slug) ||
        publicIndex("DEMO", slug) ||
        publicIndex("DEMO", slug, "dist")
    );
}

export function demoConfig(slug: string): DemoSiteConfig | null {
    if (!DEMO_SITES[slug] && !resolveDemoIframe(slug)) return null;
    return (
        DEMO_SITES[slug] ?? {
            id: slug,
            name: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
            ...FALLBACK,
        }
    );
}
