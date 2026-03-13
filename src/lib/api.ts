import type { UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

async function post(path: string, body: object) {
    const response = await fetch(`${BASE_URL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
}

async function get(path: string) {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
}



export const api = {
    get,
    async saveProfile(userId: string, profile: Omit<UserProfile, "userId" | "updatedAt">) {
        return post("/profile", { userId, ...profile });
    },
    async generatePlan(userId: string) {
        return post(`/plan/generate`, { userId });
    },
    async getCurrentPlan(userId: string) {
        return get(`/plan/current?userId=${userId}`);
    }
}