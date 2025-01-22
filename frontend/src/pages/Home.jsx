import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            width: '100vw',
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            padding: '0 20px',
        }}>
            <h1 style={{ fontSize: '3rem', color: '#343a40' }}>Welcome to the FastFood Kiosk</h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', marginTop: '20px' }}>
                Browse our menu, place an order, and enjoy your meal at lightning speed.
            </p>
            <div style={{ marginTop: '30px' }}>
                <Link to="/menu">
                    <button style={{
                        padding: '20px 40px',
                        fontSize: '18px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        width: '300px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                    }}>
                        Browse Menu
                    </button>
                </Link>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/order-history">
                    <button style={{
                        padding: '15px 35px',
                        fontSize: '16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        width: '300px',
                        marginTop: '15px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
                    }}>
                        View Order History
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
