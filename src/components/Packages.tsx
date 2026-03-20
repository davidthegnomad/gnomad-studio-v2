"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ZeffyModal from "./ZeffyModal";
import { Heart, Rocket, Target, Shield, CheckCircle2 } from "lucide-react";

interface PackagesProps {
    showGradientBackground?: boolean;
}

export default function Packages({ showGradientBackground = false }: PackagesProps = {}) {
    const [isZeffyOpen, setIsZeffyOpen] = useState(false);
    const [selectedForm, setSelectedForm] = useState<string | undefined>(undefined);

    const openZeffy = (formId?: string) => {
        setSelectedForm(formId);
        setIsZeffyOpen(true);
    };

    const maskClass = "absolute top-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none rounded-tr-[2.5rem] mix-blend-screen transition-opacity duration-700 [mask-image:radial-gradient(circle_at_top_right,black_20%,transparent_60%)]";

    const propellerFeatures = [
        { label: "Community Website", tip: "A focused 3-page site designed for clarity and impact." },
        { label: "Donation Integration", tip: "Seamless Zeffy setup to collect funds with zero fees." },
        { label: "Local SEO Basics", tip: "Visibility on Google for your community mission." },
        { label: "L2V Mobile Gateway", tip: "Optimized for mobile users to call or find you instantly." }
    ];

    const pioneerFeatures = [
        { label: "Elite Performance Hosting", tip: "The fastest infrastructure available for 2026 standards." },
        { label: "Gnomad Alpha Dashboard", tip: "Real-time visibility into your traffic and growth strategy." },
        { label: "Local SEO Strike Force", tip: "Dominance in Muskogee 'Near Me' search results." },
        { label: "Brand Alignment Audit", tip: "We ensure your digital presence matches your business vibe." },
        { label: "Morgan AI Voice (AIVA)", tip: "Morgan handles your missed calls and leads automatically." }
    ];

    const flagshipFeatures = [
        { label: "Full Brand Engineering", tip: "Complete visual identity, logo, and messaging system." },
        { label: "E-Commerce Command Center", tip: "Advanced inventory, billing, and global shipping logic." },
        { label: "IAO Market Dominance", tip: "Institutional-grade market research via ORACLE." },
        { label: "Automated Lead Funnels", tip: "Turn visitors into customers while you sleep." },
        { label: "Priority Mission Support", tip: "Direct 24/7 channel to our special operations team." }
    ];

    return (
        <section id="services" className={`py-40 px-4 ${showGradientBackground ? 'relative bg-gradient-to-r from-[#0d151c] to-[#2a1b18] overflow-hidden' : ''}`}>
            {showGradientBackground && (
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 rotate-180">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[100px] text-background fill-current">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            )}

            <div className={`max-w-7xl mx-auto ${showGradientBackground ? 'relative z-10' : ''}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Target className="w-3 h-3" /> Mission Zero Friction
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Choose Your Velocity</h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">Gnomad Studio removes the high cost of elite technology for Muskogee businesses. Pick the path that matches your ambition.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 relative">
                    {/* Propeller - Community / PWYC */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-panel border rounded-[3rem] p-8 relative overflow-hidden group flex flex-col bg-white/[0.01] hover:bg-white/[0.02] border-white/5 transition-all"
                    >
                        <div className="flex items-center justify-start mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/50 transition-colors">
                                <Heart className="w-6 h-6 text-zinc-400 group-hover:text-brand-primary transition-colors" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Propeller</h3>
                        <div className="text-xl font-bold text-zinc-500 mb-1">Non-Profits & Community</div>
                        <p className="text-[10px] font-black text-brand-primary tracking-widest uppercase mb-6">PAY WHAT YOU CAN</p>

                        <p className="text-zinc-500 mb-8 leading-relaxed text-sm h-20">
                            For community-led missions that need a professional voice without the burden of corporate costs.
                        </p>

                        <ul className="space-y-4 mb-10 text-xs flex-1">
                            {propellerFeatures.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-400">
                                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5">
                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                    </div>
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => openZeffy()}
                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all font-black text-[10px] tracking-[0.2em] uppercase"
                        >
                            Apply for PWYC
                        </button>
                    </motion.div>

                    {/* Pioneer - Small Biz */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel border-2 border-brand-primary/30 rounded-[3rem] p-10 relative overflow-hidden group flex flex-col bg-gradient-to-br from-brand-primary/[0.05] to-transparent shadow-[0_30px_60px_-15px_rgba(0,191,200,0.2)]"
                    >
                        <div className={`${maskClass} opacity-10 group-hover:opacity-30`}>
                            <Image src="/assets/pioneer_wagon.webp" alt="Pioneer Wagon" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-start mb-8 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/40 rotate-3">
                                <Rocket className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-2 relative z-10">Pioneer</h3>
                        <div className="text-xl font-black text-brand-primary mb-1">Small Business Tier</div>
                        <p className="text-[10px] font-black text-white/50 tracking-widest uppercase mb-8">$100/MO CONTRIBUTION</p>

                        <p className="text-gray-400 mb-8 leading-relaxed text-sm h-20">
                            The standard for high-performance localized growth. For businesses ready to own their market.
                        </p>

                        <ul className="space-y-4 mb-10 text-sm flex-1">
                            {pioneerFeatures.map((item, i) => (
                                <li key={i} className="relative group/tip flex items-center gap-3 text-white">
                                    <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/20">
                                        <CheckCircle2 className="w-3 h-3 text-brand-primary" />
                                    </div>
                                    <span className="text-gray-300 font-bold group-hover/tip:text-white transition-colors">{item.label}</span>
                                    <div className="pointer-events-none absolute bottom-full left-0 mb-3 w-64 rounded-2xl bg-zinc-950 border border-white/10 px-5 py-4 text-xs text-zinc-400 leading-relaxed shadow-3xl opacity-0 group-hover/tip:opacity-100 transition-all z-50 transform translate-y-2 group-hover/tip:translate-y-0 backdrop-blur-3xl">
                                        {item.tip}
                                        <div className="absolute top-full left-4 border-[8px] border-transparent border-t-zinc-950" />
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => openZeffy()}
                            className="w-full py-5 rounded-2xl bg-brand-primary text-white font-black text-xs tracking-[0.2em] uppercase shadow-xl shadow-brand-primary/20 hover:bg-cyan-500 transition-all"
                        >
                            Claim Territory
                        </button>
                    </motion.div>

                    {/* Flagship - Enterprise/Growth */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel border rounded-[3rem] p-10 relative overflow-hidden flex flex-col bg-white/[0.01] border-white/5 transition-all group"
                    >
                        <div className={`${maskClass} opacity-5 group-hover:opacity-20`}>
                            <Image src="/assets/flagship_battleship.webp" alt="Flagship Battleship" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-start mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-accent to-amber-500 flex items-center justify-center shadow-lg shadow-brand-accent/20">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 relative z-10 uppercase tracking-tighter">Flagship</h3>
                        <div className="text-xl font-bold text-brand-accent mb-1">The Expansion Suite</div>
                        <p className="text-[10px] font-black text-zinc-600 tracking-widest uppercase mb-8">$300/MO CONTRIBUTION</p>

                        <p className="text-zinc-500 mb-8 leading-relaxed text-sm h-20">
                            Unrestricted scale. Deep logistics, brand engineering, and institutional-grade intelligence.
                        </p>

                        <ul className="space-y-4 mb-10 text-xs flex-1">
                            {flagshipFeatures.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-400">
                                    <div className="w-4 h-4 rounded-full bg-zinc-800 flex items-center justify-center border border-white/5">
                                        <CheckCircle2 className="w-2.5 h-2.5" />
                                    </div>
                                    <span>{item.label}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => openZeffy()}
                            className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all font-black text-[10px] tracking-[0.2em] uppercase"
                        >
                            Access Full Suite
                        </button>
                    </motion.div>
                </div>
            </div>

            <ZeffyModal
                isOpen={isZeffyOpen}
                onClose={() => setIsZeffyOpen(false)}
                formId={selectedForm}
            />
        </section>
    );
}
