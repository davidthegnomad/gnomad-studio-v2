import React from 'react';
import { Calendar, Phone, MapPin, Camera } from "lucide-react";

const MobileNav = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-white/5 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
            <a href="sms:9183481663" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-500 hover:text-emerald-500 transition-colors">
                <div className="bg-emerald-600/10 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Camera className="size-5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">Results</span>
            </a>
            <a href="tel:9183481663" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-500 hover:text-emerald-500 transition-colors">
                <div className="bg-emerald-600 p-3 rounded-2xl -mt-6 mb-1 shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-all text-white">
                    <Phone className="size-6 fill-current" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">Call Now</span>
            </a>
            <a href="sms:9183481663" className="flex flex-col items-center justify-center w-full gap-1 group cursor-pointer text-slate-500 hover:text-emerald-500 transition-colors">
                <div className="bg-emerald-600/10 p-2 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Calendar className="size-5" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter">Text Us</span>
            </a>
        </div>
    </nav>
);

export default MobileNav;
