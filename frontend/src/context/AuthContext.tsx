import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "@/supabaseClient";

type AuthContextType = {
    session: any;
    signUpNewUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any}>;
    signInUser: (email: string, password: string) => Promise<{ success: boolean; error?: any; data?: any}>;
    signOut: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [session, setSession] = useState<any>(undefined)
    const [loading, setLoading] = useState(true);

    // Sign up function
    const signUpNewUser = async (email: string, password: string): Promise<{ success: boolean; error?: any; data?: any }> => {
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
        // Get initial session
        supabase.auth.getSession().then(({data: {session}}) => {
            console.log("AuthContext: Initial session: ", session); // DEBUG STATEMENT
            setSession(session);
            setLoading(false);
        });

        // Listen for authentication changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log("AuthContext: Auth state changed: ", _event, session); // DEBUG STATEMENT
            setSession(session);
            setLoading(false);
        });

        // Cleanup subscription amount
        return () => {
            console.log("AuthContext: Cleaning up subscription");  // DEBUG STATEMENT
            subscription.unsubscribe();
        };
    }, []);

    // Sign in function
    const signInUser = async (email: string, password: string): Promise<{ success: boolean; error?: any; data?: any }> => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                console.error("sign in error occurred: ", error);
                return { success: false, error: error.message };
            }
            console.log("Sign-in success: ", data);
            return { success: true, data };
        } catch(error) {
            console.error("HAHA SIGN IN ERROR LOL: ", error);
            return { success: false, error };
        }
    }

    // Signout function
    const signOut = async() => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("An error occurred. Please try again LOL: ", error);
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut, loading }}>
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