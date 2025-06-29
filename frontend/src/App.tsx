"use client"

import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from "@/context/AuthContext";
import Signup from './pages/Signup';
import axios from 'axios';
interface MembersResponse {
    members: string[];
}

function App() {
    const [array, setArray] = useState([]);
    const { session } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate("/home")
        } else {
            navigate("/auth")
        }
    }, [session, navigate])

    const fetchAPI = async() => {
        const response = await axios.get("http://127.0.0.1:8080/api/users");
        console.log(response.data.users);
        setArray(response.data.users);
    }

    useEffect(() => {
        fetchAPI();
    }, []);


    // Displays data from the backend (main.py)
    return (
        // <div>
        //     {
        //         array.map((user, index) => (
        //             <div key={index}>
        //                 <span>{user}</span>
        //                 <br></br>
        //             </div>
        //         ))
        //     }
        //     <>
        //         <Signup />
        //     </>
        // </div>
        <div className="min-h-screen bg-black">
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-green-500/50 border-t-green-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-green-400 font-mono">Initializing CipherCats...</p>
                </div>
            </div>
        </div>
    )   
}

export default App
