import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Header() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    const navLinks = [
        { name: 'Specials', href: '#specials' },
        { name: 'Menu', href: '#menu' },
        { name: 'Vibes', href: '#vibe' },
        { name: 'Find Us', href: '#contact' },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4`}
            >
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo - flex-1 for perfect center alignment of nav */}
                    <div className="flex-1 flex justify-start">
                        <a href="#" className="flex items-center gap-3 relative group transition-all duration-300 rounded-full px-4 h-[60px] bg-black/80 backdrop-blur-md border border-neon-green/50 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                            <div className="w-10 h-10 relative overflow-hidden rounded-full border border-neon-green group-hover:shadow-[0_0_15px_#39FF14] transition-shadow">
                                <ImageWithFallback
                                    src="/DEMO/shared-images/green_st_neon_logo.webp"
                                    alt="Green ST. Logo"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-bungee text-2xl text-neon-green text-shadow-neon tracking-widest hidden sm:block">
                                GREEN ST.
                            </span>
                        </a>
                    </div>

                    {/* Desktop Nav - flex-none to respect its own width */}
                    <nav className="hidden md:flex flex-none items-center gap-8 font-orbitron transition-all duration-300 rounded-full px-8 h-[60px] bg-black/80 backdrop-blur-md border border-neon-green/50 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(57, 255, 20)" }}
                                whileTap={{ scale: 0.95 }}
                                className="text-gray-300 font-bold tracking-wider hover:text-neon-green transition-all"
                            >
                                {link.name.toUpperCase()}
                            </motion.a>
                        ))}
                    </nav>

                    {/* CTA & Mobile Toggle - flex-1 for perfect center alignment of nav */}
                    <div className="flex-1 flex justify-end">
                        <div className="flex items-center gap-4 transition-all duration-300 rounded-full px-2 h-[60px] bg-black/80 backdrop-blur-md border border-neon-green/50 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                            <a href="tel:918-577-6160" className="hidden sm:block call-btn-container">
                                <button
                                    className="call-btn-chaser font-orbitron px-6 text-sm font-bold flex items-center justify-center gap-2 group h-[44px]"
                                    style={{ borderRadius: '9999px' }}
                                >
                                    <span className="chase-line chase-top" />
                                    <span className="chase-line chase-right" />
                                    <span className="chase-line chase-bottom" />
                                    <span className="chase-line chase-left" />
                                    <span className="text-lg z-10">🛸</span>
                                    <span className="z-10 tracking-wider">CALL</span>
                                </button>
                            </a>

                            <button
                                className="md:hidden text-neon-green px-2 drop-shadow-neon flex-shrink-0"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-4 flex flex-col items-center"
                >
                    <nav className="flex flex-col gap-8 text-center font-orbitron w-full max-w-sm mt-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-3xl font-bold Tracking-widest text-gray-300 hover:text-neon-green hover:drop-shadow-neon transition-all py-4 border-b border-gray-800"
                            >
                                {link.name.toUpperCase()}
                            </a>
                        ))}
                        <a href="tel:918-577-6160" className="mt-8 call-btn-container w-full">
                            <button className="call-btn-chaser font-orbitron px-8 py-5 rounded-lg text-xl font-bold w-full flex items-center justify-center gap-3 group">
                                <span className="chase-line chase-top" />
                                <span className="chase-line chase-right" />
                                <span className="chase-line chase-bottom" />
                                <span className="chase-line chase-left" />
                                <span className="text-2xl z-10">🛸</span>
                                <span className="z-10">CALL MOTHERSHIP</span>
                            </button>
                        </a>
                    </nav>
                </motion.div>
            )}
        </>
    );
}
