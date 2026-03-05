import React from 'react';
import { MapPin, Phone, Pizza } from 'lucide-react';
import { Link } from 'react-router-dom';
import StoreStatus from './StoreStatus';

const MobileFooter = () => {
    return (
        <nav className="fixed bottom-0 w-full md:hidden bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 z-50 flex flex-col gap-3">
            <div className="flex justify-center items-center px-1 scale-90 origin-center">
                <StoreStatus />
            </div>
            <div className="flex justify-between items-center gap-2">
                <Link to="/menu" className="flex-1 bg-[#E63946] text-white py-3 rounded-lg font-bold shadow-lg shadow-[#E63946]/20 text-xs flex flex-col items-center justify-center gap-1">
                    <Pizza size={16} />
                    Order Now
                </Link>
                <a href="https://maps.apple.com/?daddr=102+N+2nd+St,+Muskogee,+OK+74401" target="_blank" rel="noopener noreferrer" className="flex-1 border border-white/20 bg-white/5 text-[#F1FAEE] py-3 rounded-lg font-bold text-xs text-center flex flex-col items-center justify-center gap-1">
                    <MapPin size={16} />
                    Maps
                </a>
                <a href="tel:+19186833838" className="flex-1 border border-white/20 bg-white/5 text-[#F1FAEE] py-3 rounded-lg font-bold text-xs text-center flex flex-col items-center justify-center gap-1">
                    <Phone size={16} />
                    Call Pisano's
                </a>
            </div>
        </nav>
    );
};

export default MobileFooter;
