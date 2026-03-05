import React from 'react';
import { ArrowRight, Settings, CheckCircle2, Factory } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover grayscale opacity-40 brightness-50 contrast-125"
                    src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=2000"
                    alt="Gritty Ford Truck driving on mud"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
                <div className="absolute inset-0 bg-grunge-pattern opacity-30 mix-blend-overlay"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full mt-10">
                <div className="max-w-3xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-zinc-900 border-2 border-zinc-700 text-white text-xs font-black uppercase tracking-[0.2em] mb-8 select-none">
                        <span className="w-2 h-2 bg-primary animate-pulse"></span>
                        Muskogee's Trusted Auto Shop
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white uppercase">
                        Built For <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">The Road.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed mb-12 max-w-2xl font-bold">
                        Heavy-duty tires, full-service auto repair, and commercial fleet maintenance. When you need it done right, you bring it to Harrison.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <a
                            href="#quote"
                            className="bg-primary hover:bg-orange-500 text-zinc-950 px-10 py-5 font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(249,115,22,0.3)] flex items-center justify-center gap-3 border-b-8 border-orange-700 active:border-b-0 active:translate-y-2 rounded-sm w-full sm:w-auto"
                        >
                            Get Tire Quote
                            <ArrowRight className="w-6 h-6" />
                        </a>

                        <div className="flex items-center gap-4 px-6 py-4 bg-zinc-900/80 border border-zinc-700 backdrop-blur-md rounded-sm w-full sm:w-auto">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-xs mb-1">
                                    <Settings className="w-4 h-4 text-primary" />
                                    Full Service
                                </div>
                                <span className="text-xs font-bold text-zinc-500">Brakes, Shocks & Alignments</span>
                            </div>
                        </div>
                    </div>

                    {/* Features Bar */}
                    <div className="mt-20 flex flex-wrap gap-10 opacity-60 bg-zinc-900/50 p-6 border-l-4 border-primary backdrop-blur-sm rounded-r-md inline-flex">
                        <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest">
                            <Factory className="w-5 h-5 text-zinc-400" />
                            Commercial Fleets Welcome
                        </div>
                        <div className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-widest">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            All Major Tire Brands
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default Hero;
