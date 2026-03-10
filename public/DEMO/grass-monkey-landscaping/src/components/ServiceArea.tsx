import React from 'react';
import { MapPin } from "lucide-react";

const ServiceArea = () => (
    <section id="service-area" className="py-24 px-6 lg:px-12 bg-slate-950 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-900/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="size-12 md:size-20 rounded-2xl md:rounded-3xl bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-4 md:mb-8 border border-green-500/20 shadow-2xl">
                <MapPin className="size-6 md:size-10" />
            </div>

            <h2 className="text-white text-2xl md:text-5xl font-black tracking-tight mb-3 md:mb-6 uppercase">Proudly Serving Green Country</h2>
            <p className="text-slate-400 text-sm md:text-lg mb-8 md:mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                Reliable service to the following Green Country communities:
            </p>

            <div className="flex overflow-x-auto pb-4 gap-3 snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-4 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                {[
                    { name: 'Muskogee', zone: 'Primary' },
                    { name: 'Fort Gibson', zone: 'Daily Route' },
                    { name: 'Tahlequah', zone: 'Weekly' },
                    { name: 'Wagoner', zone: 'Daily Route' },
                    { name: 'Broken Arrow', zone: 'Expansion' }
                ].map(city => (
                    <div key={city.name} className="min-w-[140px] md:min-w-0 p-4 md:p-6 bg-slate-900/50 border border-white/5 rounded-2xl md:rounded-3xl text-center group hover:border-emerald-500/30 transition-all snap-center">
                        <p className="text-white font-black uppercase text-[10px] md:text-xs tracking-widest mb-1 md:mb-2 whitespace-nowrap">{city.name}</p>
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-tighter text-emerald-500/60 group-hover:text-emerald-400 transition-colors">{city.zone}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default ServiceArea;
