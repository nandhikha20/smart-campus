import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password, // Storing plain text for demo only
            role: role || 'student',
            createdAt: new Date().toISOString()
        };

        try {
            db.users.create(newUser);
        } catch (e: any) {
            return NextResponse.json({ error: e.message }, { status: 400 });
        }

        const token = signToken({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
        });

        const response = NextResponse.json({
            success: true,
            user: { name: newUser.name, email: newUser.email, role: newUser.role }
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
