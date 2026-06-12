import type { ExtensionProduct } from "@/components/ExtensionProductPage";

export const gnomadCaptureProduct: ExtensionProduct = {
    badge: "Gnomad Capture",
    name: "Gnomad Capture",
    tagline: "Full-page screenshots that actually work.",
    description:
        "Professional Chrome extension for scroll-and-stitch full-page capture. Hide sticky headers, redact sensitive areas, and export to PNG, clipboard, or PDF — all locally in your browser.",
    features: [
        {
            title: "Smart stitching",
            description:
                "Automatically scrolls long pages and merges tiles into one high-resolution image. Handles complex SPAs and scroll containers.",
        },
        {
            title: "Built-in editor",
            description:
                "Crop, annotate, and redact before export. Sticky headers can be hidden so they do not repeat in every slice.",
        },
        {
            title: "Private & local",
            description:
                "No servers, no tracking. Captures stay in extension storage until you save or copy them yourself.",
        },
    ],
    homeHref: "/gnomad-capture",
    privacyHref: "/capture-privacy",
    supportHref: "/capture-support",
    contactEmail: "support@gnomadstudio.org",
    faqs: [
        {
            question: "Why can't I capture some pages?",
            answer: "Chrome blocks capture on chrome:// pages, the Web Store, and some restricted URLs. Use a normal https:// website.",
        },
        {
            question: "My capture is blank or cut off?",
            answer: "Try increasing Load Delay in the popup (800–1200 ms on heavy sites) and enable Hide Sticky Elements.",
        },
        {
            question: "Where is my data stored?",
            answer: "Image chunks are held locally in extension storage while stitching. Nothing is uploaded to Gnomad servers.",
        },
        {
            question: "How do I export?",
            answer: "After capture, use the editor to Save PNG, Copy to Clipboard, or Export PDF (single-page or paginated A4).",
        },
    ],
};

export const gnomadCaptureHomeMetadata = {
    title: "Gnomad Capture | Full-Page Screenshot Chrome Extension",
    description:
        "Gnomad Capture scrolls, stitches, and exports full webpages to PNG or PDF. Redaction tools and sticky-header handling built in.",
    alternates: { canonical: "https://gnomadstudio.org/gnomad-capture" },
};

export const gnomadCaptureSupportMetadata = {
    title: "Gnomad Capture Support | Gnomad Studio",
    description: "Get help with the Gnomad Capture Chrome extension — FAQs and contact support.",
    alternates: { canonical: "https://gnomadstudio.org/capture-support" },
};
