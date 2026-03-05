"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AdvisoryPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-foreground font-sans selection:bg-brand-primary selection:text-white">

            {/* Navigation Header */}
            <nav className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center pointer-events-none">
                <div className="glass-panel rounded-full px-6 md:px-8 py-3 w-full max-w-5xl flex items-center justify-between border-white/10 shadow-2xl pointer-events-auto bg-black/40 backdrop-blur-md">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 md:pr-4 md:border-r border-white/20 shrink-0">
                        <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-lg mix-blend-screen" />
                        <div className="font-bold text-xs md:text-sm tracking-widest uppercase text-white">
                            Gnomad <span className="text-brand-secondary font-light">Advisory</span>
                            <span className="block text-[8px] md:text-[9px] text-gray-500 font-normal mt-0.5">Strategic Consulting</span>
                        </div>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <Link href="#methodology" className="hover:text-white transition-colors">Methodology</Link>
                        <Link href="#tiers" className="hover:text-white transition-colors">Services</Link>
                        <Link href="/" className="hover:text-brand-primary transition-colors text-white/50">View Studio</Link>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 transition-all duration-300 pointer-events-auto"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-brand-secondary transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu (Glassmorphic Dark Mode) */}
            <div
                className={`fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-8"
                    }`}
            >
                <div className="flex flex-col items-center gap-8 text-lg font-light tracking-[0.2em] uppercase text-gray-300 w-full px-6">
                    <Link href="#methodology" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-secondary transition-colors py-4 border-b border-white/5 w-full text-center">
                        Methodology
                    </Link>
                    <Link href="#tiers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-brand-secondary transition-colors py-4 border-b border-white/5 w-full text-center">
                        Services
                    </Link>
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors py-4 border-b border-white/5 w-full text-center text-gray-500">
                        View Studio
                    </Link>
                    <div className="pt-8 w-full max-w-xs">
                        <a
                            href="#audit"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block w-full text-center px-8 py-4 bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-brand-secondary hover:text-zinc-950 transition-colors"
                        >
                            Request Data Audit
                        </a>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 relative overflow-hidden pt-32">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-secondary/5 via-transparent to-zinc-950 z-0 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="z-10 max-w-4xl space-y-8 mt-16">
                    <div className="inline-block px-4 py-1.5 rounded-sm border border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                        Executive Optimization Partners
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6">
                        Stop running your million-dollar business on <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-yellow-500">scattered spreadsheets.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                        We bridge the gap between high-level strategy and technical data analytics. From automated Power BI dashboards to AI readiness roadmaps, we engineer efficiency for Muskogee&apos;s established businesses.
                    </p>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <a href="#audit" className="px-10 py-4 bg-white text-zinc-950 rounded-sm font-bold text-sm tracking-widest uppercase transition-all shadow-xl hover:bg-gray-200 hover:-translate-y-1">
                            Request Data Audit
                        </a>
                        <a href="#tiers" className="px-10 py-4 bg-transparent border border-white/20 text-white rounded-sm font-bold text-sm tracking-widest uppercase transition-all hover:bg-white/5 hover:-translate-y-1">
                            Explore Services
                        </a>
                    </div>
                </div>
            </main>

            {/* Methodology Section */}
            <section id="methodology" className="py-24 px-6 bg-zinc-900/30 border-y border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-sm font-black tracking-[0.2em] text-brand-secondary uppercase mb-4">The Friction Point</h2>
                            <h3 className="text-3xl md:text-4xl font-light text-white mb-6 leading-tight">
                                Most businesses have the data. <br />
                                <strong className="font-bold">They just can&apos;t see it.</strong>
                            </h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                You know your operational output, but do you know your <em>Focus Time Deficits</em>? You have an accountant for descriptive past-performance analytics, but who is running your <em>Prescriptive Analytics</em> to tell you exactly what process to fix tomorrow?
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Gnomad Advisory doesn&apos;t offer motivational coaching. We offer rigorous, framework-driven business analysis rooted in Lean Six Sigma (DMAIC) and the McKinsey 7S Model to plug profit leaks and scale your operations smoothly.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="glass-panel p-8 rounded-xl bg-black/40 border-white/5">
                                <div className="text-brand-primary text-3xl font-light mb-2">01</div>
                                <div className="font-bold text-white mb-1">Visibility</div>
                                <div className="text-xs text-gray-500">Automated Dashboards</div>
                            </div>
                            <div className="glass-panel p-8 rounded-xl bg-black/40 border-white/5 translate-y-8">
                                <div className="text-brand-secondary text-3xl font-light mb-2">02</div>
                                <div className="font-bold text-white mb-1">Efficiency</div>
                                <div className="text-xs text-gray-500">Process Optimization</div>
                            </div>
                            <div className="glass-panel p-8 rounded-xl bg-black/40 border-white/5">
                                <div className="text-amber-500 text-3xl font-light mb-2">03</div>
                                <div className="font-bold text-white mb-1">Strategy</div>
                                <div className="text-xs text-gray-500">McKinsey 7S Alignment</div>
                            </div>
                            <div className="glass-panel p-8 rounded-xl bg-black/40 border-white/5 translate-y-8">
                                <div className="text-emerald-500 text-3xl font-light mb-2">04</div>
                                <div className="font-bold text-white mb-1">Future</div>
                                <div className="text-xs text-gray-500">AI &amp; Automation</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Product Ladder Section */}
            <section id="tiers" className="py-32 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black tracking-[0.3em] text-gray-500 uppercase mb-4">Service Taxonomy</h2>
                        <h3 className="text-4xl md:text-5xl font-light text-white mb-6">The Advisory Ladder</h3>
                        <p className="text-gray-400 max-w-2xl mx-auto">From immediate data visibility to long-term AI-driven hyperautomation.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        {/* Tier 1 */}
                        <div className="glass-panel p-10 rounded-sm border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-brand-primary/50 transition-colors group">
                            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 flex items-center justify-center mb-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00878e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">Data Visibility</h4>
                            <div className="text-[10px] font-black tracking-widest uppercase text-brand-primary mb-6">Self-Service BI</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                                We transition your messy, scattered data into an interactive, automated executive dashboard (Tableau/Power BI). Move from basic descriptive analytics to instant diagnostic insights.
                            </p>
                            <ul className="space-y-3 text-xs text-gray-300 mb-8 border-t border-white/10 pt-6">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-primary" /> KPI Dashboard Creation</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-primary" /> Data Cleaning &amp; Integration</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-primary" /> Real-time Metric Tracking</li>
                            </ul>
                        </div>

                        {/* Tier 2 */}
                        <div className="glass-panel p-10 rounded-sm border-brand-secondary/30 bg-gradient-to-br from-brand-secondary/5 to-transparent relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#00bfc8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                            </div>
                            <div className="w-12 h-12 rounded-sm bg-brand-secondary/10 flex items-center justify-center mb-8 relative z-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00bfc8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2 relative z-10">Operational Optimizer</h4>
                            <div className="text-[10px] font-black tracking-widest uppercase text-brand-secondary mb-6 relative z-10">Process Redesign</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 relative z-10">
                                A rigorous audit of your internal friction points. We use DMAIC principles to identify "Profit Leaks" in your workforce and rebuild your standard operating procedures.
                            </p>
                            <ul className="space-y-3 text-xs text-gray-300 mb-8 border-t border-white/10 pt-6 relative z-10">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-secondary" /> Lean Six Sigma Audits</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-secondary" /> Workforce Utilization Parsing</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-brand-secondary" /> Implementation Oversight</li>
                            </ul>
                        </div>

                        {/* Tier 3 */}
                        <div className="glass-panel p-10 rounded-sm border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-amber-500/50 transition-colors group">
                            <div className="w-12 h-12 rounded-sm bg-amber-500/10 flex items-center justify-center mb-8">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-2">High-Ticket Niche</h4>
                            <div className="text-[10px] font-black tracking-widest uppercase text-amber-500 mb-6">AI &amp; ESG Readiness</div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
                                Bring Silicon Valley infrastructure to Main Street. We build safe roadmaps for generative AI integration and provide baseline ESG reporting for contractors targeting corporate bids.
                            </p>
                            <ul className="space-y-3 text-xs text-gray-300 mb-8 border-t border-white/10 pt-6">
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-500" /> Hyperautomation Roadmaps</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-500" /> AI Agent Workflow Design</li>
                                <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-500" /> ESG Compliance Baseline</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>

            {/* The Trojan Horse Lead Magnet */}
            <section id="audit" className="py-24 bg-brand-secondary/10 border-y border-brand-secondary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-secondary/20 to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-light text-white mb-6">Let us find the leak.</h2>
                    <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                        We offer established Muskogee businesses a <strong className="font-bold text-white">Free Diagnostic Data Audit</strong>. Securely share one week of messy operational data with us, and we will return one beautiful, prescriptive chart revealing a hidden inefficiency. Undeniable proof of value, zero obligation.
                    </p>
                    <a href="mailto:david@gnomadstudio.org?subject=Diagnostic%20Data%20Audit%20Request" className="inline-block px-12 py-5 bg-white text-zinc-950 font-black text-sm tracking-[0.2em] uppercase rounded-sm hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        Claim Your Audit
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 bg-zinc-950 text-center border-t border-white/5">
                <div className="flex justify-center mb-6 opacity-50">
                    <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={32} height={32} className="mix-blend-screen" />
                </div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-2">Gnomad Advisory</p>
                <p className="text-[10px] text-gray-600 tracking-widest uppercase">A division of Gnomad Studio • Muskogee, OK</p>
            </footer>

        </div>
    );
}
