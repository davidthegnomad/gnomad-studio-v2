import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Star } from 'lucide-react';

const results = [
    { url: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800", title: "Residential Mowing", tag: "Fort Gibson" },
    { url: "https://images.unsplash.com/photo-1558905619-1708f323c27e?auto=format&fit=crop&q=80&w=800", title: "Commercial Property", tag: "Muskogee" },
    { url: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800", title: "Flower Bed Refresh", tag: "Tahlequah" },
    { url: "https://images.unsplash.com/photo-1599839619722-397514112634?auto=format&fit=crop&q=80&w=800", title: "Seasonal Cleanup", tag: "Broken Arrow" }
];

const ResultsReel = () => (
    <section className="py-24 px-6 lg:px-12 bg-slate-950 overflow-hidden">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="space-y-4">
                    <span className="text-emerald-500 font-black uppercase text-xs tracking-widest px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">Quality Control</span>
                    <h2 className="text-white text-4xl font-black tracking-tight uppercase leading-none">The Results Reel</h2>
                    <p className="text-slate-400 max-w-lg font-medium">Real yards. Real crews. See the high-fidelity results we deliver every single week across Green Country.</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-4 py-2 bg-slate-900 border border-white/5 rounded-lg flex items-center gap-2 text-xs font-black uppercase text-emerald-500">
                        <Star className="size-3 fill-current" /> 4.9/5 Google Rated
                    </div>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                {results.map((res, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="min-w-[300px] md:min-w-[400px] snap-center group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
                    >
                        <img src={res.url} alt={res.title} className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>

                        <div className="absolute bottom-8 left-8 right-8 space-y-2">
                            <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">{res.tag}</span>
                            <h3 className="text-white font-black text-2xl uppercase tracking-tighter">{res.title}</h3>
                            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                <CheckCircle2 className="size-3" /> Professional Standard
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default ResultsReel;
