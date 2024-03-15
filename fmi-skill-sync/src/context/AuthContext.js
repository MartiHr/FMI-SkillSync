import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const currentUser = useAuth();

    return (
        <AuthContext.Provider value={{
            currentUser
        }}>
            {children}
        </AuthContext.Provider>  
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    return context;
};