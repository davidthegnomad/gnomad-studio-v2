"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Phone } from "lucide-react";
import Chatbot from "./Chatbot";
import EmailMessenger from "./EmailMessenger";

export default function CommunicationHub() {
    const [activeTab, setActiveTab] = useState<"chat" | "email" | null>(null);

    const toggleTab = (tab: "chat" | "email") => {
        if (activeTab === tab) {
            setActiveTab(null);
        } else {
            setActiveTab(tab);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            {/* Communication Windows */}
            <AnimatePresence mode="wait">
                {activeTab === "chat" && (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-2"
                    >
                        {/* We'll modify Chatbot to accept an 'isHosted' prop or similar */}
                        <Chatbot isEmbedded onClose={() => setActiveTab(null)} />
                    </motion.div>
                )}
                {activeTab === "email" && (
                    <motion.div
                        key="email-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-2"
                    >
                        <EmailMessenger onClose={() => setActiveTab(null)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Speed Dial Pill */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="glass-panel rounded-full px-8 py-3 flex items-center gap-6 border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            >
                {/* Chat Button (Sterling) */}
                <button
                    onClick={() => toggleTab("chat")}
                    className={`p-2 transition-all duration-300 rounded-full ${activeTab === "chat" ? "text-brand-primary bg-brand-primary/10 shadow-[0_0_15px_rgba(0,191,200,0.3)]" : "text-gray-400 hover:text-white"}`}
                    aria-label="Chat with Sterling"
                >
                    <MessageCircle className="w-5 h-5" />
                </button>

                <div className="w-px h-4 bg-white/10" />

                {/* Email Button (Messenger) */}
                <button
                    onClick={() => toggleTab("email")}
                    className={`p-2 transition-all duration-300 rounded-full ${activeTab === "email" ? "text-brand-primary bg-brand-primary/10 shadow-[0_0_15px_rgba(0,191,200,0.3)]" : "text-gray-400 hover:text-white"}`}
                    aria-label="Send Email"
                >
                    <Mail className="w-5 h-5" />
                </button>

                <div className="w-px h-4 bg-white/10" />

                {/* Call Button (Morgan) */}
                <a
                    href="tel:9184711813"
                    className="p-2 text-gray-400 hover:text-brand-primary transition-all duration-300 rounded-full hover:bg-brand-primary/10"
                    aria-label="Call Morgan"
                >
                    <Phone className="w-5 h-5" />
                </a>
            </motion.div>
        </div>
    );
}
