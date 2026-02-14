
import fs from 'fs';
import path from 'path';
import os from 'os';

// Use /tmp in production (Vercel) because the root file system is read-only.
// Use local data folder in development.
const DB_PATH = process.env.NODE_ENV === 'production'
    ? path.join(os.tmpdir(), 'smart_campus_data')
    : path.join(process.cwd(), 'data');

const USERS_FILE = path.join(DB_PATH, 'users.json');
const CHATS_FILE = path.join(DB_PATH, 'chats.json');

// Ensure DB directory exists
try {
    if (!fs.existsSync(DB_PATH)) {
        fs.mkdirSync(DB_PATH, { recursive: true });
    }
} catch (error) {
    console.error("Failed to create DB directory:", error);
}

// Helper to read/write JSON
function readJSON(file: string, fallback: any = []) {
    if (!fs.existsSync(file)) return fallback;
    try {
        return JSON.parse(fs.readFileSync(file, 'utf-8'));
    } catch {
        return fallback;
    }
}

function writeJSON(file: string, data: any) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export const db = {
    users: {
        findAll: () => readJSON(USERS_FILE),
        findByEmail: (email: string) => readJSON(USERS_FILE).find((u: any) => u.email === email),
        create: (user: any) => {
            const users = readJSON(USERS_FILE);
            if (users.find((u: any) => u.email === user.email)) {
                throw new Error('User already exists');
            }
            users.push(user);
            writeJSON(USERS_FILE, users);
            return user;
        }
    },
    chats: {
        getByUserId: (userId: string) => {
            const allChats = readJSON(CHATS_FILE, {});
            return allChats[userId] || [];
        },
        save: (userId: string, messages: any[]) => {
            const allChats = readJSON(CHATS_FILE, {});
            allChats[userId] = messages;
            writeJSON(CHATS_FILE, allChats);
        }
    }
};
