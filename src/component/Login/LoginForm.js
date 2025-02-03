import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // useNavigate replaces useHistory

    // Utility function to get cookie by name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            // Send request to the correct API endpoint with username and password
            const response = await axios.post('https://backend-up33.onrender.com/api/login/', {
                username,
                password,
            });

            // Destructure the response to get access and refresh tokens
            const { access, refresh } = response.data;

            // Store tokens in cookies securely (HttpOnly & Secure flags)
            document.cookie = `access_token=${access}; path=/; HttpOnly; Secure; SameSite=Strict`;
            document.cookie = `refresh_token=${refresh}; path=/; HttpOnly; Secure; SameSite=Strict`;

            alert('Login successful!');
            navigate('/dashboard');  // Redirect user after successful login (use navigate instead of history.push)
        } catch (error) {
            // Handle error when login fails
            setErrorMessage('Invalid credentials. Please try again.');
            setLoading(false);
        }
    };

    // Handle logout functionality
    const handleLogout = () => {
        // Remove cookies
        document.cookie = 'access_token=; Max-Age=-99999999; path=/';
        document.cookie = 'refresh_token=; Max-Age=-99999999; path=/';
        alert('Logged out successfully!');
        navigate('/login');  // Redirect to login page
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <p>Don't have an account? <Link to="/register">Register here</Link></p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default LoginForm;


