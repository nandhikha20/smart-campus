"use client";

import { ChatWindow } from "@/components/ChatWindow";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-full gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-2 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            Good Morning, {user?.name.split(' ')[0] || "Scholar"} <span className="animate-waving-hand">👋</span>
          </h2>
          <p className="text-slate-500 text-sm mt-1 font-medium hidden md:flex items-center gap-2">
            <Sparkles size={14} className="text-amber-500" />
            The library has 12 free seats near you. Want to head there?
          </p>
        </div>
        <div className="flex gap-3">
          <div className="px-3 py-1.5 bg-white/50 backdrop-blur border border-slate-200 rounded-lg flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wide">Campus Status: Normal</span>
          </div>
        </div>
      </header>

      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
