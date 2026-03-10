"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Clock, Globe, FileText, AlertCircle, RefreshCw } from "lucide-react";

interface GA4Overview {
    sessions: number;
    totalUsers: number;
    newUsers: number;
    returningUsers: number;
    engagementRate: number; // 0-100
    avgSessionDuration: number; // seconds
    pageViews: number;
}

interface TrafficSource {
    channel: string;
    sessions: number;
}

interface TopPage {
    path: string;
    views: number;
}

interface GA4Data {
    ok: boolean;
    pending?: boolean;
    hint?: string;
    error?: string;
    overview?: GA4Overview;
    trafficSources?: TrafficSource[];
    topPages?: TopPage[];
    fetchedAt?: string;
}

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

function formatNumber(n: number): string {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
}

const CHANNEL_COLORS: Record<string, string> = {
    "Organic Search": "#10b981",
    "Direct": "#3b82f6",
    "Referral": "#8b5cf6",
    "Organic Social": "#f59e0b",
    "Paid Search": "#ef4444",
    "Email": "#06b6d4",
    "(Other)": "#6b7280",
};

export default function GA4Widget() {
    const [data, setData] = useState<GA4Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/ga4");
            const json = await res.json();
            setData(json);
            setLastRefresh(new Date());
        } catch {
            setData({ ok: false, error: "Network error — could not reach analytics API" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const maxSessions = data?.trafficSources?.[0]?.sessions || 1;
    const maxViews = data?.topPages?.[0]?.views || 1;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Analytics</p>
                    <h3 className="text-xl font-bold">gnomadstudio.org <span className="text-zinc-600 text-sm font-normal">· Last 30 days</span></h3>
                </div>
                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
                >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                    {lastRefresh ? `Updated ${lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Refresh"}
                </button>
            </div>

            {/* Loading skeleton */}
            {loading && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-[#14111d] border border-white/5 rounded-2xl p-5 h-24 animate-pulse" />
                    ))}
                </div>
            )}

            {/* Pending / not configured state */}
            {!loading && data?.pending && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6 flex gap-4 items-start">
                    <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                        <p className="font-bold text-amber-400 text-sm">GA4 Connection Pending</p>
                        <p className="text-zinc-400 text-xs leading-relaxed">Two quick steps to connect live analytics:</p>
                        <ol className="text-zinc-400 text-xs space-y-1 list-decimal list-inside">
                            <li>Find your Property ID: GA4 → Admin → Property Settings → copy the 9-digit number</li>
                            <li>Add to <code className="bg-zinc-900 px-1 rounded">.env.local</code> as <code className="bg-zinc-900 px-1 rounded">GA4_PROPERTY_ID</code></li>
                            <li>Grant Viewer access to <code className="bg-zinc-900 px-1 rounded text-[10px]">firebase-adminsdk-fbsvc@gnomad-studio-client.iam.gserviceaccount.com</code></li>
                        </ol>
                    </div>
                </div>
            )}

            {/* Error state */}
            {!loading && data && !data.ok && !data.pending && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 flex gap-3 items-start">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-red-400 text-sm font-bold">Analytics Error</p>
                        <p className="text-zinc-500 text-xs mt-1">{data.hint || data.error}</p>
                    </div>
                </div>
            )}

            {/* Live data */}
            {!loading && data?.ok && data.overview && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                >
                    {/* KPI row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[{
                            label: "Sessions", value: formatNumber(data.overview.sessions),
                            icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10",
                        }, {
                            label: "Total Users", value: formatNumber(data.overview.totalUsers),
                            icon: Users, color: "text-blue-400", bg: "bg-blue-500/10",
                        }, {
                            label: "Page Views", value: formatNumber(data.overview.pageViews),
                            icon: Eye, color: "text-purple-400", bg: "bg-purple-500/10",
                        }, {
                            label: "Avg. Duration", value: formatDuration(data.overview.avgSessionDuration),
                            icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10",
                        }].map((kpi) => (
                            <div key={kpi.label} className="bg-[#14111d] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all">
                                <div className={`p-2 ${kpi.bg} w-fit rounded-lg mb-3`}>
                                    <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                                </div>
                                <p className="text-2xl font-black">{kpi.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">{kpi.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* New vs Returning + Engagement Rate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-[#14111d] border border-white/5 rounded-2xl p-5 space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">New vs Returning Users</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300">New</span>
                                    <span className="font-bold">{data.overview.newUsers.toLocaleString()} <span className="text-zinc-500 font-normal text-xs">({Math.round((data.overview.newUsers / data.overview.totalUsers) * 100)}%)</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.round((data.overview.newUsers / data.overview.totalUsers) * 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-300">Returning</span>
                                    <span className="font-bold">{data.overview.returningUsers.toLocaleString()} <span className="text-zinc-500 font-normal text-xs">({Math.round((data.overview.returningUsers / data.overview.totalUsers) * 100)}%)</span></span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                                        style={{ width: `${Math.round((data.overview.returningUsers / data.overview.totalUsers) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#14111d] border border-white/5 rounded-2xl p-5 space-y-3">
                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Engagement Rate</p>
                            <p className="text-5xl font-black text-emerald-400">{data.overview.engagementRate}%</p>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${data.overview.engagementRate > 60 ? "bg-emerald-400" : data.overview.engagementRate > 40 ? "bg-amber-400" : "bg-red-400"}`}
                                    style={{ width: `${data.overview.engagementRate}%` }}
                                />
                            </div>
                            <p className="text-xs text-zinc-500">Sessions where users actively interacted with the site</p>
                        </div>
                    </div>

                    {/* Traffic by Channel */}
                    <div className="bg-[#14111d] border border-white/5 rounded-2xl p-5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <Globe className="w-3.5 h-3.5" /> Traffic by Channel
                        </p>
                        <div className="space-y-3">
                            {data.trafficSources?.map((source) => {
                                const pct = Math.round((source.sessions / maxSessions) * 100);
                                const color = CHANNEL_COLORS[source.channel] || "#6b7280";
                                return (
                                    <div key={source.channel} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-300 font-medium">{source.channel}</span>
                                            <span className="font-bold text-zinc-200">{source.sessions.toLocaleString()} <span className="text-zinc-600 text-xs">sessions</span></span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-1000"
                                                style={{ width: `${pct}%`, backgroundColor: color }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Top Pages */}
                    <div className="bg-[#14111d] border border-white/5 rounded-2xl p-5 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" /> Top Pages (Last 30 Days)
                        </p>
                        <div className="space-y-3">
                            {data.topPages?.map((page) => {
                                const pct = Math.round((page.views / maxViews) * 100);
                                return (
                                    <div key={page.path} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-300 font-mono text-xs">{page.path}</span>
                                            <span className="font-bold text-zinc-200">{page.views.toLocaleString()} <span className="text-zinc-600 text-xs">views</span></span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-brand-secondary rounded-full transition-all duration-1000"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
