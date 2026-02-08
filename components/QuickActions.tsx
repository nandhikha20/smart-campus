"use client";

import React from "react";
import { motion } from "framer-motion";
import { Coffee, MapPin, Calculator, CalendarCheck, BookOpen, Utensils } from "lucide-react";

const actions = [
    { id: "study", label: "Find Study Spot", icon: BookOpen, color: "blue" },
    { id: "food", label: "What's for Lunch?", icon: Utensils, color: "orange" },
    { id: "schedule", label: "Next Class", icon: CalendarCheck, color: "purple" },
    { id: "map", label: "Navigate to Lab", icon: MapPin, color: "emerald" },
];

export function QuickActions({ onAction }: { onAction: (id: string) => void }) {
    return (
        <div className="flex gap-3 overflow-x-auto pb-4 px-2 scrollbar-none snap-x mask-fade">
            {actions.map((action, i) => (
                <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAction(action.id)}
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-blue-200 hover:bg-slate-50 transition-all whitespace-nowrap group snap-start flex-shrink-0"
                >
                    <div className={`p-1.5 rounded-full bg-${action.color}-100 text-${action.color}-600 group-hover:bg-${action.color}-200 transition-colors`}>
                        <action.icon size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-700">{action.label}</span>
                </motion.button>
            ))}
        </div>
    );
}
