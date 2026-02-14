"use client";

import { useAuth, AuthProvider } from "@/context/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

function ContentWrapper({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isAuthPage = pathname === "/login" || pathname === "/signup";

    useEffect(() => {
        if (!isLoading && !user && !isAuthPage) {
            router.push("/login");
        } else if (!isLoading && user && isAuthPage) {
            router.push("/");
        }
    }, [user, isLoading, isAuthPage, router]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (isAuthPage) {
        return <div className="min-h-screen bg-slate-50">{children}</div>;
    }

    if (!user) return null; // Wait for redirect

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <Navbar />
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="h-full w-full flex flex-col p-3 md:p-6 pb-20 md:pb-6">{children}</div>
                </main>
            </div>
        </div>
    );
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <ContentWrapper>{children}</ContentWrapper>
        </AuthProvider>
    );
}
