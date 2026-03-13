export interface User{
    id: string;
    email: string;
    created_at: string;
}

export interface PlanOverview {
  goal: string;
  frequency: string;
  split: string;
  notes: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe: number;
  notes?: string;
  alternatives?: string[];
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface TrainingPlan {
  id: string;
  userId: string;
  overview: PlanOverview;
  weeklySchedule: DaySchedule[];
  progression: string;
  version: number;
  createdAt: string;
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