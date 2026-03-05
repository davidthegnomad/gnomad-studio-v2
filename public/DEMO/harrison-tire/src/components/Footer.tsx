import React from 'react';
import { Settings, Facebook, MapPin, Wrench } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-zinc-950 pt-24 pb-16 border-t border-zinc-800 relative">
            <div className="absolute inset-0 bg-grunge-pattern opacity-10 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center border-2 border-orange-400">
                                <Settings className="text-zinc-950 w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">Harrison</span>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] leading-none">Tire & Supply</span>
                            </div>
                        </div>
                        <p className="text-zinc-500 font-bold text-sm mb-6 leading-relaxed max-w-sm">
                            Your local Muskogee destination for heavy-duty tires, fleet maintenance, and full-service auto repair.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-primary transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 border-b-2 border-primary pb-2 inline-block">Services</h4>
                            <ul className="space-y-3">
                                {['Tire Sales', 'Alignments', 'Brakes', 'Oil Changes'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-zinc-500 hover:text-white font-bold text-sm transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 border-b-2 border-primary pb-2 inline-block">Company</h4>
                            <ul className="space-y-3">
                                {['About Us', 'Contact', 'Fleet Account'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-zinc-500 hover:text-white font-bold text-sm transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <h4 className="font-black text-white uppercase tracking-widest text-xs mb-6 border-b-2 border-primary pb-2 inline-block">Location</h4>
                        <div className="flex gap-4 mb-4">
                            <MapPin className="w-5 h-5 text-primary shrink-0" />
                            <div>
                                <p className="text-white font-bold text-sm leading-relaxed mb-1">123 Industrial Blvd<br />Muskogee, OK 74401</p>
                                <a href="#" className="text-primary hover:text-orange-400 text-xs font-black uppercase tracking-widest transition-colors">Get Directions »</a>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-zinc-900 border border-zinc-800 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Shop Phone</p>
                                <p className="text-white font-bold">(918) 683-5565</p>
                            </div>
                            <Wrench className="w-6 h-6 text-zinc-700" />
                        </div>
                    </div>

                </div>

                {/* Agency Footer */}
                <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                        © {new Date().getFullYear()} Harrison Tire & Supply.
                    </p>
                    <div className="flex items-center gap-2 group cursor-default">
                        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Powered by</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Gnomad Studio 🦙</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
