import { generateResponse } from "../lib/rag";
import * as fs from "fs";
import * as path from "path";

async function test() {
    // Manually load .env.local for this test script without dotenv package
    try {
        const envPath = path.join(process.cwd(), ".env.local");
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, "utf-8");
            content.split("\n").forEach(line => {
                const parts = line.split("=");
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join("=").trim();
                    if (key && value && !process.env[key]) {
                        process.env[key] = value;
                    }
                }
            });
            console.log("Loaded .env.local variables");
        } else {
            console.warn(".env.local not found!");
        }
    } catch (e) {
        console.error("Error reading .env.local", e);
    }

    console.log("Testing RAG Pipeline...");
    console.log("API Key present:", !!process.env.OPENROUTER_API_KEY);

    try {
        const question = "Where is the library?";
        console.log(`Asking: "${question}"`);
        const response = await generateResponse(question);
        console.log("\n--- AI Response ---");
        console.log(response);
        console.log("-------------------");
    } catch (error) {
        console.error("Test Failed:", error);
    }
}

test();
