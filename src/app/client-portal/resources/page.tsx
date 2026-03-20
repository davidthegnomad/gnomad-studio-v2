"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// Removed Firebase unused imports
import { createClient } from "@/lib/supabase/client";
import Chatbot from "@/components/Chatbot";
import { LucideIcon, Loader2 } from "lucide-react";

import {
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    Rocket,
    ShieldCheck,
    MapPin,
    MessageSquare,
    Building2,
    Users,
    Network,
    Target,
    Activity,
    Cpu,
    Briefcase,
    PieChart,
    LineChart
} from "lucide-react";

// Types
interface Tool {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    tier: "Pioneer" | "Flagship";
}

interface Category {
    title: string;
    description: string;
    gradient: string;
    tools: Tool[];
}

const CATEGORIES: Category[] = [
    {
        title: "Research a Market or Location",
        description: "Get detailed research on any city, zip code, or industry — or find out exactly how you stack up against local competitors.",
        gradient: "from-amber-400 to-orange-500",
        tools: [
            { id: "market-research", title: "What Does the Market Look Like in My Area?", description: "Enter any town, city, or zip code and get a full breakdown of the local market — who the customers are, what they search for, and what opportunities are waiting.", icon: MapPin, tier: "Flagship" },
            { id: "competitive-analysis", title: "How Does My Business Compare to the Competition?", description: "Enter your business name and get a custom report showing who you're up against, where you have an edge, and what your next 5 moves should be.", icon: Building2, tier: "Flagship" },
            { id: "marketing-effectiveness", title: "Is My Marketing Budget Being Spent Wisely?", description: "Tell us what you're currently spending on marketing and we'll grade each channel on ROI, find the biggest money-waster, and recommend where to focus instead.", icon: Network, tier: "Flagship" }
        ]
    },
    {
        title: "Know Your Competition",
        description: "Find out who your real competitors are, what they're doing right, and exactly where you can beat them.",
        gradient: "from-blue-400 to-indigo-500",
        tools: [
            { id: "forensic-competitive-stack", title: "Who Are My Competitors & How Do I Beat Them?", description: "See what tools and technology your competitors use, how their websites perform, and where they fall short — so you know exactly where to attack.", icon: Network, tier: "Flagship" },
            { id: "audience-spending-leakage", title: "Who's My Ideal Customer & Where Are They Going?", description: "Understand who your best customers are, what they care about, and why they might be spending money with someone else instead of you.", icon: Users, tier: "Flagship" },
            { id: "blue-ocean-gap", title: "What Opportunity Is No One Else Seeing?", description: "Find the gaps in your local market that your competitors have completely missed — so you can be first to capture that business.", icon: Target, tier: "Flagship" }
        ]
    },
    {
        title: "Improve Your Marketing",
        description: "Figure out what's working, what's wasting money, and what you should say to get more customers.",
        gradient: "from-brand-primary to-brand-secondary",
        tools: [
            { id: "traffic-source-check", title: "Where Are My Customers Actually Coming From?", description: "Stop guessing which ads or platforms are bringing in real revenue. This report cuts through the noise and shows you what's actually working.", icon: Activity, tier: "Pioneer" },
            { id: "message-to-market-audit", title: "Is My Marketing Message Actually Connecting?", description: "Find out if the words you use in your ads and website match what your customers actually care about — and what to change if they don't.", icon: MessageSquare, tier: "Pioneer" },
            { id: "friction-hunter-audit", title: "Am I Losing Leads Before They Become Customers?", description: "Find out where potential customers are dropping off or going cold — and get a simple plan to fix the leaks in your sales process.", icon: Cpu, tier: "Pioneer" }
        ]
    },
    {
        title: "Understand Your Money",
        description: "Get clarity on your costs, your most profitable services, and how to grow revenue without growing expenses.",
        gradient: "from-emerald-400 to-teal-500",
        tools: [
            { id: "blue-margin-layering", title: "Which of My Services Make the Most Money?", description: "Rank your services by profit margin to find out which ones you should be promoting more — and which ones might be costing you more than they earn.", icon: Briefcase, tier: "Flagship" },
            { id: "fixed-cost-vulnerability", title: "How Vulnerable Is My Business to a Slow Month?", description: "See how your monthly fixed costs stack up against your revenue, and find out how many clients you truly need to stay safe when business slows down.", icon: PieChart, tier: "Pioneer" },
            { id: "strategic-capital-allocation", title: "What's the Smartest Way to Pay Off Debt & Grow?", description: "Get a step-by-step plan for which business debts to pay first and exactly how to reinvest the freed-up cash to grow your market position.", icon: LineChart, tier: "Flagship" }
        ]
    }
];


