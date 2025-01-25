import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <Container>
            <h1>Welcome to Online Food Ordering System</h1>
            <p>Enjoy delicious food delivered right to your doorstep.</p>
            <ButtonContainer>
                <Link to="/menu">
                    <Button>View Menu</Button>
                </Link>
                {user && (
                    <Link to="/orders">
                        <Button>Order History</Button>
                    </Link>
                )}
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    padding: 50px;
    max-width: 800px;
    margin: 0 auto;

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
        padding: 20px;

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
