import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import './MockTests.css';

const apiUrl = import.meta.env.VITE_API_URL;
function MockTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    exam_type: '',
    level: ''
  });

  useEffect(() => {
    fetchTests();
  }, [filters]);

  const fetchTests = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.exam_type) params.append('exam_type', filters.exam_type);
      if (filters.level) params.append('level', filters.level);
      
      const response = await axios.get(`${API_URL}/tests?${params}`);
      setTests(response.data.tests);
    } catch (error) {
      toast.error('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'easy': return '#10b981';
      case 'moderate': return '#f59e0b';
      case 'hard': return '#ef4444';
      default: return '#6366f1';
    }
  };

  const getExamColor = (exam) => {
    switch (exam.toLowerCase()) {
      case 'upsc': return '#f59e0b';
      case 'ssc': return '#3b82f6';
      case 'banking': return '#10b981';
      case 'railway': return '#8b5cf6';
      case 'defense': return '#ef4444';
      default: return '#6366f1';
    }
  };

  return (
    <div className="mock-tests-page">
      {/* Hero Section */}
      <section className="mock-hero">
        <div className="container">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mock-hero-content"
          >
            <h1>Boost Your Score with <span className="gradient-text">Smart Mocks</span></h1>
            <p>Full-length tests, section-wise practice, real exam interface, detailed solutions and performance analytics</p>
            <div className="hero-stats">
              <div className="stat-item">
                <h3>10K+</h3>
                <p>Mock Tests</p>
              </div>
              <div className="stat-item">
                <h3>5L+</h3>
                <p>Students Attempted</p>
              </div>
              <div className="stat-item">
                <h3>All</h3>
                <p>Major Exams</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-bar">
            <div className="filter-group">
              <label>Exam Type</label>
              <select
                className="filter-select"
                value={filters.exam_type}
                onChange={(e) => setFilters({ ...filters, exam_type: e.target.value })}
              >
                <option value="">All Exams</option>
                <option value="UPSC">UPSC</option>
                <option value="SSC">SSC</option>
                <option value="Banking">Banking</option>
                <option value="Railway">Railway</option>
                <option value="Defense">Defense</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Difficulty</label>
              <select
                className="filter-select"
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
              >
                <option value="">All Levels</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            {(filters.exam_type || filters.level) && (
              <button
                className="btn btn-secondary"
                onClick={() => setFilters({ exam_type: '', level: '' })}
              >
                <i className="fas fa-times"></i>
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="tests-section section-sm">
        <div className="container">
          {loading ? (
            <div className="spinner"></div>
          ) : tests.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <h3>No Tests Found</h3>
              <p>Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <div className="tests-grid grid grid-3">
              {tests.map((test, index) => (
                <motion.div
                  key={test.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="test-card glass-card"
                  data-testid={`mock-test-card-${index}`}
                >
                  <div className="test-header">
                    <div
                      className="test-badge"
                      style={{ background: getExamColor(test.exam_type) }}
                    >
                      {test.exam_type}
                    </div>
                    <div
                      className="level-badge"
                      style={{ background: getLevelColor(test.level) }}
                    >
                      {test.level}
                    </div>
                  </div>
                  <h3 className="test-title">{test.title}</h3>
                  <div className="test-meta">
                    <div className="meta-item">
                      <i className="fas fa-question-circle"></i>
                      <span>{test.questions?.length || 0} Questions</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>{test.duration} Minutes</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-star"></i>
                      <span>{test.total_marks} Marks</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-language"></i>
                      <span>{test.language}</span>
                    </div>
                  </div>
                  <div className="test-actions">
                    <Link
                      to={`/test/${test.id}`}
                      className="btn btn-primary btn-sm"
                      data-testid={`view-test-${index}`}
                    >
                      <i className="fas fa-play"></i>
                      Start Test
                    </Link>
                    <Link
                      to={`/test/${test.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MockTests;
