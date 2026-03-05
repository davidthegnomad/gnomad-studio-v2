import React from 'react';
import { TreePine, Facebook, Instagram, Twitter, ShieldCheck } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-background-dark/80 pt-32 pb-40 md:pb-20 border-t border-white/5 relative overflow-hidden">
            {/* Texture Accent */}
            <div className="absolute inset-0 bg-wood-pattern opacity-5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <a href="#" className="flex items-center gap-3 mb-8 group" title="Return to Top">
                            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                <TreePine className="text-white w-7 h-7" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Muskogee</span>
                                <span className="text-sm font-bold text-primary uppercase tracking-[0.2em] leading-none">Tree Care</span>
                            </div>
                        </a>
                        <p className="text-white/40 font-medium leading-relaxed mb-8 pr-4">
                            Providing professional arborist services to Muskogee and surrounding counties since 2010. Fully insured and focused on safety.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" aria-label="Social Link" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h5 className="font-black text-white uppercase tracking-widest text-xs mb-10 italic">Quick <span className="text-primary not-italic">Links</span></h5>
                        <ul className="space-y-4">
                            {['Services', 'FAQ', 'Contact', 'Service Area'].map((link) => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/40 hover:text-primary font-bold text-sm tracking-widest uppercase transition-colors">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Expertise Column */}
                    <div>
                        <h5 className="font-black text-white uppercase tracking-widest text-xs mb-10 italic">Our <span className="text-primary not-italic">Promise</span></h5>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">Fully Insured & Bonded for $2M Liability</span>
                            </li>
                            <li className="flex gap-4">
                                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">ISA Certified Arborists on Site</span>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h5 className="font-black text-white uppercase tracking-widest text-xs mb-10 italic">Direct <span className="text-primary not-italic">Line</span></h5>
                        <div className="space-y-6">
                            <a href="tel:+19183486300" className="block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary/5 hover:border-primary/20 transition-all group">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 group-hover:text-primary transition-colors">Emergency Dispatch</p>
                                <p className="text-2xl font-black text-white tracking-tighter italic">(918) 348-6300</p>
                            </a>
                            <div className="px-6">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Serving Regional</p>
                                <p className="text-white font-bold text-sm">Muskogee, Wagoner, Cherokee, McIntosh, Haskell, Okmulgee</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Agency Branding Footer */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                        © {new Date().getFullYear()} Muskogee Tree Care. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] group-hover:text-white/40 transition-colors">Made with ❤️ by</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Gnomad Studio 🦙</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
