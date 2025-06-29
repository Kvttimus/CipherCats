// import { UserAuth } from '@/context/AuthContext';
// import React, { useState } from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom';

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { AuthCard } from "@/components/ui/authCard";
// import { AuthHeader } from "@/components/ui/authHeader";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";



// const Signin = () => {
//     const [email, setEmail] = useState<string>('')
//     const [password, setPassword] = useState<string>('')
//     const [error, setError] = useState<string>('')
//     const [loading, setLoading] = useState<boolean>(false);

//     const { session, signInUser } = UserAuth();
//     const navigate = useNavigate();

//     const handleSignIn = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');  // clears previous errors

//         try {
//             const result = await signInUser(email, password);

//             if (result.success) {
//                 navigate('/home');
//             }
//             else {
//                 // Handle error msg from signInUser
//                 setError(result.error?.message || result.error || "Failed to create an account. Please try again.");
//             }
//         } catch (error: any) {
//             setError(error?.message || "An error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="min-h-screen bg-black relative flex items-center justify-center px-4">
//             {/* Animated Background */}
//             <div className="absolute inset-0 bg-stars opacity-10 z-0" />

//             <Card className="w-full max-w-md border-cyan-500 bg-gray-900 text-white shadow-xl z-10">
//                 <CardContent className="p-6 space-y-6">

//                     <div className="text-center">
//                         <h2 className="text-3xl font-bold text-cyan-400">Sign In</h2>
//                         <p className="text-sm text-gray-400 mt-1">
//                             Don’t have an account?{" "}
//                             <Link to="/signup" className="text-cyan-300 hover:underline">
//                                 Sign up
//                             </Link>
//                         </p>
//                     </div>

//                     <form onSubmit={handleSignIn} className="space-y-4">
//                         <div className="space-y-2">
//                             <Label htmlFor="email" className="text-cyan-200">Email</Label>
//                             <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         </div>

//                         <div className="space-y-2">
//                             <Label htmlFor="password" className="text-cyan-200">Password</Label>
//                             <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                         </div>

//                         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//                         <Button type="submit" className="w-full mt-2" disabled={loading}>
//                             {loading ? "Signing In..." : "Sign In"}
//                         </Button>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }

// export default Signin;

"use client"

import { UserAuth } from "@/context/AuthContext"
import type React from "react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail, Terminal, Shield, Zap } from "lucide-react"

const Signin = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [matrixChars, setMatrixChars] = useState<Array<{ char: string; left: number; delay: number }>>([])

    const { session, signInUser } = UserAuth()
    const navigate = useNavigate()

    // Generate matrix rain effect
    useEffect(() => {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
        const newMatrixChars = Array.from({ length: 50 }, (_, i) => ({
            char: chars[Math.floor(Math.random() * chars.length)],
            left: Math.random() * 100,
            delay: Math.random() * 3,
        }))
        setMatrixChars(newMatrixChars)
    }, [])

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await signInUser(email, password)
            if (result.success) {
                navigate("/home")
            } else {
                setError(result.error || "Access denied. Invalid credentials.")
            }
        } catch (error: any) {
            setError("System error. Connection terminated.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center px-4 overflow-hidden">
            {/* Matrix Rain Background */}
            <div className="matrix-rain">
                {matrixChars.map((item, index) => (
                    <div
                        key={index}
                        className="matrix-char"
                        style={{
                            left: `${item.left}%`,
                            animationDelay: `${item.delay}s`,
                        }}
                    >
                        {item.char}
                    </div>
                ))}
            </div>

            {/* Circuit Board Pattern */}
            <div className="absolute inset-0 circuit-bg"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-red-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Terminal className="w-8 h-8 neon-green" />
                        <h1
                            className="text-5xl font-black glitch-text neon-green"
                            data-text="CIPHERCATS"
                            style={{ fontFamily: "Orbitron, monospace" }}
                        >
                            CIPHERCATS
                        </h1>
                        <Shield className="w-8 h-8 neon-blue" />
                    </div>
                    <p className="text-cyan-400 text-lg font-mono">&gt; CRYPTOGRAPHY LEARNING PROTOCOL</p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs font-mono">
                            <Zap className="w-3 h-3 inline mr-1" />
                            GAMIFIED
                        </span>
                        <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-400 text-xs font-mono">
                            <Lock className="w-3 h-3 inline mr-1" />
                            SECURE
                        </span>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-black/80 border-2 border-green-500/50 rounded-lg backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden">
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 rounded-lg blur-sm"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold neon-green font-mono mb-2">&gt; ACCESS_TERMINAL</h2>
                            <p className="text-gray-400 font-mono text-sm">Initialize authentication protocol</p>
                        </div>

                        <form onSubmit={handleSignIn} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-cyan-400 font-mono text-sm flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    AGENT_ID:
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="agent@ciphercats.net"
                                        className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                    />
                                    <div className="absolute right-3 top-3 text-green-500/50">
                                        <Terminal className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-cyan-400 font-mono text-sm flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    ACCESS_KEY:
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="Enter cipher sequence"
                                        className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 pr-12 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-green-500/50 hover:text-green-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded p-3">
                                    <p className="text-red-400 font-mono text-sm text-center">ERROR: {error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-bold py-3 px-6 rounded font-mono text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        AUTHENTICATING...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Terminal className="w-5 h-5" />
                                        INITIATE_ACCESS
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Footer Links */}
                        <div className="text-center mt-6 space-y-2">
                            <p className="text-gray-400 font-mono text-sm">
                                New agent?{" "}
                                <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                                    Register for mission
                                </Link>
                            </p>
                            <button className="text-gray-500 hover:text-gray-400 font-mono text-xs transition-colors">
                                &gt; Forgot access key?
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Terminal Text */}
                <div className="text-center mt-6">
                    <p className="text-green-400 font-mono text-sm terminal-cursor">Ready to decrypt the matrix?</p>
                </div>
            </div>
        </div>
    )
}

export default Signin
