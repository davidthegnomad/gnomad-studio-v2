import React from 'react';

const MobileNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f16]/95 backdrop-blur-md border-t border-white/5 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
            <a href="#services" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                <span className="text-[10px] font-medium">Book</span>
            </a>
            <a href="#gallery" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">photo_library</span>
                <span className="text-[10px] font-medium">Gallery</span>
            </a>
            <a href="https://maps.google.com/?q=Champion+Mobile+Detailing+Muskogee+OK" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[24px]">location_on</span>
                <span className="text-[10px] font-medium">Location</span>
            </a>
            <a href="tel:+19182120313" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-400 hover:text-primary transition-colors">
                <div className="bg-primary/20 p-2 rounded-full -mt-4 mb-1 group-hover:bg-primary group-hover:text-white transition-all shadow-[0_0_15px_rgba(13,127,242,0.3)]">
                    <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <span className="text-[10px] font-medium -mt-1">Call</span>
            </a>
        </div>
    </nav>
);

export default MobileNav;
