import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({ children, role }) => {
    const { user } = useContext(UserContext);

    // If the user is not logged in, redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If a role is specified, check if the user's role matches
    if (role && user.role !== role) {
        return <Navigate to="/" />;
    }

    // If everything is valid, render the children components
    return children;
};

export default ProtectedRoute;
