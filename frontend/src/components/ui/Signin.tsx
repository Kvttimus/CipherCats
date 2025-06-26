import { UserAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const { session, signInUser } = UserAuth();
    const navigate = useNavigate();
    // console.log(session);  // DEBUG STATEMENT

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');  // clears previous errors

        try {
            const result = await signInUser(email, password);

            if (result.success) {
                navigate('/home');
            }
            else {
                // Handle error msg from signInUser
                setError(result.error?.message || result.error || "Failed to create an account. Please try again.");
            }
        } catch (error: any) {
            setError(error?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={handleSignIn} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Sign In!!!</h2>
                <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                <div className='flex flex-col py-4'>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-3 mt-2"
                        type="email" />
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="p-3 mt-2"
                        type="password" />
                    <button type="submit" disabled={loading} className="mt-6 w-full">Sign up</button>
                    {error && <p className="text-red-600 text-center pt-4">{error}</p>}
                </div>
            </form>
        </div>
    );
}

export default Signin;