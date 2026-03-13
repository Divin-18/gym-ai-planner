import { RedirectToSignIn, SignedIn } from "@neondatabase/neon-js/auth/react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/layout/ui/Input";
import { Select } from "../components/layout/ui/Select";
import { Textarea } from "../components/layout/ui/TextArea";
import  { Button } from "../components/layout/ui/Button";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import type { UserProfile } from "../types";


const goalOptions = [
  { value: "bulk", label: "Build Muscle (Bulk)" },
  { value: "cut", label: "Lose Fat (Cut)" },
  { value: "recomp", label: "Body Recomposition" },
  { value: "strength", label: "Build Strength" },
  { value: "endurance", label: "Improve Endurance" },
];

const experienceOptions = [
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3+ years)" },
];

const daysOptions = [
  { value: "2", label: "2 days per week" },
  { value: "3", label: "3 days per week" },
  { value: "4", label: "4 days per week" },
  { value: "5", label: "5 days per week" },
  { value: "6", label: "6 days per week" },
];

const sessionOptions = [
  { value: "30", label: "30 minutes" },
  { value: "45", label: "45 minutes" },
  { value: "60", label: "60 minutes" },
  { value: "90", label: "90 minutes" },
];

const equipmentOptions = [
  { value: "full_gym", label: "Full Gym Access" },
  { value: "home", label: "Home Gym" },
  { value: "dumbbells", label: "Dumbbells Only" },
];

const splitOptions = [
  { value: "full_body", label: "Full Body" },
  { value: "upper_lower", label: "Upper/Lower Split" },
  { value: "ppl", label: "Push/Pull/Legs" },
  { value: "custom", label: "Let AI Decide" },
];

export default function Onboarding() {
    const {user,saveProfile} = useAuth();


    const [form, setForm] = useState({
        goal: "bulk",
        experience: "intermediate",
        daysPerWeek: "4",
        sessionLength: "60",
        equipment: "full_gym",
        injuries: "",
        preferredSplit: "upper_lower",
    });
    const [isGenerating, setIsGenerating] = useState(false);

    async function handleQuestionnaire(e: React.SubmitEvent) {
        e.preventDefault();
        const profile:Omit<UserProfile,"userId"|"updatedAt"> = {
            goal:form.goal as UserProfile["goal"],
            experience:form.experience as UserProfile["experience"],
            daysPerWeek:form.daysPerWeek as UserProfile["daysPerWeek"],
            session:form.sessionLength as UserProfile["session"],
            equipment:form.equipment as UserProfile["equipment"],
            injuries:form.injuries as UserProfile["injuries"],
            preferredSplit:form.preferredSplit as UserProfile["preferredSplit"],

        };
        setIsGenerating(true);
        await saveProfile(profile);
        setIsGenerating(false);
      
    }


    if(!user){
        return <RedirectToSignIn/>
    }
    return (
        <SignedIn>
            <div className="flex flex-col items-center justify-center h-screen">
               <div className="w-full max-w-md">
              {isGenerating ? (
                <Card variant="bordered" className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin"/>
                    <h1>Creating your Plan</h1>
                    <p>Our AI is crafting the perfect workout plan for you based on your goals and experience.</p>
                </Card>
              ) : (
                <Card variant="bordered">
                <h1 className="text-2xl font-bold mb-6">Tell us About Yourself</h1>
                <p className="text-muted-foreground mb-6">
                    Help us  create the  perfect  plan for you.
                </p>
                <form  onSubmit={handleQuestionnaire} className="space-y-5">
                    <Select
                    id="goal"
                    label="What is your primary goal?"
                    options={goalOptions}
                    value={form.goal}
                    onChange={(e) => setForm({ ...form, goal: e.target.value })}
                    />

                    <Select
                    id="experience"
                    label="What is your experience level?"
                    options={experienceOptions}
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    />
               <div className="grid grid-cols-2 gap-4">
                    <Select
                    id="daysPerWeek"
                    label="How many days per week can you train?"
                    options={daysOptions}
                    value={form.daysPerWeek}
                    onChange={(e) => setForm({ ...form, daysPerWeek: e.target.value })}
                    />

                    <Select
                    id="sessionLength"
                    label="How long is each session?"
                    options={sessionOptions}
                    value={form.sessionLength}
                    onChange={(e) => setForm({ ...form, sessionLength: e.target.value })}
                    />
                </div>
                    <Select
                    id="equipment"
                    label="What equipment do you have access to?"
                    options={equipmentOptions}
                    value={form.equipment}
                    onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                    />

                    <Select
                    id="preferredSplit"
                    label="What is your preferred split?"
                    options={splitOptions}
                    value={form.preferredSplit}
                    onChange={(e) => setForm({ ...form, preferredSplit: e.target.value })}
                    />
                    <Textarea
                    id="injuries"
                    label="Do you have any injuries or limitations?"
                    placeholder="E.g. bad knees, shoulder pain, etc."
                    rows={3}
                    value={form.injuries}
                    onChange={(e) => setForm({ ...form, injuries: e.target.value })}
                    />
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" className="flex-1 gap-2">
                        Generate My Plan<ArrowRightIcon className="h-4 w-4" />
                      </Button>
                    </div>
                </form>
              </Card>
              )}
               </div>
            </div>
        </SignedIn>
    )
}