import type { Metadata } from "next";
import { ExtensionSupportPage } from "@/components/ExtensionProductPage";
import { gnomeKanDoProduct, gnomeKanDoSupportMetadata } from "@/lib/gnome-kan-do-pages";

export const metadata: Metadata = gnomeKanDoSupportMetadata;

export default function Page() {
    return <ExtensionSupportPage product={gnomeKanDoProduct} />;
}
