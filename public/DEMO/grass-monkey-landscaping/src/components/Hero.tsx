import React from 'react';
import { motion } from "motion/react";
import { ArrowRight, Phone, Star } from "lucide-react";

const Hero = ({ onEstimateClick }: { onEstimateClick: () => void }) => (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden text-center">
        <div
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{
                backgroundImage: 'linear-gradient(rgba(2, 6, 23, 0.4), rgba(2, 6, 23, 0.95)), url("./hero.webp")',
            }}
        />

        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center gap-6 max-w-4xl pt-10"
        >
            <div className="flex items-center gap-2 py-2 px-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-2xl">
                <Star className="w-4 h-4" fill="currentColor" /> #1 Rated Muskogee Property Care
            </div>
            <h1 className="text-white text-5xl lg:text-8xl font-black leading-[1.1] tracking-tighter drop-shadow-2xl uppercase">
                Fire Your<br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-500 to-rose-500 drop-shadow-sm">Unreliable Mower.</span>
            </h1>
            <p className="text-slate-300 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl text-shadow">
                Stop wasting your Saturdays chasing lawn guys who don't show up. We bring professional crews and automated communication to every yard in Muskogee County.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                <button
                    onClick={onEstimateClick}
                    className="h-16 px-10 bg-emerald-600 hover:bg-emerald-500 transition-all text-white text-base font-black uppercase tracking-widest rounded-lg shadow-xl shadow-emerald-900/50 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 cursor-pointer"
                >
                    Claim My Weekend <ArrowRight className="w-6 h-6" />
                </button>
                <a href="tel:918-348-1663" className="h-16 px-10 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md border border-slate-600 transition-all text-white text-base font-black uppercase tracking-widest rounded-lg shadow-lg flex items-center justify-center gap-3 active:scale-95">
                    Call Now <Phone className="w-5 h-5 fill-current" />
                </a>
            </div>

            <div className="flex items-center gap-8 mt-12 text-slate-400 text-sm font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Weekly Mowing
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Commercial Bids
                </div>
            </div>
        </motion.div>
    </section>
);

export default Hero;
