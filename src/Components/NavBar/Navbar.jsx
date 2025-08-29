import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">📦</span>
            ProductTracker
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-item ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/products" 
            className={`navbar-item ${isActive('/products') ? 'active' : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/teams" 
            className={`navbar-item ${isActive('/teams') ? 'active' : ''}`}
          >
            Teams
          </Link>
          <Link 
            to="/reports" 
            className={`navbar-item ${isActive('/reports') ? 'active' : ''}`}
          >
            Reports
          </Link>
        </div>

        {/* User Profile */}
        <div className="navbar-user">
          <div className="user-avatar">
            <span>👤</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;