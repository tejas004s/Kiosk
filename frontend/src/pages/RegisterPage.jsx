import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('Please fill in all fields.');
            return;
        }

        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one number.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // Send the registration data to the backend
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            alert(response.data.message);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const validateEmail = (email) => {
        // Basic email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Password should be at least 6 characters, contain at least 1 number, 1 uppercase letter, and 1 lowercase letter
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button type="submit" disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
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

const Select = styled.select`
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

export default RegisterPage;
