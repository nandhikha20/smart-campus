import { NextResponse } from "next/server";
import { generateResponse } from "@/lib/rag";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        // Validate request
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json(
                { error: "Invalid request format" },
                { status: 400 }
            );
        }

        // Get the last message as the query
        const lastMessage = messages[messages.length - 1];
        const query = lastMessage.content;

        console.log(`[API] Processing query: "${query}"`);

        // Call RAG pipeline
        const responseContent = await generateResponse(query);

        return NextResponse.json({
            role: "assistant",
            content: responseContent
        });

    } catch (error) {
        console.error("[API] Chat error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
