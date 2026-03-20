"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Edit2,
    Save,
    X,
    Loader2,
    CheckCircle2,
    ShieldAlert,
    UserPlus,
    DollarSign,
    Globe,
    RefreshCw,
    Bot,
    Share2,
    Briefcase,
    Calendar,
    ExternalLink,
    StickyNote,
    Lock,
    LineChart
} from "lucide-react";

interface ClientFeatures {
    chatbot: boolean;
    socialMediaManagement: boolean;
    businessConsulting: boolean;
    websiteUpdateFrequency: "Monthly" | "Bi-Weekly" | "Weekly" | "On-Demand";
}

interface ClientProfile {
    uid: string;
    firstName: string;
    email?: string;
    websiteUrl?: string;
    tier: "Pioneer" | "Flagship";
    monthlyPrice?: number;
    invoiceAmount: number;
    invoiceDueDate: string;
    invoiceValueSummary: string;
    customerSince?: string;
    projectStatus?: string;
    nextMilestone: string;
    nextMilestoneDate: string;
    features?: ClientFeatures;
    authorizations?: string[];
    ga4PropertyId?: string;
    ga4WebsiteUri?: string;
    internalNotes?: string;
    totalStorageUsed: number;
    // KPI Gauge fields (shown on client dashboard)
    websiteHealthScore?: number;
    leadsPerMonth?: number;
    pageSpeedScore?: number;
    seoScore?: number;
    uptimePercent?: number;
}

const ALL_AUTHORIZATIONS = [
    { key: "dashboard", label: "Dashboard" },
    { key: "resources", label: "Intelligence Hub" },
    { key: "documents", label: "Document Vault" },
    { key: "billing", label: "Billing" },
];

const defaultFeatures: ClientFeatures = {
    chatbot: false,
    socialMediaManagement: false,
    businessConsulting: false,
    websiteUpdateFrequency: "Monthly",
};

function tenureLabel(since?: string): string {
    if (!since) return "—";
    const start = new Date(since);
    const now = new Date();
    const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    if (months < 1) return "< 1 month";
    if (months < 12) return `${months} month${months > 1 ? "s" : ""}`;
    const years = Math.floor(months / 12);
    const rem = months % 12;
    return `${years}yr${rem > 0 ? ` ${rem}mo` : ""}`;
}

interface InputFieldProps {
    id: string;
    label: string;
    value: string | number | undefined;
    onChange: (val: string) => void;
    placeholder?: string;
    type?: string;
}

function InputField({ id, label, value, onChange, placeholder, type = "text" }: InputFieldProps) {
    return (
        <div className="space-y-1.5">
            <label htmlFor={id} className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</label>
            <input
                id={id}
                type={type}
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-secondary/50 outline-none transition-all"
            />
        </div>
    );
}

