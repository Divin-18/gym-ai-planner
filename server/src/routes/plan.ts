import {Router,type Request,type Response} from "express";
import { prisma } from "../lib/prisma";
import { generateTrainingPlan } from "../lib/ai";

export const planRouter = Router();

planRouter.post("/generate", async (req:Request,res:Response) => {
    try{
        const {userId} = req.body;
        if(!userId){
            return res.status(400).json({ error: "User ID is required" });
        }

        const userProfile = await prisma.user_profile.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!userProfile) {
            return res.status(404).json({ error: "User profile not found" });
        }

        const latestPlan = await prisma.training_plans.findFirst({
            where: {
                userId: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                version: true,
            },
        });

        const nextVersion = latestPlan ? latestPlan.version + 1 : 1;
        let planJson = {};

        try {
            planJson = await generateTrainingPlan(userProfile);
        } catch (error) {
            console.error("Error generating plan:", error);
            return res.status(500).json({ error: "Failed to generate plan" });
        }
        const planText = JSON.stringify(planJson, null, 2);

        const newPlan = await prisma.training_plans.create({
            data: {
                userId: userId,
                version: nextVersion,
                plan_json: planJson,
                plan_text: planText,
            },
        });

        return res.status(200).json({
            planId: newPlan.id,
            version: newPlan.version,
        });

    } catch (error) {
        console.error("Error generating plan:", error);
        res.status(500).json({ error: "Failed to generate plan" });
    }
});

planRouter.get("/current",async(req:Request,res:Response)=>{
    try{
      const userId = req.query.userId as string;
      if(!userId){
        return res.status(400).json({error:"User ID is required"});
      }
      const plan = await prisma.training_plans.findFirst({
        where :{userId:userId},
        orderBy:{created_at:"desc"}


        
      })
      if(!plan){
        return res.status(404).json({error:"Plan not found"});
      }
      return res.status(200).json({id:plan.id,
        userId:plan.userId,
        version:plan.version,plan_json:plan.plan_json,
        plan_text:plan.plan_text,
        createdAt:plan.created_at});
    }
    catch(error){
     console.log(error);
     res.status(500).json({error:"Failed to get plan"});
    }
})