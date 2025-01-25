import React, { useState, useContext } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import styled from 'styled-components';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        setError('');
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
            console.error('Login error:', error);

            // Display a user-friendly error message
            if (error.response) {
                setError(error.response.data.message || 'Invalid login credentials.');
            } else {
                setError('Could not connect to the server. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    autoComplete="email"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    autoComplete="current-password"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    h1 {
        margin-bottom: 20px;
        font-size: 24px;
        color: #333;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin: 10px 0;
`;

export default LoginPage;
