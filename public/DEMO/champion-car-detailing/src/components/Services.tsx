import React from 'react';

const Services = () => (
    <section className="py-24 px-6 lg:px-20 bg-background-dark relative" id="services">
        <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Luxury Detailing Tiers</h2>
                <p className="text-slate-400 text-lg">Choose the caliber of restoration your vehicle deserves. White-glove service standard on all packages.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Tier 1: The Executive Interior */}
                <div className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:border-primary/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-white">chair</span>
                    </div>
                    <div className="size-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">airline_seat_recline_extra</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">The Executive Interior</h3>
                        <p className="text-3xl font-bold text-primary">$120<span className="text-base font-normal text-slate-400">+</span></p>
                    </div>
                    <p className="text-slate-300 leading-relaxed">Deep therapeutic cleaning for all cabin surfaces. We eliminate stains, odors, and bacteria using steam sanitization.</p>
                    <ul className="space-y-3 mt-auto pt-6 border-t border-white/10">
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Deep extraction for carpets & mats
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Leather ph-balanced conditioning
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            UV Shield for all dash & consoles
                        </li>
                    </ul>
                    <button className="w-full py-3 mt-6 rounded bg-white/5 hover:bg-primary-dark hover:text-white border border-white/10 text-slate-300 font-semibold transition-all group-hover:border-primary/50 cursor-pointer">Reserve Now</button>
                </div>

                {/* Tier 2: The Showroom Restoration */}
                <div className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:border-primary/50 transition-colors group relative overflow-hidden border-primary/30 shadow-[0_0_30px_rgba(13,127,242,0.05)]">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-white">directions_car</span>
                    </div>
                    <div className="size-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">auto_awesome</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">The Showroom Full</h3>
                        <p className="text-3xl font-bold text-primary">$180<span className="text-base font-normal text-slate-400">+</span></p>
                    </div>
                    <p className="text-slate-300 leading-relaxed">Our most popular transformation. A complete top-to-bottom reset for your daily driver or weekend luxury vehicle.</p>
                    <ul className="space-y-3 mt-auto pt-6 border-t border-white/10">
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Multi-stage exterior foam bath
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Clay bar decontamination
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Full upholstery & leather rejuvenation
                        </li>
                    </ul>
                    <button className="w-full py-3 mt-6 rounded bg-primary text-white font-semibold shadow-neon hover:bg-primary-dark transition-all cursor-pointer">Most Popular</button>
                </div>

                {/* Tier 3: The Ceramic Shield */}
                <div className="glass-panel p-8 rounded-xl flex flex-col gap-6 hover:border-primary/50 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-white">shield</span>
                    </div>
                    <div className="size-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">The Ceramic Shield</h3>
                        <p className="text-3xl font-bold text-primary">$500<span className="text-base font-normal text-slate-400">+</span></p>
                    </div>
                    <p className="text-slate-300 leading-relaxed">The ultimate investment. Semi-permanent ceramic bonding for mirrors-like reflection and hydrophobic protection.</p>
                    <ul className="space-y-3 mt-auto pt-6 border-t border-white/10">
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Single-stage paint correction
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            Graphene/Ceramic infusion coating
                        </li>
                        <li className="flex items-start gap-3 text-slate-300 text-sm">
                            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                            5-Year durability guarantee
                        </li>
                    </ul>
                    <button className="w-full py-3 mt-6 rounded bg-white/5 hover:bg-primary-dark hover:text-white border border-white/10 text-slate-300 font-semibold transition-all group-hover:border-primary/50 cursor-pointer">Inquire Now</button>
                </div>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
                {['Pet Hair Removal', 'Headlight Restoration', 'Engine Bay Cleaning', 'Odor Ozone Treatment'].map(add => (
                    <span key={add} className="px-4 py-2 rounded-full glass-panel border border-white/5 text-slate-300 text-sm font-medium flex items-center gap-2 hover:border-primary/30 transition-colors cursor-default">
                        <span className="material-symbols-outlined text-primary text-base">add_circle</span> {add}
                    </span>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
