import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            backgroundColor: '#333',
            color: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: '0',
            width: '100%',
        }}>
            <Link 
                to="/" 
                style={{
                    margin: '0 15px',
                    fontSize: '1.2rem',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                Home
            </Link>
            <Link 
                to="/menu" 
                style={{
                    margin: '0 15px',
                    fontSize: '1.2rem',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                Menu
            </Link>
            <Link 
                to="/cart" 
                style={{
                    margin: '0 15px',
                    fontSize: '1.2rem',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#555'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
                Cart
            </Link>
        </nav>
    );
};

export default Navbar;

