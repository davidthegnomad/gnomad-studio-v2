"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
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
    Globe,
    LucideIcon
} from "lucide-react";
import CommunicationHub from "@/components/CommunicationHub";
import DocumentVault from "@/components/DocumentVault";
import AdminDashboard from "@/components/AdminDashboard";

import GaugeDial from "@/components/GaugeDial";
import GA4Widget from "@/components/GA4Widget";
import AccountSection from "@/components/AccountSection";
import ZeffyModal from "@/components/ZeffyModal";

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
        activeServices?: ServiceItem[];
        nextMilestone?: string;
        nextMilestoneDate?: string;
        invoiceDueDate?: string;
        invoiceValueSummary?: string;
    };
    monthlyPrice: number;
    customerSince: string;
    projectStatus: string;
}

interface FeatureRow {
    nextMilestone?: string;
    nextMilestoneDate?: string;
    invoiceDueDate?: string;
    invoiceValueSummary?: string;
    activeServices?: ServiceItem[];
    chatbot?: boolean;
    socialMediaManagement?: boolean;
    businessConsulting?: boolean;
    websiteUpdateFrequency?: string;
}

interface KPIRow {
    websiteHealthScore?: number;
    leadsPerMonth?: number;
    pageSpeedScore?: number;
    seoScore?: number;
    uptimePercent?: number;
}

// Map snake_case database row to camelCase interface
const mapProfile = (row: Record<string, unknown>): ClientProfile => {
    const features = (row.features as FeatureRow) || {};
    const kpi_metrics = (row.kpi_metrics as KPIRow) || {};

    return {
        firstName: (row.first_name as string) || "Client",
        tier: (row.tier as "Pioneer" | "Flagship") || "Pioneer",
        nextMilestone: (features.nextMilestone as string) || "Onboarding Call",
        nextMilestoneDate: (features.nextMilestoneDate as string) || "TBD",
        invoiceAmount: (row.monthly_price as number) || 0,
        invoiceDueDate: (features.invoiceDueDate as string) || "TBD",
        invoiceValueSummary: (features.invoiceValueSummary as string) || "Monthly Retainer",
        ga4WebsiteUri: row.ga4_website_uri as string,
        websiteUrl: row.website_url as string,
        activeServices: (features.activeServices as ServiceItem[]) || [],
        totalStorageUsed: (row.total_storage_used as number) || 0,
        websiteHealthScore: (kpi_metrics.websiteHealthScore as number) || 0,
        leadsPerMonth: (kpi_metrics.leadsPerMonth as number) || 0,
        pageSpeedScore: (kpi_metrics.pageSpeedScore as number) || 0,
        seoScore: (kpi_metrics.seoScore as number) || 0,
        uptimePercent: (kpi_metrics.uptimePercent as number) || 99.9,
        features: {
            chatbot: (features.chatbot as boolean) || false,
            socialMediaManagement: (features.socialMediaManagement as boolean) || false,
            businessConsulting: (features.businessConsulting as boolean) || false,
            websiteUpdateFrequency: (features.websiteUpdateFrequency as string) || "Monthly"
        },
        monthlyPrice: (row.monthly_price as number) || 0,
        customerSince: row.created_at as string,
        projectStatus: (row.project_status as string) || 'Onboarding'
    }
}

