import React from 'react';
import ComparisonSlider from './ComparisonSlider';

const WhyChooseUs = () => (
    <section className="py-24 px-6 lg:px-20 bg-[#0d121a]" id="gallery">
        <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm">
                        <span className="w-8 h-[2px] bg-primary"></span>
                        Why Muskogee Chooses Champion
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        Restoring Showroom Shine, <br />
                        Right in Your Driveway.
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        We aren't just car washers; we are surface preservation specialists. Our meticulous multi-step process and medical-grade interior steam treatment ensure your vehicle looks better than the day you bought it.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors cursor-default group">
                            <div className="text-3xl font-bold text-white mb-1">4.1 <span className="text-primary text-xl group-hover:animate-pulse">★</span></div>
                            <div className="text-sm text-slate-400">Google Rating</div>
                        </div>
                        <div className="p-4 rounded-lg bg-white/5 border border-white/5 hover:border-primary/50 transition-colors cursor-default group">
                            <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary transition-colors">100%</div>
                            <div className="text-sm text-slate-400">Mobile Service</div>
                        </div>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-4 text-slate-200">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div>
                                <strong className="block text-white">Full Autonomy</strong>
                                We bring our own water and power. Total zero-friction for you.
                            </div>
                        </li>
                        <li className="flex items-center gap-4 text-slate-200">
                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="material-symbols-outlined">workspace_premium</span>
                            </div>
                            <div>
                                <strong className="block text-white">Quality Guaranteed</strong>
                                Multi-point inspection on every detail before we leave.
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 w-full max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl relative group">
                    <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white uppercase pointer-events-none">Before</div>
                    <div className="absolute top-4 right-4 z-30 bg-primary/80 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white uppercase pointer-events-none">After</div>
                    <ComparisonSlider />
                </div>
            </div>
        </div>
    </section>
);

export default WhyChooseUs;
