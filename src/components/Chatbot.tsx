"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Send,
    Bot,
    Minus,
    Maximize2,
    Sparkles
} from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: "/api/chat",
    });

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setIsMinimized(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            height: isMinimized ? "64px" : "500px",
                            width: "380px"
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#0f0c15]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col mb-4"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border-b border-white/5 flex items-center justify-between cursor-pointer"
                            onClick={() => isMinimized && setIsMinimized(false)}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center border border-brand-primary/30">
                                    <Bot className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white flex items-center gap-1">
                                        Sterling <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                                    </h3>
                                    {!isMinimized && <p className="text-[10px] text-zinc-400">AI Client Success Specialist</p>}
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                                    className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-400"
                                    aria-label={isMinimized ? "Maximize" : "Minimize"}
                                    title={isMinimized ? "Maximize" : "Minimize"}
                                >
                                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleChat(); }}
                                    className="p-1.5 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-zinc-400"
                                    aria-label="Close Chat"
                                    title="Close Chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages Area */}
                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
                                >
                                    {messages.length === 0 && (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 opacity-50">
                                            <div className="p-4 bg-white/5 rounded-full mb-2">
                                                <MessageCircle className="w-8 h-8 text-cyan-400" />
                                            </div>
                                            <p className="text-xs text-zinc-300">
                                                Welcome back, Partner! <br /> How can I help with your project today?
                                            </p>
                                        </div>
                                    )}
                                    {messages.map((m: any) => (
                                        <div
                                            key={m.id}
                                            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === "user"
                                                ? "bg-brand-primary text-white rounded-tr-none shadow-lg shadow-brand-primary/10"
                                                : "bg-white/5 border border-white/5 text-zinc-200 rounded-tl-none"
                                                }`}>
                                                {m.content}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <form
                                    onSubmit={handleSubmit}
                                    className="p-4 bg-[#0f0c15] border-t border-white/5 flex gap-2"
                                >
                                    <input
                                        value={input}
                                        onChange={handleInputChange}
                                        placeholder="Ask Sterling..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-primary/50 transition-colors"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input?.trim()}
                                        className="p-2 bg-brand-primary hover:bg-brand-secondary text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-brand-primary/20"
                                        aria-label="Send Message"
                                        title="Send Message"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleChat}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-colors ${isOpen && !isMinimized
                    ? "bg-zinc-800 text-zinc-400 rotate-90"
                    : "bg-brand-primary text-white"
                    }`}
                aria-label={isOpen ? "Close Chat" : "Open Chat"}
                title={isOpen ? "Close Chat" : "Open Chat"}
            >
                {isOpen && !isMinimized ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
}
