import React from 'react';
import { CalendarHeart, Phone, Scissors, MapPin } from 'lucide-react';

const Booking: React.FC = () => {
    return (
        <section className="py-32 bg-primary/5 relative overflow-hidden" id="booking">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">

                    {/* Left: Info */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-purple-100 text-primary text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
                            <CalendarHeart className="w-3.5 h-3.5" />
                            Easy Scheduling
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black text-text-dark tracking-tight mb-6">
                            Book Their <br />Spa Day Today.
                        </h3>

                        <p className="text-text-dark/70 text-lg leading-relaxed mb-10 font-medium max-w-lg">
                            Give your pet the pampering they deserve without the stress of a noisy salon. Fill out the form below or call us directly to secure your spot.
                        </p>

                        <div className="space-y-6">
                            <a href="tel:+19185551234" className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-purple-100 shadow-sm hover:border-primary/30 transition-all group">
                                <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                                    <Phone className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dark/40 mb-1">Call Our Salon</p>
                                    <p className="text-xl font-black text-text-dark tracking-tight">(918) 555-1234</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-purple-100 shadow-sm hover:border-cyan-500/30 transition-all group">
                                <div className="w-14 h-14 bg-cyan-50 rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors">
                                    <MapPin className="w-6 h-6 text-secondary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-text-dark/40 mb-1">Service Area</p>
                                    <p className="text-lg font-bold text-text-dark tracking-tight">Muskogee & Surrounding (15mi)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-purple-100 relative">
                        {/* Decor */}
                        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-2xl pointer-events-none"></div>

                        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wide text-text-dark/50 ml-2">Your Name</label>
                                    <input type="text" title="Name" className="w-full bg-background-light border border-purple-100 rounded-2xl px-6 py-4 text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold" placeholder="Regina George" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-wide text-text-dark/50 ml-2">Phone</label>
                                    <input type="tel" title="Phone" className="w-full bg-background-light border border-purple-100 rounded-2xl px-6 py-4 text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold" placeholder="(918) 000-0000" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wide text-text-dark/50 ml-2">Pet Name & Breed</label>
                                <input type="text" title="Pet Details" className="w-full bg-background-light border border-purple-100 rounded-2xl px-6 py-4 text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold" placeholder="e.g. Bella, Toy Poodle" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wide text-text-dark/50 ml-2">Requested Service</label>
                                <select title="Service selection" className="w-full bg-background-light border border-purple-100 rounded-2xl px-6 py-4 text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold appearance-none cursor-pointer">
                                    <option>Select a Package</option>
                                    <option>The Full Fetch</option>
                                    <option>Spa Bath & Brush</option>
                                    <option>De-Shedding Magic</option>
                                    <option>Puppy's First Spa</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-wide text-text-dark/50 ml-2">Preferred Date</label>
                                <div className="relative">
                                    <CalendarHeart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dark/30" />
                                    <input type="date" title="Expected date" className="w-full bg-background-light border border-purple-100 rounded-2xl pl-12 pr-6 py-4 text-text-dark focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold" />
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-black py-5 rounded-2xl text-lg uppercase tracking-widest transition-all mt-4 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95">
                                <Scissors className="w-5 h-5" />
                                Request Appointment
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Booking;
