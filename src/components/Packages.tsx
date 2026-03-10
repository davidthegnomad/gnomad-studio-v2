"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Packages() {
    return (
        <section id="services" className="py-32 px-4">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Our Digital Mission</h2>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">We are a 501(c)(3) organization dedicated to providing high-end strategic and digital resources to local small businesses, solopreneurs, and community programs that lack access to traditional capital.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 relative">
                    {/* Pioneer (Origin Design) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-panel border rounded-[2.5rem] p-10 relative overflow-hidden group flex flex-col bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-2xl cursor-pointer card-pioneer"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none rounded-tr-[2.5rem] mix-blend-screen transition-opacity duration-700 group-hover:opacity-40" style={{ WebkitMaskImage: 'radial-gradient(circle at top right, black 20%, transparent 60%)', maskImage: 'radial-gradient(circle at top right, black 20%, transparent 60%)' }}>
                            <Image src="/assets/pioneer_wagon.webp" alt="Pioneer Wagon" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-start mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.71-2.13.09-3.05a3.91 3.91 0 0 1-3.09 0Z" /><path d="M18 10c.38 0 .76-.01 1.13-.03" /><path d="M11 13c.38 0 .76-.01 1.13-.03" /><path d="m14.5 18.5-3-3" /><path d="m11 11-3-3" /><path d="M9.91 5.25A1 1 0 0 1 10.89 4h1.72a1 1 0 0 1 .98 1.25l-.36 1.44a4.4 4.4 0 0 1-2.96 0l-.36-1.44Z" /><path d="M17.15 11.32a1 1 0 0 1-.86-1.42l.74-1.31a4.4 4.4 0 0 1 2.94 2.14l.74 1.31a1 1 0 0 1-.86 1.42h-2.68Z" /><path d="M3.56 10.63a1 1 0 0 1 .86-1.42h2.68a4.4 4.4 0 0 1 2.94 2.14l.74 1.31a1 1 0 0 1-.86 1.42l-.74-1.31Z" /><path d="M10 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1h-4V2Z" /></svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Pioneer</h3>
                        <div className="text-2xl font-black text-tier-mapa mb-1">Startup &amp; Single Location</div>
                        <p className="text-[10px] font-bold text-red-500/80 tracking-widest uppercase mb-6">$100/MO VALUE</p>

                        <p className="text-gray-400 mb-8 min-h-[80px] leading-relaxed text-sm">
                            For the barber opening his first chair. The family-owned taco truck.
                            The local craftsman moving from a garage to a storefront. <strong className="text-white/80 font-semibold">In 2026, if you aren&apos;t online, you don&apos;t exist.</strong>
                        </p>

                        <ul className="space-y-4 mb-10 text-sm flex-1">
                            {[
                                { label: "Professional Website", tip: "A real website with your own web address — not just a Facebook page. Looks professional on phones, tablets & computers." },
                                { label: "Business Analysis & Guidance", tip: "We sit down with you, learn your business inside and out, and tell you exactly what to fix and what to lean into." },
                                { label: "Google Maps & \"Near Me\" SEO", tip: "When someone nearby searches, we make sure your name shows up first — not your competitor's." },
                                { label: "Mobile-first Architecture", tip: "Your site is built to look perfect on a phone first — because that's how 80% of your customers will find you." },
                                { label: "Click-to-Call Integration", tip: "A big \"Call Now\" button on your site. Anyone can tap it and be calling you instantly." }
                            ].map((item, i) => (
                                <li key={i} className="relative group/tip flex items-center gap-3 text-white cursor-default">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <span className="text-gray-300 font-medium group-hover/tip:text-white transition-colors">{item.label}</span>
                                    <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-64 rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-[11px] text-gray-400 leading-relaxed shadow-2xl opacity-0 group-hover/tip:opacity-100 transition-all duration-300 z-50 transform translate-y-2 group-hover/tip:translate-y-0">
                                        {item.tip}
                                        <div className="absolute top-full left-6 border-[6px] border-transparent border-t-zinc-950" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/contact"
                            className="w-full mt-auto py-4 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-black text-sm tracking-[0.2em] uppercase text-center block"
                        >
                            Get Started
                        </Link>
                    </motion.div>

                    {/* Flagship (Featured Design) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-panel border-2 rounded-[2.5rem] p-10 relative overflow-hidden flex flex-col bg-gradient-to-br from-brand-secondary/[0.05] via-transparent to-transparent z-10 backdrop-blur-2xl group/card cursor-pointer card-flagship"
                    >
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-20 pointer-events-none rounded-tr-[2.5rem] mix-blend-screen transition-opacity duration-700 group-hover/card:opacity-40" style={{ WebkitMaskImage: 'radial-gradient(circle at top right, black 20%, transparent 60%)', maskImage: 'radial-gradient(circle at top right, black 20%, transparent 60%)' }}>
                            <Image src="/assets/flagship_battleship.webp" alt="Flagship Battleship" fill className="object-cover" />
                        </div>
                        <div className="flex items-center justify-start mb-8 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Flagship</h3>
                        <div className="text-2xl font-black text-tier-mapa mb-1">Ecommerce &amp; Expansion</div>
                        <p className="text-[10px] font-bold text-red-500/80 tracking-widest uppercase mb-6">$300/MO VALUE</p>

                        <p className="text-gray-400 mb-8 min-h-[80px] leading-relaxed text-sm">
                            Comprehensive brand engineering. Your contribution fuels our mission while transforming your business into a digital flagship.
                        </p>

                        <ul className="space-y-4 mb-10 text-sm flex-1">
                            {[
                                {
                                    label: "Everything in the Pioneer package",
                                    tip: (
                                        <div className="space-y-2">
                                            <p className="font-bold text-white border-b border-white/10 pb-1 mb-1">Pioneer Features Included:</p>
                                            <ul className="space-y-1 list-disc pl-4">
                                                <li>Professional Website</li>
                                                <li>Business Analysis &amp; Guidance</li>
                                                <li>Google Maps &amp; &quot;Near Me&quot; SEO</li>
                                                <li>Mobile-first Architecture</li>
                                                <li>Click-to-Call Integration</li>
                                            </ul>
                                        </div>
                                    )
                                },
                                { label: "Brand Identity & Logo", tip: "We design a professional logo and establish a consistent look and feel for your business." },
                                { label: "Business Analysis & Guidance", tip: "We look at how your business runs and help you find ways to save time or make more money." },
                                { label: "Online Payment Processing", tip: "Start taking credit cards and online payments directly through your site." },
                                { label: "Storefront Design & Management", tip: "A digital \"front window\" that shows off your products or services." },
                                { label: "Advanced SEO & Maps Dominance", tip: "We do deep work to make sure you stay at the very top of Google and Maps." }
                            ].map((item, i) => (
                                <li key={i} className="relative group/tip flex items-center gap-3 text-white cursor-default">
                                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                                    </div>
                                    <span className="text-gray-300 font-medium group-hover/tip:text-white transition-colors">{item.label}</span>
                                    <div className="pointer-events-none absolute bottom-full left-0 mb-2 w-64 rounded-xl bg-zinc-950 border border-white/10 px-4 py-3 text-[11px] text-gray-400 leading-relaxed shadow-2xl opacity-0 group-hover/tip:opacity-100 transition-all duration-300 z-50 transform translate-y-2 group-hover/tip:translate-y-0">
                                        {item.tip}
                                        <div className="absolute top-full left-6 border-[6px] border-transparent border-t-zinc-950" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/contact"
                            className="w-full mt-auto py-5 rounded-xl bg-white text-zinc-900 hover:bg-gray-100 transition-all font-black text-sm tracking-[0.2em] uppercase text-center block shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                        >
                            Get Started
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
