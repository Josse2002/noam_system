import { useNavigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState, useEffect } from "react";

export const ProtectedRoute = ({redirectTo}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, []);

    if (!user) {
        navigate(redirectTo);
        return null;
    }

    return <Outlet />;
};
