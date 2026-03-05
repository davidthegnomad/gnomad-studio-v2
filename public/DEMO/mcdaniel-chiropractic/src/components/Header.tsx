import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, MapPin, Star, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-clinical py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#" className="flex items-center gap-3">
                    <img src="./logo.webp" alt="McDaniel logo" className="h-10 md:h-12 w-auto" />
                    <div className="flex flex-col">
                        <span className="font-serif font-black text-xl leading-none text-earth-slate">McDaniel</span>
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-sage-healing">Chiropractic</span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="font-sans text-[10px] font-black uppercase tracking-[0.2em] text-earth-slate/60 hover:text-terracotta transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="tel:918-686-8676"
                        className="bg-earth-slate text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-terracotta transition-all hover:scale-105 active:scale-95 shadow-xl shadow-earth-slate/10"
                    >
                        <Phone size={14} fill="currentColor" />
                        (918) 686-8676
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-earth-slate p-2 active:scale-90 transition-transform"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} strokeWidth={2.5} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 lg:hidden bg-warm-sand/95 backdrop-blur-2xl flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-earth-slate/5">
                            <div className="flex flex-col">
                                <span className="font-serif font-black text-xl leading-none text-earth-slate">McDaniel</span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-sage-healing">Menu</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-earth-slate active:scale-90 transition-transform">
                                <X size={32} />
                            </button>
                        </div>

                        <div className="flex flex-col p-8 gap-8 mt-12 text-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="font-serif text-4xl font-black italic text-earth-slate hover:text-terracotta transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="h-px w-12 bg-terracotta/20 mx-auto my-4" />
                            <a
                                href="tel:918-686-8676"
                                className="bg-terracotta text-white p-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-4 text-sm shadow-2xl shadow-terracotta/20"
                            >
                                <Phone size={24} fill="currentColor" />
                                Call Office Now
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Header;
