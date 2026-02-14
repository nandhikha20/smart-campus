import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = db.users.findByEmail(email);

        // Simple password check (in real app, use bcrypt)
        if (!user || user.password !== password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = signToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        });

        const response = NextResponse.json({
            success: true,
            user: { name: user.name, email: user.email, role: user.role }
        });

        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
