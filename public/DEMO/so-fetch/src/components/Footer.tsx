import React from 'react';
import { Sparkles, Facebook, Instagram, Camera } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white pt-24 pb-12 border-t border-purple-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <a href="#" className="flex items-center gap-3 mb-6 group" title="Return to Top">
                            <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Sparkles className="text-white w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tight text-text-dark leading-none">So Fetch</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none">Grooming Studio</span>
                            </div>
                        </a>
                        <p className="text-text-dark/60 font-medium leading-relaxed mb-6 pr-4">
                            Making Muskogee's pets look so fetch since 2024. Luxury, cage-free grooming in a calm environment.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Camera].map((Icon, i) => (
                                <a key={i} href="#" aria-label="Social Link" className="w-10 h-10 rounded-full bg-background-light border border-purple-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h5 className="font-black text-text-dark uppercase tracking-widest text-xs mb-8">Quick <span className="text-primary">Links</span></h5>
                        <ul className="space-y-4">
                            {['Home', 'Our Services', 'Meet the Groomers', 'Gallery', 'Book Now'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-text-dark/60 hover:text-primary font-bold text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h5 className="font-black text-text-dark uppercase tracking-widest text-xs mb-8">The <span className="text-primary">Fine Print</span></h5>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Vaccination Requirements', 'Cancellation Policy'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-text-dark/60 hover:text-primary font-bold text-sm transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h5 className="font-black text-text-dark uppercase tracking-widest text-xs mb-8">Say <span className="text-primary">Hello</span></h5>
                        <div className="space-y-4">
                            <a href="tel:+19185551234" className="block p-5 bg-background-light border border-purple-100 rounded-3xl hover:border-primary/50 transition-all group shadow-sm">
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Call Us</p>
                                <p className="text-xl font-black text-text-dark tracking-tight">(918) 555-1234</p>
                            </a>
                            <div className="px-5">
                                <p className="text-[10px] font-black text-text-dark/40 uppercase tracking-[0.2em] mb-1">Location</p>
                                <p className="text-text-dark/80 font-bold text-sm">Muskogee, OK</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Agency Branding Footer */}
                <div className="pt-8 border-t border-purple-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-text-dark/40 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} So Fetch Grooming. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="text-[10px] font-black text-text-dark/40 uppercase tracking-[0.2em]">Crafted by</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Gnomad Studio 🦙</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
