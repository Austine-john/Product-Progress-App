import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHouse, 
  faBox, 
  faUsers, 
  faChartBar, 
  faGear,
  faUser 
} from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ currentPage }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: faHouse },
    { path: '/products', label: 'Product Requests', icon: faBox },
    { path: '/teams', label: 'Team Management', icon: faUsers },
    { path: '/reports', label: 'Reports', icon: faChartBar },
    { path: '/settings', label: 'Settings', icon: faGear }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-dark" to="/dashboard">
          Product Tracker
        </Link>
        
        <div className="collapse navbar-collapse justify-content-center">
          <ul className="navbar-nav">
            {navItems.map(item => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center ${
                    currentPage === item.path.substring(1) ? 'active text-primary fw-bold' : 'text-muted'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-2" />
                  <span className="d-none d-sm-inline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUser} className="fs-5" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;