import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <>
            {/* Apply global styles */}
            <GlobalStyles />

            {/* Router wraps the entire app */}
            <Router>
                {/* Add Navbar for consistent navigation */}
                <Navbar />

                {/* Define app routes */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/menu" element={<MenuPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Routes */}
                    <Route 
                        path="/orders" 
                        element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} 
                    />
                    <Route 
                        path="/admin" 
                        element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} 
                    />
                </Routes>
            </Router>
        </>
    );
}

export default App;
