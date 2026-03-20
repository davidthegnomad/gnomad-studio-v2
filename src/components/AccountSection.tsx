"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    User,
    ShieldCheck,
    TrendingUp,
    Download,
    Globe,
    Lock,
    Zap,
    FileText,
    Mail,
    Calendar,
    Briefcase,
    BadgeCheck,
    Cpu
} from "lucide-react";


interface ClientProfile {
    firstName: string;
    email?: string;
    websiteUrl?: string;
    tier: "Pioneer" | "Flagship";
    customerSince?: string;
    websiteHealthScore?: number;
    leadsPerMonth?: number;
    pageSpeedScore?: number;
    seoScore?: number;
    uptimePercent?: number;
    ga4WebsiteUri?: string;
}

interface AccountSectionProps {
    profile: ClientProfile;
}

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AccountSection({ profile }: AccountSectionProps) {
    const formattedDate = profile.customerSince
        ? new Date(profile.customerSince).toLocaleDateString("en-US", { year: "numeric", month: "long" })
        : "January 2024";

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Header / Identity Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-brand-secondary/10 rounded-lg">
                            <User className="w-5 h-5 text-brand-secondary" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">Business Profile</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">{profile.firstName}</h2>
                    <div className="flex items-center gap-4 mt-3 text-zinc-400 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            Partner since {formattedDate}
                        </div>
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" />
                            {profile.email || "Contact Info Restricted"}
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-3">
                    <div className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-bold">{profile.tier} Tier</span>
                    </div>
                    <button className="px-4 py-2 bg-white text-black rounded-xl font-bold text-sm hover:scale-105 transition-all">
                        Upgrade Plan
                    </button>
                </motion.div>
            </div>

            {/* Modular Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Growth & ROI Card (Optimus) */}
                <motion.div variants={itemVariants} className="bg-[#14111d] border border-white/5 rounded-3xl p-6 space-y-4 relative overflow-hidden group">
                    <Image
                        src="/assets/gnomad_logo_new.webp"
                        alt=""
                        width={96}
                        height={96}
                        className="absolute -bottom-4 -right-4 object-contain opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none"
                    />

                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl">
                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Growth Metrics</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Acquisition Channel</h3>
                        <p className="text-zinc-500 text-xs mt-1">Measuring live Main Street performance.</p>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-400">Leads Generated</span>
                            <span className="font-bold text-emerald-400">{profile.leadsPerMonth || 0} / mo</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-400">Website Health</span>
                            <span className="font-bold text-white">{profile.websiteHealthScore || 0}%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-zinc-400">SEO Visibility</span>
                            <span className="font-bold text-white">{profile.seoScore || 0}/100</span>
                        </div>
                    </div>
                </motion.div>

                {/* Compliance & Privacy Card (Matlock) */}
                <motion.div variants={itemVariants} className="bg-[#14111d] border border-white/5 rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-zinc-900 rounded-2xl">
                            <ShieldCheck className="w-6 h-6 text-brand-secondary" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Legal & Safety</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Compliance Shield</h3>
                        <p className="text-zinc-500 text-xs mt-1">ADA Title II & Privacy Status.</p>
                    </div>
                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 text-sm text-emerald-400">
                            <BadgeCheck className="w-4 h-4" />
                            <span>WCAG 2.1 AA Compliant</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Lock className="w-4 h-4" />
                            <span>GDPR / CCPA Protected</span>
                        </div>
                        <button className="w-full mt-2 py-2 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/5 transition-colors">
                            Request Data Export
                        </button>
                    </div>
                </motion.div>

                {/* Agentic Mesh Status (Morpheous) */}
                <motion.div variants={itemVariants} className="bg-[#14111d] border border-white/5 rounded-3xl p-6 space-y-4 relative overflow-hidden group">
                    <Image
                        src="/assets/gnomad_logo_new.webp"
                        alt=""
                        width={96}
                        height={96}
                        className="absolute -top-4 -right-4 object-contain opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 pointer-events-none rotate-12"
                    />

                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-cyan-500/10 rounded-2xl">
                            <Cpu className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Live Mesh</span>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Autonomous Intel</h3>
                        <p className="text-zinc-500 text-xs mt-1">2026 Model Context Protocol active.</p>
                    </div>
                    <div className="space-y-3 pt-2 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400">AAIO Readiness</span>
                            <span className="text-cyan-400 font-medium">98.4%</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                            <span>Sitemap Indexing</span>
                            <span className="text-white">Continuous</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 italic text-[10px]">
                            <Zap className="w-3 h-3" />
                            llms.txt map deployed for Google Gemini
                        </div>
                    </div>
                </motion.div>

                {/* Brand Assets (Neo) */}
                <motion.div variants={itemVariants} className="bg-[#14111d] border border-white/5 rounded-3xl p-6 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-500/10 rounded-2xl">
                            <Briefcase className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter">Quick Assets</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Creative Identity</h3>
                        <p className="text-zinc-500 text-xs mt-1">Direct access to brand materials.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                        <button className="flex items-center justify-center gap-2 p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-2xl transition-all">
                            <Download className="w-4 h-4 text-zinc-400" />
                            <span className="text-[10px] font-bold">LOGOS</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-2xl transition-all">
                            <FileText className="w-4 h-4 text-zinc-400" />
                            <span className="text-[10px] font-bold">GUIDE</span>
                        </button>
                    </div>
                </motion.div>

                {/* --- Marketplace / Growth Section (Bento Refactor) --- */}
                <div className="lg:col-span-3 pt-8 pb-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-white/5" />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap px-4">Marketplace & Intelligence</h3>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>

                    {/* Bento Grid (Desktop) / Snap Scroller (Mobile) */}
                    <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">

                        {/* Tier Switcher (Large Bento) */}
                        <motion.div
                            variants={itemVariants}
                            className="min-w-[85vw] md:min-w-0 md:col-span-2 bg-gradient-to-br from-[#1e1b26] to-[#0f0c15] border border-amber-400/20 rounded-3xl p-8 relative overflow-hidden group snap-center flex flex-col justify-between min-h-[320px]"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <Image src="/assets/gnomad_logo_new.webp" alt="" width={128} height={128} className="object-contain" />
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-2 text-amber-400">
                                    <Zap className="w-5 h-5 fill-amber-400" />
                                    <span className="text-sm font-black uppercase tracking-widest">Upgrade to Flagship</span>
                                </div>
                                <h3 className="text-3xl font-bold max-w-lg">Unlock Strategic Intelligence</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                                    Shift from passive management to active growth. Adds weekly strategic consulting, deep forensic analysis, and priority development.
                                </p>
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row gap-6 mt-8 items-end md:items-center">
                                <div className="flex flex-wrap gap-2 flex-1">
                                    {["Weekly 1:1s", "Forensic SEO", "AAIO Priority"].map((f) => (
                                        <span key={f} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-zinc-300 border border-white/10 uppercase tracking-tighter">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-6 p-4 bg-zinc-950/50 rounded-2xl border border-white/5 w-full md:w-auto backdrop-blur-md">
                                    <div className="text-left">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Monthly Increment</p>
                                        <p className="text-2xl font-bold text-white">+$400<span className="text-xs text-zinc-500 font-normal">/mo</span></p>
                                    </div>
                                    <button className="flex-1 md:flex-none px-6 py-3 bg-amber-400 text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                                        LAUNCH
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Individual Service Hero (Intel Hub Transition Card) */}
                        <motion.div
                            variants={itemVariants}
                            className="min-w-[85vw] md:min-w-0 bg-brand-secondary/5 border border-brand-secondary/10 rounded-3xl p-8 flex flex-col justify-between group snap-center relative overflow-hidden min-h-[320px]"
                        >
                            <Image src="/assets/gnomad_logo_new.webp" alt="" width={128} height={128} className="absolute -top-6 -right-6 opacity-[0.05] rotate-12 group-hover:scale-110 transition-transform duration-700" />
                            <div className="space-y-4 relative z-10">
                                <div className="p-3 bg-brand-secondary/10 rounded-2xl w-fit">
                                    <Globe className="w-8 h-8 text-brand-secondary" />
                                </div>
                                <h3 className="font-bold text-2xl tracking-tight leading-tight">Intelligence<br />Hub Engine</h3>
                                <p className="text-zinc-500 text-sm mr-4 mt-2">Access your forensic data, deep demographics, and regional sentiment analysis.</p>
                            </div>
                            <button className="w-full mt-6 py-4 bg-brand-secondary text-zinc-950 font-black uppercase tracking-widest text-[11px] rounded-2xl hover:bg-white transition-all shadow-[0_0_30px_rgba(45,212,191,0.1)]">
                                ACCESS INTEL
                            </button>
                        </motion.div>

                        {/* Smaller Bento Cards Row */}
                        <div className="flex md:grid md:grid-cols-3 gap-6 md:col-span-3">
                            {/* SEO Card */}
                            <motion.div variants={itemVariants} className="min-w-[85vw] md:min-w-0 bg-[#14111d] border border-white/5 rounded-3xl p-6 hover:border-brand-secondary/30 transition-all flex flex-col justify-between group snap-center relative overflow-hidden min-h-[220px]">
                                <Image src="/assets/gnomad_logo_new.webp" alt="" width={80} height={80} className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
                                <div className="space-y-4">
                                    <div className="p-2.5 bg-brand-secondary/10 rounded-xl w-fit">
                                        <Globe className="w-5 h-5 text-brand-secondary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">SEO Turbo-Boost</h3>
                                        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Forensic audit and keyword injection to skyrocket local ranking.</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="font-bold text-white">$1,200</span>
                                    <button className="text-[10px] font-black text-brand-secondary hover:text-white transition-colors uppercase tracking-widest">DETAILS</button>
                                </div>
                            </motion.div>

                            {/* Chatbot Card */}
                            <motion.div variants={itemVariants} className="min-w-[85vw] md:min-w-0 bg-[#14111d] border border-white/5 rounded-3xl p-6 hover:border-cyan-400/30 transition-all flex flex-col justify-between group snap-center relative overflow-hidden min-h-[220px]">
                                <Image src="/assets/gnomad_logo_new.webp" alt="" width={80} height={80} className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
                                <div className="space-y-4">
                                    <div className="p-2.5 bg-cyan-400/10 rounded-xl w-fit">
                                        <Cpu className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Smart Chatbot</h3>
                                        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">Deploy autonomous &quot;Sterling&quot; agent trained on your business.</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="font-bold text-white">$750</span>
                                    <button className="text-[10px] font-black text-cyan-400 hover:text-white transition-colors uppercase tracking-widest">DETAILS</button>
                                </div>
                            </motion.div>

                            {/* Strategy Card */}
                            <motion.div variants={itemVariants} className="min-w-[85vw] md:min-w-0 bg-[#14111d] border border-white/5 rounded-3xl p-6 hover:border-brand-accent/30 transition-all flex flex-col justify-between group snap-center relative overflow-hidden min-h-[220px]">
                                <Image src="/assets/gnomad_logo_new.webp" alt="" width={80} height={80} className="absolute -bottom-4 -right-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
                                <div className="space-y-4">
                                    <div className="p-2.5 bg-brand-accent/10 rounded-xl w-fit">
                                        <BadgeCheck className="w-5 h-5 text-brand-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">Growth Deep Dive</h3>
                                        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">6 months of 1-on-1 strategy deep dives with David the Gnomad.</p>
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="font-bold text-white">$500<span className="text-[10px] text-zinc-500 font-normal">/mo</span></span>
                                    <button className="text-[10px] font-black text-brand-accent hover:text-white transition-colors uppercase tracking-widest">DETAILS</button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
