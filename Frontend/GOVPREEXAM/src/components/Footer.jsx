import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <div className="brand-logo">G</div>
              <span className="brand-text">
                GOV<span className="gradient-text">PRE</span>EXAM
              </span>
            </div>
            <p className="footer-description">
              Your trusted partner for government exam preparation. Master UPSC, SSC, Banking, and more with our comprehensive mock tests and study material.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Exams</h4>
            <ul className="footer-links">
              <li><Link to="/exam/upsc">UPSC</Link></li>
              <li><Link to="/exam/ssc">SSC</Link></li>
              <li><Link to="/exam/banking">Banking</Link></li>
              <li><Link to="/exam/railway">Railway</Link></li>
              <li><Link to="/exam/defense">Defense</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><Link to="/mock-tests">Mock Tests</Link></li>
              <li><Link to="/current-affairs">Current Affairs</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-phone"></i>
                +91 98765 43210
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                support@govpreexam.com
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                Amroha, Uttar Pradesh
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 GOVPREEXAM. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
