// components/Logout.js

'use client'; // Mark this component as client-side

import React from 'react';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import useAuth from '../hooks/useAuth'; // Import the useAuth hook

const Logout = () => {
    useAuth(); // This will check if the user is logged in and redirect if not
    
    const router = useRouter(); // Use Next.js router for navigation

    // Handle the logout function
    const handleLogout = () => {
        // Clear auth tokens or any other user-related data here
        localStorage.removeItem('authToken'); // Example of clearing a token
        router.push('/'); // Redirect to the home page or login page
    };

    // Handle the cancel action, which takes the user back to the previous page
    const handleCancel = () => {
        router.push('/dashboard'); // Go back to the dashboard page
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Left Column for Image */}
                <div className="col-md-6 d-none d-md-block">
                    <img
                        src="https://res.cloudinary.com/dnbbm9vzi/image/upload/v1726666674/20_hggzzz.png"
                        className="img-fluid"
                        alt="Background"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                
                {/* Right Column for Logout Confirmation */}
                <div className="col-md-6">
                    <div className="card" style={{ border: 'none' }}>
                        <div className="card-header-logout text-center text-dark pt-5 card-logout">
                            <h2 className="fw-bold mb-4">Sign Out</h2>
                            <hr />
                        </div>
                        <div className="card-body text-center text-dark pb-5">
                            <p>Are you sure you want to sign out?</p>
                            
                            <button 
                                type="button" 
                                className="btn btn-danger btn-lg me-4" 
                                onClick={handleLogout}
                            >
                                Sign Out
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-lg ml-4" 
                                style={{ backgroundColor: '#E8BF73', color: 'black' }}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Logout;
