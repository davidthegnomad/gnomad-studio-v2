"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    return (
        <>
            <nav className="fixed top-6 left-0 w-full z-50 px-6 flex justify-between md:justify-center items-center pointer-events-none">
                {/* Desktop & Tablet Navigation */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden md:flex glass-panel rounded-full px-8 py-3 items-center gap-8 border-white/5 shadow-2xl pointer-events-auto"
                >
                    {isHomePage ? (
                        <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                            <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-lg mix-blend-screen" />
                            <div className="font-bold text-sm tracking-widest uppercase text-white">
                                Gnomad Studio
                                <span className="block text-[9px] text-gray-400 font-normal mt-0.5">Muskogee, OK</span>
                            </div>
                        </div>
                    ) : (
                        <Link href="/" className="flex items-center gap-3 pr-4 border-r border-white/10 hover:opacity-80 transition-opacity">
                            <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-lg mix-blend-screen" />
                            <div className="font-bold text-sm tracking-widest uppercase text-white">
                                Gnomad Studio
                                <span className="block text-[9px] text-gray-400 font-normal mt-0.5">Muskogee, OK</span>
                            </div>
                        </Link>
                    )}
                    <div className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <Link href="/#mission" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Mission</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </Link>
                        <Link href="/services" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Services</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </Link>
                        <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Story</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </a>
                    </div>
                </motion.div>

                {/* Mobile Nav Top Bar */}
                <div className="md:hidden flex items-center justify-between w-full pointer-events-auto">
                    {isHomePage ? (
                        <div className="glass-panel rounded-full px-5 py-2 flex items-center gap-3 border-white/5 shadow-2xl">
                            <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={32} height={32} className="w-8 h-8 object-contain drop-shadow-lg mix-blend-screen" />
                            <div className="font-bold text-xs tracking-widest uppercase text-white">
                                Gnomad Studio
                                <span className="block text-[8px] text-gray-400 font-normal mt-0.5">Muskogee, OK</span>
                            </div>
                        </div>
                    ) : (
                        <Link href="/" className="glass-panel rounded-full px-5 py-2 flex items-center gap-3 border-white/5 shadow-2xl hover:bg-white/5 transition-colors text-left">
                            <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={32} height={32} className="w-8 h-8 object-contain drop-shadow-lg mix-blend-screen" />
                            <div className="font-bold text-xs tracking-widest uppercase text-white">
                                Gnomad Studio
                                <span className="block text-[8px] text-gray-400 font-normal mt-0.5">Muskogee, OK</span>
                            </div>
                        </Link>
                    )}

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-12 h-12 glass-panel rounded-full flex items-center justify-center border-white/5 shadow-2xl z-[70] relative"
                        aria-label="Toggle Menu"
                    >
                        <div className="flex flex-col gap-[5px]">
                            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-5 h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                        </div>
                    </button>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`md:hidden absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-3xl z-[60] flex flex-col justify-center items-center pointer-events-auto`}
                        >
                            <div className="flex flex-col items-center gap-10 text-xl font-black tracking-widest uppercase text-white">
                                <Link href="/#mission" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">
                                    Our Mission
                                </Link>
                                <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-primary transition-colors">
                                    Services
                                </Link>
                                <a href="https://davidthegnomad.org" onClick={() => setIsMobileMenuOpen(false)} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">
                                    Our Story
                                </a>
                                <div className="flex flex-col gap-4 mt-8 w-full items-center">
                                    <Link
                                        href="/contact"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full px-10 py-4 bg-gradient-to-r from-brand-primary to-brand-accent rounded-full text-white shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all text-center"
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        href="/client-portal"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full px-10 py-4 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-black tracking-widest uppercase hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Lock className="w-3.5 h-3.5 text-brand-secondary" />
                                        Partner Login
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
                className="hidden md:flex fixed top-8 right-8 z-[60] items-center gap-3"
            >
                <Link
                    href="/client-portal"
                    title="Client Portal Login"
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 hover:text-brand-secondary transition-all shadow-2xl backdrop-blur-md group"
                >
                    <Lock className="w-5 h-5 transition-transform group-hover:scale-110" />
                </Link>
                <Link
                    href="/contact"
                    aria-label="Contact Gnomad Studio to start your project"
                    className="group relative inline-block px-10 py-4 bg-brand-primary text-white text-sm font-black tracking-widest uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-brand-primary/40 hover:shadow-brand-primary/60 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_0.8s_ease-in-out] skew-x-12" />
                    <span className="relative z-10">Get Started</span>
                </Link>
            </motion.div>
        </>
    );
}
