import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export type ExtensionFeature = {
    title: string;
    description: string;
};

export type ExtensionFaq = {
    question: string;
    answer: string;
};

export type ExtensionProduct = {
    badge: string;
    name: string;
    tagline: string;
    description: string;
    features: ExtensionFeature[];
    homeHref: string;
    privacyHref: string;
    supportHref: string;
    contactEmail: string;
    faqs?: ExtensionFaq[];
};

export function ExtensionHomePage({ product }: { product: ExtensionProduct }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 text-center mb-16 px-4">
                    <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                        {product.badge}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">{product.name}</h1>
                    <p className="text-xl text-brand-secondary font-medium mb-4">{product.tagline}</p>
                    <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">{product.description}</p>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 grid gap-6 md:grid-cols-3 px-4">
                    {product.features.map((feature) => (
                        <div
                            key={feature.title}
                            className="glass-panel p-6 rounded-2xl border-white/5 bg-black/40 text-left"
                        >
                            <h2 className="text-lg font-bold text-white mb-3">{feature.title}</h2>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto relative z-10 mt-12 px-4 text-center text-sm text-gray-500">
                    <Link href={product.privacyHref} className="text-brand-secondary hover:text-white transition-colors">
                        Privacy Policy
                    </Link>
                    <span className="mx-3">·</span>
                    <Link href={product.supportHref} className="text-brand-secondary hover:text-white transition-colors">
                        Support
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export function ExtensionSupportPage({ product }: { product: ExtensionProduct }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-40 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <article className="max-w-3xl mx-auto relative z-10">
                    <div className="text-center mb-12 px-4">
                        <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-6">
                            {product.badge}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Support</h1>
                        <p className="text-gray-400 text-sm">
                            Need help with {product.name}? Contact us or read the FAQs below.
                        </p>
                    </div>

                    <div className="glass-panel p-8 md:p-12 rounded-[2rem] border-white/5 shadow-2xl bg-black/40 space-y-8 text-gray-300 leading-relaxed">
                        <section className="text-center space-y-4">
                            <p>Email support:</p>
                            <a
                                href={`mailto:${product.contactEmail}`}
                                className="text-2xl font-semibold text-brand-secondary hover:text-white transition-colors"
                            >
                                {product.contactEmail}
                            </a>
                        </section>

                        {product.faqs && product.faqs.length > 0 && (
                            <section className="space-y-6 pt-4 border-t border-white/10">
                                <h2 className="text-xl font-bold text-white">Frequently asked questions</h2>
                                {product.faqs.map((faq) => (
                                    <div key={faq.question} className="space-y-2">
                                        <h3 className="font-semibold text-white">{faq.question}</h3>
                                        <p>{faq.answer}</p>
                                    </div>
                                ))}
                            </section>
                        )}

                        <p className="text-center text-sm text-gray-500 pt-4">
                            <Link href={product.homeHref} className="text-brand-secondary hover:text-white transition-colors">
                                ← Back to {product.name}
                            </Link>
                            <span className="mx-3">·</span>
                            <Link href={product.privacyHref} className="text-brand-secondary hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
