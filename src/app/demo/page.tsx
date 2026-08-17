"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

const PITCH = "https://demo.gnomad.studio/muskogee";
const pitch = (slug: string) => `${PITCH}/${slug}/`;

const demoSites = [
    { name: "Aaron & Son Custom Cabinets", href: pitch("aaron-and-son-custom-cabinets"), category: "Furniture" },
    { name: "Affordable Roofing Solutionz", href: pitch("affordable-roofing-solutionz"), category: "Roofing Services" },
    { name: "Becca's Builds", href: pitch("beccas-builds"), category: "Furniture" },
    { name: "Body Craft Supply", href: pitch("body-craft-supply"), category: "Industrial Supply" },
    { name: "Bridges Lawn Care", href: pitch("bridges-lawn-care"), category: "Outdoor Services" },
    { name: "Champion Mobile Detail", href: pitch("champion-car-detailing"), category: "Automotive" },
    { name: "Cincinnati Radiator", href: pitch("cincinnati-radiator"), category: "Automotive" },
    { name: "CS Detailing", href: pitch("cs-detailing"), category: "Automotive" },
    { name: "Cutting Edge Lawn", href: pitch("cutting-edge-lawn-service"), category: "Outdoor Services" },
    { name: "DipStix Quick Lube", href: pitch("dipstix-quick-lube"), category: "Automotive" },
    { name: "Doggie Doo Grooming", href: pitch("doggie-doo-mobile-grooming"), category: "Pet Services" },
    { name: "E.J. Mayes Auto Repair", href: pitch("e-j-mayes-auto-repair"), category: "Automotive" },
    { name: "Elevate N Print", href: pitch("elevate-n-print"), category: "Printing & Design" },
    { name: "Filthy Gorgeous", href: pitch("filthy-gorgeous"), category: "Pet Services" },
    { name: "Fite Estate Honey", href: pitch("fite-estate-honey"), category: "Retail" },
    { name: "Fulton Fried Pies & Bakery", href: pitch("fulton-fried-pies"), category: "Bakery / Retail" },
    { name: "Grass Monkey Landscaping", href: pitch("grass-monkey-landscaping"), category: "Outdoor Services" },
    { name: "Green St Dispensary", href: pitch("green-st-dispensary"), category: "Dispensary" },
    { name: "Harrison Tire & Supply", href: pitch("harrison-tire"), category: "Automotive" },
    { name: "Home Turf of Muskogee", href: pitch("home-turf-of-muskogee"), category: "Outdoor Services" },
    { name: "Jack's Donuts Muskogee", href: pitch("jacks-donuts-muskogee"), category: "Bakery / Retail" },
    { name: "JFR Tire Shop", href: pitch("jfr-tire-shop"), category: "Automotive" },
    { name: "L & M Tree Service", href: pitch("l-and-m-tree-service"), category: "Outdoor Services" },
    { name: "LawnBros Outdoor Services", href: pitch("lawnbros-outdoor-services"), category: "Outdoor Services" },
    { name: "Making It Happen Cleaning", href: pitch("making-it-happen-cleaning-services"), category: "Service Industry" },
    { name: "Max's Garage", href: pitch("maxs-garage"), category: "Automotive" },
    { name: "Michael's Jewelry", href: pitch("michaels-jewelry"), category: "Retail" },
    { name: "Muskogee Bail Bonds", href: pitch("muskogee-bail-bonds"), category: "Emergency Services" },
    { name: "Muskogee Tree Care", href: pitch("muskogee-tree-care"), category: "Outdoor Services" },
    { name: "Natural Nails Muskogee", href: pitch("natural-nails-muskogee"), category: "Beauty & Wellness" },
    { name: "New Life Ministries", href: pitch("new-life-ministries"), category: "Non-Profit" },
    { name: "Okie Paws", href: pitch("okie-paws"), category: "Pet Services" },
    { name: "Oklahoma Uncontested Divorce", href: pitch("oklahoma-uncontested-divorce"), category: "Legal Services" },
    { name: "Opulent Salon Suites", href: pitch("opulent-salon-suites"), category: "Beauty & Wellness" },
    { name: "Paradise Donuts Muskogee", href: pitch("paradise-donuts-muskogee"), category: "Bakery / Retail" },
    { name: "Pete's Machine Shop", href: pitch("petes-machine-shop"), category: "Industrial Supply" },
    { name: "Robertson Tire", href: pitch("robertson-tire"), category: "Automotive" },
    { name: "Scott's Repair Shop", href: pitch("scotts-repair-shop"), category: "Automotive" },
    { name: "So Fetch Grooming", href: pitch("so-fetch"), category: "Pet Services" },
    { name: "TB Custom Tinting", href: pitch("tb-custom-tinting"), category: "Automotive" },
    { name: "Three Rivers Pools & Spas", href: pitch("three-rivers-pools-and-spas"), category: "Outdoor Services" },
    { name: "Tucker Photography", href: pitch("tucker-photography"), category: "Photography" },
    { name: "Victor's Janitorial", href: pitch("victors-janitorial"), category: "Service Industry" },
    { name: "Wilcoxen & Wilcoxen", href: pitch("wilcoxen-and-wilcoxen"), category: "Legal Services" },
    { name: "Wild West Junk & Lawncare", href: pitch("wild-west-junk-and-lawncare"), category: "Outdoor Services" },
    { name: "Woodworth Lawn & Tree Service", href: pitch("woodworth-lawn-and-tree-service"), category: "Outdoor Services" },
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
                            Live previews straight from the workbench — every build here is a Muskogee
                            business getting ready to be found. Yours could be next.
                        </p>
                        <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mt-4">
                            Hosted at{" "}
                            <a
                                href="https://demo.gnomad.studio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-primary hover:underline"
                            >
                                demo.gnomad.studio
                            </a>
                            .
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
