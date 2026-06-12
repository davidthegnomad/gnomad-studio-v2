import type { Metadata } from "next";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { buildPrivacyMetadata, privacyPolicies } from "@/lib/privacy-policies";

export const metadata: Metadata = buildPrivacyMetadata("midnight-gnomad-privacy") as Metadata;

export default function Page() {
    return <PrivacyPolicyPage policy={privacyPolicies["midnight-gnomad-privacy"]} />;
}
