"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Lock, Mail, Zap, Shield, Code, Cat, User } from "lucide-react"
import { UserAuth } from "@/context/AuthContext"
import { AsciiCat } from "@/components/ui/asciiCat"

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="relative">
                            <Cat className="w-12 h-12 text-purple-400" />
                            <Lock className="w-6 h-6 text-green-400 absolute -bottom-1 -right-1" />
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
                            CipherCats
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">Master cryptography through interactive challenges</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                            <Zap className="w-3 h-3 mr-1" />
                            Gamified Learning
                        </Badge>
                        <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                            <Shield className="w-3 h-3 mr-1" />
                            Secure
                        </Badge>
                    </div>
                </div>

                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl shadow-2xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl text-white">Welcome Back, Codebreaker</CardTitle>
                        <CardDescription className="text-slate-400">Continue your cryptography journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="signin" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
                                <TabsTrigger
                                    value="signin"
                                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                                >
                                    Sign In
                                </TabsTrigger>
                                <TabsTrigger
                                    value="signup"
                                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                                >
                                    Sign Up
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin" className="space-y-4 mt-6">
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
                                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
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
                                            className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
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
                                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                    <Code className="w-4 h-4 mr-2" />
                                    Decrypt Access
                                </Button>
                                <div className="text-center">
                                    <Button variant="link" className="text-slate-400 hover:text-purple-400">
                                        Forgot your cipher key?
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="signup" className="space-y-4 mt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-username" className="text-slate-200">
                                        Username
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="signup-username"
                                            type="text"
                                            placeholder="Choose your codename"
                                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                                        />
                                    </div>
                                </div>
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
                                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
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
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Create your secret key"
                                            className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
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
                                <div className="space-y-2">
                                    <Label htmlFor="signup-confirm-password" className="text-slate-200">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="signup-confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your secret key"
                                            className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
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
                                <Button className="w-full bg-gradient-to-r from-green-600 to-purple-600 hover:from-green-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
                                    <Shield className="w-4 h-4 mr-2" />
                                    Join the Mission
                                </Button>
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