export default function AdminDashboard() {
    const [clients, setClients] = useState<ClientProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [editingClient, setEditingClient] = useState<ClientProfile | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newClient, setNewClient] = useState({ email: "", password: "", firstName: "", tier: "Pioneer", invoiceAmount: 0 });
    const [invoicingUid, setInvoicingUid] = useState<string | null>(null);
    const [invoiceToast, setInvoiceToast] = useState<{ uid: string; ok: boolean; msg: string } | null>(null);

    const sendInvoice = async (uid: string) => {
        setInvoicingUid(uid);
        try {
            const res = await fetch("/api/admin/invoices/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid }),
            });
            const data = await res.json();
            setInvoiceToast({ uid, ok: res.ok, msg: data.message || data.error || "Done" });
        } catch (e) {
            setInvoiceToast({ uid, ok: false, msg: e instanceof Error ? e.message : "Error" });
        } finally {
            setInvoicingUid(null);
            setTimeout(() => setInvoiceToast(null), 4000);
        }
    };

    const mrr = clients.reduce((acc, c) => acc + (Number(c.monthlyPrice ?? c.invoiceAmount) || 0), 0);

    useEffect(() => { fetchClients(); }, []);

    const fetchClients = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/clients");
            const data = await res.json();
            if (res.ok) setClients(data.clients);
            else throw new Error(data.error);
        } catch {
            setMessage({ type: "error", text: "Failed to load client directory." });
        } finally {
            setLoading(false);
        }
    };

    const handleSyncAuthUsers = async () => {
        setSyncing(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/sync-auth-users", { method: "POST" });
            const data = await res.json();
            if (res.ok) {
                setMessage({ type: "success", text: data.message });
                fetchClients();
            } else throw new Error(data.error);
        } catch (err) {
            setMessage({ type: "error", text: err instanceof Error ? err.message : "Sync failed" });
        } finally {
            setSyncing(false);
        }
    };

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/clients/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newClient)
            });
            if (res.ok) {
                setMessage({ type: "success", text: `Client ${newClient.firstName} created successfully.` });
                setIsAddModalOpen(false);
                setNewClient({ email: "", password: "", firstName: "", tier: "Pioneer", invoiceAmount: 0 });
                fetchClients();
            } else {
                const data = await res.json();
                throw new Error(data.error || "Creation failed");
            }
        } catch (err) {
            setMessage({ type: "error", text: err instanceof Error ? err.message : "Operation failed" });
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingClient) return;
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch("/api/admin/profile/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid: editingClient.uid,
                    updates: {
                        firstName: editingClient.firstName,
                        websiteUrl: editingClient.websiteUrl,
                        tier: editingClient.tier,
                        monthlyPrice: editingClient.monthlyPrice,
                        invoiceAmount: editingClient.monthlyPrice ?? editingClient.invoiceAmount,
                        invoiceDueDate: editingClient.invoiceDueDate,
                        invoiceValueSummary: editingClient.invoiceValueSummary,
                        customerSince: editingClient.customerSince,
                        projectStatus: editingClient.projectStatus,
                        nextMilestone: editingClient.nextMilestone,
                        nextMilestoneDate: editingClient.nextMilestoneDate,
                        features: editingClient.features,
                        authorizations: editingClient.authorizations,
                        ga4PropertyId: editingClient.ga4PropertyId,
                        ga4WebsiteUri: editingClient.ga4WebsiteUri,
                        internalNotes: editingClient.internalNotes,
                    }
                })
            });
            if (res.ok) {
                setMessage({ type: "success", text: `Updated ${editingClient.firstName}'s profile.` });
                setEditingClient(null);
                fetchClients();
            } else {
                const data = await res.json();
                throw new Error(data.error || "Update failed");
            }
        } catch (err) {
            setMessage({ type: "error", text: err instanceof Error ? err.message : "Operation failed" });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleFeature = (key: keyof Omit<ClientFeatures, "websiteUpdateFrequency">) => {
        if (!editingClient) return;
        setEditingClient({
            ...editingClient,
            features: {
                ...(editingClient.features ?? defaultFeatures),
                [key]: !(editingClient.features?.[key] ?? false),
            }
        });
    };

    const toggleAuth = (key: string) => {
        if (!editingClient) return;
        const current = editingClient.authorizations ?? [];
        const updated = current.includes(key) ? current.filter(a => a !== key) : [...current, key];
        setEditingClient({ ...editingClient, authorizations: updated });
    };

    const filteredClients = clients.filter(c =>
        (c.firstName ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.email ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.uid ?? "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-4 text-zinc-500">
                <Loader2 className="w-8 h-8 animate-spin text-brand-secondary" />
                <p className="font-medium">Loading Gnomad Client Directory...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border-b border-white/5 pb-10">
                <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-teal-400 to-amber-200 bg-clip-text text-transparent italic uppercase">
                        Admin Command Center
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-brand-secondary/10 border border-brand-secondary/20 rounded-full flex items-center gap-2">
                            <DollarSign className="w-3.5 h-3.5 text-brand-secondary" />
                            <span className="text-xs font-black text-brand-secondary uppercase">MRR: ${mrr?.toLocaleString() ?? "0"}</span>
                        </div>
                        <div className="px-4 py-1.5 bg-zinc-800/50 border border-white/5 rounded-full flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-zinc-400" />
                            <span className="text-xs font-black text-zinc-400 uppercase">{clients.length} Clients</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search directory..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#1e1b26] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={handleSyncAuthUsers}
                        disabled={syncing}
                        title="Import any Supabase Auth users who don't have a profile yet"
                        className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
                        SYNC USERS
                    </button>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="px-6 py-3 bg-brand-secondary text-black rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(45,212,191,0.2)]"
                    >
                        <UserPlus className="w-4 h-4" /> ADD CLIENT
                    </button>
                </div>
            </header>

            {/* Status Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${message.type === "success"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"}`}
                    >
                        {message.type === "success" ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <ShieldAlert className="w-5 h-5 flex-shrink-0" />}
                        {message.text}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="p-8 bg-[#1e1b26] border border-white/5 rounded-[2rem] text-left hover:border-brand-secondary/30 transition-all group"
                >
                    <div className="p-4 bg-brand-secondary/10 w-fit rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                        <UserPlus className="w-8 h-8 text-brand-secondary" />
                    </div>
                    <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">Authorize User</h3>
                    <p className="text-sm text-zinc-500 font-medium">Create a new client account and provision portal access.</p>
                </button>
                <div className="p-8 bg-[#1e1b26] border border-white/5 rounded-[2rem] flex flex-col justify-center">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Active Accounts</p>
                            <h4 className="text-4xl font-black italic tracking-tighter">{clients.length}</h4>
                        </div>
                        <div className="p-4 bg-zinc-800/30 rounded-2xl"><Users className="w-8 h-8 text-zinc-400" /></div>
                    </div>
                </div>
                <div className="p-8 bg-[#1e1b26] border border-white/5 rounded-[2rem] flex flex-col justify-center">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Total MRR</p>
                            <h4 className="text-4xl font-black italic tracking-tighter text-brand-secondary">${mrr?.toLocaleString() ?? "0"}</h4>
                        </div>
                        <div className="p-4 bg-brand-secondary/10 rounded-2xl"><DollarSign className="w-8 h-8 text-brand-secondary" /></div>
                    </div>
                </div>
            </div>

            {/* Client Directory */}
            <div className="pt-10 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Client Directory</h3>
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Showing {filteredClients.length} of {clients.length}</p>
                </div>

                {filteredClients.length === 0 ? (
                    <div className="border border-dashed border-white/10 rounded-2xl p-12 text-center text-zinc-600">
                        <Users className="w-10 h-10 mx-auto mb-4 opacity-30" />
                        <p className="font-bold">No clients found.</p>
                        <p className="text-sm mt-1">Click <span className="text-brand-secondary font-bold">SYNC USERS</span> to import existing Supabase Auth accounts.</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredClients.map((client) => {
                            const price = client.monthlyPrice ?? client.invoiceAmount;
                            const features = client.features ?? defaultFeatures;
                            return (
                                <motion.div
                                    key={client.uid}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-[#14111d] border border-white/5 rounded-2xl p-6 hover:bg-[#1a1728] transition-all group relative overflow-hidden"
                                >
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                        {/* Identity */}
                                        <div className="flex items-start gap-4 min-w-0">
                                            <div className={`p-3 rounded-xl flex-shrink-0 ${client.tier === "Flagship" ? "bg-amber-400/10" : "bg-teal-400/10"}`}>
                                                <Users className={`w-5 h-5 ${client.tier === "Flagship" ? "text-amber-400" : "text-teal-400"}`} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-bold">{client.firstName}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${client.tier === "Flagship" ? "bg-amber-400/10 text-amber-400" : "bg-teal-400/10 text-teal-400"}`}>
                                                        {client.tier}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-zinc-500 truncate">{client.email}</p>
                                                {client.websiteUrl && (
                                                    <a href={client.websiteUrl.startsWith("http") ? client.websiteUrl : `https://${client.websiteUrl}`} target="_blank" rel="noopener noreferrer"
                                                        className="text-xs text-brand-secondary flex items-center gap-1 mt-1 hover:underline w-fit">
                                                        <Globe className="w-3 h-3" /> {client.websiteUrl}
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
                                            <div>
                                                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">Monthly</p>
                                                <p className="text-sm font-bold text-brand-secondary">${(price ?? 0).toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">Tenure</p>
                                                <p className="text-sm font-medium">{tenureLabel(client.customerSince)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">Status</p>
                                                <p className="text-sm font-medium">{client.projectStatus || "—"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">Features</p>
                                                <div className="flex gap-1 mt-0.5 flex-wrap">
                                                    {features.chatbot && <span title="Chatbot"><Bot className="w-3.5 h-3.5 text-brand-secondary" /></span>}
                                                    {features.socialMediaManagement && <span title="Social Media"><Share2 className="w-3.5 h-3.5 text-purple-400" /></span>}
                                                    {features.businessConsulting && <span title="Consulting"><Briefcase className="w-3.5 h-3.5 text-amber-400" /></span>}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {invoiceToast?.uid === client.uid && (
                                                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${invoiceToast.ok ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                                                    {invoiceToast.msg}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => sendInvoice(client.uid)}
                                                disabled={invoicingUid === client.uid}
                                                className="px-4 py-2 bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent rounded-xl text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                                                title="Generate & email invoice"
                                            >
                                                {invoicingUid === client.uid
                                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                                    : <DollarSign className="w-4 h-4" />}
                                                Invoice
                                            </button>
                                            <button
                                                onClick={() => setEditingClient({
                                                    ...client,
                                                    features: client.features ?? defaultFeatures,
                                                    authorizations: client.authorizations ?? ["dashboard", "resources"],
                                                })}
                                                className="px-5 py-2 bg-white/5 hover:bg-brand-secondary hover:text-black rounded-xl text-sm font-bold transition-all flex items-center gap-2"
                                            >
                                                <Edit2 className="w-4 h-4" /> Edit
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>

            {/* ── EDIT MODAL ── */}
            <AnimatePresence>
                {editingClient && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-3xl bg-[#1e1b26] border border-white/10 rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh]"
                        >
                            {/* Modal Header */}
                            <div className="flex justify-between items-center p-8 border-b border-white/5 sticky top-0 bg-[#1e1b26] z-10">
                                <div>
                                    <h3 className="text-2xl font-bold">Edit <span className="text-brand-secondary">{editingClient.firstName}</span></h3>
                                    <p className="text-xs text-zinc-500 mt-0.5">{editingClient.email}</p>
                                </div>
                                <button onClick={() => setEditingClient(null)} className="p-2 hover:bg-white/5 rounded-lg" aria-label="Close">
                                    <X className="w-6 h-6 text-zinc-500" />
                                </button>
                            </div>

                            <form onSubmit={handleUpdate} className="p-8 space-y-10">

                                {/* Section 1: Account Info */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Users className="w-3.5 h-3.5" /> Account Info</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField id="edit-firstName" label="Name" value={editingClient.firstName} onChange={(v: string) => setEditingClient({ ...editingClient, firstName: v })} placeholder="Full Name" />
                                        <InputField id="edit-websiteUrl" label="Website URL" value={editingClient.websiteUrl} onChange={(v: string) => setEditingClient({ ...editingClient, websiteUrl: v })} placeholder="https://example.com" />
                                        <InputField id="edit-customerSince" label="Customer Since" value={editingClient.customerSince?.substring(0, 10)} onChange={(v: string) => setEditingClient({ ...editingClient, customerSince: v })} placeholder="YYYY-MM-DD" type="date" />
                                        <InputField id="edit-projectStatus" label="Project Status" value={editingClient.projectStatus} onChange={(v: string) => setEditingClient({ ...editingClient, projectStatus: v })} placeholder="e.g. Design Phase" />
                                    </div>
                                </section>

                                {/* Section 2: Package & Billing */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><DollarSign className="w-3.5 h-3.5" /> Package & Billing</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label htmlFor="edit-tier" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Service Tier</label>
                                            <select id="edit-tier" value={editingClient.tier} onChange={(e) => setEditingClient({ ...editingClient, tier: e.target.value as "Pioneer" | "Flagship" })}
                                                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-secondary/50 outline-none">
                                                <option value="Pioneer">Pioneer (Standard)</option>
                                                <option value="Flagship">Flagship (Premium)</option>
                                            </select>
                                        </div>
                                        <InputField id="edit-price" label="Monthly Price ($)" value={editingClient.monthlyPrice ?? editingClient.invoiceAmount} onChange={(v: string) => setEditingClient({ ...editingClient, monthlyPrice: Number(v), invoiceAmount: Number(v) })} placeholder="0" type="number" />
                                        <InputField id="edit-invoiceDue" label="Next Invoice Due" value={editingClient.invoiceDueDate} onChange={(v: string) => setEditingClient({ ...editingClient, invoiceDueDate: v })} placeholder="e.g. 1st of each month" />
                                        <InputField id="edit-milestone" label="Next Milestone" value={editingClient.nextMilestone} onChange={(v: string) => setEditingClient({ ...editingClient, nextMilestone: v })} placeholder="e.g. Site Launch" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="edit-valueSum" className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Invoice Description</label>
                                        <textarea id="edit-valueSum" rows={2} value={editingClient.invoiceValueSummary}
                                            onChange={(e) => setEditingClient({ ...editingClient, invoiceValueSummary: e.target.value })}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-secondary/50 outline-none resize-none" />
                                    </div>
                                </section>

                                {/* Section 3: Features */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Bot className="w-3.5 h-3.5" /> Enabled Features</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            { key: "chatbot", label: "Sterling Chatbot", icon: <Bot className="w-4 h-4 text-brand-secondary" /> },
                                            { key: "socialMediaManagement", label: "Social Media Management", icon: <Share2 className="w-4 h-4 text-purple-400" /> },
                                            { key: "businessConsulting", label: "Business Consulting", icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
                                        ].map(({ key, label, icon }) => {
                                            const active = editingClient.features?.[key as keyof Omit<ClientFeatures, "websiteUpdateFrequency">] ?? false;
                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    onClick={() => toggleFeature(key as keyof Omit<ClientFeatures, "websiteUpdateFrequency">)}
                                                    className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${active ? "border-brand-secondary/40 bg-brand-secondary/5" : "border-white/5 bg-zinc-950/50 hover:border-white/10"}`}
                                                >
                                                    {icon}
                                                    <span className="text-sm font-bold">{label}</span>
                                                    <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-brand-secondary bg-brand-secondary" : "border-zinc-600"}`}>
                                                        {active && <CheckCircle2 className="w-3 h-3 text-black" />}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                        <div className="space-y-1.5 sm:col-span-2">
                                            <label htmlFor="edit-updateFreq" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1.5"><Calendar className="w-3 h-3" />Website Update Frequency</label>
                                            <select id="edit-updateFreq"
                                                value={editingClient.features?.websiteUpdateFrequency ?? "Monthly"}
                                                onChange={(e) => setEditingClient({ ...editingClient, features: { ...(editingClient.features ?? defaultFeatures), websiteUpdateFrequency: e.target.value as ClientFeatures["websiteUpdateFrequency"] } })}
                                                className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-secondary/50 outline-none">
                                                {["Monthly", "Bi-Weekly", "Weekly", "On-Demand"].map(f => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                {/* Section 4: Portal Authorizations */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><Lock className="w-3.5 h-3.5" /> Portal Access</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {ALL_AUTHORIZATIONS.map(({ key, label }) => {
                                            const active = editingClient.authorizations?.includes(key) ?? false;
                                            return (
                                                <button key={key} type="button" onClick={() => toggleAuth(key)}
                                                    className={`p-4 rounded-xl border text-center text-sm font-bold transition-all ${active ? "border-brand-secondary/40 bg-brand-secondary/5 text-brand-secondary" : "border-white/5 bg-zinc-950/50 text-zinc-500 hover:border-white/10"}`}>
                                                    {label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* Section 5b: KPI Dashboard Dials */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><LineChart className="w-3.5 h-3.5" /> Client Dashboard KPIs <span className="text-zinc-700 font-normal normal-case tracking-normal">(drives the gauge dials the client sees)</span></h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        <InputField id="edit-healthScore" label="Website Health (0–100)" value={editingClient.websiteHealthScore} onChange={(v: string) => setEditingClient({ ...editingClient, websiteHealthScore: Number(v) })} placeholder="e.g. 82" type="number" />
                                        <InputField id="edit-leads" label="Leads / Month (0–100)" value={editingClient.leadsPerMonth} onChange={(v: string) => setEditingClient({ ...editingClient, leadsPerMonth: Number(v) })} placeholder="e.g. 14" type="number" />
                                        <InputField id="edit-pageSpeed" label="Page Speed (0–5)" value={editingClient.pageSpeedScore} onChange={(v: string) => setEditingClient({ ...editingClient, pageSpeedScore: Number(v) })} placeholder="e.g. 4.2" type="number" />
                                        <InputField id="edit-seo" label="SEO Score (0–100)" value={editingClient.seoScore} onChange={(v: string) => setEditingClient({ ...editingClient, seoScore: Number(v) })} placeholder="e.g. 67" type="number" />
                                        <InputField id="edit-uptime" label="Uptime % (0–100)" value={editingClient.uptimePercent} onChange={(v: string) => setEditingClient({ ...editingClient, uptimePercent: Number(v) })} placeholder="e.g. 99.9" type="number" />
                                    </div>
                                </section>

                                {/* Section 6: Google Analytics */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><ExternalLink className="w-3.5 h-3.5" /> Google Analytics</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <InputField id="edit-ga4PropertyId" label="GA4 Property ID" value={editingClient.ga4PropertyId} onChange={(v: string) => setEditingClient({ ...editingClient, ga4PropertyId: v })} placeholder="e.g. 123456789" />
                                        <InputField id="edit-ga4Link" label="GA4 Dashboard Link" value={editingClient.ga4WebsiteUri} onChange={(v: string) => setEditingClient({ ...editingClient, ga4WebsiteUri: v })} placeholder="https://analytics.google.com/..." />
                                    </div>
                                </section>

                                {/* Section 6: Internal Notes */}
                                <section className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2"><StickyNote className="w-3.5 h-3.5" /> Internal Notes <span className="text-zinc-700 font-normal normal-case tracking-normal">(admin-only, not visible to client)</span></h4>
                                    <textarea
                                        rows={3}
                                        placeholder="Churn signals, upsell opportunities, special requirements..."
                                        value={editingClient.internalNotes || ""}
                                        onChange={(e) => setEditingClient({ ...editingClient, internalNotes: e.target.value })}
                                        className="w-full bg-zinc-950 border border-amber-400/10 rounded-xl px-4 py-3 text-sm text-zinc-300 focus:ring-2 focus:ring-amber-400/30 outline-none resize-none"
                                    />
                                </section>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                                    <button type="button" onClick={() => setEditingClient(null)}
                                        className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all">
                                        Cancel
                                    </button>
                                    <button disabled={isSaving} type="submit"
                                        className="px-8 py-3 bg-brand-secondary text-black rounded-xl font-black hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50">
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        SAVE PROFILE
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Client Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
                            className="w-full max-w-xl bg-[#1e1b26] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl space-y-8"
                        >
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-brand-secondary/20 rounded-2xl">
                                        <UserPlus className="w-6 h-6 text-brand-secondary" />
                                    </div>
                                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">New Client</h3>
                                </div>
                                <button onClick={() => setIsAddModalOpen(false)} aria-label="Close modal">
                                    <X className="w-8 h-8 text-zinc-600 hover:text-white transition-colors" />
                                </button>
                            </div>
                            <form onSubmit={handleCreateClient} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="newFirstName" className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">Full Name</label>
                                    <input id="newFirstName" required type="text" value={newClient.firstName}
                                        onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-bold"
                                        placeholder="Jane Smith" />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="newEmail" className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">Email Address</label>
                                        <input id="newEmail" required type="email" value={newClient.email}
                                            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-bold"
                                            placeholder="client@gmail.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="newPassword" className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">Initial Password</label>
                                        <input id="newPassword" required type="password" value={newClient.password}
                                            onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-bold"
                                            placeholder="••••••••" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="newTier" className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">Retainer Tier</label>
                                        <select id="newTier" value={newClient.tier} onChange={(e) => setNewClient({ ...newClient, tier: e.target.value as "Pioneer" | "Flagship" })}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-bold">
                                            <option value="Pioneer">Pioneer (Standard)</option>
                                            <option value="Flagship">Flagship (Premium)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="newPrice" className="text-[10px] font-black italic uppercase tracking-widest text-zinc-500">Monthly Price ($)</label>
                                        <input id="newPrice" type="number" value={newClient.invoiceAmount}
                                            onChange={(e) => setNewClient({ ...newClient, invoiceAmount: Number(e.target.value) })}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-brand-secondary/50 transition-all font-bold" />
                                    </div>
                                </div>
                                <button disabled={isSaving} type="submit"
                                    className="w-full py-5 bg-brand-secondary text-black rounded-2xl font-black italic uppercase tracking-tighter hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                                    AUTHORIZE CLIENT ACCESS
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
