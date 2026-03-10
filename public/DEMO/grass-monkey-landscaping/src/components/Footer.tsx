import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ChevronRight, Share2, Instagram } from "lucide-react";

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOpenStatus = () => {
            const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Chicago', hour12: false };
            const localTimeString = new Date().toLocaleTimeString('en-US', options);
            const currentHour = parseInt(localTimeString.split(':')[0], 10);
            const localDayString = new Date().toLocaleDateString('en-US', { timeZone: 'America/Chicago', weekday: 'short' });

            let actuallyOpen = false;
            // Monday - Friday: 8 AM - 6 PM
            if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(localDayString)) {
                if (currentHour >= 8 && currentHour < 18) actuallyOpen = true;
            }
            setIsOpen(actuallyOpen);
        };

        checkOpenStatus();
        const interval = setInterval(checkOpenStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="mx-4 md:mx-8 mb-8 mt-12 bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_15px_40px_-5px_rgba(0,0,0,0.8)] relative overflow-hidden group/footer">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent"></div>

            <div className="container mx-auto px-8 py-12">

                {/* Newsletter / Quote Hook */}
                <div className="bg-gradient-to-br from-[#0a1b12] to-slate-900 border border-green-500/20 rounded-[2rem] p-8 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_30px_-10px_rgba(22,163,74,0.2)] hover:shadow-[0_0_40px_-5px_rgba(22,163,74,0.3)] transition-all duration-500 relative overflow-hidden group/newsletter pointer-events-none sm:pointer-events-auto">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover/newsletter:bg-green-500/20 transition-colors duration-500 pointer-events-none"></div>

                    <div className="text-left relative z-10 w-full lg:w-1/2">
                        <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mb-2 group-hover/newsletter:text-green-400 transition-all duration-500 uppercase">
                            <span className="material-symbols-outlined text-green-500 text-3xl">mail</span>
                            Join the Yard-Report
                        </h3>
                        <p className="text-slate-400 text-sm font-medium">Get seasonal lawn tips, fertilization reminders, and exclusive neighborhood bulk-pricing drops.</p>
                    </div>
                    <div className="flex w-full lg:w-auto gap-3 relative z-10">
                        <input type="email" placeholder="Your email address" className="w-full lg:w-80 bg-slate-950/90 border border-white/5 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm shadow-inner transition-colors" />
                        <button className="bg-green-600 hover:bg-green-500 text-white font-black tracking-widest uppercase px-8 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-95 whitespace-nowrap cursor-pointer text-xs">Subscribe</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Brand & Status */}
                    <div className="space-y-6 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <a href="#" className="inline-block cursor-pointer group shrink-0">
                                <img src="./logo.webp" alt="Grass Monkey Logo" className="h-24 lg:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(22,163,74,0.5)]" />
                            </a>
                            <div>
                                <h4 className="text-white font-black text-xl mb-1 uppercase tracking-tighter">Grass Monkey</h4>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium italic">
                                    "We show up. Every single week." Muskogee's most dependable property maintenance squad.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase rounded-full border transition-all duration-500 ${isOpen ? 'bg-green-500/10 text-green-500 border-green-500/50 shadow-[0_0_15px_rgba(22,163,74,0.3)]' : 'bg-slate-800 text-slate-500 border-white/5'}`}>
                                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></span>
                                {isOpen ? 'Crews On Route' : 'Dispatch Closed'}
                            </span>
                        </div>
                        <div className="text-slate-300 text-sm space-y-3 pt-2 font-bold uppercase tracking-wider">
                            <a href="https://maps.google.com/?q=Muskogee+OK" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer group/link w-fit mx-auto md:mx-0">
                                <MapPin className="text-green-500 size-5" />
                                <span className="text-[10px]">Serving Muskogee & Surrounds</span>
                            </a>
                            <a href="tel:918-348-1663" className="flex items-center gap-2 hover:text-green-500 transition-colors cursor-pointer group/link w-fit mx-auto md:mx-0">
                                <Phone className="text-green-500 size-5" />
                                <span className="text-[10px]">(918) 348-1663</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Explore */}
                    <div className="md:col-span-2 md:col-start-6 hidden md:block">
                        <h4 className="text-white font-black tracking-[0.2em] text-xs mb-8 flex items-center gap-2 uppercase">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(22,163,74,0.8)]"></span>
                            Navigation
                        </h4>
                        <ul className="space-y-4">
                            {['Services', 'Commercial', 'Service Area', 'Reviews'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-slate-500 hover:text-white font-black uppercase text-[10px] tracking-widest hover:translate-x-2 transition-all duration-300 inline-block cursor-pointer">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Schedule */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-black tracking-[0.2em] text-xs mb-8 flex items-center gap-2 justify-center md:justify-start uppercase">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(22,163,74,0.8)]"></span>
                            Operation
                        </h4>
                        <ul className="space-y-3 text-slate-500 text-[10px] font-black uppercase max-w-[240px] mx-auto md:mx-0">
                            <li className="flex justify-between border-b border-white/5 pb-2 hover:border-green-500/30 transition-colors group/row">
                                <span className="group-hover/row:text-green-500 transition-colors">Mon - Fri</span>
                                <span className="text-white font-medium group-hover/row:text-green-400 transition-colors">8:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Saturday</span>
                                <span className="text-slate-600 font-medium italic">Emergency Only</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Sunday</span>
                                <span className="text-red-500 font-medium italic">Closed</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Connect */}
                    <div className="md:col-span-2 text-center md:text-left">
                        <h4 className="text-white font-black tracking-[0.2em] text-xs mb-8 flex items-center gap-2 justify-center md:justify-start uppercase">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(22,163,74,0.8)]"></span>
                            Connect
                        </h4>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="#" className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 hover:scale-110 transition-all duration-300 text-slate-500 shadow-lg group/social">
                                <Share2 className="size-6" />
                            </a>
                            <a href="#" className="size-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-green-500/20 hover:text-green-500 hover:scale-110 transition-all duration-300 text-slate-500 shadow-lg group/social">
                                <Instagram className="size-6" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Gnomad Signature */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Grass Monkey Landscaping. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-700 text-[10px] uppercase font-black">Developed by</span>
                        <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-white font-black text-xs uppercase tracking-[0.2em] flex items-center transition-all duration-300">
                            Gnomad Studio
                        </a>
                    </div>
                </div>
            </div>

            {/* Hidden Mobile Action Bar placeholder */}
            <div className="md:hidden h-20"></div>
        </footer>
    );
}
