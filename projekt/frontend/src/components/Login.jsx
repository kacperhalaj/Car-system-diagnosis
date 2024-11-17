import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // Przełącznik formularzy

  // Funkcja do przełączania formularzy
  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-container">
      <div className="background-container">
        <div className={`wrapper ${isRegister ? 'active' : ''}`}>

          {/* Formularz logowania */}
          <div className={`form-box login ${isRegister ? 'hidden' : 'show'}`}>
            <h2>Zaloguj się</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="email" placeholder=" " required />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" placeholder=" " required />
                <label>Hasło</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Zapamiętaj hasło
                </label>
                <a href="/" role="button" onClick={(e) => e.preventDefault()}>Zapomniałeś hasła?</a>
              </div>
              <button type="submit" className="btn">Zaloguj się</button>
              <div className="login-register">
                <p>Nie masz konta?<a href="/" role="button" onClick={(e) => { e.preventDefault(); toggleForm(); }}> Załóż</a></p>
              </div>
            </form>
          </div>

          {/* Formularz rejestracji */}
          <div className={`form-box register ${isRegister ? 'show' : 'hidden'}`}>
            <h2>Zarejestruj się</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon"><ion-icon name="person"></ion-icon></span>
                <input type="text" placeholder=" " required />
                <label>Imię</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="email" placeholder=" " required />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" placeholder=" " required />
                <label>Hasło</label>
              </div>
              <button type="submit" className="btn">Zarejestruj się</button>
              <div className="login-register">
                <p>Masz już konto?<a href="/" role="button" onClick={(e) => { e.preventDefault(); toggleForm(); }}> Zaloguj się</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
