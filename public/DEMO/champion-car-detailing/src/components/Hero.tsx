import React from 'react';

const Hero = () => (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-background-dark/30 z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-transparent to-transparent z-10"></div>
            <img
                alt="Freshly washed electric blue car with perfect water beading"
                className="w-full h-full object-cover opacity-60"
                src="./hero_image.webp"
            />
        </div>
        <div className="relative z-20 container mx-auto px-6 lg:px-20 py-20 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Now Serving Muskogee, OK
                </div>
                <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                    Muskogee’s Elite <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Mobile Showroom</span> <br />
                    Experience
                </h1>
                <p className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto md:mx-0 leading-relaxed">
                    We bring our own water and power. Experience luxury detailing, paint correction, and ceramic coating right at your home or office.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                    <button className="h-14 px-8 rounded bg-primary hover:bg-primary-dark text-white font-bold text-lg shadow-neon transition-all hover:scale-105 flex items-center justify-center gap-2 cursor-pointer">
                        Book Your Transformation
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <button className="h-14 px-8 rounded glass-panel hover:bg-white/10 text-white font-medium text-lg transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer">
                        <span className="material-symbols-outlined text-primary">play_circle</span>
                        Watch Process
                    </button>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-6 pt-8 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">water_drop</span>
                        Water & Power Provided
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">verified</span>
                        Fully Insured
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
