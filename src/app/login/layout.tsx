import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Client Portal Login",
    description: "Secure login for Gnomad Studio clients.",
    robots: { index: false, follow: false },
    alternates: { canonical: "/login" },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
