import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the API call to login
            const response = await axios.post('http://localhost:5000/api/users/login', formData);

            // Extract token and user from the response
            const { token, user } = response.data;

            // Save the token in localStorage
            localStorage.setItem('token', token);

            // Update the user context
            setUser(user);

            // Navigate to the home page
            navigate('/');
        } catch (error) {
            // Log the error and display an appropriate message
            console.error('Login error:', error);

            // Display a user-friendly message
            if (error.response) {
                alert(error.response.data.message || 'An error occurred. Please try again.');
            } else {
                alert('Could not connect to the server. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
