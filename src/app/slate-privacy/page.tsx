import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Gnomad Slate Privacy Policy | Gnomad Studio",
    description:
        "Privacy policy for the Gnomad Slate browser extension — local-first notes, Vault-X secrets, and optional encrypted sync.",
    alternates: { canonical: "https://gnomadstudio.org/slate-privacy" },
    robots: { index: true, follow: true },
};

function InlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="rounded bg-white/5 px-1.5 py-0.5 text-sm text-brand-secondary font-mono">
            {children}
        </code>
    );
}

export default function SlatePrivacyPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <article className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12 px-4">
                        <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                            Gnomad Slate
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Last updated: June 2026 · Developer:{" "}
                            <Link href="/" className="text-brand-secondary hover:text-white transition-colors">
                                Gnomad Studio
                            </Link>{" "}
                            (gnomadstudio.org)
                        </p>
                    </div>

                    <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/5 shadow-2xl bg-black/40 space-y-10 text-gray-300 leading-relaxed">
                        <p>
                            At Gnomad Studio, we build local-first tools. This Privacy Policy explains how the
                            Gnomad Slate browser extension processes your data.
                        </p>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">1. Our Core Privacy Philosophy</h2>
                            <p>Gnomad Slate is built to be secure, private, and local-first:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-primary">
                                <li>We do not run any database servers, authentication portals, or sync servers.</li>
                                <li>We do not collect, read, transmit, or sell any of your notes or passwords.</li>
                                <li>No analytics trackers or telemetry scripts are bundled in the extension.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">2. Data We Process and Where It Lives</h2>
                            <p>
                                All information you input into Gnomad Slate remains in secure browser sandboxes or your
                                own personal cloud accounts:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 marker:text-brand-primary">
                                <li>
                                    <strong className="text-white">Markdown Notes &amp; Scratchpad:</strong> Notes are
                                    saved locally in the browser&apos;s private local storage partition (
                                    <InlineCode>chrome.storage.local</InlineCode>). They are never sent to Gnomad Studio.
                                </li>
                                <li>
                                    <strong className="text-white">Vault-X Secrets (API Keys, Tokens):</strong> Secrets
                                    are encrypted client-side using <strong className="text-white">AES-256-GCM</strong> with
                                    a key derived from your master password using{" "}
                                    <strong className="text-white">PBKDF2-HMAC-SHA256</strong>. The decrypted secrets exist
                                    only in the temporary background memory of the extension service worker while the
                                    vault is unlocked.
                                </li>
                                <li>
                                    <strong className="text-white">Master Password:</strong> Your master password is never
                                    stored in plaintext. It is verified using a cryptographic salt and hash stored in your
                                    browser&apos;s local storage.
                                </li>
                                <li>
                                    <strong className="text-white">Clipboard History:</strong> The Clipboard History Capsule
                                    saves text entries in-memory only (<InlineCode>chrome.storage.session</InlineCode>).
                                    It is cleared automatically when you close the browser. If the clipboard filter is
                                    active, it runs locally in JavaScript and does not transmit data.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">3. Optional Cross-Device Synchronization</h2>
                            <p>
                                If you choose to enable synchronization, data is moved via third-party channels that you
                                control:
                            </p>
                            <ul className="list-disc pl-6 space-y-3 marker:text-brand-primary">
                                <li>
                                    <strong className="text-white">Chrome Profile Sync:</strong> Syncs settings and small
                                    vaults using Google&apos;s native <InlineCode>chrome.storage.sync</InlineCode> profile
                                    sync. This is governed by your Google Account privacy settings.
                                </li>
                                <li>
                                    <strong className="text-white">Google Drive AppData Sync:</strong> Syncs notes and
                                    secrets to a hidden, private application folder on your personal Google Drive (
                                    <InlineCode>appDataFolder</InlineCode>).
                                    <ul className="list-disc pl-6 mt-2 space-y-2 marker:text-brand-secondary">
                                        <li>
                                            <strong className="text-white">Zero-Knowledge Encryption:</strong> If sync is
                                            enabled, notes are encrypted client-side using your derived vault key{" "}
                                            <em>before</em> leaving your browser. Gnomad Studio and Google have zero access
                                            to the contents of your synced notes or vault.
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">4. Third-Party Permissions Declared</h2>
                            <p>The extension requests the following permissions from your browser:</p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-brand-primary">
                                <li>
                                    <InlineCode>storage</InlineCode>: Required to save your notes, configuration, and
                                    encrypted vault locally.
                                </li>
                                <li>
                                    <InlineCode>sidePanel</InlineCode>: Required to display the Gnomad Slate scratchpad in
                                    your browser&apos;s side panel.
                                </li>
                                <li>
                                    <InlineCode>identity</InlineCode>: Required to request authorization to sync files to
                                    your own Google Drive.
                                </li>
                                <li>
                                    <InlineCode>clipboardRead</InlineCode> &amp; <InlineCode>clipboardWrite</InlineCode>:
                                    Required to allow you to quickly copy passwords to your clipboard and populate the
                                    in-memory clipboard history modal.
                                </li>
                                <li>
                                    <InlineCode>notifications</InlineCode>: Required to notify you when sync operations
                                    succeed or fail.
                                </li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">5. Changes to This Policy</h2>
                            <p>
                                As a local-first extension, we will never change the core behavior of Gnomad Slate to
                                collect user data. If we introduce new features (such as integrations with other cloud
                                providers), they will remain opt-in and client-side encrypted.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-white">6. Contact Us</h2>
                            <p>If you have any questions about this privacy policy, please contact us at:</p>
                            <ul className="list-none space-y-2">
                                <li>
                                    Email:{" "}
                                    <a
                                        href="mailto:support@gnomadstudio.org"
                                        className="text-brand-secondary hover:text-white transition-colors"
                                    >
                                        support@gnomadstudio.org
                                    </a>
                                </li>
                                <li>
                                    Website:{" "}
                                    <Link href="/" className="text-brand-secondary hover:text-white transition-colors">
                                        https://gnomadstudio.org
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
