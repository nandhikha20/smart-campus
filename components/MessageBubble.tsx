"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface Message {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: Date;
}

export function MessageBubble({ message }: { message: Message }) {
    const isBot = message.role === "bot";

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn("flex w-full mb-6 relative group", isBot ? "justify-start" : "justify-end")}
        >
            <div className={cn("flex max-w-[85%] md:max-w-[75%]", isBot ? "flex-row items-end" : "flex-row-reverse items-end")}>
                <div className={cn("flex-shrink-0 mb-1 z-10", isBot ? "mr-4" : "ml-4")}>
                    {isBot ? (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 ring-4 ring-white">
                            <Sparkles size={18} className="animate-pulse" />
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-500 ring-4 ring-white shadow-sm">
                            <User size={18} />
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-1.5 relative">
                    <div
                        className={cn(
                            "px-5 py-4 rounded-3xl text-[15px] leading-relaxed relative shadow-sm transition-all duration-300",
                            isBot
                                ? "bg-white border border-slate-100 text-slate-800 rounded-bl-sm hover:shadow-md hover:border-blue-100"
                                : "bg-blue-600 text-white rounded-br-sm shadow-blue-200 hover:bg-blue-700"
                        )}
                    >
                        {message.content}
                    </div>
                    <span className={cn("text-[10px] font-medium opacity-60 px-2", isBot ? "text-slate-400" : "text-slate-400 text-right")}>
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export function TypingIndicator() {
    return (
        <div className="flex justify-start mb-6 pl-[3.5rem]">
            <div className="flex items-center space-x-1.5 px-4 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm w-fit">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                        className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                ))}
            </div>
        </div>
    );
}
