import {Router,type Request,type Response} from "express";

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
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Failed to create profile"});
    }
})
