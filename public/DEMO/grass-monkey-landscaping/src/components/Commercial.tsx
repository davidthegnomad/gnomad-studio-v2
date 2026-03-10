import React from 'react';
import { Building2, CheckCircle2 } from "lucide-react";

const Commercial = () => (
    <section id="commercial" className="relative py-24 px-6 lg:px-12 bg-slate-900 border-t border-b border-white/5 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.02] pointer-events-none">
            <Building2 className="size-96 text-white" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <span className="inline-block py-1 px-4 rounded-full text-green-400 bg-green-500/10 border border-green-500/20 text-[10px] font-black uppercase tracking-widest shadow-sm">
                    Strategic Partners
                </span>
                <h2 className="text-white text-4xl lg:text-6xl font-black tracking-tight leading-none uppercase">
                    Commercial <br /><span className="text-green-500">Property Experts.</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                    Don't let an overgrown storefront drive premium customers away. We partner with Muskogee's restaurants, medical clinics, and property managers to keep commercial spaces looking elite year-round.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                    <ul className="space-y-4 text-slate-300 font-bold uppercase text-xs tracking-wider">
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" /> W-9 Compliant</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" /> Fully Insured Coverage</li>
                    </ul>
                    <ul className="space-y-4 text-slate-300 font-bold uppercase text-xs tracking-wider">
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" /> Net-30 Invoicing</li>
                        <li className="flex items-center gap-3"><CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" /> Reliable Routes</li>
                    </ul>
                </div>
                <button className="h-14 px-10 bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/40 font-black uppercase tracking-widest text-sm rounded-lg transition-all active:scale-95 cursor-pointer">
                    Request a Commercial Bid
                </button>
            </div>
            <div className="relative group">
                <div className="absolute -inset-4 bg-green-500/10 rounded-3xl blur-2xl group-hover:bg-green-500/20 transition-colors duration-700"></div>
                <img src="./commercial_landscaping.webp" alt="Commercial Property Landscaping Muskogee" className="relative rounded-2xl shadow-2xl border border-white/5 opacity-90 group-hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0" />
            </div>
        </div>
    </section>
);

export default Commercial;
