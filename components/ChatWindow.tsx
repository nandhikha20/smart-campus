"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageBubble, TypingIndicator, Message } from "./MessageBubble";
import { QuickActions } from "./QuickActions";
import { Send, Sparkles } from "lucide-react";
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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
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

        // Mock bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "bot",
                content: getBotResponse(text),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes("library") || lowerText.includes("study") || lowerText.includes("spot")) {
            return "The Central Library level 2 currently has 12 free seats. It's a quiet zone, perfect for focused study! 📚";
        }
        if (lowerText.includes("schedule") || lowerText.includes("class") || lowerText.includes("where")) {
            return "You have 'Advanced Algorithms' at 10:00 AM in SCI Room 402. Don't forget your lab notebook! 📅";
        }
        if (lowerText.includes("food") || lowerText.includes("eat") || lowerText.includes("dining") || lowerText.includes("hungry")) {
            return "The Student Union food court is open until 9:00 PM. The Italian stall has a special today! 🍕";
        }
        if (lowerText.includes("map") || lowerText.includes("navigate") || lowerText.includes("go to")) {
            return "I've pulled up the fastest route to the Science Center. It's about an 8-minute walk. Need directions? 🗺️";
        }
        return "I'm not quite sure about that, but I can help you find classrooms, study spaces, or check your schedule. What would you like to do?";
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scroll-smooth" ref={scrollRef}>
                <div className="max-w-3xl mx-auto w-full pb-4">
                    <AnimatePresence mode="popLayout">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} message={m} />
                        ))}
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

            <div className="p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 sticky bottom-0 z-20">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="mb-4">
                        <QuickActions onAction={(id) => handleSend(id === "study" ? "Find me a study spot" : id === "food" ? "Where can I eat?" : id === "schedule" ? "What's my next class?" : "Navigate to nearby")} />
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend(input);
                        }}
                        className="relative flex items-center group"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything about campus..."
                            className="w-full pl-6 pr-16 py-4 bg-slate-100 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-900 placeholder:text-slate-400 font-medium shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-lg shadow-blue-200 active:scale-95 hover:scale-105"
                        >
                            <Send size={20} className="ml-0.5" />
                        </button>
                    </form>
                    <div className="mt-3 text-center flex items-center justify-center gap-1.5 opacity-60">
                        <Sparkles size={12} className="text-blue-500" />
                        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                            Powered by Smart Campus AI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
