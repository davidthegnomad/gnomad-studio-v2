import React from 'react';
import { Phone, MapPin, Star, Clock } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    const dispatchButtons = [
        { icon: <Phone size={20} />, label: "Call", href: "tel:918-686-8676", color: "bg-terracotta" },
        { icon: <MapPin size={20} />, label: "Maps", href: "https://www.google.com/maps/dir//McDaniel+Family+Chiropractic,+3300+Chandler+Rd,+Muskogee,+OK+74403", color: "bg-earth-slate" },
        { icon: <Star size={20} />, label: "Reviews", href: "#testimonials", color: "bg-sage-healing" },
        { icon: <Clock size={20} />, label: "Hours", href: "#contact", color: "bg-earth-slate" },
    ];

    return (
        <div className="min-h-screen bg-transparent">
            <Header />
            <main>
                <Hero />
                <TrustBar />
                <About />
                <Services />
                <Testimonials />
                <Contact />
            </main>
            <Footer />

            {/* 4-Button Dispatch Bar (MOBIUS Command Center) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4 lg:hidden">
                <div className="glass-clinical border-white/60 p-2 rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_50px_#2f3e4633]">
                    {dispatchButtons.map((btn, idx) => (
                        <a
                            key={idx}
                            href={btn.href}
                            className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl transition-all active:scale-90 ${btn.color} text-white`}
                        >
                            {btn.icon}
                            <span className="text-[8px] font-black uppercase tracking-widest">{btn.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
