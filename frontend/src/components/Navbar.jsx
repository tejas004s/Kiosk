import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <Nav>
            <Logo>Foodie</Logo>
            <NavLinks>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/Register">Register</NavLink>
            </NavLinks>
        </Nav>
    );
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #007BFF;
    color: white;
    width: 100vw;
    
`;

const Logo = styled.h1`
    font-size: 24px;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 20px;
`;

const NavLink = styled(Link)`
    font-size: 18px;
    color: white;
    &:hover {
        text-decoration: underline;
    }
`;

export default Navbar;
