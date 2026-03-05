import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

const EstimateFlow = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ acreage: '', frequency: '', services: [] });

    const steps = [
        { title: "Property Size", options: ["< 0.25 Acre", "0.25 - 0.5 Acre", "0.5 - 1.0 Acre", "1.0+ Acres"] },
        { title: "Service Frequency", options: ["Weekly (Best Result)", "Bi-Weekly", "One-Time Cleanup"] },
        { title: "Add-Ons", options: ["Mulching", "Flower Bed Weeding", "Bush Trimming", "Leaf Removal"] }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border border-emerald-500/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                            <motion.div
                                className="h-full bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 4) * 100}%` }}
                            />
                        </div>

                        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors">
                            <X className="size-6" />
                        </button>

                        <div className="p-10">
                            {step <= 3 ? (
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <span className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.2em]">Step {step} of 3</span>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{steps[step - 1].title}</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {steps[step - 1].options.map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => setStep(step + 1)}
                                                className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all group text-left"
                                            >
                                                <span className="text-slate-200 font-bold">{opt}</span>
                                                <ChevronRight className="size-5 text-slate-500 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-8 py-6">
                                    <div className="size-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-500/30">
                                        <CheckCircle2 className="size-10" />
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tight">Profile Ready</h3>
                                        <p className="text-slate-400 font-medium">We've generated a preliminary range. Enter your phone to get the exact bid via text.</p>
                                    </div>
                                    <input
                                        type="tel"
                                        placeholder="(918) 000-0000"
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-6 py-5 text-white text-lg font-bold focus:border-emerald-500 outline-none transition-all shadow-inner"
                                    />
                                    <button className="w-full h-16 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl transition-all hover:scale-[1.02] shadow-xl shadow-emerald-900/40">
                                        Get Instant Bid
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EstimateFlow;
