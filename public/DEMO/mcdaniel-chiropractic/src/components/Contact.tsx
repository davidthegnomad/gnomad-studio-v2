import React from 'react';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-transparent">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 p-8 md:p-16">
                            <span className="text-accent-jade italic font-serif text-lg">Visit the Office</span>
                            <h2 className="font-serif text-4xl lg:text-5xl text-primary-navy font-black tracking-tight mt-2 mb-12 italic leading-none">
                                Get In Touch.
                            </h2>

                            <div className="space-y-10">
                                <div className="flex gap-6">
                                    <div className="size-12 rounded-2xl bg-white/50 flex items-center justify-center text-sage-healing shrink-0 shadow-inner">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-clinical-slate mb-1">Clinic Address</h4>
                                        <p className="text-primary-navy font-black text-lg">3300 Chandler Rd, <br />Muskogee, OK 74403</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="size-12 rounded-2xl bg-white/50 flex items-center justify-center text-sage-healing shrink-0 shadow-inner">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-clinical-slate mb-1">Direct Phone</h4>
                                        <a href="tel:918-686-8676" className="text-primary-navy font-black text-lg hover:text-accent-jade transition-colors underline decoration-accent-jade decoration-2 underline-offset-4">
                                            (918) 686-8676
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <div className="size-12 rounded-2xl bg-white/50 flex items-center justify-center text-sage-healing shrink-0 shadow-inner">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] uppercase font-black tracking-widest text-clinical-slate mb-1">Office Hours</h4>
                                        <div className="grid grid-cols-2 gap-x-8 text-primary-navy font-bold text-sm">
                                            <span>Mon – Fri</span>
                                            <span>9:00 AM – 5:00 PM</span>
                                            <span className="text-clinical-slate">Sat – Sun</span>
                                            <span className="text-clinical-slate italic">Closed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-6">
                                <a
                                    href="https://www.google.com/maps/dir//McDaniel+Family+Chiropractic,+3300+Chandler+Rd,+Muskogee,+OK+74403"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-primary-navy text-white px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest hover:bg-accent-moss transition-all"
                                >
                                    <ExternalLink size={16} /> Get Directions
                                </a>
                            </div>
                        </div>

                        <div className="flex-1 min-h-[400px] relative">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000!2d-95.321!3d35.741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ca010000000001%3A0x0100000000000001!2s3300%20Chandler%20Rd%2C%20Muskogee%2C%20OK%2074403!5e0!3m2!1sen!2sus!4v1708810000000!5m2!1sen!2sus"
                                className="absolute inset-0 w-full h-full border-0 grayscale opacity-80"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Clinic Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
