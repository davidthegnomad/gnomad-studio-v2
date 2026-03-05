"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Rocket, Monitor } from "lucide-react";

const demoSites = [
    {
        name: "Harrison Tire & Supply",
        href: "/DEMO/harrison-tire/index.html",
        description: "Industrial-grade auto repair and tire center with a mission-critical tactical quoting engine.",
        tech: "React / Tailwind v4",
        category: "Automotive"
    },
    {
        name: "Doggie Doo Grooming",
        href: "/DEMO/doggie-doo-mobile-grooming/index.html",
        description: "Premium mobile spa for Doodles and all-breed care. Cage-free, stress-free, driveway-direct.",
        tech: "React / Vite",
        category: "Pet Services"
    },
    {
        name: "Cutting Edge Lawn",
        href: "/DEMO/cutting-edge-lawn-service/index.html",
        description: "Elite landscaping and lawn maintenance service with high-conversion instant estimate flows.",
        tech: "React / Vite",
        category: "Outdoor Services"
    },
    {
        name: "Grass Monkey Landscaping",
        href: "/DEMO/grass-monkey-landscaping/index.html",
        description: "Modern lead-gen platform with lush emerald aesthetics and dynamic estimate flow.",
        tech: "React / Tailwind",
        category: "Service Industry"
    },
    {
        name: "Okie Paws",
        href: "/DEMO/okie-paws/index.html",
        description: "Fast, playful web store for a local dog grooming business with booking integration.",
        tech: "Next.js / UI-Kit",
        category: "Pet Services"
    },
    {
        name: "Champion Mobile Detail",
        href: "/DEMO/champion-car-detailing/index.html",
        description: "High-octane service site for auto detailing with premium mobile-first aesthetics.",
        tech: "Modern CSS / JS",
        category: "Automotive"
    },
    {
        name: "Muskogee Tree Care",
        href: "/DEMO/muskogee-tree-care/index.html",
        description: "Professional tree service site with service area targeting, lead capture, and Hey Siri FAQ.",
        tech: "Vite / React SEO",
        category: "Outdoor Services"
    },
    {
        name: "Green St Dispensary",
        href: "/DEMO/green-st-dispensary/index.html",
        description: "Modern dispensary interface with high-impact visual design and bright green accents.",
        tech: "Modern CSS / JS",
        category: "Dispensary"
    },
    {
        name: "Lifted Spirits Muskogee",
        href: "/DEMO/lifted-spirits/index.html",
        description: "Ethereal dispensary experience with age verification gate, ambient theme, and product showcase.",
        tech: "Modern CSS / JS",
        category: "Dispensary"
    }
];

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-background text-white selection:bg-brand-primary selection:text-white">
            <Navigation />

            <main className="pt-48 pb-24">
                {/* Hero Section */}
                <section className="px-6 mb-20">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8"
                        >
                            <Rocket className="w-3 h-3" />
                            Client Demo Portal
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight mb-8"
                        >
                            Live Development <span className="text-brand-secondary">Exhibits.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            Step inside our active workshop. These are live, interactive previews of the high-performance digital tools we build for our partners.
                        </motion.p>
                    </div>
                </section>

                {/* Demo Grid */}
                <section className="px-6 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {demoSites.map((site, idx) => (
                        <motion.a
                            key={idx}
                            href={site.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-panel group p-1 relative overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-500 block"
                        >
                            <div className="p-8 h-full flex flex-col">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-primary/20 transition-all duration-500">
                                        <Monitor className="w-6 h-6 text-gray-400 group-hover:text-brand-primary transition-colors" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest uppercase text-brand-secondary/80 bg-brand-secondary/5 px-3 py-1 rounded-full border border-brand-secondary/20">
                                        {site.tech}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{site.name}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                                    {site.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5 text-xs font-black tracking-widest uppercase">
                                    <span className="text-gray-500">{site.category}</span>
                                    <span className="flex items-center gap-2 text-brand-primary group-hover:gap-3 transition-all">
                                        Launch App
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-brand-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </motion.a>
                    ))}
                </section>

                <Footer />
            </main>
        </div>
    );
}