export default function ResourcesPage() {
    const router = useRouter();
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();
        let subscription: { unsubscribe: () => void } | null = null;

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user ?? null;
            if (user) {
                setIsUserAdmin(user.email === "david.the.gnomad@gmail.com");
                setLoading(false);
            } else {
                window.location.href = "/login";
            }

            const { data } = supabase.auth.onAuthStateChange((_event, session) => {
                const user = session?.user ?? null;
                if (user) {
                    setIsUserAdmin(user.email === "david.the.gnomad@gmail.com");
                    setLoading(false);
                } else {
                    window.location.href = "/login";
                }
            });
            subscription = data.subscription;
        };

        checkAuth();

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
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0c15] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0c15] text-white font-sans selection:bg-brand-primary flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-[#14111d] flex flex-col p-6 hidden md:flex shrink-0">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <Image
                        src="/assets/gnomad_logo_new.webp"
                        alt="Llama Logo"
                        width={40}
                        height={40}
                        className="object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                    />
                    <span className="font-bold tracking-tight text-lg">Gnomad Studio</span>
                </div>


                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => router.push('/client-portal')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-sm transition-all text-left"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </button>
                    <button
                        className="w-full flex items-center gap-3 px-3 py-2 bg-brand-primary/10 text-brand-secondary rounded-lg font-medium text-sm transition-all text-left group"
                    >
                        <Rocket className="w-4 h-4 text-brand-secondary" />
                        Resources
                    </button>
                    <button
                        onClick={() => router.push('/client-portal?tab=documents')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-sm transition-all text-left"
                    >
                        <FileText className="w-4 h-4" />
                        Documents
                    </button>
                    {isUserAdmin && (
                        <button
                            onClick={() => router.push('/client-portal?tab=admin')}
                            className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-sm transition-all text-left"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Admin
                        </button>
                    )}
                    <button
                        onClick={() => router.push('/client-portal?tab=account')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg font-medium text-sm transition-all text-left"
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

                {/* Background Ambient Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />

                <header className="sticky top-0 z-10 bg-[#0f0c15]/80 backdrop-blur-md border-b border-white/5 px-8 py-4 flex justify-between items-center md:hidden">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                        Resources
                    </h1>
                </header>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-6xl mx-auto p-8 md:p-12 space-y-12 relative z-10"
                >
                    <motion.section variants={itemVariants} className="space-y-6 text-center flex flex-col items-center">
                        <Image
                            src="/assets/gnomad_logo_new.webp"
                            alt="Llama"
                            width={80}
                            height={80}
                            className="object-contain drop-shadow-[0_0_30px_rgba(45,212,191,0.2)] mb-4"
                        />
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                            Intelligence <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">Hub</span>
                        </h2>

                        <div className="text-zinc-400 max-w-2xl text-lg leading-relaxed flex flex-col gap-1">
                            <p>Generate hyper-local insights directly tailored to your industry and town.</p>
                            <p>Select a report to launch the AI engine.</p>
                        </div>
                    </motion.section>

                    <div className="space-y-16 relative z-10 pb-12">
                        {CATEGORIES.map((category, idx) => (
                            <motion.section variants={itemVariants} key={idx} className="space-y-6">
                                <div className="border-b border-white/10 pb-4">
                                    <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent inline-block mr-4`}>
                                        {category.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm mt-2">{category.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {category.tools.map((tool) => (
                                        <div
                                            key={tool.id}
                                            onClick={() => router.push(`/client-portal/resources/${tool.id}`)}
                                            className="group cursor-pointer relative flex flex-col h-[280px] p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-brand-primary/50 transition-all duration-500 overflow-hidden hover:shadow-[0_0_40px_rgba(45,212,191,0.1)]"
                                        >
                                            {/* Hover background gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex justify-between items-start mb-6 w-full">
                                                    <div className="p-4 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl group-hover:scale-110 group-hover:bg-brand-primary/20 group-hover:border-brand-primary/30 transition-all duration-300 shadow-xl">
                                                        <tool.icon className="w-8 h-8 text-white group-hover:text-brand-primary transition-colors duration-300" />
                                                    </div>
                                                    <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-xl ${tool.tier === "Flagship"
                                                        ? "bg-amber-400/20 text-amber-400 border border-amber-400/30"
                                                        : "bg-zinc-800/80 text-zinc-300 border border-white/10"
                                                        }`}>
                                                        {tool.tier}
                                                    </span>
                                                </div>

                                                <div className="flex-1 flex flex-col">
                                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-brand-primary transition-colors duration-300 drop-shadow-sm leading-tight pr-4">
                                                        {tool.title}
                                                    </h3>

                                                    {/* Description slides up and fades in on hover */}
                                                    <p className="text-sm text-zinc-400 leading-relaxed max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden mt-auto">
                                                        {tool.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        ))}
                    </div>
                </motion.div>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0f0c15]/90 backdrop-blur-xl border-t border-white/10 px-6 py-4 z-50">
                    <div className="flex justify-between items-center text-zinc-500">
                        <button onClick={() => router.push('/client-portal')} className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                            <LayoutDashboard className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Dashboard</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-brand-secondary">
                            <Rocket className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Resources</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                            <Settings className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Account</span>
                        </button>
                        <button onClick={handleLogout} className="flex flex-col items-center gap-1 text-red-400/80 hover:text-red-400 transition-colors">
                            <LogOut className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </main>
            <Chatbot
                apiUrl="/api/chat/portal"
                initialMessage="Welcome to the Intelligence Hub! I'm Sterling. Which of these reports would you like to discuss today?"
            />
        </div>
    );
}
