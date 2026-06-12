import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { buildPrivacyMetadata, privacyPolicies } from "@/lib/privacy-policies";

export const metadata: Metadata = buildPrivacyMetadata("desktop-assistant-privacy") as Metadata;

export default function Page() {
    return <PrivacyPolicyPage policy={privacyPolicies["desktop-assistant-privacy"]} />;
}
