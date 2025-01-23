import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send the login data to the backend
        axios.post('http://localhost:5000/api/users/login', formData)
            .then(response => {
                const { user } = response.data;
                setUser(user); // Save user info in context
                alert(response.data.message);
                navigate('/'); // Redirect to home on success
            })
            .catch(error => alert('Login failed: ' + error.response.data.message));
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
