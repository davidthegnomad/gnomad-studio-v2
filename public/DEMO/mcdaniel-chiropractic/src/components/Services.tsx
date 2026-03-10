import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Zap, Infinity } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <ShieldCheck size={24} />,
            title: "Spinal Adjustments",
            desc: "Gentle manual techniques to restore alignment and nervous system flow.",
            size: "large"
        },
        {
            icon: <Heart size={24} />,
            title: "Family Wellness",
            desc: "Pediatric care from infancy. A healthy spine is a lifetime foundation.",
            size: "medium"
        },
        {
            icon: <Zap size={24} />,
            title: "Pain Relief",
            desc: "Drug-free relief for back pain, tension, and migraines.",
            size: "small"
        },
        {
            icon: <Infinity size={24} />,
            title: "Chronic Care",
            desc: "Solutions for sciatica and disc issues missed by traditional care.",
            size: "small"
        }
    ];

    return (
        <section id="services" className="py-20 relative bg-earth-gradient">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                    <div>
                        <span className="text-sage-healing italic font-serif text-lg">Clinical Precision</span>
                        <h2 className="font-serif text-4xl lg:text-5xl text-earth-slate font-black tracking-tight uppercase mt-2">Our Methods.</h2>
                    </div>
                    <p className="text-earth-slate/60 text-xs font-bold uppercase tracking-widest max-w-xs text-right hidden md:block">
                        Precision care rooted in 41 years of natural clinical excellence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[160px]">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            whileHover="hover"
                            initial="initial"
                            className={`
                                relative overflow-hidden glass-clinical rounded-[2rem] border-white/40 group transition-all duration-500
                                ${service.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
                                ${service.size === 'medium' ? 'md:col-span-1 md:row-span-2' : ''}
                                ${service.size === 'small' ? 'md:col-span-1 md:row-span-1' : ''}
                            `}
                        >
                            <div className="h-full p-6 md:p-8 flex flex-col justify-end relative z-10">
                                <div className="absolute top-6 left-6 size-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-sage-healing group-hover:bg-terracotta group-hover:text-white transition-all duration-500">
                                    {service.icon}
                                </div>

                                <h3 className={`font-serif font-black text-earth-slate transition-all duration-500 ${service.size === 'large' ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl'}`}>
                                    {service.title}
                                </h3>

                                <motion.p
                                    variants={{
                                        initial: { opacity: 0, height: 0, marginTop: 0 },
                                        hover: { opacity: 1, height: 'auto', marginTop: 8 }
                                    }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="text-earth-slate/60 text-xs md:text-sm leading-relaxed font-medium overflow-hidden"
                                >
                                    {service.desc}
                                </motion.p>
                            </div>

                            {/* Warm Glow Accent */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-terracotta/5 rounded-full -mr-8 -mb-8 blur-2xl group-hover:bg-terracotta/20 transition-colors duration-700" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
