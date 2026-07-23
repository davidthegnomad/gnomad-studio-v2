import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Website Design Examples — Muskogee & 918 Small Businesses",
    description:
        "Real website designs built for Muskogee businesses: auto shops, groomers, landscapers, clinics, photographers, and more. See what your business could look like — then claim it.",
    alternates: { canonical: "/examples" },
    openGraph: {
        title: "Website Design Examples | Gnomad Studio — Muskogee, OK",
        description:
            "Browse real, high-performance website designs built for Muskogee small businesses. Mobile-first, conversion-focused, and ready to launch.",
        url: "https://gnomadstudio.org/examples",
    },
};

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
