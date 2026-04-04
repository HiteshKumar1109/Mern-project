import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './TestDetail.css';

const apiUrl = import.meta.env.VITE_API_URL;

function TestDetail() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTest();
  }, [testId]);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`${API_URL}/tests/${testId}`);
      setTest(response.data);
    } catch (error) {
      toast.error('Failed to load test');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (!isAuthenticated) {
      toast.error('Please login to start the test');
      navigate('/login');
      return;
    }
    navigate(`/take-test/${testId}`);
  };

  if (loading) {
    return (
      <div className="test-detail-page">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="test-detail-page">
        <div className="container">
          <div className="empty-state">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Test Not Found</h3>
            <Link to="/mock-tests" className="btn btn-primary">
              Browse All Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-detail-page">
      <section className="test-hero">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="test-hero-content"
          >
            <div className="test-badges">
              <span className="badge badge-primary">{test.exam_type}</span>
              <span className="badge badge-warning">{test.level}</span>
            </div>
            <h1 className="test-title">{test.title}</h1>
            <div className="test-stats">
              <div className="stat">
                <i className="fas fa-question-circle"></i>
                <span>{test.questions?.length || 0} Questions</span>
              </div>
              <div className="stat">
                <i className="fas fa-clock"></i>
                <span>{test.duration} Minutes</span>
              </div>
              <div className="stat">
                <i className="fas fa-star"></i>
                <span>{test.total_marks} Marks</span>
              </div>
              <div className="stat">
                <i className="fas fa-language"></i>
                <span>{test.language}</span>
              </div>
            </div>
            <button 
              onClick={handleStartTest}
              className="btn btn-primary btn-lg"
              data-testid="start-test-button"
            >
              <i className="fas fa-play"></i>
              Start Test Now
            </button>
          </motion.div>
        </div>
      </section>

      <section className="test-info-section section-sm">
        <div className="container">
          <div className="info-grid grid grid-2">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="info-card glass-card"
            >
              <h3><i className="fas fa-info-circle"></i> Test Instructions</h3>
              <ul>
                <li>The test contains {test.questions?.length || 0} questions</li>
                <li>Total duration: {test.duration} minutes</li>
                <li>Each question carries equal marks</li>
                <li>There is no negative marking</li>
                <li>You can navigate between questions</li>
                <li>Click submit when you finish</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="info-card glass-card"
            >
              <h3><i className="fas fa-chart-bar"></i> Test Details</h3>
              <div className="detail-items">
                <div className="detail-item">
                  <span className="detail-label">Total Marks:</span>
                  <span className="detail-value">{test.total_marks}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Questions:</span>
                  <span className="detail-value">{test.questions?.length || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{test.duration} min</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">{test.language}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value">{test.level}</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="cta-card glass-card"
            style={{ marginTop: '32px', textAlign: 'center', padding: '48px' }}
          >
            <h2>Ready to Begin?</h2>
            <p>Make sure you have a stable internet connection and sufficient time</p>
            <button 
              onClick={handleStartTest}
              className="btn btn-primary btn-lg"
            >
              Start Test <i className="fas fa-arrow-right"></i>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default TestDetail;
