import React from 'react';
import { motion } from "motion/react";
import { CalendarCheck, Building2, Sprout, Trees, CheckCircle2 } from "lucide-react";

const services = [
    {
        icon: <CalendarCheck className="w-8 h-8" />,
        title: "Weekly Mowing & Maintenance",
        description: "Consistency is our specialty. We show up on the same day every week. We mow, edge, trim, and blow off all hard surfaces—standard every time."
    },
    {
        icon: <Building2 className="w-8 h-8" />,
        title: "Commercial Property Care",
        description: "Reliable landscaping for clinics, storefronts, and HOAs. Fully insured with professional crews to protect your business image."
    },
    {
        icon: <Sprout className="w-8 h-8" />,
        title: "Mulch & Flower Beds",
        description: "Instantly boost your curb appeal with professional bed crisping, weeding, and premium double-shredded mulch installation."
    },
    {
        icon: <Trees className="w-8 h-8" />,
        title: "Seasonal property Resets",
        description: "Spring property launches and fall leaf removal. We handle the heavy debris removal so your lawn can breathe year-round."
    }
];

const Services = () => (
    <section id="services" className="py-24 px-6 lg:px-12 bg-slate-950 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 space-y-4">
                <span className="text-green-500 font-black tracking-widest uppercase text-xs px-3 py-1 rounded bg-green-500/10 border border-green-500/20">The Portfolio</span>
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight mt-2">Services Built for Reliability</h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">Stop chasing lawn guys who don't show up. We provide a predictable, professional service that runs on autopilot.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8">
                {services.map((service, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-slate-900/40 p-4 md:p-10 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl hover:border-green-500/30 transition-all duration-300 flex flex-col md:flex-row gap-4 md:gap-8 items-start group"
                    >
                        <div className="bg-slate-800 border border-white/10 shadow-inner w-10 h-10 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl flex items-center justify-center text-green-500 group-hover:bg-green-600 group-hover:text-white transition-colors">
                            {React.cloneElement(service.icon as React.ReactElement, { className: "w-5 h-5 md:w-8 md:h-8" })}
                        </div>
                        <div className="space-y-2 md:space-y-4">
                            <h3 className="text-white text-sm md:text-2xl font-black leading-tight">{service.title}</h3>
                            <p className="text-slate-400 text-[10px] md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">{service.description}</p>
                            <div className="hidden sm:flex items-center gap-2 text-green-500 font-bold text-[8px] md:text-xs uppercase tracking-tighter pt-1 md:pt-2">
                                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4" /> Professional Result
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
