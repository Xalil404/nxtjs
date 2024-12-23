'use client';

import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, fetchUserProfile } from '@/services/api';
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import useAuth from '../hooks/useAuth';

const Tasks = () => {
    useAuth();

    const router = useRouter();

    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [token, setToken] = useState(null);


    // Load user profile and tasks when the component mounts
    useEffect(() => {
        const loadProfileAndTasks = async () => {
            try {
                const profileData = await fetchUserProfile(token);
                setUserProfile(profileData);

                const taskData = await fetchTasks(token);
                setTasks(taskData);
            } catch (err) {
                setError(err.detail || 'Error fetching data');
                console.error('Error fetching data:', err);
            }
        };

        loadProfileAndTasks();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const taskData = { title, description };

        try {
            if (editId) {
                await updateTask(editId, taskData, token);
                setEditId(null);
            } else {
                await createTask(taskData, token);
            }
            setTitle('');
            setDescription('');
            const data = await fetchTasks(token);
            setTasks(data);
        } catch (error) {
            setError(error.detail || 'An error occurred.');
            console.error('Error saving task:', error);
        }
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setEditId(task.id);
    };

    const handleDelete = async (id) => {
        try {
            // Directly call the deleteTask function with the task id
            await deleteTask(id, token);

            // Remove the deleted task from the state
            setTasks(tasks.filter(task => task.id !== id));
        } catch (error) {
            setError('Error deleting task: ' + (error.detail || 'An error occurred.'));
            console.error('Error deleting task:', error);
        }
    };



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
        <div className="dashboard-background-tasks">
            <div className="container-fluid">
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
                    <main className="col-md-10 px-4 d-flex flex-column justify-content-center" style={{ minHeight: '80vh' }}>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <h1 className="text-center">Tasks</h1>

                        <form onSubmit={handleSubmit} className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
                            <div className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-2">
                                <textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                {editId ? 'Update Task' : 'Add Task'}
                            </button>
                        </form>

                        <div className="row">
                            {tasks.length === 0 ? (
                                <div className="col-12 text-center">
                                    <p><strong>No tasks added yet.</strong></p>
                                </div>
                            ) : (
                                tasks.map((task) => (
                                    <div key={task.id} className="col-md-4 mb-4">
                                        <div className="card task-card text-center">
                                            <div className="card-body">
                                                <h5 className="card-title">{task.title}</h5>
                                                <p className="card-text">{task.description}</p>
                                                <div className="button-container">
                                                    <button
                                                        onClick={() => handleEdit(task)}
                                                        className="btn btn-warning btn-sm me-2"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(task.id)} // Pass the task ID directly to the handler
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Confirmation Modal 
                        {confirmDelete && (
                            <div className="modal-backdrop">
                                <div className="modal">
                                    <p>Are you sure you want to delete this task?</p>
                                    <button onClick={handleDelete} className="btn btn-danger me-2">
                                        Confirm
                                    </button>
                                    <button onClick={() => setConfirmDelete(null)} className="btn btn-secondary">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        */}
                    </main>
                </div>
            </div>
        </div>
    );

};

export default Tasks;
