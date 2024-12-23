import axios from 'axios';

// Use environment variables for the API URLs
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'https://backend-django-9c363a145383.herokuapp.com/auth'; // Authentication base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-django-9c363a145383.herokuapp.com/api'; // API base URL for actions

// Set up Axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
    // Check if window is defined (only on the client-side)
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
        if (token) {
            config.headers.Authorization = `Token ${token}`; // Assuming your backend uses 'Token' scheme
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Function to register a new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${AUTH_URL}/registration/`, userData);
        return response.data; // Returns the user data from the response
    } catch (error) {
        throw error.response.data; // Customize this based on your needs
    }
};

// Function to log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login/`, credentials);
        console.log('Login Response:', response.data); // Log the response data
        if (typeof window !== 'undefined') {
            // Store user data in localStorage only on the client side
            localStorage.setItem('user', response.data.user); // Use 'user' or 'userId' for consistency
            console.log('User ID saved:', response.data.user);
            localStorage.setItem('authToken', response.data.key); // Store the auth token
        }
        return { token: response.data.key }; // Return the token
    } catch (error) {
        throw error.response.data;
    }
};


// Function to fetch user profile in side navigation menu
export const fetchUserProfile = async () => {
    try {
        // Use the pre-configured Axios instance 'api' instead of the default axios
        const response = await api.get('/profile/');
        return response.data; // Return the user profile data
    } catch (error) {
        // Handle errors that occur during the request
        console.error('Error fetching user profile:', error);
        throw error.response ? error.response.data : error.message; // Provide error details
    }
};