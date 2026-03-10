"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";
import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    ChevronRight,
    Clock,
    ShieldCheck,
    CreditCard,
    Rocket,
    Zap,
    Globe
} from "lucide-react";
import Chatbot from "@/components/Chatbot";
import DocumentVault from "@/components/DocumentVault";
import AdminDashboard from "@/components/AdminDashboard";

import GaugeDial from "@/components/GaugeDial";
import GA4Widget from "@/components/GA4Widget";
import AccountSection from "@/components/AccountSection";

// --- Schema Definitions ---
interface ServiceItem {
    id: string;
    title: string;
    status: "Active" | "In Progress" | "Finalizing" | "Planned";
    iconName: string;
}

interface ClientProfile {
    firstName: string;
    tier: "Pioneer" | "Flagship";
    nextMilestone: string;
    nextMilestoneDate: string;
    invoiceAmount: number;
    invoiceDueDate: string;
    invoiceValueSummary: string;
    ga4WebsiteUri?: string;
    websiteUrl?: string;
    activeServices: ServiceItem[];
    totalStorageUsed: number;
    // === KPI Gauge fields (admin-set) ===
    websiteHealthScore?: number;   // 0-100
    leadsPerMonth?: number;        // 0-200
    pageSpeedScore?: number;       // 1-5
    seoScore?: number;             // 0-100
    uptimePercent?: number;        // 0-100
    features?: {
        chatbot: boolean;
        socialMediaManagement: boolean;
        businessConsulting: boolean;
        websiteUpdateFrequency: string;
    };
    monthlyPrice?: number;
    customerSince?: string;

    projectStatus?: string;
}

// Map snake_case database row to camelCase interface
const mapProfile = (row: any): ClientProfile => {
    return {
        firstName: row.first_name || "Client",
        tier: row.tier || "Pioneer",
        nextMilestone: row.features?.nextMilestone || "Onboarding Call",
        nextMilestoneDate: row.features?.nextMilestoneDate || "TBD",
        invoiceAmount: row.monthly_price || 0,
        invoiceDueDate: row.features?.invoiceDueDate || "TBD",
        invoiceValueSummary: row.features?.invoiceValueSummary || "Monthly Retainer",
        ga4WebsiteUri: row.ga4_website_uri,
        websiteUrl: row.website_url,
        activeServices: row.features?.activeServices || [],
        totalStorageUsed: row.total_storage_used || 0,
        websiteHealthScore: row.kpi_metrics?.websiteHealthScore || 0,
        leadsPerMonth: row.kpi_metrics?.leadsPerMonth || 0,
        pageSpeedScore: row.kpi_metrics?.pageSpeedScore || 0,
        seoScore: row.kpi_metrics?.seoScore || 0,
        uptimePercent: row.kpi_metrics?.uptimePercent || 99.9,
        features: {
            chatbot: row.features?.chatbot || false,
            socialMediaManagement: row.features?.socialMediaManagement || false,
            businessConsulting: row.features?.businessConsulting || false,
            websiteUpdateFrequency: row.features?.websiteUpdateFrequency || "Monthly"
        },
        monthlyPrice: row.monthly_price || 0,
        customerSince: row.created_at,
        projectStatus: row.project_status || 'Onboarding'
    }
}

// Fallback data if profile is not yet created
const defaultProfile: ClientProfile = {
    firstName: "Client",
    tier: "Pioneer",
    nextMilestone: "Onboarding Call",
    nextMilestoneDate: "TBD",
    invoiceAmount: 0,
    invoiceDueDate: "TBD",
    invoiceValueSummary: "Monthly Retainer",
    activeServices: [],
    totalStorageUsed: 0,
    websiteHealthScore: 0,
    leadsPerMonth: 0,
    pageSpeedScore: 0,
    seoScore: 0,
    uptimePercent: 99.9,
};

