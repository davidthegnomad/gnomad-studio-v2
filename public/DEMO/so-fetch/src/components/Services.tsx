import React from 'react';
import { Scissors, Bath, Sparkles, Heart } from 'lucide-react';

const services = [
    {
        icon: Scissors,
        title: 'The Full Fetch',
        description: 'Our signature service. Complete styling, breed-standard cuts, blueberry facial, and paw-dicure.',
        price: 'From $80'
    },
    {
        icon: Bath,
        title: 'Spa Bath & Brush',
        description: 'Perfect for between haircuts. Includes deep-cleansing massage, blowout, and nail trimming.',
        price: 'From $50'
    },
    {
        icon: Sparkles,
        title: 'De-Shedding Magic',
        description: 'Reduce at-home shedding by up to 90% with our specialized FURminator treatment.',
        price: 'From $70'
    },
    {
        icon: Heart,
        title: 'Puppy\'s First Spa',
        description: 'A gentle, slow-paced introduction to grooming to ensure they love the process forever.',
        price: 'From $45'
    }
];

const Services: React.FC = () => {
    return (
        <section id="services" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-secondary font-bold uppercase tracking-[0.25em] text-xs mb-4">Our Services</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-text-dark tracking-tight mb-6">
                        Grooming Menu
                    </h3>
                    <p className="text-text-dark/60 text-lg font-medium leading-relaxed">
                        Every dog deserves a tailored spa experience. Choose from our luxury packages designed to make your pet look and feel their absolute best.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-background-light border border-purple-100 p-8 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group"
                        >
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-gradient-to-tr from-primary to-secondary transition-all duration-500">
                                <service.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                            </div>

                            <h4 className="text-xl font-black mb-3 text-text-dark tracking-tight">{service.title}</h4>
                            <p className="text-text-dark/60 text-sm leading-relaxed mb-8 font-medium h-20">
                                {service.description}
                            </p>

                            <div className="inline-block bg-white px-4 py-2 rounded-full font-black text-secondary text-sm shadow-sm border border-cyan-50 group-hover:bg-secondary group-hover:text-white transition-colors">
                                {service.price}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Services;
