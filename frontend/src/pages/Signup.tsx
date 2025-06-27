import { UserAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/ui/authCard";
import { AuthHeader } from "@/components/ui/authHeader";
import { Card, CardContent } from "@/components/ui/card";
import { AsciiCat } from "@/components/ui/asciiCat";
import { Label } from "@/components/ui/label";



const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');  // clears previous errors

        try {
            const result = await signUpNewUser(email, password);

            if (result.success) {
                navigate('/home');
            }
            else {
                // Handle error msg from signUpNewUser
                setError(result.error?.message || result.error || "Failed to create an account. Please try again.");
            }
        } catch (error: any) {
            setError(error?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-black relative flex items-center justify-center px-4">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-stars opacity-10 z-0" />

            <Card className="w-full max-w-md border-cyan-500 bg-gray-900 text-white shadow-xl z-10">
                <CardContent className="p-6 space-y-6">
                    <AsciiCat />

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-cyan-400">Create Account</h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-cyan-300 hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-cyan-200">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-cyan-200">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <Button type="submit" className="w-full mt-2" disabled={loading}>
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Signup;