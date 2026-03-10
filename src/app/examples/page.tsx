"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileDispatch from "@/components/MobileDispatch";
import MobileShowcase from "@/components/MobileShowcase";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
    {
        name: "Donut Shop",
        image: "/examples/Paradise_Donuts_Full_Site.webp",
        description: "A fresh, high-performance bakery interface with cinematic visuals, glassmorphism, and tactical local SEO.",
    },
    {
        name: "Tire & Supply",
        image: "/examples/Harrison_Tire_Full_Site.webp",
        description: "A powerhouse industrial design featuring tactical quoting systems and heavy-duty grid aesthetics.",
    },
    {
        name: "Mobile Pet Grooming",
        image: "/examples/Doggie_Doo_Full_Site.webp",
        description: "A premium, playful mobile spa experience with streamlined booking and high-fidelity pet photography.",
    },
    {
        name: "Lawncare",
        image: "/examples/Cutting_Edge_Full_Site.webp",
        description: "Sharp, horticultural excellence focusing on precision maintenance and sophisticated horticultural styling.",
    },
    {
        name: "Landscaping Company",
        image: "/examples/Grass_Monkey_Full_Site.webp",
        description: "A lush, emerald-themed landing page focusing on lawn care services and online estimate flows.",
    },
    {
        name: "Pet Groomer",
        image: "/examples/Okie_Paws_Full_Page.webp",
        description: "A fast, modern web store design for a local dog grooming business, featuring booking system and services showcase.",
    },
    {
        name: "Mobile Car Detail",
        image: "/examples/Champion_Mobile_Detail_Full_Site.webp",
        description: "A high-octane service site for an auto detailing business with heavy focus on mobile conversions.",
    },
    {
        name: "Family Clinic",
        image: "/examples/gomcdanielchiro_Full_Site.webp",
        description: "A clean, restorative earth-toned clinic site designed to build trust and capture local search.",
    },
    {
        name: "Boutique Cannabis Shop",
        image: "/examples/Blaze-N-Bake Site.webp",
        description: "A vibrant, appetizing design targeted at expanding the digital presence of a local bakery / food service.",
    },
    {
        name: "E-Commerce",
        image: "/examples/mcguaghranch_Full_Shop_Page.webp",
        description: "A rustic, farm-to-table shopping experience with dynamic 'Butchers Block' styling and seamless herd stock selection.",
    }
];

export default function ExamplesPage() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedImage]);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white pb-24 md:pb-0">
            <Navigation />

            <main className="pt-48 pb-24 px-6 relative overflow-hidden flex flex-col items-center min-h-[90vh]">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <div className="text-center mb-16 px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8"
                        >
                            Design Portfolio
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight"
                        >
                            Our Strategic<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">Exhibits.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
                        >
                            Explore our collection of impactful, engineered aesthetics built for the Muskogee business community.
                        </motion.p>
                    </div>

                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] mb-20">
                        {examples.map((item, i) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 flex-shrink-0 snap-center glass-panel group rounded-3xl overflow-hidden border border-white/5 bg-white/[0.02] flex flex-col"
                            >
                                <div
                                    className="relative h-64 w-full overflow-hidden bg-black/50 border-b border-white/5 cursor-pointer group-hover:border-brand-primary/50 transition-colors"
                                    onClick={() => setSelectedImage(item.image)}
                                    style={{ containerType: 'size' }}
                                >
                                    <motion.div
                                        className="w-full"
                                        initial={{ y: 0 }}
                                        whileHover={{ y: "calc(-100% + 100cqh)" }}
                                        transition={{ duration: 10, ease: "easeInOut" }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={1200}
                                            height={10000}
                                            className="w-full h-auto object-cover object-top"
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 pointer-events-none" />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-bold text-white mb-3">{item.name}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">
                                        {item.description}
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-black tracking-widest uppercase transition-colors"
                                    >
                                        I Want This
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>

                <MobileShowcase />

                {/* Blue Demo Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <Link
                        href="/demo"
                        className="px-12 py-5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black tracking-[0.2em] uppercase transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95"
                    >
                        View Live Demo
                    </Link>
                </motion.div>
            </main>

            <Footer />
            <MobileDispatch />

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-start justify-center overflow-y-auto p-0 md:p-8"
                    >
                        {/* Go Back / Exit button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="fixed top-6 left-6 md:top-8 md:left-8 z-[110] bg-green-500 text-white rounded-full p-4 shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center justify-center hover:scale-110 hover:bg-green-400 transition-all border-2 border-white/20"
                            aria-label="Close Preview"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl h-auto min-h-screen md:min-h-0 bg-black md:rounded-3xl overflow-hidden shadow-2xl mt-0 md:mt-12 mb-0 md:mb-12 border-0 md:border border-white/10"
                        >
                            <Image
                                src={selectedImage}
                                alt="Full screen website preview"
                                width={1920}
                                height={10000}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
