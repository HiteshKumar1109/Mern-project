import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <div className="brand-logo">G</div>
            <span className="brand-text">
              GOV<span className="gradient-text">PRE</span>EXAM
            </span>
          </Link>

          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className={`navbar-menu ${mobileMenu ? 'active' : ''}`}>
            <Link to="/" className="nav-link">
              <i className="fas fa-home"></i>
              Home
            </Link>
            <div className="nav-dropdown">
              <button className="nav-link">
                <i className="fas fa-graduation-cap"></i>
                Exams
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="dropdown-menu">
                <Link to="/exam/upsc" className="dropdown-item">
                  <i className="fas fa-crown"></i> UPSC
                </Link>
                <Link to="/exam/ssc" className="dropdown-item">
                  <i className="fas fa-users"></i> SSC
                </Link>
                <Link to="/exam/banking" className="dropdown-item">
                  <i className="fas fa-university"></i> Banking
                </Link>
                <Link to="/exam/railway" className="dropdown-item">
                  <i className="fas fa-train"></i> Railway
                </Link>
                <Link to="/exam/defense" className="dropdown-item">
                  <i className="fas fa-shield-alt"></i> Defense
                </Link>
              </div>
            </div>
            <Link to="/mock-tests" className="nav-link">
              <i className="fas fa-file-lines"></i>
              Mock Tests
            </Link>
            <Link to="/current-affairs" className="nav-link">
              <i className="fas fa-newspaper"></i>
              Current Affairs
            </Link>

            <div className="navbar-actions">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="btn btn-secondary">
                    <i className="fas fa-chart-line"></i>
                    Dashboard
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="btn btn-secondary">
                      <i className="fas fa-shield-halved"></i>
                      Admin
                    </Link>
                  )}
                  <div className="user-menu">
                    <button className="user-avatar">
                      <i className="fas fa-user"></i>
                    </button>
                    <div className="user-dropdown">
                      <div className="user-info">
                        <div className="user-name">{user?.name}</div>
                        <div className="user-email">{user?.email}</div>
                      </div>
                      <Link to="/profile" className="dropdown-item">
                        <i className="fas fa-user-circle"></i> Profile
                      </Link>
                      <button onClick={handleLogout} className="dropdown-item logout">
                        <i className="fas fa-sign-out-alt"></i> Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    <i className="fas fa-sign-in-alt"></i>
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    <i className="fas fa-user-plus"></i>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
