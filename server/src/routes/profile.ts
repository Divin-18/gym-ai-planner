import {Router,type Request,type Response} from "express";
import {prisma} from "../lib/prisma";

export const profileRouter = Router();

profileRouter.post("/", async (req:Request,res:Response) => {
    try {
        const {userId,...profileData} = req.body;
        if(!userId){
            return res.status(400).json({message:"User ID is required"});
        }
      const {  goal,
        experience,
        daysPerWeek,
        session,
        equipment,
        injuries,
        preferredSplit}=profileData;

        if(!goal || !experience || !daysPerWeek || !session || !equipment  || !preferredSplit){
            return res.status(400).json({message:"All fields are required"});
        }
        const parsedDaysPerWeek = Number(daysPerWeek);
        if (!Number.isInteger(parsedDaysPerWeek) || parsedDaysPerWeek <= 0) {
            return res.status(400).json({message:"daysPerWeek must be a positive integer"});
        }

        const normalizedInjuries = typeof injuries === "string" ? injuries.trim() : "";

        await prisma.user_profile.upsert({
            where:{userId:userId},
            update:{ 
                goal,
                experience,
                daysPerWeek:parsedDaysPerWeek,
                session:session,
                equipment,
                injuries:normalizedInjuries,
                preferredSplit,
                updated_at:new Date()
            },
            create:{
                userId:userId,
                goal:goal,
                experience:experience,
                daysPerWeek:parsedDaysPerWeek,
                session:session,
                equipment:equipment,
                injuries:normalizedInjuries,
                preferredSplit
            }
        })
        return res.status(200).json({message:"Profile created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to create profile"});
    }
})
