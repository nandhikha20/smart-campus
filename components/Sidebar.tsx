"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Map, BookOpen, Calendar, User, LayoutDashboard } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const navItems = [
    { id: "/", label: "Assistant", icon: MessageSquare },
    { id: "/location", label: "Map", icon: Map },
    { id: "/study", label: "Spaces", icon: BookOpen },
    { id: "/schedule", label: "Schedule", icon: Calendar },
    { id: "/profile", label: "Profile", icon: User },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-200">
                        <span className="font-bold text-lg">S</span>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">SmartCampus</h1>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.id;
                        return (
                            <Link
                                key={item.id}
                                href={item.id}
                                className={cn(
                                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                    isActive
                                        ? "bg-slate-100 text-blue-600 shadow-sm"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon
                                    size={20}
                                    className={cn(
                                        "transition-colors",
                                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                                    )}
                                />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6">
                <div className="p-5 bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-white/20 transition-all duration-500" />

                    <p className="text-xs font-semibold mb-1 opacity-80 uppercase tracking-wider">Pro Feature</p>
                    <p className="text-sm font-bold mb-4">AI Personalization</p>
                    <button className="w-full py-2.5 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold hover:bg-white/30 transition-all border border-white/10 shadow-sm">
                        Learn More
                    </button>
                </div>
            </div>
        </aside>
    );
}
