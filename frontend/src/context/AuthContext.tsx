import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "@/supabaseClient";

type AuthContextType = {
    session: any;
    signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any}>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [session, setSession] = useState<any>(undefined)

    // Sign up function
    const signUpNewUser = async(email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
    
        if (error) {
            console.error("There was a problem signing up :(((( ERROR: ", error);
            return { success: false, error };
        }
        return { success: true, data };
    };

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        })
    })

    // Signout function
    const signOut = async() => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("An error occurred. Please try again LOL: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signOut }}>
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