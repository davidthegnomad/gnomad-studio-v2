"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

export default function Chatbot({
    isEmbedded = false,
    onClose,
    apiUrl = "/api/chat",
    body = {},
    initialMessage = "Welcome back, Partner! How can I help with your project today?",
    externalInput = "",
    hideLauncher = false
}: {
    isEmbedded?: boolean,
    onClose?: () => void,
    apiUrl?: string,
    body?: Record<string, unknown>,
    initialMessage?: string,
    externalInput?: string,
    hideLauncher?: boolean
}) {
    const [isOpenInternal, setIsOpenInternal] = useState(false);
    const isOpen = isEmbedded ? true : isOpenInternal;
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [size, setSize] = useState({ width: 380, height: 500 });
    const [isResizing, setIsResizing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading } = useChat({
        api: apiUrl,
        body: body,
    });

    useEffect(() => {
        if (externalInput) {
            setInput(externalInput);
            requestAnimationFrame(() => {
                setIsOpenInternal(true);
                setIsMinimized(false);
            });
        }
    }, [externalInput, setInput]); // setInput is stable from useChat

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = useCallback(() => {
        if (isEmbedded && onClose) {
            onClose();
        } else {
            setIsOpenInternal((prev) => !prev);
        }
        setIsMinimized(false);
        setIsMaximized(false);
    }, [isEmbedded, onClose]);

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
            const deltaX = startX - moveEvent.clientX; // Moving left increases width
            const deltaY = startY - moveEvent.clientY; // Moving up increases height

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
        <div className={`font-sans ${isEmbedded ? "relative h-full w-full" : (isMaximized ? "fixed inset-0 z-[110]" : "fixed bottom-6 right-6 z-[100]")}`}>
            <AnimatePresence>
                {isOpen && (
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
                            bottom: isMaximized && typeof window !== 'undefined' && window.innerWidth < 768 ? "0" : "auto",
                            position: isMaximized ? "relative" : "static",
                        }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={isResizing ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 200 }}
                        className={`bg-[#0f0c15]/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative ${isMaximized ? "mx-auto ring-1 ring-brand-primary/20" : "mb-4"}`}
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
                                    onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); setIsMaximized(false); }}
                                    className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-zinc-400"
                                    aria-label="Minimize"
                                    title="Minimize"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); setIsMinimized(false); }}
                                    className={`p-1.5 rounded-lg transition-colors ${isMaximized ? "bg-brand-primary/20 text-brand-primary" : "hover:bg-white/5 text-zinc-400"}`}
                                    aria-label={isMaximized ? "Normal Size" : "Maximize"}
                                    title={isMaximized ? "Normal Size" : "Maximize"}
                                >
                                    <Maximize2 className="w-4 h-4" />
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
                                                {initialMessage}
                                            </p>
                                        </div>
                                    )}
                                    {messages.map((m: { id: string, role: string, content: string }) => (
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
                        {/* Bottom Accent */}
                        <div className="h-1 bg-gradient-to-r from-brand-primary/50 to-brand-accent/50 opacity-20" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher Button - Hidden when embedded or when hideLauncher is true */}
            {!isEmbedded && !hideLauncher && (
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
            )}
        </div>
    );
}
