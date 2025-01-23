import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
    return (
        <Container>
            <h1>Welcome to Online Food Ordering System</h1>
            <p>Delicious food delivered at your doorstep.</p>
            <ButtonContainer>
                <Link to="/menu"><Button>View Menu</Button></Link>
                <Link to="/orders"><Button>Order History</Button></Link>
            </ButtonContainer>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    padding: 50px;
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export default HomePage;
