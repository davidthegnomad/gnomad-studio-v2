import type { Metadata } from "next";
import { ExtensionHomePage } from "@/components/ExtensionProductPage";
import { gnomeKanDoHomeMetadata, gnomeKanDoProduct } from "@/lib/gnome-kan-do-pages";

export const metadata: Metadata = gnomeKanDoHomeMetadata;

export default function Page() {
    return <ExtensionHomePage product={gnomeKanDoProduct} />;
}
