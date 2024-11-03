// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'shrink' : ''}`}>
            <div className="logo">
                <img src={logo} alt="Logo" className="logo-icon" />
                <NavLink to="/" className="logo-text">System Zarządzania Pojazdami</NavLink>
            </div>
            <ul className="navbar-navItems">
                <li><NavLink to="/" exact activeClassName="active">STRONA GŁÓWNA</NavLink></li>
                <li><NavLink to="/login" activeClassName="active">ZALOGUJ SIĘ</NavLink></li>
            </ul>
        </header>
    );
};

export default Navbar;
