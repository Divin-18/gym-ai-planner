import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../types";
import { authClient } from "../lib/auth";
import type { UserProfile } from "../types";
import { api } from "../lib/api";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    saveProfile: (profile: Omit<UserProfile,"userId"|"updatedAt">) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);    

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [neonUser, setNeonUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       async function loadUser() {
        try{
            const result = await authClient.getSession();
            if(result && result.data?.user){
                setNeonUser(result.data.user);
            }
            else{
                setNeonUser(null);
            }
           
        }
        catch(error){
            console.error("Error loading user:", error);
            setNeonUser(null);
        }
        finally{
            setLoading(false);
        }
       }
       loadUser();
    }, []);

    async function saveProfile(     profileData: Omit<UserProfile,"userId"|"updatedAt">) {
       if(!neonUser) throw new Error("User not found");
       await api.saveProfile(neonUser.id,profileData);
    }

    return (
        <AuthContext.Provider value={{user: neonUser,loading:loading,saveProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}