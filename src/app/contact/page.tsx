"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const renderTime = useRef<number>(0);
    const honeypotRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        renderTime.current = Date.now();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Layer 1: Honeypot Check (If filled, silently succeed)
        if (honeypotRef.current?.value) {
            setIsSubmitting(false);
            setSubmitStatus('success');
            return;
        }

        // Layer 3: Time-to-Submit Profiling (If < 3s, silently succeed)
        const timeToSubmit = Date.now() - renderTime.current;
        if (timeToSubmit < 3000) {
            setIsSubmitting(false);
            setSubmitStatus('success');
            return;
        }

        try {
            // Using internal API for L2V and Email
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formState)
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormState({ name: "", email: "", phone: "", business: "", message: "" });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary selection:text-white">
            {/* Navigation Header — Matching Home */}
            <nav className="fixed top-6 left-0 w-full z-50 px-6 flex justify-center pointer-events-none">
                <div className="glass-panel rounded-full px-8 py-3 flex items-center gap-8 border-white/5 shadow-2xl pointer-events-auto transition-all hover:border-white/10">
                    <Link href="/" className="flex items-center gap-3 pr-4 border-r border-white/10">
                        <Image src="/assets/gnomad_logo_new.webp" alt="Gnomad Studio Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-lg mix-blend-screen" />
                        <div className="font-bold text-sm tracking-widest uppercase text-white">
                            Gnomad Studio
                            <span className="block text-[9px] text-gray-400 font-normal mt-0.5">Muskogee, OK</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <Link href="/#mission" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Mission</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </Link>
                        <Link href="/#services" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Services</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </Link>
                        <a href="https://davidthegnomad.org" target="_blank" rel="noopener noreferrer" className="relative py-1 group hover:text-white transition-all duration-500">
                            <span className="relative z-10 hover:tracking-[0.2em] transition-all duration-500 block">Our Story</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_12px_rgba(0,191,200,0.5)]" />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-56 pb-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-background z-0 pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10 text-center mb-16 px-4">
                    <div className="inline-block px-4 py-1 rounded-full border border-brand-primary/30 bg-brand-primary/5 text-brand-primary text-[10px] font-black tracking-[0.2em] uppercase mb-8">
                        Contact Gnomad Studio
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-tight">
                        Let&apos;s Build Something<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-brand-accent">With Real Soul.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Whether you&apos;re a Muskogee small business looking for your first site or a community project ready to scale, we&apos;re here to help.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl bg-black/40">
                        {submitStatus === 'success' ? (
                            <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-primary">
                                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                                </div>
                                <h3 className="text-3xl font-bold text-white">Message Sent!</h3>
                                <p className="text-gray-400 text-lg">Thank you for reaching out. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setSubmitStatus('idle')}
                                    className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full text-sm font-bold transition-colors shadow-lg"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                                {/* Layer 1: Honeypot field to trap bots */}
                                <input type="text" name="website_url" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" ref={honeypotRef} aria-hidden="true" />

                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 text-sm text-center font-medium">
                                        An error occurred while sending your message. Please try again later.
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-[10px] font-black tracking-widest uppercase text-gray-500 ml-4">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            autoComplete="name"
                                            placeholder="Jane Doe"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600"
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-[10px] font-black tracking-widest uppercase text-gray-500 ml-4">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            autoComplete="email"
                                            placeholder="jane@example.com"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-[10px] font-black tracking-widest uppercase text-gray-500 ml-4">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="(918) 555-0123"
                                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600"
                                            value={formState.phone}
                                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="business" className="text-[10px] font-black tracking-widest uppercase text-gray-500 ml-4">Business / Project Name</label>
                                    <input
                                        type="text"
                                        id="business"
                                        name="business"
                                        autoComplete="organization"
                                        placeholder="The Muskogee Jam Shop"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600"
                                        value={formState.business}
                                        onChange={(e) => setFormState({ ...formState, business: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-[10px] font-black tracking-widest uppercase text-gray-500 ml-4">How can we help?</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        placeholder="Tell us about your business goals..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-primary/50 transition-colors placeholder:text-gray-600 resize-none"
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-2xl font-black text-sm tracking-[0.2em] uppercase transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    {!isSubmitting && <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                        {/* Phone - Reordered to Left */}
                        <a
                            href="tel:+19184711813"
                            className="glass-panel h-64 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-primary/50 transition-all duration-500 overflow-hidden relative block"
                        >
                            {/* Main Content (Icon and Title) */}
                            <motion.div
                                className="h-full flex flex-col items-center justify-center p-10"
                                whileHover={{ scale: 0.8, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6 mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00878e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-400">Phone</h4>
                            </motion.div>

                            {/* Rising Box - Desktop Only */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-primary/10 backdrop-blur-md border-t border-white/10 hidden md:flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                                <p className="text-white font-bold text-xl tracking-tight">+1 (918) 471 1813</p>
                            </div>
                        </a>

                        {/* Office - Reordered to Middle */}
                        <div className="glass-panel h-64 p-10 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-accent/50 transition-all duration-500 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-500 mb-2">Office</h4>
                            <p className="text-white font-bold text-xl">Muskogee, OK</p>
                        </div>

                        {/* Email - Reordered to Right */}
                        <a
                            href="mailto:david@gnomadstudio.org"
                            className="glass-panel h-64 rounded-[2rem] border-white/5 bg-black/20 text-center group hover:border-brand-secondary/50 transition-all duration-500 overflow-hidden relative block"
                        >
                            {/* Main Content (Icon and Title) */}
                            <motion.div
                                className="h-full flex flex-col items-center justify-center p-10"
                                whileHover={{ scale: 0.8, y: -20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-brand-secondary/10 flex items-center justify-center mb-6 mx-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00bfc8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-gray-400">Email</h4>
                            </motion.div>

                            {/* Rising Box - Desktop Only */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-brand-secondary/10 backdrop-blur-md border-t border-white/10 hidden md:flex items-center justify-center transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-xs px-4">
                                <p className="text-white font-bold text-lg break-all">david@gnomadstudio.org</p>
                            </div>
                        </a>
                    </div>
                </div >
            </main >

            {/* Footer */}
            < Footer />
        </div >
    );
}
