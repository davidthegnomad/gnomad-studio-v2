import type { Metadata } from "next";
import { ExtensionSupportPage } from "@/components/ExtensionProductPage";
import { gnomadCaptureProduct, gnomadCaptureSupportMetadata } from "@/lib/gnomad-capture-pages";

export const metadata: Metadata = gnomadCaptureSupportMetadata;

export default function Page() {
    return <ExtensionSupportPage product={gnomadCaptureProduct} />;
}
