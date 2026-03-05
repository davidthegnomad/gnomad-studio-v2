import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, setIsSidebarOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center w-full">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link to="/" onClick={closeMobileMenu}>
                        <img
                            src="/Pizza Pics/Pisanos_Logo.webp"
                            alt="Pisanos Pizza Logo"
                            className={`transition-all duration-300 drop-shadow-lg ${scrolled ? 'w-16 md:w-20' : 'w-24 md:w-32'}`}
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-sm font-bold uppercase tracking-widest text-[#E63946] hover:text-[#d62839] transition-colors">Home</Link>
                    <Link to="/menu" className="text-sm font-bold uppercase tracking-widest text-[#F1FAEE] hover:text-[#E63946] transition-colors">Menu</Link>
                    <Link to="/about" className="text-sm font-bold uppercase tracking-widest text-[#F1FAEE] hover:text-[#E63946] transition-colors">Our Story</Link>

                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="group flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-full transition-all"
                        aria-label="Open Shopping Cart"
                    >
                        <span className="text-sm font-bold uppercase tracking-widest text-[#F1FAEE] group-hover:text-[#E63946] transition-colors">Cart</span>
                        <div className="relative">
                            <ShoppingBag className={`text-[#FFB703] transition-transform group-hover:scale-110`} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#E63946] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#121212]">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </button>
                </nav>

                {/* Mobile Icons Menu */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="relative p-2"
                        aria-label="Open Mobile Cart"
                    >
                        <ShoppingBag className="text-[#F1FAEE]" />
                        {cartCount > 0 && (
                            <span className="absolute 0 top-0 right-0 bg-[#E63946] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#121212]">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-[#F1FAEE] hover:text-[#E63946] transition-colors"
                        aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed top-full left-0 right-0 bg-[#121212]/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 origin-top overflow-hidden ${mobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0 py-0 border-transparent'}`}>
                <nav className="flex flex-col items-center gap-6 px-6">
                    <Link to="/" onClick={closeMobileMenu} className="w-full text-center text-lg font-bold uppercase tracking-widest text-[#F1FAEE] hover:text-[#E63946] transition-colors py-2">Home</Link>
                    <Link to="/menu" onClick={closeMobileMenu} className="w-full text-center text-lg font-bold uppercase tracking-widest text-[#F1FAEE] hover:text-[#E63946] transition-colors py-2">Menu</Link>
                    <Link to="/about" onClick={closeMobileMenu} className="w-full text-center text-lg font-bold uppercase tracking-widest text-[#F1FAEE] hover:text-[#E63946] transition-colors py-2 border-b border-white/10 pb-6">Our Story</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
