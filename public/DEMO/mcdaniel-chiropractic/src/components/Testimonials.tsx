import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        {
            name: "Jessica H.",
            role: "Muskogee Business Owner",
            content: "Dr. McDaniel helped me through my entire pregnancy. Easiest chiropractic experience I've ever had!",
            initials: "JH"
        },
        {
            name: "Robert H.",
            role: "Retired Teacher",
            content: "Years of chronic back pain are finally gone. I'm back to gardening with my grandkids pain-free.",
            initials: "RH"
        },
        {
            name: "David K.",
            role: "High School Coach",
            content: "Incredible staff and modern precision. Highly recommended for any local athletes in Muskogee.",
            initials: "DK"
        },
        {
            name: "Sarah L.",
            role: "Young Parent",
            content: "He sees my newborn for wellness adjustments. We trust him implicitly with our family's health.",
            initials: "SL"
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden">
            {/* Background Splashes */}
            <div className="absolute top-0 right-0 w-[40%] h-full bg-sage-healing/5 -skew-x-12 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-2">
                        <span className="text-terracotta italic font-serif text-xl">Patient Journeys</span>
                        <h2 className="font-serif text-5xl lg:text-7xl text-earth-slate font-black tracking-tight leading-none uppercase italic">
                            Real <span className="text-sage-healing">Stories.</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 py-3 px-6 rounded-full bg-white/50 border border-earth-slate/5 shadow-sm">
                        <div className="flex text-terracotta">
                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                        </div>
                        <span className="text-[10px] font-black text-earth-slate uppercase tracking-[0.2em]">Verified Muskogee Reviews</span>
                    </div>
                </div>

                <div className="flex overflow-x-auto pb-12 gap-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 cursor-grab active:cursor-grabbing">
                    {reviews.map((review, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="min-w-[85vw] md:min-w-[450px] glass-clinical p-8 md:p-12 rounded-[3.5rem] relative snap-center flex flex-col justify-between group transition-all duration-500"
                        >
                            <Quote className="absolute top-8 right-8 text-sage-healing/10 group-hover:text-terracotta/20 transition-colors" size={60} />

                            <div className="relative z-10">
                                <p className="font-serif text-2xl md:text-3xl text-earth-slate font-bold leading-[1.2] mb-10 tracking-tight">
                                    "{review.content}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center gap-4">
                                    <div className="size-14 rounded-2xl bg-sage-healing text-white flex items-center justify-center font-black text-sm shadow-lg shadow-sage-healing/20">
                                        {review.initials}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="font-sans text-xs font-black text-earth-slate uppercase tracking-widest">{review.name}</h4>
                                        <p className="text-[10px] font-bold text-earth-slate/40 uppercase tracking-widest">{review.role}</p>
                                    </div>
                                </div>

                                <div className="h-px flex-1 bg-earth-slate/5 mx-6 hidden sm:block" />

                                <div className="hidden sm:flex text-[10px] font-black uppercase text-sage-healing tracking-tighter">
                                    Patient Success ✓
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
