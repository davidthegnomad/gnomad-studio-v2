import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Shield } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-transparent">
            {/* Organic Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-sage-healing/5 rounded-l-[10rem] -mr-20 z-0" />
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-terracotta/5 rounded-full blur-[100px] z-0" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Content Column */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-earth-slate/5 shadow-sm"
                        >
                            <Award className="text-sage-healing" size={18} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-slate/60">Muskogee's Trusted Foundation Since 1984</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="font-serif text-6xl lg:text-8xl text-earth-slate leading-[0.95] font-black tracking-tighter"
                        >
                            Generational <br />
                            <span className="text-sage-healing italic font-normal">Healing.</span> <br />
                            Precision Care.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-earth-slate/70 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
                        >
                            Balancing clinical expertise with organic warmth. Dr. Brant McDaniel provides a natural path to recovery for families who value precision over guesswork.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                        >
                            <a
                                href="tel:918-686-8676"
                                className="group bg-terracotta text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-2xl hover:bg-earth-slate transition-all hover:scale-105 active:scale-95"
                            >
                                $49 New Patient Special
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                            </a>
                            <div className="flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/50 backdrop-blur-sm border border-earth-slate/5">
                                <div className="flex text-sage-healing">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-[10px] font-black text-earth-slate/60 uppercase tracking-widest">100+ Reviews</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Column - The "Sanctuary" Frame */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex-1 relative"
                    >
                        <div className="relative z-10 max-w-[550px] mx-auto">
                            {/* Glass Accent Plates */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sage-healing/20 rounded-3xl blur-2xl -z-10 animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-terracotta/10 rounded-full blur-3xl -z-10" />

                            <div className="p-4 bg-white rounded-[3rem] shadow-2xl border border-earth-slate/5 rotate-2 hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="/spine-hero.webp"
                                    alt="Abstract Spine Render"
                                    className="rounded-[2.5rem] hover:contrast-110 transition-all duration-1000 object-cover"
                                />
                            </div>

                            {/* Floating Stats Badge */}
                            <div className="absolute top-1/2 -right-12 -translate-y-1/2 glass-clinical p-6 rounded-3xl shadow-xl border border-white/20 hidden xl:block">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-8 rounded-lg bg-sage-healing/10 flex items-center justify-center text-sage-healing">
                                            <Shield size={16} />
                                        </div>
                                        <span className="text-[10px] font-black text-earth-slate uppercase tracking-widest">ICPA Certified</span>
                                    </div>
                                    <div className="h-px w-full bg-earth-slate/5" />
                                    <div className="text-center">
                                        <div className="text-2xl font-serif font-black text-earth-slate leading-none">41</div>
                                        <div className="text-[8px] font-black text-sage-healing uppercase tracking-[0.2em] mt-1">Years Clinical Exp</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
