import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

const HomePage = () => {
    const { user } = useContext(UserContext);
    const { cart } = useContext(CartContext);

    return (
        <Container>
            <Header>
                <h1>
                    {user ? `Welcome, ${user.name}!` : 'Welcome to Online Food Ordering System'}
                </h1>
                <p>Enjoy delicious food delivered right to your doorstep.</p>
            </Header>
            <ButtonContainer>
                <StyledLink to="/menu" aria-label="View Menu">
                    <Button>View Menu</Button>
                </StyledLink>
                {user && (
                    <StyledLink to="/orders" aria-label="View Order History">
                        <Button>Order History</Button>
                    </StyledLink>
                )}
            </ButtonContainer>
            <CartSummary>
                <p>Cart Items: {cart.length}</p>
                <StyledLink to="/cart">
                    <Button>Go to Cart</Button>
                </StyledLink>
            </CartSummary>
        </Container>
    );
};

const Container = styled.main`
    text-align: center;
    padding: 50px;
    max-width: 800px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 20px;
    }
`;

const Header = styled.header`
    h1 {
        font-size: 36px;
        color: #333;
    }

    p {
        font-size: 18px;
        color: #555;
        margin-top: 10px;
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 28px;
        }

        p {
            font-size: 16px;
        }
    }
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const CartSummary = styled.div`
    margin-top: 20px;
    p {
        font-size: 18px;
        color: #333;
    }
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        font-size: 16px;
        padding: 8px 16px;
    }
`;

export default HomePage;
