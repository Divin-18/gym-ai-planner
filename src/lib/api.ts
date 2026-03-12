import type { UserProfile } from "../types";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";

async function post(path:string,body:object) {
    const response = await fetch(`${BASE_URL}/api${path}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(body),
    });

    if(!response.ok){
        throw new Error(`API error: ${response.statusText}`);
    }
    return response.json();
}

async function get(endpoint:string) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return response.json();
}



export const api = {
    async saveProfile( userId:string,profile: Omit<UserProfile,"userId"|"updatedAt">) {
         post("/profile",{userId,...profile});
    
    }
}