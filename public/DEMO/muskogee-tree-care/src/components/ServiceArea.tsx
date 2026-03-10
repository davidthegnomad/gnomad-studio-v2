import React from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';

const counties = [
    'Muskogee County',
    'Wagoner County',
    'Cherokee County',
    'McIntosh County',
    'Haskell County',
    'Okmulgee County'
];

const ServiceArea: React.FC = () => {
    return (
        <section className="py-32 border-t border-white/5 bg-background-dark" id="area">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Map Visual */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
                            <img
                                className="w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                                src="https://images.unsplash.com/photo-1548345666-a5772829e1d4?auto=format&fit=crop&q=80&w=1000"
                                alt="Regional service area Map of Muskogee Oklahoma"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>

                            {/* Map Pins Overlay */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-bounce shadow-2xl shadow-primary/50 relative">
                                    <MapPin className="text-white w-6 h-6" />
                                    <div className="absolute inset-x-0 -bottom-4 h-1 bg-primary/20 rounded-full blur-sm"></div>
                                </div>
                                <span className="mt-4 px-3 py-1 bg-background-dark/80 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black text-white uppercase tracking-widest">Muskogee, OK</span>
                            </div>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">Regional Coverage</h2>
                        <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                            Always <br /><span className="text-primary not-italic">Nearby.</span>
                        </h3>
                        <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium">
                            We bring specialized rigging equipment and certified expertise to properties across the entire Northeastern Oklahoma region.
                        </p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            {counties.map((county, index) => (
                                <div key={index} className="flex items-center gap-3 text-white/40 group cursor-default hover:text-primary transition-colors">
                                    <CheckCircle2 className="w-5 h-5 text-primary opacity-30 group-hover:opacity-100 transition-opacity" />
                                    <span className="font-bold text-sm uppercase tracking-widest">{county}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 p-8 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between group">
                            <div>
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Standard Response</p>
                                <p className="text-white font-bold tracking-tight">24-48 Hours</p>
                            </div>
                            <div className="w-px h-10 bg-white/10"></div>
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Emergency</p>
                                <p className="text-white font-bold tracking-tight">ASAP Priority</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ServiceArea;
