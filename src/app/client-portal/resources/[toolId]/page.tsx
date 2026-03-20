"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    ShieldCheck,
    Cpu,
    Download,
    FileText,
    MapPin,
    Building2,
    MessageSquare,
    Network,
    Users,
    Target,
    Activity,
    LineChart,
    PieChart,
    Briefcase,
    LucideIcon
} from "lucide-react";

interface ToolDef {
    title: string;
    desc: string;
    icon: LucideIcon;
    placeholderContext: string;
    requiresCompanyName?: boolean;
    requiresContext?: boolean;
}

const TOOL_DEFS: Record<string, ToolDef> = {
    "forensic-competitive-stack": { title: "Forensic Competitive Stack Analysis", desc: "Reveals competitor tech stacks and UX vulnerabilities.", icon: Network, placeholderContext: "Optional: List your top 3 local competitors here..." },
    "audience-spending-leakage": { title: "Audience Spending Leakage Profiler", desc: "Maps local buyer personas and identifies uncaptured revenue.", icon: Users, placeholderContext: "Optional: Describe the general age/income profile of your best customers..." },
    "blue-ocean-gap": { title: "Blue Ocean Strategic Gap Analysis", desc: "Triangulates market data to find unconventional growth opportunities.", icon: Target, placeholderContext: "Optional: What is one service you offer that no one else does?" },
    "traffic-source-check": { title: "Traffic Source Reality Check", desc: "A forensic audit of where your actual revenue originates.", icon: Activity, placeholderContext: "Optional: Where do you currently spend the most on advertising?" },
    "message-to-market-audit": { title: "Message-to-Market Audit", desc: "Aligns your ad copy with the psychological triggers of your market.", icon: MessageSquare, placeholderContext: "Optional: Paste 3 of your current ad slogans or website headers here..." },
    "friction-hunter-audit": { title: "Friction Hunter Inbound Lead Audit", desc: "Evaluates your lead conversion speed against industry benchmarks.", icon: Cpu, placeholderContext: "Optional: How quickly do you currently respond to new leads on average?" },
    "blue-margin-layering": { title: "Blue Margin Product Layering Analysis", desc: "Identifies your 'Unfair Competitive Advantage' services.", icon: Briefcase, placeholderContext: "Optional: List your top 5 services, estimated revenue, and estimated margin." },
    "fixed-cost-vulnerability": { title: "Operational Fixed Cost vs. Vulnerability Map", desc: "Visualizes operational costs to highlight strategic vulnerabilities.", icon: PieChart, placeholderContext: "Optional: What are your top 3 massive fixed monthly expenses?" },
    "strategic-capital-allocation": { title: "Strategic Capital Allocation Directive", desc: "A mathematically optimized plan to accelerate debt elimination.", icon: LineChart, placeholderContext: "Optional: List your current business debts (anonymized) and interest rates." },
    "market-research": { title: "Geo-Targeted Market Research Report", desc: "Deep market intelligence for a specific town, zip code, or region.", icon: MapPin, placeholderContext: "Optional: Any known facts about your target market or customer behaviors..." },
    "competitive-analysis": { title: "Custom Competitive Intelligence Analysis", desc: "A personalized competitive landscape map built around your company.", icon: Building2, placeholderContext: "Optional: Name 2-3 competitors you already know about...", requiresCompanyName: true },
    "marketing-effectiveness": { title: "Marketing Effectiveness Audit & ROI Report", desc: "Grades your current marketing channels and identifies the highest-ROI opportunities.", icon: Network, placeholderContext: "REQUIRED: Describe your current marketing activities. Include: channels used (Google Ads, Facebook, flyers, etc.), monthly budget per channel, and your current monthly new-lead count. The more detail you provide, the more accurate the audit.", requiresContext: true }
};

