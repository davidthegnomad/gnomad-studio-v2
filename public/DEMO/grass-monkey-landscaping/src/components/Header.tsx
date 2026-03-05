import React, { useState } from 'react';
import { Menu, Phone, X } from "lucide-react";

const Header = ({ onPortalClick }: { onPortalClick: () => void }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 flex items-center justify-between bg-slate-950/90 backdrop-blur-md px-6 py-4 lg:px-12 border-b border-white/5 shadow-sm h-20">
                <div className="flex items-center gap-4">
                    <img src="./logo.webp" alt="Grass Monkey Logo" className="w-12 h-12 rounded-lg object-contain bg-slate-900 border border-white/10 shadow-lg p-1" />
                    <h2 className="text-white text-xl font-black tracking-tight uppercase hidden sm:block">Grass Monkey</h2>
                </div>

                <nav className="hidden lg:flex items-center gap-8">
                    <a href="#services" className="text-slate-400 hover:text-emerald-500 transition-colors text-xs font-black uppercase tracking-widest">Services</a>
                    <a href="#commercial" className="text-slate-400 hover:text-emerald-500 transition-colors text-xs font-black uppercase tracking-widest">Commercial</a>
                    <button onClick={onPortalClick} className="text-slate-400 hover:text-emerald-500 transition-colors text-xs font-black uppercase tracking-widest">Client Portal</button>
                    <a href="#testimonials" className="text-slate-400 hover:text-emerald-500 transition-colors text-xs font-black uppercase tracking-widest">Reviews</a>
                </nav>

                <div className="flex items-center gap-6">
                    <div className="hidden lg:flex items-center gap-2 text-slate-300 font-bold">
                        <Phone className="w-5 h-5 text-green-500" />
                        <a href="tel:918-348-1663" className="hover:text-green-400 transition-colors underline decoration-green-500/30 decoration-2 underline-offset-4">(918) 348-1663</a>
                    </div>
                    <button className="hidden sm:flex items-center justify-center rounded uppercase tracking-widest h-11 px-8 bg-green-600 hover:bg-green-500 transition-all text-white text-xs font-black shadow-lg shadow-green-900/50 active:scale-95" title="Get a Free Estimate">
                        Request Bid
                    </button>
                    <button
                        className="lg:hidden p-2 text-slate-300 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-slate-950 pt-24 px-6 lg:hidden flex flex-col items-center gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
                    <a href="#services" className="text-white text-2xl font-black uppercase" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                    <a href="#commercial" className="text-white text-2xl font-black uppercase" onClick={() => setIsMobileMenuOpen(false)}>Commercial</a>
                    <a href="#service-area" className="text-white text-2xl font-black uppercase" onClick={() => setIsMobileMenuOpen(false)}>Service Area</a>
                    <a href="#testimonials" className="text-white text-2xl font-black uppercase" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
                    <a href="tel:918-348-1663" className="mt-8 flex items-center gap-3 text-green-500 text-2xl font-black uppercase">
                        <Phone className="w-8 h-8" fill="currentColor" />
                        (918) 348-1663
                    </a>
                </div>
            )}
        </>
    );
};

export default Header;
