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


// Function to fetch tasks
export const fetchTasks = async () => {
    try {
        const response = await api.get('/tasks/'); // Use the pre-configured Axios instance
        return response.data; // Returns the list of tasks
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};

// Function to create a new task
export const createTask = async (taskData) => {
    try {
        const response = await api.post('/tasks/', taskData); // Use the pre-configured Axios instance
        return response.data; // Returns the created task data
    } catch (error) {
        console.error('Error creating task:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};

// Function to update a task
export const updateTask = async (taskId, taskData) => {
    try {
        const response = await api.put(`/tasks/${taskId}/`, taskData); // Use the pre-configured Axios instance
        return response.data; // Returns the updated task data
    } catch (error) {
        console.error('Error updating task:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/tasks/${taskId}/`); // Use the pre-configured Axios instance
        return response.data; // Optionally return a success message or response
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};


// Function to fetch the user's profile
export const fetchProfile = async () => {
    try {
        const response = await api.get('/profile/'); // Use the pre-configured Axios instance
        return response.data; // Returns the profile data
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};

// Function to update the user's profile
export const updateProfile = async (profileData) => {
    try {
        const response = await api.put('/profile/', profileData); // Use the pre-configured Axios instance
        return response.data; // Returns the updated profile data
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};

// Function to delete the user's profile
export const deleteProfile = async () => {
    try {
        const response = await api.delete('/profile/'); // Use the pre-configured Axios instance
        return response.data; // Optionally return a success message or confirmation
    } catch (error) {
        console.error('Error deleting profile:', error);
        throw error.response ? error.response.data : error.message; // Handle the error response
    }
};