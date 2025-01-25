import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info
    const [loading, setLoading] = useState(true); // Handle loading state

    // Simulate fetching user data on app load
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (storedUser) {
                    setUser(storedUser); // Set user if token exists
                }
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Handle user login
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData)); // Save to localStorage
        setUser(userData);
    };

    // Handle user logout
    const logout = () => {
        localStorage.removeItem('user'); // Clear localStorage
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
