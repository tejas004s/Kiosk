import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(UserContext);
    const location = useLocation();

    return (
        <Nav>
            <Logo>Foodie</Logo>
            <NavLinks>
                <NavLink to="/" $active={location.pathname === '/'}>Home</NavLink>
                <NavLink to="/menu" $active={location.pathname === '/menu'}>Menu</NavLink>

                {user ? (
                    <>
                        <NavLink to="/orders" $active={location.pathname === '/orders'}>Orders</NavLink>
                        {user.role === 'Admin' && (
                            <NavLink to="/admin" $active={location.pathname === '/admin'}>Admin Dashboard</NavLink>
                        )}
                        <LogoutButton onClick={logout}>Logout</LogoutButton>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" $active={location.pathname === '/login'}>Login</NavLink>
                        <NavLink to="/register" $active={location.pathname === '/register'}>Register</NavLink>
                        
                    </>
                )}
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
    color: ${({ $active }) => ($active ? '#FFD700' : 'white')};
    text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};

    &:hover {
        text-decoration: underline;
    }
`;

const LogoutButton = styled.button`
    font-size: 18px;
    background: none;
    border: none;
    color: white;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export default Navbar;
