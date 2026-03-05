import React from 'react';
import { ShieldCheck, CalendarCheck, Zap } from 'lucide-react';

const TrustBar = () => {
    const items = [
        {
            icon: <ShieldCheck size={20} />,
            title: "ICPA Certified",
            desc: "Specialized in pediatric and pregnancy care."
        },
        {
            icon: <CalendarCheck size={20} />,
            title: "Family First",
            desc: "Adjustments for newborns to seniors."
        },
        {
            icon: <Zap size={20} />,
            title: "Instant Relief",
            desc: "Natural solutions for acute pain & migraines."
        }
    ];

    return (
        <section className="bg-transparent border-y border-earth-slate/5 py-8 md:py-12 relative overflow-hidden">
            <div className="container mx-auto px-6 grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-12 relative z-10">
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center group cursor-default">
                        <div className="size-10 md:size-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-sage-healing mb-3 md:mb-6 group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-500 border border-earth-slate/5">
                            {item.icon}
                        </div>
                        <h3 className="font-serif font-black text-[10px] md:text-xl md:mb-2 text-earth-slate uppercase tracking-tight group-hover:text-terracotta transition-colors">{item.title}</h3>
                        <p className="hidden sm:block text-earth-slate/60 text-xs md:text-sm leading-relaxed font-medium max-w-[200px]">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBar;
