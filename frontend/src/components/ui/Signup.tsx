import { UserAuth } from '@/context/AuthContext';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);

    const { session, signUpNewUser } = UserAuth();
    console.log(session);

    return (
    <div>
        <form className='max-w-md m-auto pt-24'>
            <h2 className='font-bold pb-2'>Sign up tdy!</h2>
            <p>Already have an account? <Link to='/signin'>Sign In!</Link></p>
            <div className='flex flex-col py-4'>
                <input placeholder="Email" className="p-3 mt-2" type="email"/>
                <input placeholder="Password" className="p-3 mt-2" type="password"/>
                <button type="submit" disabled={loading} className="mt-6 w-full">Sign up</button>
            </div>
        </form>
    </div>
    );
}

export default Signup