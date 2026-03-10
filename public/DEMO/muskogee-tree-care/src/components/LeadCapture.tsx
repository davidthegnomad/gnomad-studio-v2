import React from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

const LeadCapture: React.FC = () => {
    return (
        <section className="py-32 bg-background-dark/50 relative overflow-hidden" id="quote">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* Left Side: Copy */}
                    <div>
                        <h2 className="text-primary font-bold uppercase tracking-[0.3em] text-xs mb-4">Immediate Quotes</h2>
                        <h3 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                            Clear The <br /><span className="text-primary not-italic">Danger.</span>
                        </h3>
                        <p className="text-xl text-white/50 leading-relaxed mb-12 font-medium max-w-lg">
                            Hazardous trees don't wait for convenient timing. Get a professional assessment and fair pricing in Muskogee today.
                        </p>

                        <div className="space-y-6">
                            {[
                                { title: 'Fully Insured', desc: 'Complete liability and workers comp for your peace of mind.' },
                                { title: 'Local Expertise', desc: 'Deep roots in Muskogee, Wagoner, and Cherokee counties.' },
                                { title: 'Modern Equipment', desc: 'Precision rigging to protect your house and landscape.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-white/40 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-background-dark p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/10 backdrop-blur-3xl relative overflow-hidden group">
                        {/* Form Glass Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

                        <h3 className="text-3xl font-black mb-10 text-white uppercase tracking-tighter italic">Estimate <span className="text-primary not-italic">Request</span></h3>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Full Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold"
                                        placeholder="John Doe"
                                        title="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold"
                                        placeholder="(918) 000-0000"
                                        title="Phone Number"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Service Needed</label>
                                <select title="Select Service Needed" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold appearance-none cursor-pointer">
                                    <option className="bg-background-dark" value="removal">Tree Removal</option>
                                    <option className="bg-background-dark" value="hazard">Hazardous Limb Pruning</option>
                                    <option className="bg-background-dark" value="stump">Stump Grinding</option>
                                    <option className="bg-background-dark" value="emergency">Emergency Storm Care</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Project Details</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-bold resize-none"
                                    placeholder="Tell us about the trees..."
                                    title="Project Details"
                                ></textarea>
                            </div>

                            <button className="w-full bg-primary hover:bg-primary/90 text-white font-black py-6 rounded-2xl text-xl uppercase tracking-widest transition-all mt-6 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95">
                                Send Request
                                <Send className="w-6 h-6" />
                            </button>

                            <p className="text-[10px] text-center text-white/20 font-bold uppercase tracking-widest">
                                No-Obligation free site assessment.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LeadCapture;
