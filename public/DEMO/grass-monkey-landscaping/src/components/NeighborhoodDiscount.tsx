import React from 'react';
import { Percent, Users, ArrowRight } from 'lucide-react';

const NeighborhoodDiscount = ({ onEstimateClick }: { onEstimateClick: () => void }) => (
    <div className="bg-emerald-600 py-3 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-10"></div>
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-white relative z-10">
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-lg">
                    <Users className="size-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.15em]">Neighborhood Power Boost</span>
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-90 text-center">
                3+ neighbors on one street? <span className="text-emerald-200">Get 15% OFF weekly mowing</span> for everyone.
            </p>
            <button
                onClick={onEstimateClick}
                className="flex items-center gap-2 bg-white text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter hover:bg-emerald-50 transition-all active:scale-95"
            >
                Start a Cluster <ArrowRight className="size-3" />
            </button>
        </div>
    </div>
);

export default NeighborhoodDiscount;
