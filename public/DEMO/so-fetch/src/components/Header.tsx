import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, Menu, X, CalendarHeart } from 'lucide-react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Spa Services', href: '#services' },
        { name: 'About Us', href: '#about' },
        { name: 'Booking', href: '#booking' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-12 h-12 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Sparkles className="text-white w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tight text-text-dark leading-none">So Fetch</span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none">Grooming Studio</span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-text-dark/70 hover:text-primary transition-colors tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-purple-100">
                            <a
                                href="tel:+19185551234"
                                className="text-text-dark/70 hover:text-primary transition-colors flex items-center gap-2 text-sm font-bold"
                            >
                                <Phone className="w-4 h-4 text-secondary" />
                                (918) 555-1234
                            </a>
                            <a
                                href="#booking"
                                className="bg-primary hover:bg-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 active:scale-95"
                            >
                                <CalendarHeart className="w-4 h-4" />
                                Book Spa Day
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-text-dark hover:text-primary transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-background-light/95 backdrop-blur-3xl z-40 transition-transform duration-500 md:hidden pt-24 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-start h-full gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-3xl font-black text-text-dark hover:text-primary transition-colors tracking-tight"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#booking"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full font-black text-xl flex items-center gap-3 mt-8 shadow-xl shadow-primary/20 active:scale-95"
                    >
                        <CalendarHeart className="w-6 h-6" />
                        Book Spa Day
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
