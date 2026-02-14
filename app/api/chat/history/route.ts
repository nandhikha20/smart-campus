import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

// GET chat history
export async function GET(req: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const history = db.chats.getByUserId(session.id);
    return NextResponse.json({ history });
}

// POST update chat history (or just one message)
export async function POST(req: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;

    // Save full history or append? simple MVP = save full list
    db.chats.save(session.id, messages);

    return NextResponse.json({ success: true });
}
