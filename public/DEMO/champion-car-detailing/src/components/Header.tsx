import React, { useState } from 'react';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 glass-nav h-20 px-6 lg:px-10 flex items-center justify-between transition-all duration-300 bg-[#0a0e14]/90 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-3 text-white">
                    <img src="./champion_car_logo.webp" alt="Champion Mobile Detailing" className="w-10 h-10 object-contain" />
                    <h2 className="text-white text-lg font-bold leading-tight tracking-tight hidden sm:block">
                        Champion <span className="text-primary">Mobile Detailing</span>
                    </h2>
                </div>
                <nav className="hidden md:flex items-center gap-8">
                    <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#services">Services</a>
                    <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#gallery">Gallery</a>
                    <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#reviews">Reviews</a>
                    <a className="text-slate-300 hover:text-white text-sm font-medium transition-colors" href="#contact">Contact</a>
                </nav>
                <div className="flex items-center gap-4">
                    <a className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-primary transition-colors" href="tel:+19182120313">
                        <span className="material-symbols-outlined text-[20px]">call</span>
                        (918) 212-0313
                    </a>
                    <button className="hidden sm:flex cursor-pointer items-center justify-center overflow-hidden rounded h-10 px-6 bg-primary hover:bg-primary-dark transition-colors text-white text-sm font-bold shadow-neon">
                        <span className="truncate">Book Now</span>
                    </button>

                    <button
                        className="md:hidden flex items-center justify-center text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Navigation"
                    >
                        <span className="material-symbols-outlined text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#0a0e14]/95 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col items-center gap-6 animate-in fade-in duration-300">
                    <a className="text-white text-2xl font-bold transition-colors" href="#services" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                    <a className="text-white text-2xl font-bold transition-colors" href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a>
                    <a className="text-white text-2xl font-bold transition-colors" href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a>
                    <a className="text-white text-2xl font-bold transition-colors" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    <a className="mt-8 flex items-center gap-2 text-primary font-bold text-xl" href="tel:+19182120313">
                        <span className="material-symbols-outlined text-2xl">call</span>
                        (918) 212-0313
                    </a>
                </div>
            )}
        </>
    );
};

export default Header;
