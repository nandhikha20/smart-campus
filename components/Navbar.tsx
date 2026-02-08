"use client";

import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Navbar() {
    return (
        <nav className="bg-white/80 border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-xl transition-all shadow-sm">
            <div className="flex items-center gap-4 md:hidden">
                <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
                    <Menu size={24} />
                </button>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl items-center relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    placeholder="Search buildings, events..."
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-100 rounded-xl border border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm text-slate-900 placeholder:text-slate-400 shadow-inner"
                />
            </div>

            <div className="flex items-center gap-6 ml-auto">
                <button className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-xl relative transition-all group">
                    <Bell size={20} className="stroke-2" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white ring-2 ring-transparent group-hover:ring-red-100 transition-all shadow-sm"></span>
                </button>

                <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-3 cursor-pointer group p-1.5 hover:bg-slate-50 rounded-xl transition-colors">
                    <div className="hidden text-right md:block leading-tight">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Nandhikha</p>
                        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Student ID: 2408</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white group-hover:ring-purple-200 transition-all transform group-hover:scale-105">
                        N
                    </div>
                </div>
            </div>
        </nav>
    );
}
