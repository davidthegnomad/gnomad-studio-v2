import React from 'react';

const CTA = () => (
    <section className="py-20 px-6 lg:px-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-10"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom translate-x-1/2"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready for that New Car Feeling?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Skip the tunnel wash. Book your mobile showroom transformation today and let us come to you.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="h-14 px-10 rounded-lg bg-background-dark text-white font-bold shadow-2xl hover:bg-black transition-all hover:scale-105 w-full sm:w-auto cursor-pointer">
                    Book Online Now
                </button>
                <button className="h-14 px-10 rounded-lg bg-transparent border-2 border-white/20 text-white font-bold hover:bg-white/10 transition-colors w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined">call</span>
                    (918) 212-0313
                </button>
            </div>
        </div>
    </section>
);

export default CTA;
