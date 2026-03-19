"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

const demoSites = [
    { name: "Aaron & Son Custom Cabinets", href: "https://demo19-gnomadstudio.web.app", category: "Furniture" },
    { name: "Affordable Roofing Solutionz", href: "https://gnomad-studio-client.web.app/DEMO/affordable-roofing-solutionz/index.html", category: "Roofing Services" },
    { name: "Blaze-N-Bake", href: "/DEMO/blaze-n-bake/index.html", category: "Bakery / Retail" },
    { name: "Body Craft Supply", href: "https://demo20-gnomadstudio.web.app", category: "Industrial Supply" },
    { name: "Champion Mobile Detail", href: "https://demo8-gnomadstudio.web.app", category: "Automotive" },
    { name: "CS Detailing", href: "https://demo18-gnomadstudio.web.app", category: "Automotive" },
    { name: "Cutting Edge Lawn", href: "https://demo5-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "Doggie Doo Grooming", href: "https://demo4-gnomadstudio.web.app", category: "Pet Services" },
    { name: "E.J. Mayes Auto Repair", href: "https://demo17-gnomadstudio.web.app", category: "Automotive" },
    { name: "Elevate N Print", href: "https://demo11-gnomadstudio.web.app", category: "Printing & Design" },
    { name: "Fulton Fried Pies & Bakery", href: "/DEMO/fulton-fried-pies/index.html", category: "Bakery / Retail" },
    { name: "Grass Monkey Landscaping", href: "https://demo6-gnomadstudio.web.app", category: "Service Industry" },
    { name: "Green St Dispensary", href: "https://demo10-gnomadstudio.web.app", category: "Dispensary" },
    { name: "Harrison Tire & Supply", href: "https://demo3-gnomadstudio.web.app", category: "Automotive" },
    { name: "Home Turf of Muskogee", href: "https://demo16-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "JFR Tire Shop", href: "https://demo15-gnomadstudio.web.app", category: "Automotive" },
    { name: "L & M Tree Service", href: "https://demo35-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "LawnBros Outdoor Services", href: "https://demo34-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "Lifted Spirits Muskogee", href: "/DEMO/lifted-spirits/index.html", category: "Bar / Lounge" },
    { name: "Making It Happen Cleaning", href: "https://demo33-gnomadstudio.web.app", category: "Service Industry" },
    { name: "Max's Garage", href: "https://demo32-gnomadstudio.web.app", category: "Automotive" },
    { name: "Michael's Jewelry", href: "https://demo31-gnomadstudio.web.app", category: "Retail" },
    { name: "Muskogee Bail Bonds", href: "https://demo13-gnomadstudio.web.app", category: "Emergency Services" },
    { name: "Muskogee Tree Care", href: "https://demo9-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "Natural Nails Muskogee", href: "https://demo30-gnomadstudio.web.app", category: "Beauty & Wellness" },
    { name: "New Life Ministries", href: "https://demo29-gnomadstudio.web.app", category: "Non-Profit" },
    { name: "Okie Paws", href: "https://demo7-gnomadstudio.web.app", category: "Pet Services" },
    { name: "Oklahoma Uncontested Divorce", href: "https://demo28-gnomadstudio.web.app", category: "Legal Services" },
    { name: "Opulent Salon Suites", href: "https://demo27-gnomadstudio.web.app", category: "Beauty & Wellness" },
    { name: "Paradise Donuts Muskogee", href: "https://demo22-gnomadstudio.web.app", category: "Bakery / Retail" },
    { name: "Pete's Machine Shop", href: "https://demo25-gnomadstudio.web.app", category: "Industrial Supply" },
    { name: "Re-Up Muskogee", href: "/DEMO/re-up-muskogee/index.html", category: "Dispensary" },
    { name: "Scott's Repair Shop", href: "https://demo26-gnomadstudio.web.app", category: "Automotive" },
    { name: "So Fetch Grooming", href: "https://demo1-gnomadstudio.web.app", category: "Pet Services" },
    { name: "TB Custom Tinting", href: "https://demo14-gnomadstudio.web.app", category: "Automotive" },
    { name: "Three Rivers Pools & Spas", href: "https://demo21-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "Tucker Photography", href: "https://demo12-gnomadstudio.web.app", category: "Photography" },
    { name: "Wilcoxen & Wilcoxen", href: "https://demo22-gnomadstudio.web.app", category: "Legal Services" },
    { name: "Wild West Junk & Lawncare", href: "https://demo23-gnomadstudio.web.app", category: "Outdoor Services" },
    { name: "Woodworth Lawn & Tree Service", href: "https://demo24-gnomadstudio.web.app", category: "Outdoor Services" }
].sort((a, b) => a.name.localeCompare(b.name));

export default function DemoPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-brand-primary selection:text-white font-mono">
            <Navigation />

            <main className="pt-48 pb-24">
                {/* Header Section */}
                <section className="px-6 mb-20">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 text-brand-primary text-[10px] font-black tracking-[0.3em] uppercase mb-4"
                        >
                            <Terminal className="w-4 h-4" />
                            Gnomad Workshop Inventory
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
                        >
                            Active <span className="text-gray-600">Development</span> Logs.
                        </motion.h1>
                        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed">
                            A non-public catalog of active project exhibits and tactical development previews.
                            Alphabetical index for internal design verification and board review.
                        </p>
                    </div>
                </section>

                {/* List Section */}
                <section className="px-6 max-w-4xl mx-auto">
                    <div className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02]">
                        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-white/5 border-b border-white/5 text-[10px] font-black tracking-widest uppercase text-gray-400">
                            <div className="col-span-8">Project Identity</div>
                            <div className="col-span-3 text-right">Technical Sector</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="divide-y divide-white/5">
                            {demoSites.map((site, idx) => (
                                <a
                                    key={idx}
                                    href={site.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="grid grid-cols-12 gap-4 px-8 py-6 hover:bg-white/[0.04] transition-all group items-center"
                                >
                                    <div className="col-span-8">
                                        <h3 className="text-sm font-bold group-hover:text-brand-primary transition-colors tracking-tight">
                                            {site.name}
                                        </h3>
                                    </div>
                                    <div className="col-span-3 text-right">
                                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                                            {site.category}
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex justify-end">
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-brand-primary transition-colors" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </div>
    );
}
