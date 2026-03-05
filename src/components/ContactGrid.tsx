"use client";
import { motion } from "framer-motion";

export default function ContactGrid() {
    return (
        <section className="py-24 px-6 border-t border-white/5 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 hidden md:block">
            <div className="max-w-5xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Phone - Reordered to Left */}
                    <a
                        href="tel:+19184711813"
                        className="glass-panel h-64 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-primary/50 transition-all duration-500 overflow-hidden relative block"
                    >
                        {/* Main Content (Icon and Title) */}
                        <motion.div
                            className="h-full flex flex-col items-center justify-center p-10"
                            whileHover={{ scale: 0.8, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00878e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </div>
                            <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-400">Phone</h4>
                        </motion.div>

                        {/* Rising Box - Desktop Only */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-primary/10 backdrop-blur-md border-t border-white/10 hidden md:flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                            <p className="text-white font-bold text-xl tracking-tight">+1 (918) 471 1813</p>
                        </div>
                    </a>

                    {/* Office - Reordered to Middle */}
                    <div className="glass-panel h-64 p-10 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-accent/50 transition-all duration-500 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                        </div>
                        <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-500 mb-2">Office</h4>
                        <p className="text-white font-bold text-xl">Muskogee, OK</p>
                    </div>

                    {/* Email - Reordered to Right */}
                    <a
                        href="mailto:david@gnomadstudio.org"
                        className="glass-panel h-64 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-secondary/50 transition-all duration-500 overflow-hidden relative block"
                    >
                        {/* Main Content (Icon and Title) */}
                        <motion.div
                            className="h-full flex flex-col items-center justify-center p-10"
                            whileHover={{ scale: 0.8, y: -20 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bfc8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </div>
                            <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-400">Email</h4>
                        </motion.div>

                        {/* Rising Box - Desktop Only */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-secondary/10 backdrop-blur-md border-t border-white/10 hidden md:flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-xs px-4">
                            <p className="text-white font-bold text-lg break-all">david@gnomadstudio.org</p>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
