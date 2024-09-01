import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login', { replace: true });
    };

    const navigateToRegister = () => {
        navigate('/register', { replace: true });
    };

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center backgroundStyle">
            <h1>Welcome to the Recipe Chat Bot App</h1>
            <div className="mt-5">
                <button className="btn buttonColor me-3" onClick={navigateToLogin}>Log In</button>
                <button className="btn buttonColor" onClick={navigateToRegister}>Sign Up</button>
            </div>
        </div>
    );
}

export default HomePage;
