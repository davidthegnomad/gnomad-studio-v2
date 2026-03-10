"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[95vh] text-center px-4 relative overflow-hidden pt-48">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />
            <div className="z-10 max-w-4xl space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-xs font-bold tracking-widest uppercase mb-4"
                >
                    Serving Muskogee &amp; The 918 Region
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter"
                >
                    Your Business Deserves<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">To Be Found.</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
                >
                    We build high-performance websites for Muskogee&apos;s small businesses —
                    from the barber opening his first chair to the start-up ready to scale.
                    <strong className="text-white"> Capital shouldn&apos;t be the barrier.</strong>
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <a href="#services" aria-label="View our service packages" className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-brand-secondary to-emerald-400 text-zinc-950 rounded-full font-bold text-lg transition-all shadow-xl shadow-brand-secondary/20 hover:scale-105 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] skew-x-12" />
                        <span className="relative z-10">See Our Packages</span>
                    </a>
                    <Link
                        href="/examples"
                        className="group relative px-10 py-5 bg-gradient-to-r from-emerald-400 to-yellow-400 text-zinc-950 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-400/20 hover:scale-105 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] skew-x-12" />
                        <span className="relative z-10 flex items-center gap-2">
                            Design Examples
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" /><circle cx="12" cy="12" r="3" /></svg>
                        </span>
                    </Link>
                    <Link href="/contact" aria-label="Contact us to learn more" className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-yellow-400 to-brand-accent text-zinc-950 rounded-full font-bold text-lg transition-all shadow-xl shadow-brand-accent/20 hover:scale-105 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_ease-in-out_infinite] skew-x-12" />
                        <span className="relative z-10">Talk To A Local</span>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
