import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
    const {user, loading} = useAuth();
    const plan =false;

    if(!user && !loading){
        return <Navigate to="/auth/sign-in" replace/>
    }

    if(!plan){
        return <Navigate to="/onboarding" replace/>
    }
    return (
        <div>
            <h1>Profile</h1>
            <p>{user?.email}</p>
        </div>
    )
}   