"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Rocket, Monitor } from "lucide-react";

const demoSites = [
    {
        id: "champion-car-detailing",
        name: "Champion Mobile Detail",
        href: "https://demo8-gnomadstudio.web.app",
        description: "High-octane service site for auto detailing with premium mobile-first aesthetics.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "cutting-edge-lawn-service",
        name: "Cutting Edge Lawn",
        href: "https://demo5-gnomadstudio.web.app",
        description: "Elite landscaping and lawn maintenance service with high-conversion instant estimate flows.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "doggie-doo-mobile-grooming",
        name: "Doggie Doo Grooming",
        href: "https://demo4-gnomadstudio.web.app",
        description: "Premium mobile spa for Doodles and all-breed care. Cage-free, stress-free, driveway-direct.",
        tech: "Master Template v1",
        category: "Pet Services"
    },
    {
        id: "elevate-n-print",
        name: "Elevate N Print",
        href: "https://demo11-gnomadstudio.web.app",
        description: "Industrial-grade printing and branding platform with tactical quote engine.",
        tech: "Master Template v1",
        category: "Printing & Design"
    },
    {
        id: "grass-monkey-landscaping",
        name: "Grass Monkey Landscaping",
        href: "https://demo6-gnomadstudio.web.app",
        description: "Modern lead-gen platform with lush emerald aesthetics and dynamic estimate flow.",
        tech: "Master Template v1",
        category: "Service Industry"
    },
    {
        id: "green-st-dispensary",
        name: "Green St Dispensary",
        href: "https://demo10-gnomadstudio.web.app",
        description: "Modern dispensary interface with high-impact visual design and bright green accents.",
        tech: "Master Template v1",
        category: "Dispensary"
    },
    {
        id: "harrison-tire",
        name: "Harrison Tire & Supply",
        href: "https://demo3-gnomadstudio.web.app",
        description: "Industrial-grade auto repair and tire center with a mission-critical tactical quoting engine.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "muskogee-bail-bonds",
        name: "Muskogee Bail Bonds",
        href: "https://demo13-gnomadstudio.web.app",
        description: "Mission-critical emergency service portal with rapid-action Panic Button.",
        tech: "Master Template v1",
        category: "Emergency Services"
    },
    {
        id: "muskogee-tree-care",
        name: "Muskogee Tree Care",
        href: "https://demo9-gnomadstudio.web.app",
        description: "Professional tree service site with service area targeting and lead capture.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "tucker-photography",
        name: "Tucker Photography",
        href: "https://demo12-gnomadstudio.web.app",
        description: "Premier wedding and portrait photography with cinematic storytelling and timeless aesthetics.",
        tech: "Master Template v1",
        category: "Photography"
    },
    {
        id: "okie-paws",
        name: "Okie Paws",
        href: "https://demo7-gnomadstudio.web.app",
        description: "Fast, playful web store for a local dog grooming business with booking integration.",
        tech: "Master Template v1",
        category: "Pet Services"
    },
    {
        id: "paradise-donuts-muskogee",
        name: "Paradise Donuts Muskogee",
        href: "https://demo2-gnomadstudio.web.app",
        description: "Fresh, high-performance bakery interface with cinematic visuals and glassmorphism.",
        tech: "Master Template v1",
        category: "Bakery / Retail"
    },
    {
        id: "so-fetch",
        name: "So Fetch Grooming",
        href: "https://demo1-gnomadstudio.web.app",
        description: "Vibrant, mobile-first grooming experience with high-conversion booking.",
        tech: "Master Template v1",
        category: "Pet Services"
    },
    {
        id: "tb-custom-tinting",
        name: "TB Custom Tinting",
        href: "https://demo14-gnomadstudio.web.app",
        description: "Premium automotive film and window tinting showcase with tactical service highlights.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "jfr-tire-shop",
        name: "JFR Tire Shop",
        href: "https://demo15-gnomadstudio.web.app",
        description: "Industrial auto service portal for JFR Tire Shop with rugged, high-performance aesthetics.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "home-turf-of-muskogee",
        name: "Home Turf of Muskogee",
        href: "https://demo16-gnomadstudio.web.app",
        description: "Premium synthetic turf and landscaping showcase for Home Turf of Muskogee with lush visuals.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "e-j-mayes-auto-repair",
        name: "E.J. Mayes Auto Repair",
        href: "https://demo17-gnomadstudio.web.app",
        description: "Rugged, high-performance auto repair portal for E.J. Mayes with mission-critical service booking.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "cs-detailing",
        name: "CS Detailing",
        href: "https://demo18-gnomadstudio.web.app",
        description: "Premium mobile detailing showcase for CS Detailing with high-gloss visuals and tactical service menus.",
        tech: "Master Template v1",
        category: "Automotive"
    },
    {
        id: "aaron-and-son-custom-cabinets",
        name: "Aaron & Son Custom Cabinets",
        href: "https://demo19-gnomadstudio.web.app",
        description: "Exquisite woodworking and custom cabinetry showcase for Aaron & Son with artisan visual storytelling.",
        tech: "Master Template v1",
        category: "Furniture"
    },
    {
        id: "body-craft-supply",
        name: "Body Craft Supply",
        href: "https://demo20-gnomadstudio.web.app",
        description: "High-performance industrial tattooing and medical supply portal for Body Craft with precision-engineered UX.",
        tech: "Master Template v1",
        category: "Industrial Supply"
    },
    {
        id: "three-rivers-pools-and-spas",
        name: "Three Rivers Pools & Spas",
        href: "https://demo21-gnomadstudio.web.app",
        description: "Luxury aquatic retreat showcase for Three Rivers with tranquil visuals and premium service depth.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "wilcoxen-and-wilcoxen",
        name: "Wilcoxen & Wilcoxen",
        href: "https://demo22-gnomadstudio.web.app",
        description: "Regal, trust-engineered legal advocacy portal for Wilcoxen & Wilcoxen with principled design language.",
        tech: "Master Template v1",
        category: "Legal Services"
    },
    {
        id: "wild-west-junk-and-lawncare",
        name: "Wild West Junk & Lawncare",
        href: "https://demo23-gnomadstudio.web.app",
        description: "Rugged service portal for Wild West with dual-track scheduling for junk removal and lawn care.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "woodworth-lawn-and-tree-service",
        name: "Woodworth Lawn & Tree Service",
        href: "https://demo24-gnomadstudio.web.app",
        description: "Elite arboricultural and turf management showcase for Woodworth with towering visual impact.",
        tech: "Master Template v1",
        category: "Outdoor Services"
    },
    {
        id: "petes-machine-shop",
        name: "Pete's Machine Shop",
        href: "https://demo25-gnomadstudio.web.app",
        description: "Precision-engineered industrial manufacturing portal for Pete's with technical spec transparency.",
        tech: "Master Template v1",
        category: "Industrial Supply"
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
