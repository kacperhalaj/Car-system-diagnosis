// frontend/src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="app-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* Dodaj inne trasy w razie potrzeby */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
