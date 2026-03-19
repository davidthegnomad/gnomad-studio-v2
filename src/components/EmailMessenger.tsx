"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, Send, User, Building, MessageSquare, Phone, Sparkles, CheckCircle2, ChevronRight, Minus, Maximize2 } from "lucide-react";

interface EmailMessengerProps {
    onClose: () => void;
}

export default function EmailMessenger({ onClose }: EmailMessengerProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        business: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [size, setSize] = useState({ width: 380, height: 500 });
    const [isResizing, setIsResizing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            const apiBase = ""; // Use relative path for same-origin requests
            const response = await fetch(`${apiBase}/api/lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setIsSuccess(true);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to send message. Please try again or call us.");
            }
        } catch (err) {
            console.error("Submission failed:", err);
            setError("Network error. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Manual Resizing Logic
    const startResizing = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
        setIsMaximized(false);
        setIsMinimized(false);

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const deltaX = startX - moveEvent.clientX;
            const deltaY = startY - moveEvent.clientY;

            setSize({
                width: Math.max(300, Math.min(startWidth + deltaX, window.innerWidth - 48)),
                height: Math.max(200, Math.min(startHeight + deltaY, window.innerHeight - 48))
            });
        };

        const onMouseUp = () => {
            setIsResizing(false);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                height: isMinimized
                    ? "64px"
                    : (isMaximized ? "82vh" : `${size.height}px`),
                width: isMaximized
                    ? (typeof window !== 'undefined' && window.innerWidth < 768 ? "100vw" : "25vw")
                    : `${size.width}px`,
                borderRadius: isMaximized && typeof window !== 'undefined' && window.innerWidth < 768 ? "0px" : "1.5rem",
                margin: isMaximized ? "20px auto" : "0",
            }}
            transition={isResizing ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 200 }}
            className={`bg-[#0f0c15]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative ${isMaximized ? "fixed inset-0 z-[110]" : ""}`}
        >
            {/* Resize Handle - Top Left */}
            {!isMinimized && !isMaximized && (
                <div
                    onMouseDown={startResizing}
                    className="absolute top-0 left-0 w-8 h-8 cursor-nw-resize z-[100] group"
                    title="Drag to resize"
                >
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/20 group-hover:border-brand-primary transition-colors" />
                    <div className="absolute top-4 left-4 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-brand-primary/50 transition-colors" />
                </div>
            )}
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                        <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5 uppercase tracking-widest">
                            Direct Message <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                        </h3>
                        <p className="text-[10px] text-zinc-400 font-medium tracking-wide">Ready for your 60-second loop</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {!isSuccess && (
                        <>
                            <button
                                onClick={() => { setIsMinimized(!isMinimized); setIsMaximized(false); }}
                                className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-400"
                                aria-label="Minimize"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => { setIsMaximized(!isMaximized); setIsMinimized(false); }}
                                className={`p-1.5 rounded-lg transition-colors ${isMaximized ? "bg-brand-primary/20 text-brand-primary" : "hover:bg-white/5 text-zinc-400"}`}
                                aria-label="Maximize"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </>
                    )}
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-zinc-400"
                        aria-label="Close Messenger"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 relative">
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                                <CheckCircle2 className="w-10 h-10 text-green-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg uppercase tracking-widest">Message Sent</h4>
                                <p className="text-zinc-400 text-sm mt-1">Our AIVA & Team are on the way. Hold tight!</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-xs font-black uppercase tracking-widest transition-all mt-4"
                            >
                                Close Window
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            {/* Form Steps */}
                            {step === 1 && (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-2">Introduction</h4>
                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-primary transition-colors">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Your Full Name"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-primary transition-colors">
                                                <Building className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="text"
                                                name="business"
                                                value={formData.business}
                                                onChange={handleInputChange}
                                                placeholder="Business Name (Optional)"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.name}
                                        className="w-full bg-brand-primary hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 group mt-4 shadow-xl shadow-brand-primary/20"
                                    >
                                        Next <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-2">Contact Context</h4>
                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-primary transition-colors">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email Address"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                            />
                                        </div>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-brand-primary transition-colors">
                                                <Phone className="w-4 h-4" />
                                            </div>
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="Phone Number (for L2V)"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!formData.email || !formData.phone}
                                        className="w-full bg-brand-primary hover:bg-cyan-500 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 group mt-4 shadow-xl shadow-brand-primary/20"
                                    >
                                        Final Step <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="space-y-4"
                                >
                                    <h4 className="text-white/50 text-[10px] font-black uppercase tracking-widest mb-2">The Mission</h4>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-brand-primary transition-colors">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <textarea
                                            required
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="What's your vision? Let's build it."
                                            rows={4}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-medium resize-none overflow-hidden"
                                        />
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center"
                                        >
                                            {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting || !formData.message}
                                        className="w-full bg-gradient-to-r from-brand-primary to-brand-accent text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 group mt-4 shadow-xl shadow-brand-primary/30 relative overflow-hidden"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Initiating Pulse...</span>
                                            </div>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                        {isSubmitting && (
                                            <motion.div
                                                className="absolute inset-0 bg-brand-primary/20"
                                                initial={{ x: "-100%" }}
                                                animate={{ x: "100%" }}
                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            />
                                        )}
                                    </button>
                                </motion.div>
                            )}
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>

            {/* Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-brand-primary/50 to-brand-accent/50 opacity-20" />
        </motion.div>
    );
}