export default function ClientPortal() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [uid, setUid] = useState<string | null>(null);
    const [profile, setProfile] = useState<ClientProfile | null>(null);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isUserAdmin, setIsUserAdmin] = useState(false);

    // UI state
    const [isZeffyOpen, setIsZeffyOpen] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        let subscription: { unsubscribe: () => void } | null = null;

        const handleUser = async (user: User | null) => {
            if (user) {
                setUid(user.id);
                setIsUserAdmin(user.email === "david.the.gnomad@gmail.com" || user.email === "david@gnomadstudio.org");
                try {
                    const { data, error } = await supabase
                        .from('client_profiles')
                        .select('*')
                        .eq('id', user.id)
                        .single();

                    if (data && !error) {
                        setProfile(mapProfile(data as Record<string, unknown>));
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                }
            } else {
                router.push("/auth/login");
            }
            setLoading(false);
        };

        // Initial check
        supabase.auth.getUser().then(({ data: { user } }) => handleUser(user));

        // Listen for changes
        const { data: { subscription: authSub } } = supabase.auth.onAuthStateChange(
            (_event, session) => handleUser(session?.user ?? null)
        );
        subscription = authSub;

        return () => {
            subscription?.unsubscribe();
        };
    }, [router]);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/auth/login");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="mb-8"
                >
                    <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Logo" width={60} height={60} />
                </motion.div>
                <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-brand-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                </div>
            </div>
        );
    }

    const renderIcon = (name: string) => {
        const icons: Record<string, LucideIcon> = { Globe, Zap, ShieldCheck, Rocket, Clock };
        const Icon = icons[name] || Globe;
        return <Icon className="w-5 h-5" />;
    };

    const StatusBadge = ({ status }: { status: ServiceItem["status"] }) => {
        const colors = {
            Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
            Finalizing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            Planned: "bg-white/5 text-zinc-500 border-white/10"
        };
        return (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Sidebar */}
            <aside className="w-72 border-r border-white/5 flex flex-col pt-8 bg-[#080808]">
                <div className="px-8 mb-12 flex items-center gap-3">
                    <Image src="/assets/gnomad_logo_new.webp" alt="Llama Logo" width={40} height={40} className="rounded-xl shadow-lg shadow-brand-primary/10" />
                    <div>
                        <h1 className="text-xl font-black tracking-tighter">STUDIO<span className="text-brand-primary">.</span></h1>
                        <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Client Portal v2</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {[
                        { id: "dashboard", label: "Overview", icon: LayoutDashboard },
                        { id: "documents", label: "Vault", icon: FileText },
                        { id: "comms", label: "Messenger", icon: Rocket },
                        { id: "account", label: "Subscription", icon: CreditCard },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${activeTab === item.id
                                ? "bg-brand-primary/10 text-brand-primary shadow-inner shadow-brand-primary/5"
                                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === item.id ? "text-brand-primary" : ""}`} />
                            <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            {activeTab === item.id && (
                                <motion.div layoutId="activeTab" className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(20,184,166,0.8)]" />
                            )}
                        </button>
                    ))}

                    {isUserAdmin && (
                        <button
                            onClick={() => setActiveTab("admin")}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group mt-4 border border-brand-accent/20 ${activeTab === "admin"
                                ? "bg-brand-accent/10 text-brand-accent shadow-inner shadow-brand-accent/5"
                                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                                }`}
                        >
                            <Settings className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === "admin" ? "text-brand-accent" : ""}`} />
                            <span className="font-bold text-sm tracking-tight uppercase tracking-wider text-[11px]">Admin Panel</span>
                        </button>
                    )}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 mb-4">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative">
                                <Image src="/assets/gnomad_logo_new.webp" alt="Admin" width={32} height={32} className="rounded-full border border-white/10" />
                                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#080808] rounded-full"></div>
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-xs font-bold truncate">{profile?.firstName || "Client"}</p>
                                <p className="text-[10px] text-zinc-500 truncate">{profile?.tier} Partner</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-10 pt-16">
                    {/* Header with Title and Global Actions */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-2 py-0.5 bg-brand-primary/10 text-brand-primary text-[10px] font-black rounded-lg border border-brand-primary/20 tracking-wider">WORKSPACE</span>
                                <h1 className="text-4xl font-black tracking-tight text-white capitalize">{activeTab}</h1>
                            </div>
                            <p className="text-zinc-500 font-medium">Welcome back, {profile?.firstName}. Project status: <span className="text-brand-primary font-bold">{profile?.projectStatus}</span></p>
                        </div>

                        {activeTab === "dashboard" && (
                            <div className="flex gap-3">
                                <button className="px-6 py-3 rounded-2xl bg-white text-black font-black text-xs hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 flex items-center gap-2">
                                    Book Strategy Call
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        setIsZeffyOpen(true);
                                    }}
                                    className="px-6 py-3 rounded-2xl bg-brand-primary text-white font-black text-xs hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/20 flex items-center gap-2"
                                >
                                    Quick Pay
                                    <CreditCard className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-12">
                        {activeTab === "dashboard" && (
                            <>
                                {/* Top KPI Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="glass-panel border p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Next Milestone</p>
                                            <Clock className="w-4 h-4 text-brand-primary" />
                                        </div>
                                        <p className="text-xl font-bold mb-1 text-white group-hover:text-brand-primary transition-colors">{profile?.nextMilestone}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-black text-brand-primary">{profile?.nextMilestoneDate}</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-primary to-transparent opacity-30"></div>
                                    </div>

                                    <div className="glass-panel border p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Services</p>
                                            <Rocket className="w-4 h-4 text-brand-accent" />
                                        </div>
                                        <div className="flex -space-x-3 mb-2">
                                            {profile?.activeServices.slice(0, 4).map((_, i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center text-[10px] font-black text-white shadow-xl">
                                                    {i + 1}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-xl font-bold text-white">{profile?.activeServices.length} Total Projects</p>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-brand-accent to-transparent opacity-30"></div>
                                    </div>

                                    <div className="glass-panel border p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Vault Usage</p>
                                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        </div>
                                        <p className="text-3xl font-black text-white mb-2">{profile?.totalStorageUsed}MB <span className="text-xs text-zinc-600 font-bold">/ 5GB</span></p>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(profile?.totalStorageUsed || 0) / 50}%` }}
                                                className="h-full bg-emerald-500"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-transparent opacity-30"></div>
                                    </div>

                                    <div className="glass-panel border p-6 rounded-3xl relative overflow-hidden group">
                                        <div className="flex items-center justify-between mb-4">
                                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Partnership</p>
                                            <CreditCard className="w-4 h-4 text-amber-400" />
                                        </div>
                                        <p className="text-xl font-bold text-white mb-1">{profile?.tier} Tier</p>
                                        <p className="text-xs text-zinc-500 font-bold">Since {new Date(profile?.customerSince || "").toLocaleDateString()}</p>
                                        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-amber-400 to-transparent opacity-30"></div>
                                    </div>
                                </div>

                                {/* KPI Metrics Visualized */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    <div className="lg:col-span-8 space-y-6">
                                        {/* Gauges */}
                                        <div className="glass-panel border p-10 rounded-[2.5rem] relative overflow-hidden">
                                            <div className="flex items-center justify-between mb-10">
                                                <div>
                                                    <h3 className="text-2xl font-black text-white mb-1">Strategic Health</h3>
                                                    <p className="text-sm text-zinc-500 font-medium">Real-time performance metrics</p>
                                                </div>
                                                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-xs font-bold border border-white/5">
                                                    Full Report
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                                <GaugeDial
                                                    value={profile?.websiteHealthScore || 0}
                                                    max={100}
                                                    label="Site Health"
                                                    sublabel="Overall"
                                                    size="large"
                                                />
                                                <GaugeDial
                                                    value={profile?.leadsPerMonth || 0}
                                                    max={200}
                                                    label="Leads"
                                                    sublabel="Monthly"
                                                    size="large"
                                                />
                                                <GaugeDial
                                                    value={profile?.pageSpeedScore || 0}
                                                    max={5}
                                                    label="Speed"
                                                    sublabel="Core Vitals"
                                                    size="large"
                                                    colorZones={[
                                                        { min: 0, max: 2, color: "#ef4444" },
                                                        { min: 2, max: 4, color: "#f59e0b" },
                                                        { min: 4, max: 5, color: "#10b981" }
                                                    ]}
                                                />
                                                <GaugeDial
                                                    value={profile?.seoScore || 0}
                                                    max={100}
                                                    label="SEO"
                                                    sublabel="Rank Score"
                                                    size="large"
                                                    colorZones={[
                                                        { min: 0, max: 50, color: "#ef4444" },
                                                        { min: 50, max: 80, color: "#f59e0b" },
                                                        { min: 80, max: 100, color: "#10b981" }
                                                    ]}
                                                />
                                            </div>
                                        </div>

                                        {/* Services List */}
                                        <div className="glass-panel border rounded-[2.5rem] overflow-hidden">
                                            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                                                <h3 className="text-xl font-black text-white">Project Roadmap</h3>
                                                <div className="flex gap-2">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Live</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="divide-y divide-white/5">
                                                {profile?.activeServices.map((service) => (
                                                    <div key={service.id} className="p-6 hover:bg-white/[0.02] transition-all group cursor-pointer flex items-center justify-between">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-brand-primary group-hover:bg-brand-primary/10 border border-white/5 transition-all">
                                                                {renderIcon(service.iconName)}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{service.title}</p>
                                                                <StatusBadge status={service.status} />
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-4 space-y-6">
                                        {/* GA4 Preview Card */}
                                        <GA4Widget />

                                        {/* Billing Summary */}
                                        <div className="glass-panel border p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent">
                                            <h3 className="text-xl font-black text-white mb-6">Payment Hub</h3>
                                            <div className="p-6 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 mb-6">
                                                <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-4">Pending Invoice</p>
                                                <div className="flex items-end justify-between mb-4">
                                                    <p className="text-4xl font-black text-white">${profile?.invoiceAmount}</p>
                                                    <p className="text-xs font-bold text-zinc-500 mb-1">Due {profile?.invoiceDueDate}</p>
                                                </div>
                                                <p className="text-sm text-zinc-400 font-medium mb-6 pt-4 border-t border-brand-primary/10">{profile?.invoiceValueSummary}</p>
                                                <button
                                                    onClick={() => setIsZeffyOpen(true)}
                                                    className="w-full py-4 rounded-2xl bg-brand-primary hover:bg-brand-secondary text-white font-black text-sm transition-all shadow-xl shadow-brand-primary/20 cursor-pointer"
                                                >
                                                    Settle Securely
                                                </button>
                                            </div>
                                            <div className="space-y-4">
                                                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all text-sm font-bold text-zinc-400 hover:text-white group">
                                                    View Invoice History
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                                <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all text-sm font-bold text-zinc-400 hover:text-white group">
                                                    Update Payment Method
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "comms" && profile && (
                            <CommunicationHub partnerProfile={profile} />
                        )}

                        {activeTab === "documents" && uid && profile && (
                            <DocumentVault uid={uid} totalStorageUsed={profile.totalStorageUsed} />
                        )}

                        {activeTab === "admin" && isUserAdmin && (
                            <AdminDashboard />
                        )}

                        {activeTab === "account" && profile && (
                            <AccountSection profile={profile} />
                        )}
                    </div>
                </div>
            </main>

            <ZeffyModal
                isOpen={isZeffyOpen}
                onClose={() => setIsZeffyOpen(false)}
            />
        </div>
    );
}
