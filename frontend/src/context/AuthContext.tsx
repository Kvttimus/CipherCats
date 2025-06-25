import { createContext, useEffect, useState, useContext } from "react";

type AuthContextType = {
    session: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [session, setSession] = useState<any>(undefined)

    return (
        <AuthContext.Provider value={{session}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("UserAuth must be used within the AuthContextProvider");
    }
    return context;
}