export default function ClientPortalDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<ClientProfile | null>(null);
    const [activeTab, setActiveTab] = useState<"dashboard" | "documents" | "admin" | "account">("dashboard");
    const [uid, setUid] = useState<string>("");

    const [isUserAdmin, setIsUserAdmin] = useState(false);

    const KPI_EXPLANATIONS = {
        health: "Think of this like a check-up for your website. A high score means your site is technically sound, secure, and ready to handle visitors without crashing.",
        marketing: "This measures how many new people are reaching out through your site. It's the 'heartbeat' of your business growth—more leads usually mean more customers.",
        speed: "This is how fast your site loads on phones and computers. If it's slow, people will leave before they even see what you offer. Fast sites keep customers happy.",
        seo: "This is how easily Google can find you. A high score means you're appearing higher in search results when people look for services like yours.",
        uptime: "This shows how often your site is 'open for business.' 100% means it's been live every second this month, with no technical outages."
    };

    useEffect(() => {
        const supabase = createClient();
        let subscription: any = null;

        const handleUser = async (user: any) => {
            if (user) {
                setUid(user.id);
                setIsUserAdmin(user.email === "david.the.gnomad@gmail.com" || user.email === "david@gnomadstudio.org");
                try {
                    // Fetch client profile from Supabase
                    console.log("Authenticated User UID:", user.id);
                    const { data: profileData, error } = await supabase
                        .from('client_profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (error && error.code !== 'PGRST116') { // PGRST116 is "Rows not found"
                        console.error("Error fetching client profile:", error);
                        throw error;
                    }

                    if (profileData) {
                        setProfile(mapProfile(profileData));
                    } else {
                        // Use default if no document exists yet
                        setProfile(defaultProfile);
                    }
                } catch (error) {
                    console.error("Error fetching client profile:", error);
                    setProfile(defaultProfile);
                } finally {
                    setLoading(false);
                }
            } else {
                // If not logged in client-side, redirect to login
                window.location.href = "/login";
            }
        };

        const setupAuthListener = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            await handleUser(session?.user ?? null);

            const { data } = supabase.auth.onAuthStateChange((_event, session) => {
                handleUser(session?.user ?? null);
            });
            subscription = data.subscription;
        };

        setupAuthListener();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // Helper to render dynamic icons
    const renderIcon = (iconName: string, className: string) => {
        const icons: any = { LayoutDashboard, ShieldCheck, FileText, Settings, Rocket };
        const IconComponent = icons[iconName] || FileText;
        return <IconComponent className={className} />;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0c15] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0c15] text-white font-sans selection:bg-brand-primary flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#14111d] flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <img
                        src="/assets/gnomad_logo_new.webp"
                        alt="Llama Logo"
                        className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                    />
                    <span className="font-bold tracking-tight text-lg">Gnomad Studio</span>
                </div>


                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveTab("dashboard")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all text-left ${activeTab === "dashboard" ? "bg-brand-primary/10 text-brand-secondary" : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </button>
                    <button onClick={() => router.push('/client-portal/resources')} className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-sm transition-all text-left group">
                        <Rocket className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
                        Resources <span className="ml-auto text-[10px] bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">NEW</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("documents")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all text-left ${activeTab === "documents" ? "bg-brand-primary/10 text-brand-secondary" : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Documents
                    </button>
                    {isUserAdmin && (
                        <button
                            onClick={() => setActiveTab("admin")}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all text-left ${activeTab === "admin" ? "bg-amber-400/10 text-amber-400" : "text-zinc-400 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Admin
                        </button>
                    )}
                    <button
                        onClick={() => setActiveTab("account")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm transition-all text-left ${activeTab === "account" ? "bg-brand-primary/10 text-brand-secondary" : "text-zinc-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        <Settings className="w-4 h-4" />
                        Account
                    </button>
                </nav>


                <button
                    onClick={handleLogout}
                    className="mt-auto flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-lg font-medium text-sm transition-all"
                >
                    <LogOut className="w-4 h-4" />
                    Secure Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-24 md:pb-0 relative">
                <header className="sticky top-0 z-10 bg-[#0f0c15]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center md:hidden">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        Portal
                    </h1>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto p-8 md:p-12 space-y-12"
                >
                    {activeTab === "dashboard" ? (
                        <>
                            {/* ── Welcome + Status Banner ── */}
                            <motion.section variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <div className="flex items-center gap-4 mb-2">
                                        {isUserAdmin && (
                                            <div className="p-2 bg-brand-primary/10 rounded-xl border border-brand-primary/20">
                                                <img src="/assets/gnomad_logo_new.webp" alt="Admin" className="w-8 h-8 object-contain drop-shadow-[0_0_10px_rgba(45,212,191,0.2)]" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1 leading-none">Client Command Center</p>
                                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                                Welcome back, <span className="bg-gradient-to-r from-brand-secondary to-brand-accent bg-clip-text text-transparent">
                                                    {isUserAdmin ? "David the Gnomad" : profile?.firstName}
                                                </span>
                                                {isUserAdmin && (
                                                    <span className="ml-3 text-[10px] font-black bg-amber-400 text-black px-2 py-0.5 rounded-md tracking-tighter uppercase align-middle">ADMIN</span>
                                                )}
                                            </h2>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-3 mt-4">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold border ${profile?.tier === "Flagship" ? "bg-amber-400/5 border-amber-400/20 text-amber-400" : "bg-teal-400/5 border-teal-400/20 text-teal-400"}`}>
                                            <Zap className="w-3 h-3 fill-current" />
                                            {profile?.tier} Tier
                                        </div>
                                        {profile?.websiteUrl && (
                                            <a
                                                href={profile.websiteUrl.startsWith("http") ? profile.websiteUrl : `https://${profile.websiteUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                                            >
                                                <Globe className="w-3 h-3" />
                                                {profile.websiteUrl}
                                            </a>
                                        )}
                                    </div>

                                </div>
                                {/* Milestone Alert */}
                                <div className="flex items-center gap-3 bg-brand-secondary/5 border border-brand-secondary/20 rounded-2xl px-5 py-3">
                                    <Clock className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Next Milestone</p>
                                        <p className="text-sm font-bold">{profile?.nextMilestone}</p>
                                        <p className="text-[10px] text-zinc-500">{profile?.nextMilestoneDate}</p>
                                    </div>
                                </div>
                            </motion.section>

                            {/* ── Main Gauges Row ── */}
                            <motion.section variants={itemVariants}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Website Health */}
                                    <div className="bg-[#14111d] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-2 relative group hover:border-white/10 transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/3 to-transparent group-hover:from-teal-500/6 rounded-2xl transition-all" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 self-start">Website Performance</p>
                                        <GaugeDial
                                            value={profile?.websiteHealthScore ?? 0}
                                            max={100}
                                            label="Website Health Score"
                                            sublabel="out of 100"
                                            explanation={KPI_EXPLANATIONS.health}
                                            unit=""
                                            size="large"
                                        />
                                        {(profile?.websiteHealthScore ?? 0) === 0 && (
                                            <p className="text-[10px] text-zinc-600 text-center">Score pending — your account manager is evaluating your site</p>
                                        )}
                                    </div>

                                    {/* Marketing Reach */}
                                    <div className="bg-[#14111d] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-2 relative group hover:border-white/10 transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-transparent group-hover:from-purple-500/6 rounded-2xl transition-all" />
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 self-start">Marketing Reach</p>
                                        <GaugeDial
                                            value={profile?.leadsPerMonth ?? 0}
                                            max={100}
                                            label="New Leads Per Month"
                                            sublabel="leads / mo"
                                            explanation={KPI_EXPLANATIONS.marketing}
                                            size="large"
                                            colorZones={[
                                                { min: 0, max: 25, color: "#ef4444" },
                                                { min: 25, max: 60, color: "#f59e0b" },
                                                { min: 60, max: 100, color: "#10b981" },
                                            ]}
                                            formatValue={(v) => String(Math.round(v))}
                                        />
                                        {(profile?.leadsPerMonth ?? 0) === 0 && (
                                            <p className="text-[10px] text-zinc-600 text-center">Tracking starts once your marketing campaign is live</p>
                                        )}
                                    </div>
                                </div>
                            </motion.section>

                            {/* ── Small KPI Gauges Row ── */}
                            <motion.section variants={itemVariants}>
                                <div className="grid grid-cols-3 gap-4">
                                    {[{
                                        value: profile?.pageSpeedScore ?? 0,
                                        max: 5,
                                        label: "Page Speed",
                                        sublabel: "out of 5",
                                        zones: [
                                            { min: 0, max: 40, color: "#ef4444" },
                                            { min: 40, max: 75, color: "#f59e0b" },
                                            { min: 75, max: 100, color: "#10b981" },
                                        ],
                                        fmt: (v: number) => v.toFixed(1),
                                        expl: KPI_EXPLANATIONS.speed
                                    }, {
                                        value: profile?.seoScore ?? 0,
                                        max: 100,
                                        label: "SEO Score",
                                        sublabel: "out of 100",
                                        zones: [
                                            { min: 0, max: 33, color: "#ef4444" },
                                            { min: 33, max: 66, color: "#f59e0b" },
                                            { min: 66, max: 100, color: "#10b981" },
                                        ],
                                        fmt: (v: number) => String(Math.round(v)),
                                        expl: KPI_EXPLANATIONS.seo
                                    }, {
                                        value: profile?.uptimePercent ?? 99.9,
                                        max: 100,
                                        label: "Uptime",
                                        sublabel: "% this month",
                                        zones: [
                                            { min: 0, max: 95, color: "#ef4444" },
                                            { min: 95, max: 99, color: "#f59e0b" },
                                            { min: 99, max: 100, color: "#10b981" },
                                        ],
                                        fmt: (v: number) => `${v.toFixed(1)}%`,
                                        expl: KPI_EXPLANATIONS.uptime
                                    }].map((kpi) => (
                                        <div key={kpi.label} className="bg-[#14111d] border border-white/5 rounded-2xl p-4 flex flex-col items-center hover:border-white/10 transition-all">
                                            <GaugeDial
                                                value={kpi.value}
                                                max={kpi.max}
                                                label={kpi.label}
                                                sublabel={kpi.sublabel}
                                                explanation={kpi.expl}
                                                size="small"
                                                colorZones={kpi.zones}
                                                formatValue={kpi.fmt}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* ── Active Features + Services Row ── */}
                            <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Active Features Bar Chart */}
                                <div className="bg-[#14111d] border border-white/5 rounded-2xl p-6 space-y-5">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Features</p>
                                    {[
                                        { key: "chatbot", label: "Sterling AI Chatbot", color: "bg-brand-secondary", enabled: profile?.features?.chatbot },
                                        { key: "social", label: "Social Media Management", color: "bg-purple-500", enabled: profile?.features?.socialMediaManagement },
                                        { key: "consulting", label: "Business Consulting", color: "bg-amber-400", enabled: profile?.features?.businessConsulting },
                                        { key: "updates", label: `Website Updates (${profile?.features?.websiteUpdateFrequency ?? "Monthly"})`, color: "bg-blue-400", enabled: true },
                                    ].map((f) => (
                                        <div key={f.key} className="space-y-1.5">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-zinc-300">{f.label}</span>
                                                <span className={`text-[10px] font-black uppercase ${f.enabled ? "text-emerald-400" : "text-zinc-600"}`}>
                                                    {f.enabled ? "ACTIVE" : "INACTIVE"}
                                                </span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${f.enabled ? f.color : "bg-zinc-800"}`}
                                                    style={{ width: f.enabled ? "100%" : "15%" }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Active Services */}
                                <div className="bg-[#14111d] border border-white/5 rounded-2xl p-6 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Active Services</p>
                                    {profile?.activeServices && profile.activeServices.length > 0 ? (
                                        profile.activeServices.map((service, i) => (
                                            <div key={i} className="flex items-center justify-between p-3 bg-[#1e1b26] border border-white/5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-zinc-900 rounded-lg">
                                                        {renderIcon(service.iconName, "w-4 h-4 text-zinc-400")}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{service.title}</p>
                                                        <p className="text-[10px] text-zinc-500">{service.status}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-2 h-2 rounded-full ${service.status === "Active" ? "bg-emerald-400" : service.status === "In Progress" ? "bg-amber-400" : "bg-zinc-600"}`} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-6 text-center border border-dashed border-white/10 rounded-xl">
                                            <p className="text-zinc-600 text-xs">Services will appear here once provisioned by your account manager.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.section>

                            {/* ── Bottom Row: Invoice + CTA ── */}
                            <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-[#14111d] border border-brand-accent/20 rounded-2xl flex flex-col justify-between gap-4">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-zinc-400 text-sm font-medium">Next Invoice</span>
                                            <div className="p-2 bg-brand-accent/10 rounded-lg">
                                                <CreditCard className="w-4 h-4 text-brand-accent" />
                                            </div>
                                        </div>
                                        <p className="text-3xl font-bold">${(profile?.monthlyPrice ?? profile?.invoiceAmount ?? 0).toFixed(2)}</p>
                                        <p className="text-xs text-zinc-400 mt-1">Due: {profile?.invoiceDueDate}</p>
                                    </div>
                                    <div className="pt-3 border-t border-brand-accent/20">
                                        <p className="text-xs text-brand-accent/80 leading-relaxed font-medium">{profile?.invoiceValueSummary}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push('/client-portal/resources')}
                                    className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-secondary/20 rounded-2xl flex flex-col justify-between gap-4 text-left hover:border-brand-secondary/40 hover:scale-[1.01] transition-all group"
                                >
                                    <div className="p-3 bg-brand-secondary/10 w-fit rounded-xl">
                                        <Rocket className="w-6 h-6 text-brand-secondary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <p className="font-black text-lg tracking-tight">Intelligence Hub</p>
                                        <p className="text-zinc-500 text-sm mt-1">Run AI-powered market research, competitive analysis, and more.</p>
                                    </div>
                                    <span className="text-xs font-bold text-brand-secondary flex items-center gap-1">
                                        Open Hub <ChevronRight className="w-4 h-4" />
                                    </span>
                                </button>

                                {/* Owner-only: Live GA4 Analytics section */}
                                {isUserAdmin && (
                                    <motion.div variants={itemVariants} className="mt-2 bg-[#14111d] border border-white/5 rounded-2xl p-6">
                                        <GA4Widget />
                                    </motion.div>
                                )}
                            </motion.section>
                        </>
                    ) : activeTab === "documents" ? (
                        <motion.section variants={itemVariants}>
                            <DocumentVault uid={uid} totalStorageUsed={profile?.totalStorageUsed || 0} />
                        </motion.section>
                    ) : activeTab === "account" ? (
                        <motion.section variants={itemVariants}>
                            <AccountSection profile={profile ?? defaultProfile} />
                        </motion.section>
                    ) : (
                        <motion.section variants={itemVariants}>
                            <AdminDashboard />
                        </motion.section>
                    )}

                </motion.div>

                {/* Mobile Bottom Navigation (Visible only on small screens) */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0c15]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 z-50">
                    <div className="flex justify-between items-center text-zinc-500">
                        <button
                            onClick={() => setActiveTab("dashboard")}
                            className={`flex flex-col items-center gap-1 ${activeTab === "dashboard" ? "text-brand-secondary" : "hover:text-white"}`}
                        >
                            <LayoutDashboard className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Dashboard</span>
                        </button>
                        <button onClick={() => router.push('/client-portal/resources')} className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                            <Rocket className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Resources</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("documents")}
                            className={`flex flex-col items-center gap-1 ${activeTab === "documents" ? "text-brand-secondary" : "hover:text-white"}`}
                        >
                            <FileText className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Documents</span>
                        </button>
                        {isUserAdmin && (
                            <button
                                onClick={() => setActiveTab("admin")}
                                className={`flex flex-col items-center gap-1 ${activeTab === "admin" ? "text-amber-400" : "hover:text-white"}`}
                            >
                                <ShieldCheck className="w-6 h-6" />
                                <span className="text-[10px] font-medium">Admin</span>
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`flex flex-col items-center gap-1 ${activeTab === "account" ? "text-brand-secondary" : "hover:text-white"}`}
                        >
                            <Settings className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Account</span>
                        </button>
                        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400/80 hover:text-red-400 transition-colors">

                            <LogOut className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Logout</span>
                        </button>
                    </div>
                </div>
                <Chatbot />
            </main>
        </div>
    );
}
