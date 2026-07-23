import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Web Design Packages & Pricing for Muskogee Small Businesses",
    description:
        "Simple, mission-first pricing for Muskogee web design. Pay What You Can for non-profits, $150/mo Pioneer tier with local SEO and hosting, $300/mo Flagship brand builds. 501(c)(3) — no corporate markup.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Web Design Packages & Pricing | Gnomad Studio — Muskogee, OK",
        description:
            "Pay What You Can for non-profits. $150/mo for growth-ready small businesses. Elite web design and local SEO without the corporate markup.",
        url: "https://gnomadstudio.org/services",
    },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
