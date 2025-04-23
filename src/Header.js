import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./assets/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logoContainer">
        <Link to="/">
          <img src={logo} alt="AIM-Binance Logo" className="logo" />
        </Link>
        <div className="brandName">AIM-Binance</div>
      </div>
      <nav className="nav">
        <ul className="navList">
          <li className="navItem">
            <Link to="/login" className="navLink">Login</Link>
          </li>
          <li className="navItem">
            <Link to="/signup" className="navLink">Sign Up</Link>
          </li>
          <li className="navItem">
            <Link to="/admin-login" className="navLink">Admin Login</Link>
          </li>
          <li className="navItem">
            <Link to="/support" className="navLink">Support</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;