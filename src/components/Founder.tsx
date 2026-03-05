"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Founder() {
    return (
        <section id="manifesto" className="py-24 bg-black/40 border-y border-white/5">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase mb-10">A Word From the Gnomad</p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="glass-panel p-12 rounded-3xl text-left bg-gradient-to-br from-white/[0.05] to-transparent border-white/5"
                >
                    <p className="text-2xl md:text-3xl text-gray-300 mb-10 leading-tight font-medium italic">
                        &ldquo;My whole life I&apos;ve watched small businesses die or be swallowed up.
                        I&apos;m here to help change that.&rdquo;
                    </p>
                    <p className="text-2xl md:text-3xl text-gray-300 mb-10 leading-tight font-medium italic">
                        &ldquo;I want Muskogee&apos;s best businesses — the ones built by hand,
                        the ones with real soul — to have every advantage that technology can give them.&rdquo;
                    </p>
                    <div className="flex items-center gap-6">
                        <div className="relative w-16 h-16 rounded-full shadow-lg border-[3px] border-white/10 overflow-hidden">
                            <Image
                                src="/assets/new_founder.webp"
                                alt="David Cole - Founder of Gnomad Studio"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-bold text-xl text-white">David Cole</div>
                            <div className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-1">MBA Founder &amp; Engineer · Muskogee, OK</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
