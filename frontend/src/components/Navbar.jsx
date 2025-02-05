import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { user, logout } = useContext(UserContext);
    const location = useLocation();

    return (
        <Nav>
            <LogoContainer>
                <LogoImage src="https://th.bing.com/th/id/OIP.nUkX0rkSOxksAMVx84BL4wHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Quick Byte Logo" />
                <LogoText>Quick Byte</LogoText>
            </LogoContainer>
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
    padding: 20px 40px;
    background-color: #007BFF;
    color: white;
    width: 100%;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const LogoImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const LogoText = styled.h1`
    font-size: 26px;
    font-family: 'Arial', sans-serif;
    font-weight: bold;
`;

const NavLinks = styled.div`
    display: flex;
    gap: 25px;
`;

const NavLink = styled(Link)`
    font-size: 18px;
    color: ${({ $active }) => ($active ? '#FFD700' : 'white')};
    text-decoration: ${({ $active }) => ($active ? 'underline' : 'none')};
    font-family: 'Arial', sans-serif;

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
    font-family: 'Arial', sans-serif;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

export default Navbar;
