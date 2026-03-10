import { useState, useEffect } from 'react';

export default function Footer() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkOpenStatus = () => {
            const options: Intl.DateTimeFormatOptions = { timeZone: 'America/Chicago', hour12: false };
            const localTimeString = new Date().toLocaleTimeString('en-US', options);
            const currentHour = parseInt(localTimeString.split(':')[0], 10);
            const localDayString = new Date().toLocaleDateString('en-US', { timeZone: 'America/Chicago', weekday: 'short' });

            let actuallyOpen = false;
            if (localDayString === 'Sun') {
                actuallyOpen = false; // Closed on Sunday
            } else if (localDayString === 'Sat') {
                if (currentHour >= 10 && currentHour < 16) actuallyOpen = true; // 10 AM - 4 PM
            } else {
                if (currentHour >= 9 && currentHour < 18) actuallyOpen = true; // 9 AM - 6 PM
            }
            setIsOpen(actuallyOpen);
        };

        checkOpenStatus();
        const interval = setInterval(checkOpenStatus, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="mx-4 md:mx-8 mb-8 mt-12 bg-surface-dark/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_15px_40px_-5px_rgba(0,0,0,0.8)] relative overflow-hidden group/footer">
            {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

            <div className="container mx-auto px-8 py-12">

                {/* Newsletter / Booking Hook */}
                <div className="bg-gradient-to-br from-[#0a111a] to-surface-dark border border-primary/20 rounded-[2rem] p-8 mb-16 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_30px_-10px_rgba(13,127,242,0.2)] hover:shadow-[0_0_40px_-5px_rgba(13,127,242,0.4)] transition-all duration-500 relative overflow-hidden group/newsletter">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.webp')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover/newsletter:bg-primary/20 transition-colors duration-500 pointer-events-none"></div>

                    <div className="text-left relative z-10 w-full lg:w-1/2">
                        <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mb-2 group-hover/newsletter:text-transparent group-hover/newsletter:bg-clip-text group-hover/newsletter:bg-gradient-to-r group-hover/newsletter:from-primary group-hover/newsletter:to-white transition-all duration-500">
                            <span className="material-symbols-outlined text-primary text-3xl">event_available</span>
                            The Finish Line Club
                        </h3>
                        <p className="text-slate-400 text-sm">Join our maintenance club for priority scheduling and exclusive monthly shine protection discounts.</p>
                    </div>
                    <div className="flex w-full lg:w-auto gap-3 relative z-10">
                        <input type="email" placeholder="Your email address" className="w-full lg:w-80 bg-background-dark/90 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm shadow-inner transition-colors" />
                        <button className="bg-primary hover:bg-primary-dark text-white font-black tracking-wide px-8 py-4 rounded-xl transition-all hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(13,127,242,0.5)] active:scale-95 whitespace-nowrap group-hover/newsletter:animate-pulse-slow cursor-pointer">Join Club</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Brand & Status */}
                    <div className="space-y-6 md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <a href="#" className="inline-block cursor-pointer group shrink-0">
                                <img src="./champion_car_logo.webp" alt="Champion Logo" className="h-24 lg:h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(13,127,242,0.5)]" />
                            </a>
                            <div>
                                <h4 className="text-white font-black text-xl mb-1">CHAMPION</h4>
                                <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                                    Muskogee's premier mobile showroom experience. Professional paint correction & ceramic coating delivered to your door.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black tracking-widest uppercase rounded-full border transition-all duration-500 ${isOpen ? 'bg-primary/10 text-primary border-primary/50 shadow-[0_0_15px_rgba(13,127,242,0.3)]' : 'bg-red-500/10 text-red-500 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'}`}>
                                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-primary animate-pulse' : 'bg-red-500'}`}></span>
                                {isOpen ? 'Accepting Appointments' : 'Closed for the day'}
                            </span>
                        </div>
                        <div className="text-slate-300 text-sm space-y-3 pt-2">
                            <a href="https://maps.google.com/?q=700+N+Main+St+Muskogee+OK" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group/link w-fit mx-auto md:mx-0">
                                <span className="material-symbols-outlined text-primary text-[20px] group-hover/link:animate-bounce">location_on</span>
                                <span className="group-hover/link:text-white transition-all duration-300">700 N Main St, Muskogee, OK 74401</span>
                            </a>
                            <a href="tel:+19182120313" className="flex items-center gap-2 hover:text-primary transition-colors cursor-pointer group/link w-fit mx-auto md:mx-0">
                                <span className="material-symbols-outlined text-primary text-[20px] group-hover/link:rotate-12 transition-transform">phone</span>
                                <span className="group-hover/link:text-white transition-all duration-300">(918) 212-0313</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 md:col-start-6 hidden md:block">
                        <h4 className="text-white font-black tracking-wide text-lg mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(13,127,242,0.8)]"></span>
                            Restoration
                        </h4>
                        <ul className="space-y-4">
                            {['Services', 'Gallery', 'Package Tiers', 'Contact'].map(link => (
                                <li key={link}>
                                    <a href={`#${link.toLowerCase()}`} className="text-slate-400 hover:text-white font-medium hover:translate-x-2 transition-all duration-300 inline-block cursor-pointer">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Store Hours */}
                    <div className="md:col-span-3">
                        <h4 className="text-white font-black tracking-wide text-lg mb-6 flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(13,127,242,0.8)]"></span>
                            Service Hours
                        </h4>
                        <ul className="space-y-3 text-slate-400 text-sm max-w-[240px] mx-auto md:mx-0">
                            <li className="flex justify-between border-b border-white/5 pb-2 hover:border-primary/30 transition-colors group/row">
                                <span className="group-hover/row:text-primary transition-colors">Mon - Fri</span>
                                <span className="text-white font-medium group-hover/row:text-primary-light transition-colors">9:00 AM - 6:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2 hover:border-primary/30 transition-colors group/row">
                                <span className="group-hover/row:text-primary transition-colors">Saturday</span>
                                <span className="text-white font-medium group-hover/row:text-primary-light transition-colors">10:00 AM - 4:00 PM</span>
                            </li>
                            <li className="flex justify-between border-b border-white/5 pb-2">
                                <span>Sunday</span>
                                <span className="text-red-400 font-medium italic">Closed</span>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="md:col-span-2 text-center md:text-left">
                        <h4 className="text-white font-black tracking-wide text-lg mb-6 flex items-center gap-2 justify-center md:justify-start">
                            <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(13,127,242,0.8)]"></span>
                            Follow Us
                        </h4>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300 text-slate-400 shadow-lg group/social">
                                <span className="material-symbols-outlined text-[24px]">share</span>
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all duration-300 text-slate-400 shadow-lg group/social">
                                <span className="material-symbols-outlined text-[24px]">photo_camera</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <p className="text-slate-500 text-xs font-medium">
                        &copy; {new Date().getFullYear()} Champion Mobile Detailing. All rights reserved. Professional results guaranteed.
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="text-slate-600 text-[10px] uppercase tracking-tighter">Powered by</span>
                        <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white font-black text-xs uppercase tracking-widest flex items-center transition-all duration-300">
                            Gnomad Studio
                        </a>
                    </div>
                </div>
            </div>

            {/* Hidden Mobile Action Bar placeholder - will be actual component */}
            <div className="md:hidden h-20"></div>
        </footer>
    );
}
