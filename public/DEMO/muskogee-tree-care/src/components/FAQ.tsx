import React, { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const faqs = [
    {
        question: "Do I need a permit to remove a tree in Muskogee?",
        answer: "Generally, no permit is required for tree removal on private residential property in Muskogee city limits, unless the tree is located in the right-of-way or in a designated historic district. We handle all necessary utility line checks before starting work."
    },
    {
        question: "How much does tree removal cost?",
        answer: "Costs vary significantly based on the tree's size, location, and condition. A straightforward removal might be $500, while a massive, hazardous Oak overhanging a house requires technical rigging and could cost several thousand. We provide free, transparent, no-obligation estimates on-site."
    },
    {
        question: "Are you fully insured for tree work?",
        answer: "Yes, absolutely. We carry full General Liability and Workers' Compensation insurance specifically rated for arboriculture. We will gladly provide our certificate of insurance before beginning any work on your property."
    },
    {
        question: "Do you offer emergency storm service?",
        answer: "Yes, we provide 24/7 emergency response for trees that have fallen on structures, vehicles, or are blocking access. Call our main line for immediate dispatch."
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-background-dark relative" id="faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <MessageCircleQuestion className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">Hey Siri, Ask</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">
                        Muskogee Tree Care
                    </h3>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-bold text-white pr-8">{faq.question}</span>
                                <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                            >
                                <div className="p-6 pt-0 text-white/50 leading-relaxed font-medium">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FAQ;
