import React from 'react';
import { TreePine, Scissors, ShieldAlert, Hammer, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: TreePine,
        title: 'Tree Removal',
        description: 'Safe removal of hazardous or unwanted trees using precision rigging and specialized equipment.',
        color: 'bg-emerald-500/20 text-emerald-500'
    },
    {
        icon: Scissors,
        title: 'Pruning & Trimming',
        description: 'Structural pruning to enhance tree health and prevent storm damage to your property.',
        color: 'bg-amber-500/20 text-amber-500'
    },
    {
        icon: ShieldAlert,
        title: 'Emergency Care',
        description: '24/7 priority response for storm-damaged trees blocking houses or power lines.',
        color: 'bg-red-500/20 text-red-500'
    },
    {
        icon: Hammer,
        title: 'Stump Grinding',
        description: 'Complete below-grade removal of stumps to clear the way for new landscape or grass.',
        color: 'bg-blue-500/20 text-blue-500'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-32 bg-background-dark relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="mb-20">
                    <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">Precision Services</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                        Built For The <br /><span className="text-primary not-italic">Outdoors.</span>
                    </h3>
                    <p className="text-white/40 max-w-2xl text-lg font-medium leading-relaxed">
                        From precision technical removals to aesthetic pruning, we provide the highest level of care for Muskogee's urban forest.
                    </p>
                </div>

                {/* Grid / Horizontal Scroll on Mobile */}
                <div className="flex pb-8 gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="min-w-[85vw] md:min-w-0 snap-center group bg-white/5 border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
                        >
                            {/* Icon */}
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform ${service.color}`}>
                                <service.icon className="w-8 h-8" />
                            </div>

                            <h4 className="text-2xl font-black mb-4 text-white uppercase tracking-tight">{service.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">
                                {service.description}
                            </p>

                            <a href="#quote" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                                Get Quote
                                <ArrowRight className="w-4 h-4" />
                            </a>

                            {/* Background Accent */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>
                        </div>
                    ))}
                </div>

            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </section>
    );
};

export default Services;
