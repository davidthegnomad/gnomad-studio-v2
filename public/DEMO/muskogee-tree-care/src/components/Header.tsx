import React, { useState, useEffect } from 'react';
import { TreePine, Phone, Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
    isDarkMode: boolean;
    setIsDarkMode: (val: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, setIsDarkMode }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: '#quote' },
        { name: 'Area', href: '#area' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-dark/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                            <TreePine className="text-white w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Muskogee</span>
                            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] leading-none">Tree Care</span>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-bold text-white/70 hover:text-primary transition-colors uppercase tracking-widest"
                            >
                                {link.name}
                            </a>
                        ))}

                        <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                            <button
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="p-2 text-white/50 hover:text-primary transition-colors"
                                title="Toggle Theme"
                            >
                                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <a
                                href="tel:+19183486300"
                                className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <Phone className="w-4 h-4" />
                                (918) 348-6300
                            </a>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 text-white/50 hover:text-primary"
                            title="Toggle Theme"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-white/50 hover:text-primary"
                            title="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-background-dark/95 backdrop-blur-2xl z-40 transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-3xl font-black text-white hover:text-primary transition-colors uppercase tracking-tighter"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="tel:+19183486300"
                        className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-xl flex items-center gap-3"
                    >
                        <Phone className="w-6 h-6" />
                        Call Now
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
