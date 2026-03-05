import React from 'react';

const Testimonials = () => (
    <section className="py-24 px-6 lg:px-20 bg-background-dark border-t border-white/5" id="reviews">
        <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Verified Client Feedback</h2>
                    <p className="text-slate-400 max-w-xl">Don’t just take our word for it—see the results we’ve delivered for vehicle owners throughout Green Country.</p>
                </div>
                <div className="flex gap-2">
                    <button className="size-10 rounded-full border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center text-white transition-colors cursor-pointer group">
                        <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    </button>
                    <button className="size-10 rounded-full border border-white/10 hover:bg-primary hover:border-primary flex items-center justify-center text-white transition-colors cursor-pointer group">
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-8 rounded-xl border border-white/5 relative group hover:border-primary/30 transition-all">
                    <span className="material-symbols-outlined absolute top-6 right-6 text-4xl text-primary/10 group-hover:text-primary/20 transition-colors">format_quote</span>
                    <div className="flex gap-1 text-primary mb-4">
                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-sm fill-current">star</span>)}
                    </div>
                    <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">"My car looks brand new! I didn't think the stains in the backseat would ever come out, but they worked magic. Highly recommend for anyone in Muskogee."</p>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">BL</div>
                        <div>
                            <div className="text-white font-bold">Brittany L.</div>
                            <div className="text-slate-500 text-sm">The Executive Interior</div>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-8 rounded-xl border border-white/5 relative group hover:border-primary/30 transition-all">
                    <span className="material-symbols-outlined absolute top-6 right-6 text-4xl text-primary/10 group-hover:text-primary/20 transition-colors">format_quote</span>
                    <div className="flex gap-1 text-primary mb-4">
                        {[1, 2, 3, 4, 5].map(i => <span key={i} className="material-symbols-outlined text-sm fill-current">star</span>)}
                    </div>
                    <p className="text-slate-300 text-lg mb-6 italic leading-relaxed">"The ceramic coating is incredible. Water just slides right off. The team was professional, on time, and meticulous with their work."</p>
                    <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JT</div>
                        <div>
                            <div className="text-white font-bold">John T.</div>
                            <div className="text-slate-500 text-sm">The Ceramic Shield</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Testimonials;
