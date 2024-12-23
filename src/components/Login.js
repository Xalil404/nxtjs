'use client';  // Mark this component as client-side

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router
import { loginUser } from '../services/api'; // Ensure your API is set up for Next.js

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Use Next.js router for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await loginUser({ email, password });
            if (typeof window !== 'undefined') {
                // Store token only on the client side
                localStorage.setItem('authToken', response.token);
            }
            // Use Next.js router to navigate to the dashboard
            router.push('/dashboard');
        } catch (error) {
            const errorMessage = error.non_field_errors
                ? error.non_field_errors[0]
                : 'Login failed. Please try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1732203242/a_uc4bwg.png"
                        className="img-fluid"
                        alt="Login"
                    />
                </div>

                {/* Right Column for Login Form */}
                <div className="col-md-6">
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header-a text-center card-header-custom">
                            <h2>Sign in to Project Name</h2>
                        </div>

                        {/* Divider with text */}
                        <div className="text-center my-3">
                            <div className="d-flex align-items-center justify-content-center">
                                <hr className="flex-grow-1 border-top border-secondary" />
                                <span className="mx-3 text-dark" style={{ whiteSpace: 'nowrap' }}>
                                    or sign in with email
                                </span>
                                <hr className="flex-grow-1 border-top border-secondary" />
                            </div>
                        </div>

                        <div className="card-body">
                            {/* Login Form */}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="form-control mb-3"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <input
                                    type="password"
                                    className="form-control mb-3"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <div className="social-login-buttons">
                                    <button
                                        type="submit"
                                        className="btn btn-lg mx-auto d-block w-100 py-3 rounded-button"
                                        style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Logging in...' : 'Sign In'}
                                    </button>
                                </div>
                            </form>

                            {/* Error Message */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            <hr />

                            {/* Links for Forgot Password and Sign Up */}
                            <p className="text-center">
                                <a href="https://backend-django-9c363a145383.herokuapp.com/accounts/password/reset/" className="text-dark">
                                    Forgot Password?
                                </a>
                            </p>
                            <p className="text-center">
                                Don't have an account?{' '}
                                <a href="/register" className="text-dark">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

