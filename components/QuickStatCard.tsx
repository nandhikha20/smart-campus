"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface QuickStatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    sub: string;
    color: "blue" | "purple" | "amber" | "green";
}

export function QuickStatCard({ icon, label, value, sub, color }: QuickStatCardProps) {
    const colors = {
        blue: "bg-blue-100/50 text-blue-600 ring-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-blue-300",
        purple: "bg-violet-100/50 text-violet-600 ring-violet-500/20 group-hover:bg-violet-600 group-hover:text-white group-hover:shadow-violet-300",
        amber: "bg-amber-100/50 text-amber-600 ring-amber-500/20 group-hover:bg-amber-600 group-hover:text-white group-hover:shadow-amber-300",
        green: "bg-emerald-100/50 text-emerald-600 ring-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-emerald-300",
    };

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white border border-slate-200/60 p-3 rounded-xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group cursor-pointer relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-slate-50 to-transparent rounded-bl-full -mr-8 -mt-8 transition-all opacity-50 group-hover:opacity-100" />

            <div className="flex items-center gap-3 relaltive z-10">
                <div className={cn(
                    "p-2.5 rounded-lg transition-all duration-300 ring-1 shadow-sm flex items-center justify-center",
                    colors[color]
                )}>
                    {React.cloneElement(icon as React.ReactElement, { size: 18, strokeWidth: 2.5 })}
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5 group-hover:text-slate-500 transition-colors">{label}</p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-0.5 group-hover:text-blue-900 transition-colors">{value}</h3>
                    <p className="text-[10px] font-medium text-slate-500 truncate group-hover:text-slate-600 transition-colors">{sub}</p>
                </div>
            </div>
        </motion.div>
    );
}