export default function ToolExecutionPage() {
    const params = useParams();
    const router = useRouter();
    const toolId = params?.toolId as string;

    const [tool, setTool] = useState<ToolDef | null>(null);
    const [zipCode, setZipCode] = useState("");
    const [industry, setIndustry] = useState("");
    const [context, setContext] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [generating, setGenerating] = useState(false);
    const [report, setReport] = useState<string | null>(null);

    useEffect(() => {
        if (toolId && TOOL_DEFS[toolId]) {
            setTool(TOOL_DEFS[toolId]);
        } else if (toolId) {
            router.push("/client-portal/resources");
        }
    }, [toolId, router]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setGenerating(true);
        setReport(null);

        try {
            const res = await fetch("/api/tools/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ toolId, zipCode, industry, context, companyName })
            });

            if (!res.ok) throw new Error("Generation failed");
            const data = await res.json();
            setReport(data.report);
        } catch (error) {
            console.error("Tool execution error:", error);
            setReport("An error occurred. Please try again or contact support.");
        } finally {
            setGenerating(false);
        }
    };

    const downloadDocument = (format: 'doc' | 'txt') => {
        if (!report) return;

        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `${tool?.title.replace(/\\s+/g, '_')}_${timestamp}.${format}`;

        let content = report;
        let mimeType = "text/plain";

        // Word document compatibility via HTML wrapper
        if (format === 'doc') {
            mimeType = "application/msword";
            content = `
                <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'><title>${tool?.title}</title></head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; color: #333;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h1 style="color: #0f4c81;">${tool?.title}</h1>
                        <p style="color: #666;">Generated by Gnomad Studio Intelligence AI</p>
                    </div>
                    ${report.replace(/\\n\\n/g, '<br><br>').replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>').replace(/^### (.*$)/gim, '<h3 style="color:#0f4c81; border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top:20px;">$1</h3>')}
                </body>
                </html>
            `;
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handlePrintPdf = () => {
        // Simple and robust way to generate PDF without heavy dependencies
        window.print();
    };

    if (!tool) return null;

    return (
        <div className="min-h-screen bg-[#0f0c15] text-white font-sans selection:bg-brand-primary">
            {/* Print-only stylesheet via Tailwind print variant */}

            <header className="sticky top-0 z-10 bg-[#0f0c15]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center gap-4 print:hidden">
                <button aria-label="Back to Resources" onClick={() => router.push('/client-portal/resources')} className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent flex items-center gap-2">
                        {tool.title}
                    </h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-6 md:p-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Setup Column */}
                    <div className="w-full lg:w-1/3 space-y-8 print:hidden">
                        <div>
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-4 text-brand-secondary shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                                <tool.icon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Parameters</h2>
                            <p className="text-sm text-zinc-400">{tool.desc}</p>
                        </div>

                        <form onSubmit={handleGenerate} className="space-y-5">
                            {/* Company Name — only for competitive-analysis */}
                            {tool.requiresCompanyName && (
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Your Company Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Smith's Auto Detailing"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all hover:bg-white/10"
                                    />
                                </div>
                            )}
                            {/* ZIP / Location — label changes for market-research */}
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                                    {toolId === 'market-research' ? 'Town, City, or ZIP Code' : toolId === 'competitive-analysis' ? 'ZIP Code / City' : 'Target ZIP Code'}
                                </label>
                                <input
                                    type="text"
                                    required={!tool.requiresCompanyName}
                                    placeholder={toolId === 'market-research' ? 'e.g. Tulsa, OK or 74401' : 'e.g. 74401'}
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all hover:bg-white/10"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Industry Sector</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Auto Detailing"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all hover:bg-white/10"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                                    {tool.requiresContext ? 'Marketing Details (Required)' : 'Additional Context & Data'}
                                </label>
                                <textarea
                                    rows={tool.requiresContext ? 6 : 4}
                                    required={tool.requiresContext}
                                    placeholder={tool.placeholderContext}
                                    value={context}
                                    onChange={(e) => setContext(e.target.value)}
                                    className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all hover:bg-white/10 text-sm resize-none ${tool.requiresContext ? 'border-brand-primary/30' : 'border-white/10'}`}
                                />
                                {tool.requiresContext && (
                                    <p className="text-[10px] text-amber-400/70 mt-2">⚡ The more detail you provide, the more targeted your audit will be.</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={generating}
                                className={`w-full py-4 rounded-lg font-bold transition-all flex justify-center items-center gap-2 ${generating
                                    ? "bg-brand-primary/20 text-brand-primary/50 cursor-wait"
                                    : "bg-brand-primary text-[#0f0c15] hover:shadow-[0_0_25px_rgba(45,212,191,0.5)] hover:scale-[1.02]"
                                    }`}
                            >
                                {generating ? (
                                    <><div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" /> Deep Analysis Running...</>
                                ) : (
                                    <><Cpu className="w-4 h-4" /> Run Market Analysis</>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Column */}
                    <div className="w-full lg:w-2/3">
                        {!report && !generating && (
                            <div className="h-full min-h-[400px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-8 print:hidden">
                                <ShieldCheck className="w-12 h-12 text-zinc-700 mb-4" />
                                <h3 className="text-xl font-bold text-zinc-500 mb-2">Awaiting Parameters</h3>
                                <p className="text-sm text-zinc-600 max-w-sm">
                                    Fill out the geography and industry data on the left to spawn an AI Intelligence agent tailored to this town.
                                </p>
                            </div>
                        )}

                        {generating && (
                            <div className="h-full min-h-[400px] border border-brand-primary/20 bg-brand-primary/5 rounded-2xl flex flex-col items-center justify-center text-center p-8 print:hidden">
                                <div className="w-16 h-16 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(45,212,191,0.4)]" />
                                <h3 className="text-xl font-bold text-white mb-2 animate-pulse">Triangulating Data...</h3>
                                <p className="text-sm text-zinc-400">
                                    Compiling geographic intelligence and demographics...
                                </p>
                            </div>
                        )}

                        {report && !generating && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="flex justify-between items-center print:hidden border-b border-white/10 pb-4">
                                    <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5" /> Report Generated
                                    </h3>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => downloadDocument('doc')}
                                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm font-medium transition-all flex items-center gap-2"
                                            title="Download as Word Document"
                                        >
                                            <FileText className="w-4 h-4" /> Word (.doc)
                                        </button>
                                        <button
                                            onClick={handlePrintPdf}
                                            className="px-3 py-1.5 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/20 rounded-md text-sm font-medium transition-all flex items-center gap-2"
                                            title="Print to PDF"
                                        >
                                            <Download className="w-4 h-4" /> Save PDF
                                        </button>
                                    </div>
                                </div>

                                {/* Print Header (only visible on print) */}
                                <div className="hidden print:block text-center border-b border-black pb-4 mb-6">
                                    <h1 className="text-2xl font-bold text-black">{tool.title}</h1>
                                    <p className="text-sm text-gray-500 mt-1">Gnomad Studio | Target ZIP: {zipCode} | Sector: {industry}</p>
                                </div>

                                {/* Report Output Area */}
                                <div className="prose prose-invert prose-brand max-w-none bg-[#14111d] print:bg-white p-6 md:p-8 rounded-xl border border-white/5 print:border-none whitespace-pre-wrap font-sans text-sm md:text-base leading-relaxed print:text-black">
                                    {report}
                                </div>

                                {/* Print Footer */}
                                <div className="hidden print:block text-xs text-center text-gray-400 mt-12 border-t border-gray-200 pt-4">
                                    Generated with AI assistance by Gnomad Studio. Not a substitute for professional counsel.
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
