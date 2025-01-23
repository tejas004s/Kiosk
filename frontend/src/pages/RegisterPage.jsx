import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Customer'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users/register', formData)
            .then(response => alert(response.data.message))
            .catch(error => alert('Error registering: ' + error.message));
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
                <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                </Select>
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    margin: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Select = styled.select`
    padding: 10px;
    width: 320px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
`;

export default RegisterPage;
