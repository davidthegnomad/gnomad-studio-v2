"use client";
import Link from "next/link";
import { Lock, Phone, MessageSquare, Menu } from "lucide-react";

export default function MobileDispatch() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[65] w-full max-w-sm px-4 md:hidden">
            <div className="glass-panel border-white/10 p-2 rounded-[2.5rem] flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-background/80 backdrop-blur-xl">
                <Link href="#" className="nav-btn flex flex-col items-center justify-center w-14 h-14 rounded-full active:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-1">
                        <Lock size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-active:text-white tracking-widest uppercase">Portal</span>
                </Link>

                <Link href="/contact" className="nav-btn flex flex-col items-center justify-center w-14 h-14 rounded-full active:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-secondary/20 flex items-center justify-center text-brand-secondary mb-1">
                        <MessageSquare size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-active:text-white tracking-widest uppercase">Email</span>
                </Link>

                <a href="tel:+19184711813" className="nav-btn flex flex-col items-center justify-center w-14 h-14 rounded-full active:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-1">
                        <Phone size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-active:text-white tracking-widest uppercase">Call</span>
                </a>

                <a href="#services" className="nav-btn flex flex-col items-center justify-center w-14 h-14 rounded-full active:bg-white/5 transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white mb-1">
                        <Menu size={16} />
                    </div>
                    <span className="text-[9px] font-bold text-gray-400 group-active:text-white tracking-widest uppercase">Menu</span>
                </a>
            </div>
        </div>
    );
}
