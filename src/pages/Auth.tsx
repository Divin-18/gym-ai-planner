import { AuthView } from "@neondatabase/neon-js/auth/react";
import { useParams } from "react-router-dom";

export default function Auth() {
    const {pathname} = useParams();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
        <AuthView path={pathname} />
            </div>
        </div>
    )
}