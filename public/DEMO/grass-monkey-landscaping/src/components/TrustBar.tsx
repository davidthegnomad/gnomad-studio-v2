import React from 'react';
import { ShieldCheck, CreditCard, CheckCircle2 } from "lucide-react";

const TrustBar = () => (
    <section className="bg-slate-900 border-b border-white/5 py-6 md:py-12 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-5"></div>
        <div className="max-w-6xl mx-auto grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-12 md:divide-x md:divide-white/5 relative z-10">
            {[
                { icon: <ShieldCheck className="size-4 md:size-8" />, title: "Fully Insured", desc: "Property & peace of mind priority." },
                { icon: <CreditCard className="size-4 md:size-8" />, title: "Secure Billing", desc: "Auto-pay via secure portal." },
                { icon: <CheckCircle2 className="size-4 md:size-8" />, title: "Smart Comm", desc: "Digital reports on every visit." }
            ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center p-2 md:px-6 group cursor-default">
                    <div className="size-8 md:size-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2 md:mb-6 group-hover:scale-110 transition-transform">
                        {item.icon}
                    </div>
                    <h3 className="font-black text-[9px] md:text-xl mb-1 md:mb-3 text-white uppercase tracking-tighter md:tracking-tight">{item.title}</h3>
                    <p className="text-slate-500 text-[8px] md:text-sm leading-tight md:leading-relaxed font-medium md:max-w-xs">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
);

export default TrustBar;
