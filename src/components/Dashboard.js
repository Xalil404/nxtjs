// components/Dashboard.js

'use client'; // This is important for client-side only components in Next.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import { fetchUserProfile } from '../services/api'
import useAuth from '../hooks/useAuth'; // Import the useAuth hook to check if user is logged in

const Dashboard = () => {
    useAuth(); // This will check if the user is logged in and redirect if not

    const router = useRouter(); // Use Next.js router for navigation
    const [userProfile, setUserProfile] = useState(null); // State to store user profile
    const [error, setError] = useState(null); // To store any error messages
  //  const token = localStorage.getItem('authToken'); // Retrieve token from local storage
    const [token, setToken] = useState(null);

    // Load user profile when the component mounts
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Only access localStorage on the client-side
            const authToken = localStorage.getItem('authToken');
            setToken(authToken); // Set token after ensuring it's client-side

            if (authToken) {
                const loadProfile = async () => {
                    try {
                        const profileData = await fetchUserProfile(authToken);
                        setUserProfile(profileData); // Set user profile
                    } catch (err) {
                        setError(err.detail || 'Error fetching user profile');
                        console.error('Error fetching user profile:', err);
                    }
                };
                loadProfile(); // Call the fetch function if token exists
            } else {
                setError('No authentication token found');
            }
        }
    }, []);

    const handleLogout = () => {
        // Clear auth token and redirect to home
        router.push('/logout'); // Redirect to the home page or login page
    };

    return (
        <div className='dashboard-background'>
            <div className="container-fluid">
                {/* Show error message if it exists */}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div className="row">
                    {/* Sidebar */}
                    <nav className="col-md-2 d-none d-md-block sidebar">
                        <h2 className="sidebar-heading text-center">Menu</h2>
                        <ul className="nav flex-column">
                            <hr className="divider" />
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/dashboard">Dashboard</a>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/tasks">Tasks</a>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/profile">Profile</a>
                            </li>
                            <hr className="divider" />
                            <li className="nav-item">
                                <a className="nav-link text-dark" href="/feature1">Feature 1</a>
                            </li>
                            <hr className="divider" />
                        </ul>
                        
                        {/* User Info and Logout Section */}
                        <div className="sidebar-user-info mt-4 text-center fw-bold">
                            {userProfile && (
                                <p>Welcome, {userProfile.username}!</p>
                            )}
                            <button 
                                onClick={handleLogout} 
                                className="btn btn-sm btn-danger"
                            >
                                Logout
                            </button>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        <div className="text-center mb-4 d-flex align-items-center justify-content-center">
                            <img
                                src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729505462/static/favicon_io/apple-touch-icon.234aad4ee54e.png"
                                alt="Logo"
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <h1 className="d-inline mb-0">Project Name</h1>
                        </div>

                        {/* Welcome section for the homepage */}
                        {router.pathname === '/dashboard' && (
                            <div className="row align-items-center justify-content-center" style={{ flex: 1 }}>
                                <div className="col-md-6">
                                    <h1 className="mb-3 fw-bold">Welcome to Project Name!</h1>
                                    <h6 className="fw-bold">Sed accumsan sit amet magna fringilla accumsan. Sed accumsan sit amet magna fringilla accumsan.</h6>
                                </div>
                                <div className="col-md-6 text-center">
                                    <img
                                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1729520568/Group_27_yp99rq.png"
                                        alt="Welcome"
                                        className="img-fluid"
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
