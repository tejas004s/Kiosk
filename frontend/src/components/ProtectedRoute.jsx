import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(UserContext);

    if (!user) return <Navigate to="/login" />; // Redirect if not logged in
    if (role && user.role !== role) return <Navigate to="/" />; // Restrict access by role

    return children;
};

export default ProtectedRoute;
