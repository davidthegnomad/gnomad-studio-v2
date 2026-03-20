"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MessageSquare, Sparkles } from "lucide-react";
import Chatbot from "./Chatbot";
import EmailMessenger from "./EmailMessenger";

interface PartnerProfile {
    firstName?: string;
    tier?: string;
}

interface CommunicationHubProps {
    partnerProfile?: PartnerProfile;
    externalInput?: string;
}

export default function CommunicationHub({ partnerProfile, externalInput }: CommunicationHubProps) {
    const [activeTool, setActiveTool] = useState<"chat" | "messenger" | null>(null);
    const [chatbotExternalInput, setChatbotExternalInput] = useState("");

    const toggleChat = () => setActiveTool(activeTool === "chat" ? null : "chat");
    const toggleMessenger = () => setActiveTool(activeTool === "messenger" ? null : "messenger");

    useEffect(() => {
        if (externalInput) {
            requestAnimationFrame(() => {
                setChatbotExternalInput(externalInput);
                setActiveTool("chat");
            });
        }
    }, [externalInput]);

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-5">
            {/* Tool Layer */}
            <AnimatePresence mode="wait">
                {activeTool === "chat" && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <Chatbot
                            hideLauncher={true}
                            apiUrl="/api/chat/portal"
                            body={{ partnerContext: partnerProfile }}
                            initialMessage={partnerProfile
                                ? `Welcome back, ${partnerProfile.firstName}! I'm Sterling. Ready to refine your ${partnerProfile.tier} Tier strategy?`
                                : "Welcome! I'm Sterling from Gnomad Studio. How can I help you today?"
                            }
                            externalInput={chatbotExternalInput}
                            onClose={() => setActiveTool(null)}
                        />
                    </motion.div>
                )}

                {activeTool === "messenger" && (
                    <motion.div
                        key="messenger"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-28 right-8"
                    >
                        <EmailMessenger onClose={() => setActiveTool(null)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Horizontal Pill FAB */}
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-panel rounded-full p-2 flex items-center gap-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 ring-1 ring-white/5"
            >
                {/* Sterling Chat Action */}
                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 191, 200, 0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChat}
                    className={`p-3.5 rounded-full transition-all flex items-center justify-center relative ${activeTool === "chat" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-zinc-400 hover:text-white"}`}
                    title="Chat with Sterling"
                >
                    <MessageSquare className="w-5 h-5" />
                    {!activeTool && (
                        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-brand-secondary animate-pulse" />
                    )}
                </motion.button>

                {/* Email (Messenger) Action */}
                <motion.button
                    onClick={toggleMessenger}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(245, 158, 11, 0.15)" }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3.5 rounded-full transition-all flex items-center justify-center ${activeTool === "messenger" ? "bg-brand-accent text-[#0f0c15] shadow-lg shadow-brand-accent/20" : "text-zinc-400 hover:text-white"}`}
                    title="Direct Messenger"
                >
                    <Mail className="w-5 h-5" />
                </motion.button>

                {/* Phone (Morgan) Action */}
                <motion.a
                    href="tel:+19184711813"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3.5 rounded-full text-zinc-400 hover:text-white transition-all flex items-center justify-center"
                    title="Call Team (Morgan)"
                >
                    <Phone className="w-5 h-5" />
                </motion.a>
            </motion.div>
        </div>
    );
}
