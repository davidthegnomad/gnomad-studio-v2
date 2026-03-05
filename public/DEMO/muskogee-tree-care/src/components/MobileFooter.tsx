import React, { useState, useEffect } from 'react';
import { Phone, Calendar, MapPin, Search } from 'lucide-react';

const MobileFooter: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkStatus = () => {
            const now = new Date();
            // Assuming Muskogee local time is Central Time
            const cstOptions = { timeZone: 'America/Chicago', hour12: false, hour: 'numeric' as const };
            const currentCstHour = parseInt(now.toLocaleTimeString('en-US', cstOptions), 10);
            const currentDay = now.getDay();

            // Open Mon-Fri 7AM to 6PM
            if (currentDay >= 1 && currentDay <= 5 && currentCstHour >= 7 && currentCstHour < 18) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[400px] md:hidden">
            {/* Status Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-background-dark border border-white/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-primary' : 'bg-red-500'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-primary' : 'bg-red-500'}`}></span>
                    </span>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
                        {isOpen ? 'Dispatch: Active' : 'Emergency Only'}
                    </span>
                </div>
            </div>

            {/* Main Footer Container */}
            <div className="bg-background-dark/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl p-2 relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex justify-around items-center h-16 relative">
                    <a href="tel:+19183486300" className="flex flex-col items-center justify-center w-full gap-0.5 group text-white/50 hover:text-primary transition-colors" title="Call Muskogee Tree Care">
                        <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest mt-1">Call</span>
                    </a>

                    {/* Center Main Action */}
                    <div className="relative flex justify-center w-full">
                        <a
                            href="/#quote"
                            className="bg-primary hover:scale-105 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 border border-white/10 transition-all active:scale-95"
                            title="Get a Quote"
                        >
                            <Calendar className="w-5 h-5 text-white" />
                        </a>
                    </div>

                    <a href="https://maps.google.com/?q=Muskogee,+OK" target="_blank" rel="noreferrer noopener" className="flex flex-col items-center justify-center w-full gap-0.5 group text-white/50 hover:text-primary transition-colors" title="View Service Area">
                        <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-black uppercase tracking-widest mt-1">Area</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileFooter;
