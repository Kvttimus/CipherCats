"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Lock, Mail, Shield, Code, Terminal } from "lucide-react"
import { UserAuth } from "@/context/AuthContext"

export default function AuthPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // Sign In State
    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
    const [signInError, setSignInError] = useState("")
    const [signInLoading, setSignInLoading] = useState(false)

    // Sign Up State
    const [signUpEmail, setSignUpEmail] = useState("")
    const [signUpPassword, setSignUpPassword] = useState("")
    const [signUpError, setSignUpError] = useState("")
    const [signUpLoading, setSignUpLoading] = useState(false)

    const { signInUser, signUpNewUser } = UserAuth()
    const navigate = useNavigate()

    // Add matrix rain state
    const [matrixChars, setMatrixChars] = useState<Array<{ char: string; left: number; delay: number }>>([])

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
        setSignInLoading(true)
        setSignInError("")

        try {
            const result = await signInUser(signInEmail, signInPassword)
            if (result.success) {
                navigate("/home")
            } else {
                setSignInError(result.error?.message || result.error || "Failed to sign in. Please try again.")
            }
        } catch (error: any) {
            setSignInError(error?.message || "An error occurred.")
        } finally {
            setSignInLoading(false)
        }
    }

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignUpLoading(true)
        setSignUpError("")

        try {
            const result = await signUpNewUser(signUpEmail, signUpPassword)
            if (result.success) {
                navigate("/home")
            } else {
                setSignUpError(result.error?.message || result.error || "Failed to create an account. Please try again.")
            }
        } catch (error: any) {
            setSignUpError(error?.message || "An error occurred.")
        } finally {
            setSignUpLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center p-4 overflow-hidden">
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
                {/* Logo/Header */}
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

                <Card className="bg-black/80 border-2 border-green-500/50 rounded-lg backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 rounded-lg blur-sm"></div>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-white">Welcome Back, Codebreaker</CardTitle>
                        <CardDescription className="text-slate-400">Continue your cryptography journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="signin" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-gray-700">
                                <TabsTrigger
                                    value="signin"
                                    className="data-[state=active]:bg-green-600 data-[state=active]:text-black font-mono"
                                >
                                    SIGN IN
                                </TabsTrigger>
                                <TabsTrigger
                                    value="signup"
                                    className="data-[state=active]:bg-cyan-600 data-[state=active]:text-black font-mono"
                                >
                                    SIGN UP
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin" className="space-y-4 mt-6">
                                <form onSubmit={handleSignIn} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signin-email" className="text-slate-200">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="signin-email"
                                                type="email"
                                                placeholder="agent@ciphercats.com"
                                                value={signInEmail}
                                                onChange={(e) => setSignInEmail(e.target.value)}
                                                required
                                                // className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                                className="w-full p-3 bg-black text-neon-green border border-neon-green rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 font-mono"

                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signin-password" className="text-slate-200">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="signin-password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your secret key"
                                                value={signInPassword}
                                                onChange={(e) => setSignInPassword(e.target.value)}
                                                required
                                                className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-slate-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-slate-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {signInError && (
                                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                            <p className="text-red-400 text-sm text-center">{signInError}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                                        disabled={signInLoading}
                                    >
                                        {signInLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                Decrypting Access...
                                            </>
                                        ) : (
                                            <>
                                                <Code className="w-4 h-4 mr-2" />
                                                Decrypt Access
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <div className="text-center">
                                    <Button variant="link" className="text-slate-400 hover:text-purple-400">
                                        Forgot your cipher key?
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="signup" className="space-y-4 mt-6">
                                <form onSubmit={handleSignUp} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-email" className="text-slate-200">
                                            Email
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="signup-email"
                                                type="email"
                                                placeholder="agent@ciphercats.com"
                                                value={signUpEmail}
                                                onChange={(e) => setSignUpEmail(e.target.value)}
                                                required
                                                className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-password" className="text-slate-200">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                            <Input
                                                id="signup-password"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Create your secret key"
                                                value={signUpPassword}
                                                onChange={(e) => setSignUpPassword(e.target.value)}
                                                required
                                                className="w-full bg-black/50 border-2 border-gray-700 rounded px-4 py-3 text-green-400 font-mono focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-300"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4 text-slate-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-slate-400" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    {signUpError && (
                                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                            <p className="text-red-400 text-sm text-center">{signUpError}</p>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                                        disabled={signUpLoading}
                                    >
                                        {signUpLoading ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                                Encrypting Profile...
                                            </>
                                        ) : (
                                            <>
                                                <Shield className="w-4 h-4 mr-2" />
                                                Join the Mission
                                            </>
                                        )}
                                    </Button>
                                </form>
                                <p className="text-xs text-slate-400 text-center">
                                    By signing up, you agree to become a master codebreaker
                                </p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-6 text-slate-400 text-sm">
                    <p>Ready to crack the code? 🐱‍💻</p>
                </div>
            </div>
        </div>
    )
}
