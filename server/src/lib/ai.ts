import OpenAI from "openai";
import "dotenv/config";
import { TrainingPlan,UserProfile } from "../types";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePlan(profile:UserProfile|Record<string,any>):Promise<TrainingPlan> {
    const normalizedProfile:UserProfile = {
        goal: profile.goal || "bulk",
        experience: profile.experience || "beginner",
        days_per_week: profile.days_per_week || 5,
        session_length: profile.session_length || 60,
        equipment: profile.equipment || "barbell",
        injuries: profile.injuries || null,
        preferred_split: profile.preferred_split || "",
    };

    
    
}
