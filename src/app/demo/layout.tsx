import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Live Demo Catalog",
    description: "Live development previews of Gnomad Studio client projects.",
    robots: { index: false, follow: false },
    alternates: { canonical: "/demo" },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
    return children;
}
