"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (e) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Login failed");
        }

        const data = await res.json();
        setUser(data.user);
        router.push("/");
    };

    const signup = async (name: string, email: string, password: string, role: string) => {
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role }),
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || "Signup failed");
        }

        const data = await res.json();
        setUser(data.user);
        router.push("/");
    };

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
        router.push("/login"); // Force redirect after state clear
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
