export interface User{
    id: string;
    email: string;
    created_at: string;
    
}

export interface UserProfile {
    userId:string;
    goal: "bulk" | "cut" | "recomp" | "strength" | "endurance";
    experience: "beginner" | "intermediate" | "advanced";
    daysPerWeek: "2" | "3" | "4" | "5" | "6";
    session: "30" | "45" | "60" | "90";
    equipment: "full_gym" | "home" | "dumbbells";
    injuries?: string;
    preferredSplit: "full_body" | "upper_lower" | "ppl" | "custom";
    updatedAt:string;
}