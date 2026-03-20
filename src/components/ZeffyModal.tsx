"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface ZeffyModalProps {
    isOpen: boolean;
    onClose: () => void;
    formId?: string; // e.g. "gnomad-studio-client" or UUID
    formType?: string; // e.g. "ticketing", "donation-form"
}

export default function ZeffyModal({
    isOpen,
    onClose,
    formId = "gnomad-studio-client",
    formType = "ticketing"
}: ZeffyModalProps) {
    // Disable scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0f0c15]/90 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl h-[85vh] glass-panel border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_-20px_rgba(0,135,142,0.3)] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center">
                                    <div className="w-5 h-5 text-brand-primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white tracking-tight leading-none mb-1">Secure Contribution</h3>
                                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Powered by Zeffy • 100% Goes to Mission</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                aria-label="Close Payment Modal"
                                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-all transform hover:rotate-90"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Iframe Container */}
                        <div className="flex-1 bg-white relative">
                            {/* Loading State Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 pointer-events-none z-0">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Loading Secure Portal</p>
                                </div>
                            </div>

                            <iframe
                                src={`https://www.zeffy.com/en-US/embed/${formType}/${formId}`}
                                className="w-full h-full border-none relative z-10"
                                title="Zeffy Secure Payment Form"
                                allow="payment"
                            />
                        </div>

                        {/* Footer / Meta */}
                        <div className="px-8 py-4 border-t border-white/5 bg-zinc-950/50 flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-[10px] text-zinc-500 font-medium text-center md:text-left">
                                Gnomad Studio is a registered 501(c)(3) non-profit. Your contribution is tax-deductible.
                            </p>
                            <a
                                href={`https://www.zeffy.com/en-US/${formType}/${formId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-secondary hover:text-white transition-colors"
                            >
                                View Full Page <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
