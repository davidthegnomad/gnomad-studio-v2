import React from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000"
                    alt="Professional arborist removing large tree branches safely"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
                <div className="max-w-3xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-8 select-none backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Fully Insured & Local Experts
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter text-white uppercase italic">
                        Rugged <br />
                        <span className="text-primary not-italic">Precision.</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12 max-w-2xl font-medium">
                        Professional tree removal and hazmat limb clearance in Muskogee. We handle the heavy lifting while you protect your home.
                    </p>

                    {/* CTA & Social Proof */}
                    <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                        <a
                            href="#quote"
                            className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 group active:scale-95"
                        >
                            Get Free Quote
                            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                        </a>

                        <div className="flex items-center gap-4 px-5 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl">
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 text-primary fill-primary" />
                                    ))}
                                </div>
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">4.8 Average Rating</p>
                            </div>
                            <div className="w-px h-8 bg-white/10"></div>
                            <div className="flex flex-col">
                                <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Licensed & Bonded</p>
                            </div>
                        </div>
                    </div>

                    {/* Features Bar */}
                    <div className="mt-20 flex flex-wrap gap-8 opacity-40">
                        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                            <MapPin className="w-4 h-4 text-primary" />
                            Serving Muskogee County
                        </div>
                        <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                            <ShieldCheck className="w-4 h-4 text-primary" />
                            Certified Arborists
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
                <div className="w-px h-16 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    );
};

export default Hero;
