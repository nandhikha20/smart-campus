import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import fs from "fs";
import path from "path";

// Robust MVP Retrieval Logic
export function retrieveContext(query: string): string {
    try {
        const dataPath = path.join(process.cwd(), "app/data/data.json");

        // Check if file exists to prevent hard crashes
        if (!fs.existsSync(dataPath)) {
            console.warn(`Data file missing at ${dataPath}`);
            return "";
        }

        const fileContents = fs.readFileSync(dataPath, "utf8");
        const data = JSON.parse(fileContents);

        // Split query into terms of length > 2
        const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 2);

        if (queryTerms.length === 0) return "";

        // Score based on keyword presence
        const scoredData = data.map((item: any) => {
            let score = 0;
            const text = item.text.toLowerCase();
            queryTerms.forEach(term => {
                if (text.includes(term)) score += 1;
            });
            return { text: item.text, score };
        });

        // Get top 3 chunks, return text
        const context = scoredData
            .filter((d: any) => d.score > 0)
            .sort((a: any, b: any) => b.score - a.score)
            .slice(0, 3)
            .map((d: any) => d.text)
            .join("\n\n");

        return context;
    } catch (error) {
        console.error("Retrieval error:", error);
        return "";
    }
}

// Prompt Template
const promptTemplate = PromptTemplate.fromTemplate(`
You are a super helpful, energetic, and "vibey" Campus Assistant! 🎓✨
You help students navigate campus life with ease. Use emojis and be friendly! 
Use the supplied context to answer the user's question accurately.
If the answer is not found in the context, say "I'm not 100% sure about that one, bestie! 😅" but offer general help.
Do not hallucinate facts.

Context:
{context}

Question: {question}

Answer:
`);

// Main RAG Function
export async function generateResponse(question: string) {
    // Check for API key at runtime
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        console.error("Runtime Check: OPENROUTER_API_KEY is missing.");
        return "⚠️ Config Error: I can't connect to my brain right now (API Key missing). Please tell the dev! 🔧";
    }

    try {
        const context = retrieveContext(question);
        console.log(`[RAG] Question: "${question}" | Context Length: ${context.length}`);

        // Initialize LLM for OpenRouter
        // NOTE: We use 'ChatOpenAI' because OpenRouter is fully compatible with the OpenAI API standard.
        // We just need to point the 'baseURL' to OpenRouter.
        const llm = new ChatOpenAI({
            apiKey: apiKey, // The OpenRouter API Key
            configuration: {
                baseURL: "https://openrouter.ai/api/v1",
                defaultHeaders: {
                    "HTTP-Referer": "http://localhost:3000", // Required by OpenRouter for rankings
                    "X-Title": "Smart Campus Bot", // Optional title
                },
            },
            modelName: "mistralai/mistral-7b-instruct",
            temperature: 0.7,
        });

        const chain = RunnableSequence.from([
            {
                context: () => context,
                question: () => question,
            },
            promptTemplate,
            llm,
            new StringOutputParser(),
        ]);

        const response = await chain.invoke({});
        return response;
    } catch (error: any) {
        console.error("[RAG] Generation error detailed:", error);
        return `🚫 Oops! Something went wrong. Debug info: ${error.message || "Unknown error"}`;
    }
}
