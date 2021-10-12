import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { FirebaseAuth } from '../../storeFirebase';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(({ user }) => user);
    const location = useLocation();
    const { from } = location.state || { from: '/' };

    useEffect(() => {
        document.title = "Login | Ecommerce Admin";
        setLoading(false);
    }, [])

    const signIn = () => {
        setLoading(true);
        FirebaseAuth.signInWithEmailAndPassword(email, password)
            .catch(() => setLoading(false))
    }

    if (user) return <Redirect to={from} />
    return (
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 mx-5" style={{ width: '400px' }}>
                <h2 className="text-center font-bold mb-5 text-3xl"><span className="text-blue-700">E</span>-commerce</h2>
                <div className="flex flex-col gap-5">
                    <TextField
                        variant="outlined"
                        className="w-full"
                        label="Enter your email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <TextField
                        variant="outlined"
                        className="w-full"
                        label="Enter your password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <Button variant="contained" color="primary" onClick={signIn} disabled={loading}>Sign In</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
