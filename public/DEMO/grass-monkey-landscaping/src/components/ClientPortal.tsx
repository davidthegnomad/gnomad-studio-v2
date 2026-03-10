import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const ClientPortal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-md bg-slate-900 border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden"
                    >
                        <div className="p-10 space-y-8">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="size-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                                    <Lock className="size-8" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Client Portal</h3>
                                <p className="text-slate-400 font-medium text-sm">Manage your weekly schedule, update billing, and view property reports.</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                    <input type="email" placeholder="hello@example.com" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-emerald-500 outline-none transition-all" />
                                </div>
                            </div>

                            <button className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 group">
                                Sign In <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck className="size-4 text-emerald-500/50" /> Secure 256-bit Encryption
                                </div>
                                <button className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">Forgot Password?</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ClientPortal;
