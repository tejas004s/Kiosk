import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
            <Link to="/" style={{ margin: '10px', color: '#fff' }}>Home</Link>
            <Link to="/menu" style={{ margin: '10px', color: '#fff' }}>Menu</Link>
            <Link to="/cart" style={{ margin: '10px', color: '#fff' }}>Cart</Link>
        </nav>
    );
};

export default Navbar;
