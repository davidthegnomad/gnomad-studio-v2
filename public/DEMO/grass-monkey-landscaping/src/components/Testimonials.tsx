import React from 'react';
import { Star, CheckCircle2, ArrowRight } from "lucide-react";

const testimonials = [
    {
        name: " Sarah J.",
        role: "Muskogee Resident",
        content: "I used to have to track down my lawn guy to pay him cash. Now, Grass Monkey just shows up, texts me a photo, and bills my card. Easiest decision ever."
    },
    {
        name: "Marcus T.",
        role: "Local Business Owner",
        content: "We needed a vendor that actually answers the phone and carries full insurance. Grass Monkey makes managing our clinic's exterior completely stress-free."
    },
    {
        name: "The O'Connors",
        role: "Homeowners",
        content: "They actually show up when they say they will. In the landscaping business around here, finding a crew you can trust is incredibly rare. Highly recommend!"
    }
];

const Testimonials = () => (
    <section id="testimonials" className="py-24 px-6 lg:px-12 bg-slate-950 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
                <div className="flex gap-1 text-green-500 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-8 h-8" />)}
                </div>
                <h2 className="text-white text-4xl md:text-5xl font-black tracking-tight uppercase">Muskogee's Top Choice</h2>
                <p className="text-slate-400 text-lg max-w-2xl">Read what your neighbors say about our reliable, professional service on Google.</p>
            </div>

            <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 scroll-smooth hide-scrollbar px-2 -mx-2">
                {testimonials.map((t, idx) => (
                    <div key={idx} className="min-w-[85vw] md:min-w-0 bg-slate-900/40 p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl flex flex-col hover:border-green-500/20 transition-all group snap-center">
                        <div className="flex text-green-500 mb-6 group-hover:scale-105 transition-transform origin-left">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-4 h-4" />)}
                        </div>
                        <p className="text-slate-200 text-base md:text-lg italic mb-10 grow leading-relaxed">"{t.content}"</p>
                        <div className="border-t border-white/5 pt-6 flex items-center gap-4">
                            <div className="size-10 md:size-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 font-black text-[10px] md:text-xs uppercase">GM</div>
                            <div>
                                <p className="text-white font-black uppercase text-[xs] md:text-sm tracking-widest">{t.name}</p>
                                <p className="text-green-500 text-[10px] font-black uppercase tracking-tighter mt-1 flex items-center gap-1 group-hover:text-green-400 transition-colors">
                                    <CheckCircle2 className="w-3 h-3" /> Verified {t.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                <button className="text-slate-400 font-bold hover:text-green-400 transition-all inline-flex items-center gap-2 group cursor-pointer text-sm uppercase tracking-widest">
                    Read more verified reviews <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        </div>
    </section>
);

export default Testimonials;
