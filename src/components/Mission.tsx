"use client";
import { motion } from "framer-motion";

export default function Mission() {
    return (
        <section id="mission" className="py-24 px-4 border-t border-white/5 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent tracking-tight mb-12 whitespace-nowrap">Why Muskogee Businesses Choose Us</h2>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:grid md:grid-cols-4 md:gap-8 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center flex flex-col justify-start gap-3 glass-panel p-8 md:p-6 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] min-h-[14rem] md:aspect-square md:rounded-full md:justify-center md:items-center md:text-center">
                        <h3 className="text-xl font-bold text-brand-secondary leading-tight">MBA-Level Strategy</h3>
                        <p className="text-sm text-gray-400 break-words hyphens-none leading-relaxed tracking-wide">Not just pretty pages — every decision is backed by business fundamentals designed to grow your revenue.</p>
                    </motion.div>
                    <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center flex flex-col justify-start gap-3 glass-panel p-8 md:p-6 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] min-h-[14rem] md:aspect-square md:rounded-full md:justify-center md:items-center md:text-center">
                        <h3 className="text-xl font-bold text-brand-primary leading-tight">Google Maps Dominance</h3>
                        <p className="text-sm text-gray-400 break-words hyphens-none leading-relaxed tracking-wide">We specialize in &ldquo;Near Me&rdquo; SEO so your business shows up first when locals are searching.</p>
                    </motion.div>
                    <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.2 }} viewport={{ once: true }} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center flex flex-col justify-start gap-3 glass-panel p-8 md:p-6 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] min-h-[14rem] md:aspect-square md:rounded-full md:justify-center md:items-center md:text-center">
                        <h3 className="text-xl font-bold text-brand-accent leading-tight">Built For Main Street</h3>
                        <p className="text-sm text-gray-400 break-words hyphens-none leading-relaxed tracking-wide">We know the 918. We know Muskogee. Our work is built for the community, not copy-pasted from a template.</p>
                    </motion.div>
                    <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ delay: 0.3 }} viewport={{ once: true }} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 flex-shrink-0 snap-center flex flex-col justify-start gap-3 glass-panel p-8 md:p-6 lg:p-10 rounded-3xl border border-white/5 bg-white/[0.02] min-h-[14rem] md:aspect-square md:rounded-full md:justify-center md:items-center md:text-center">
                        <h3 className="text-xl font-bold text-white leading-tight">Mission-First Pricing</h3>
                        <p className="text-sm text-gray-400 break-words hyphens-none leading-relaxed tracking-wide">From &ldquo;Pay What You Can&rdquo; for solopreneurs to full brand builds. Great engineering shouldn&apos;t require a loan.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
