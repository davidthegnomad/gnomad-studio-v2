import type { Metadata } from "next";
import { ExtensionHomePage } from "@/components/ExtensionProductPage";
import { gnomadCaptureHomeMetadata, gnomadCaptureProduct } from "@/lib/gnomad-capture-pages";

export const metadata: Metadata = gnomadCaptureHomeMetadata;

export default function Page() {
    return <ExtensionHomePage product={gnomadCaptureProduct} />;
}
