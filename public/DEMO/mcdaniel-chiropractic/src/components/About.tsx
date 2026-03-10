import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sage-healing/10 rounded-full blur-2xl" />
                        <img
                            src="./dr-mcdaniel.webp"
                            alt="Dr. Brant McDaniel"
                            className="rounded-[2.5rem] shadow-2xl relative z-10 w-full max-w-lg mx-auto border-4 border-white grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute -bottom-6 -right-6 bg-earth-slate p-8 rounded-3xl shadow-xl z-20 text-white">
                            <span className="block text-4xl font-serif font-black mb-1 leading-none">41</span>
                            <span className="block text-[10px] font-black uppercase tracking-widest text-sage-healing">Years Practice</span>
                        </div>
                    </motion.div>

                    <div className="flex-1 space-y-8">
                        <div className="inline-block text-sage-healing font-black text-xs uppercase tracking-[0.3em] mb-2">Our Foundation</div>
                        <h2 className="font-serif text-4xl lg:text-5xl text-earth-slate font-black leading-tight italic">
                            "My mission is to empower families in Muskogee to live their healthiest lives."
                        </h2>
                        <div className="h-1.5 w-24 bg-sage-healing rounded-full" />

                        <div className="space-y-6 text-earth-slate/70 text-lg font-medium leading-relaxed">
                            <p>
                                Dr. Brant Scott McDaniel is a highly respected chiropractor serving the Muskogee community.
                                A graduate of the prestigious <span className="text-earth-slate font-bold">Logan College of Chiropractic</span>,
                                he has dedicated four decades to the study of the nervous system and spinal health.
                            </p>
                            <p>
                                At McDaniel Family Chiropractic, we prioritize building trusting relationships.
                                Whether you're bringing in a newborn for their first checkup or seeking relief for chronic sciatica,
                                our approach is rooted in the true principles of chiropractic wellness care.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                            {[
                                "Pediatric Certification",
                                "Pregnancy Care Specialist",
                                "Spinal Alignment Focus",
                                "Natural Headache Relief"
                            ].map(item => (
                                <div key={item} className="flex items-center gap-3 text-earth-slate font-black text-[10px] uppercase tracking-widest">
                                    <div className="size-2 bg-sage-healing rounded-full shadow-[0_0_10px_#84a98c80]" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
