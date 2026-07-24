"use client";

import { motion } from "framer-motion";

export default function HowWeBuild() {
    return (
        <section
            id="how-we-build"
            className="relative py-28 px-4 overflow-hidden border-y border-white/5 bg-gradient-to-b from-background via-[#0d151c] to-background"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-accent/5 pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto text-center md:text-left">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs font-bold tracking-[0.3em] text-brand-primary uppercase mb-6"
                >
                    How We Build
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-10 leading-tight"
                >
                    Not a template.{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-brand-primary to-brand-accent">
                        A notepad and a dream.
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-6 text-gray-400 text-lg md:text-xl leading-relaxed"
                >
                    <p>
                        Most web shops start with a template. Pick a theme, swap the logo, change the colors — and call it custom.
                    </p>
                    <p>
                        We don&apos;t. Gnomad Studio builds your site with{" "}
                        <strong className="text-white font-semibold">React</strong> — the same technology Meta created for Facebook and Instagram, and the same approach companies like Netflix and Airbnb use for the interfaces people use every day. No drag-and-drop theme. No rented page that looks like every other shop in town.
                    </p>
                    <p>
                        Every site starts with a notepad and a dream: who you are, who you serve, and what you want someone to do when they land on your page. Then we build it for <em className="text-gray-200 not-italic">you</em> — your photos, your hours, your story, your Muskogee and 918 customers.
                    </p>
                    <p>
                        When it goes live, it sits on solid hosting with security and Google&apos;s own tools wired in — so neighbors can find you on Maps and Search, not just on Facebook.
                    </p>
                    <p className="text-white font-semibold pt-2">
                        World-class tech for Main Street. Built for your business — not borrowed from a template library.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
