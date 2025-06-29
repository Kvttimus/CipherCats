import React from 'react';
import { UserAuth } from "@/context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const { session, signOut, loading } = UserAuth();
    const navigate = useNavigate();

    const handleSignOut = async() => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <div>
            <h1>Home</h1>
            <h2>Welcome back {session?.user?.email}</h2>
            <div>
                <p><Link to='/home/play'>Play</Link></p>
                <p><Link to='/home/dashboard'>Dashboard</Link></p>
                <p><Link to='/home/settings'>Settings</Link></p>
                <p 
                    onClick={handleSignOut}
                    className="hover:cursor-pointer border inline-block px-4 py-3 mt-4">Sign out
                </p>
            </div>
        </div>
    )
}

export default Home