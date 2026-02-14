"use client";

import { useAuth } from "@/context/AuthContext";
import { User, Mail, GraduationCap, Calendar, Settings, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState("general");

    if (!user) return null;

    return (
        <div className="h-full overflow-y-auto space-y-6 pr-2">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>
                <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-100"
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8"
                >
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-blue-200 ring-4 ring-blue-50">
                        {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                            <p className="text-slate-500 font-medium capitalize flex items-center justify-center md:justify-start gap-2">
                                <GraduationCap size={16} className="text-blue-500" />
                                {user.role}  •  Computer Science
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 flex items-center gap-1.5">
                                    <Mail size={12} /> Email
                                </div>
                                <div className="text-slate-900 font-medium truncate" title={user.email}>{user.email}</div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1 flex items-center gap-1.5">
                                    <Calendar size={12} /> Joined
                                </div>
                                <div className="text-slate-900 font-medium">Fall 2024</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats / Settings */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm"
                    >
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Settings size={20} className="text-slate-400" />
                            Preferences
                        </h3>
                        <div className="space-y-3">
                            {['Email Notifications', 'Dark Mode', 'Public Profile'].map((setting) => (
                                <div key={setting} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                    <span className="text-slate-600 font-medium group-hover:text-slate-900">{setting}</span>
                                    <div className="w-10 h-6 bg-slate-200 rounded-full relative transition-colors group-hover:bg-slate-300">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
