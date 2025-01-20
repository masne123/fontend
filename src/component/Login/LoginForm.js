// HII NI SEHEMU YA KUINGILIA.
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import '../Login/LoginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username,
                password,
            });
            console.log(response.data); // Handle successful login
            alert('Login successful!');
        } catch (error) {
            setErrorMessage('Invalid credentials. Please try again.');
            setLoading(false);
        }
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

            <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Add Register link */}
        </div>
    );
};

export default LoginForm;
