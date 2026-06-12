import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { PrivacyPolicy } from "@/lib/privacy-policies";

function renderListItem(item: string) {
    const emailMatch = item.match(/^Email: (.+)$/);
    if (emailMatch) {
        return (
            <>
                Email:{" "}
                <a href={`mailto:${emailMatch[1]}`} className="text-brand-secondary hover:text-white transition-colors">
                    {emailMatch[1]}
                </a>
            </>
        );
    }
    const websiteMatch = item.match(/^Website: (https:\/\/.+)$/);
    if (websiteMatch) {
        return (
            <>
                Website:{" "}
                <Link href="/" className="text-brand-secondary hover:text-white transition-colors">
                    {websiteMatch[1]}
                </Link>
            </>
        );
    }
    return item;
}

export default function PrivacyPolicyPage({ policy }: { policy: PrivacyPolicy }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <article className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12 px-4">
                        <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                            {policy.badge}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Privacy Policy</h1>
                        <p className="text-gray-400 text-sm">
                            Last updated: June 2026 · Developer:{" "}
                            <Link href="/" className="text-brand-secondary hover:text-white transition-colors">
                                Gnomad Studio
                            </Link>{" "}
                            (gnomadstudio.org)
                        </p>
                    </div>

                    <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/5 shadow-2xl bg-black/40 space-y-10 text-gray-300 leading-relaxed">
                        <p>{policy.intro}</p>

                        {policy.sections.map((section) => (
                            <section key={section.heading} className="space-y-4">
                                <h2 className="text-xl font-bold text-white">{section.heading}</h2>
                                {section.paragraphs?.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                                {section.list && (
                                    <ul className="list-disc pl-6 space-y-2 marker:text-brand-primary">
                                        {section.list.map((item) => (
                                            <li key={item}>{renderListItem(item)}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
