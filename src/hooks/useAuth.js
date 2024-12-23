// hooks/useAuth.js
"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Check for token in localStorage
        if (!token) {
            router.push('/login'); // Redirect to login if no token
        }
    }, [router]);

    // You can return a loading state or any other relevant info if needed
    return;
};

export default useAuth;
