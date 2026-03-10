import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-earth-slate py-20 relative overflow-hidden">
            {/* Organic Texture Overlay */}
            <div className="absolute inset-0 bg-sage-healing/5 mix-blend-overlay opacity-20" />

            <div className="container mx-auto px-6 text-center relative z-10">
                <img src="./logo.webp" alt="McDaniel Logo" className="h-16 mx-auto mb-8 contrast-[10] invert opacity-80" />
                <p className="font-serif font-black text-warm-sand text-3xl italic mb-2 tracking-tighter uppercase">
                    McDaniel <span className="text-sage-healing">Chiropractic</span>
                </p>
                <p className="text-warm-sand/40 font-bold text-[10px] uppercase tracking-[0.4em] mb-12">
                    Muskogee's Foundation for Natural Health
                </p>

                <div className="h-px w-24 bg-terracotta/30 mx-auto mb-12" />

                <div className="flex flex-col gap-4">
                    <p className="text-warm-sand/60 text-[10px] font-black uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} David the Gnomad Inc.
                    </p>
                    <div className="inline-flex items-center justify-center gap-3 px-6 py-2 rounded-full border border-warm-sand/10 bg-white/5 backdrop-blur-sm self-center">
                        <span className="text-terracotta text-[8px] font-black uppercase tracking-[0.5em]">
                            Crafted by Gnomad Studio
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
