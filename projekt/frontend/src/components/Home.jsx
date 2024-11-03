// frontend/src/components/Home.jsx
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="content-card">
                <h1>Witamy w Systemie Zarządzania Pojazdami</h1>
                <p>
                    System przeznaczony jest dla administratorów stacji diagnostycznych. 
                    Ułatwia zarządzanie bazą danych pojazdów oraz procesami diagnostycznymi. 
                    Zaloguj się, aby uzyskać dostęp do pełnych funkcji.
                </p>
                <Link to="/login" className="login-button">Zaloguj się</Link>
            </div>
        </div>
    );
};

export default Home;
