import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us — Free Website Consultation in Muskogee",
    description:
        "Talk to a local. Tell us about your Muskogee business and we'll show you exactly how a high-performance website and local SEO can grow it. Call (918) 471-1813 or send a message.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact Gnomad Studio | Free Consultation — Muskogee, OK",
        description:
            "Tell us about your business. We'll show you how to get found on Google and win more local customers.",
        url: "https://gnomadstudio.org/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
