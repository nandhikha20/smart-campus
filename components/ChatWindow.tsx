"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageBubble, TypingIndicator, Message } from "./MessageBubble";
import { QuickActions } from "./QuickActions";
import { Send, Sparkles, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatWindow({ initialMessage }: { initialMessage?: string }) {

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "bot",
            content: initialMessage || "Hello! I'm your Smart Campus Assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Load messages from API on mount
    useEffect(() => {
        const loadHistory = async () => {
            try {
                const res = await fetch('/api/chat/history');
                if (res.ok) {
                    const data = await res.json();
                    if (data.history && data.history.length > 0) {
                        // Parse timestamps
                        const restored = data.history.map((m: any) => ({
                            ...m,
                            timestamp: new Date(m.timestamp),
                        }));
                        setMessages(restored);
                        return;
                    }
                }
            } catch (e) {
                console.error("Failed to load history", e);
            }
        };
        loadHistory();
    }, []);

    // Save messages to API whenever they update
    useEffect(() => {
        if (messages.length > 1) { // Don't save just the initial greeting if it's the only one
            const saveHistory = async () => {
                try {
                    await fetch('/api/chat/history', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ messages })
                    });
                } catch (e) {
                    console.error("Failed to save history", e);
                }
            };
            // Debounce slightly or just save
            const timeout = setTimeout(saveHistory, 1000);
            return () => clearTimeout(timeout);
        }
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch response");
            }

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: data.content || "Sorry, I couldn't process that. Please try again.",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Error fetching chat response:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: "Sorry, I'm having trouble connecting to the campus network right now. Please try again later.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const clearHistory = async () => {
        const initialMsg: Message = {
            id: "1",
            role: "bot",
            content: initialMessage || "Hello! I'm your Smart Campus Assistant. How can I help you today?",
            timestamp: new Date(),
        };
        setMessages([initialMsg]);
        await fetch('/api/chat/history', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: [initialMsg] })
        });
    };


    return (
        <div className="flex flex-col h-full bg-slate-100 relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={clearHistory}
                    className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all hover:scale-110 active:scale-95 bg-white/50 backdrop-blur-sm border border-transparent hover:border-red-100 shadow-sm"
                    title="Clear History"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent bg-slate-100" ref={scrollRef}>
                <div className="max-w-4xl mx-auto w-full pb-4 flex flex-col min-h-full justify-end">
                    <AnimatePresence mode="popLayout">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} message={m} />
                        ))}
                        {/* Show QuickActions only if there are few messages or user wants them handy at bottom? 
                             Better to just show them as the last item if standard flow. 
                             Actually, let's put them here so they scroll with content. */}
                        {messages.length < 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4">
                                <QuickActions onAction={(id) => handleSend(id === "study" ? "Find me a study spot" : id === "food" ? "Where can I eat?" : id === "schedule" ? "What's my next class?" : "Navigate to nearby")} />
                            </motion.div>
                        )}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <TypingIndicator />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="p-3 md:p-4 bg-white border-t border-slate-200 z-20 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto w-full space-y-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(input);
                        }}
                        className="relative flex items-end gap-2 group"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full pl-5 pr-12 py-3 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium text-base shadow-inner"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 active:scale-95 hover:scale-105 flex-shrink-0"
                        >
                            <Send size={20} className="ml-0.5" />
                        </button>
                    </form>
                    <div className="text-center flex items-center justify-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                        <Sparkles size={10} className="text-blue-500" />
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                            Smart Campus AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
