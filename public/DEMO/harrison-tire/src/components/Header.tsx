import React, { useState, useEffect } from 'react';
import { Settings, Phone, Menu, X, Wrench } from 'lucide-react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Tires', href: '#tires' },
        { name: 'Auto Repair', href: '#repair' },
        { name: 'Fleet Services', href: '#fleet' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-900/95 backdrop-blur-xl border-b-2 border-primary py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-800 py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center border-2 border-orange-400 group-hover:rotate-180 transition-transform duration-700">
                            <Settings className="text-zinc-950 w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">Harrison</span>
                            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] leading-none">Tire & Supply</span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-zinc-800">
                            <a
                                href="tel:+19186835565"
                                className="text-white hover:text-primary transition-colors flex items-center gap-2 text-sm font-black tracking-tight"
                            >
                                <Phone className="w-5 h-5 text-primary" />
                                (918) 683-5565
                            </a>
                            <a
                                href="#quote"
                                className="bg-primary hover:bg-orange-600 text-zinc-950 px-6 py-2.5 font-black text-sm uppercase tracking-widest transition-all flex items-center gap-2 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 rounded-sm"
                            >
                                <Wrench className="w-4 h-4" />
                                Get Quote
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-400 hover:text-primary transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-zinc-950 z-40 transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="absolute inset-0 bg-grunge-pattern pointer-events-none opacity-20"></div>
                <div className="flex flex-col items-center justify-center h-full gap-8 relative z-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-4xl font-black text-white hover:text-primary transition-colors uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-2"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#quote"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-primary text-zinc-950 px-10 py-5 font-black text-2xl uppercase tracking-widest flex items-center gap-3 mt-8 border-b-8 border-orange-700 active:border-b-0 active:translate-y-2 rounded-sm"
                    >
                        <Wrench className="w-7 h-7" />
                        Get Quote
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
