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
        await prisma.user_profile.upsert({
            where:{userId:userId},
            update:{ 
                goal,
                experience,
                daysPerWeek:daysPerWeek,
                session:session,
                equipment,
                injuries:injuries||null,
                preferredSplit:preferredSplit||null,
                updated_at:new Date()
            },
            create:{
                userId:userId,
                goal:goal,
                experience:experience,
                daysPerWeek:daysPerWeek,
                session:session,
                equipment:equipment,
                injuries:injuries||null,
                preferredSplit
            }
        })
        return res.status(200).json({message:"Profile created successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to create profile"});
    }
})
