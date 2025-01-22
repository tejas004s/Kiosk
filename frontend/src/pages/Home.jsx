import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Welcome to the Online Food Ordering System</h1>
            <p>Browse our menu, add your favorite items to the cart, and enjoy delicious food delivered to your doorstep.</p>
            <div style={{ marginTop: '20px' }}>
                <Link to="/menu">
                    <button style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}>
                        Explore Menu
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
