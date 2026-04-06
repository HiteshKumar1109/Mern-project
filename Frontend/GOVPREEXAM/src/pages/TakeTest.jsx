import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './TakeTest.css';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TakeTest() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTest();
  }, [testId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && test) {
      handleSubmit();
    }
  }, [timeLeft]);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`${apiUrl}/tests/${testId}`);
      setTest(response.data);
      setTimeLeft(response.data.duration * 60); // Convert to seconds
    } catch (error) {
      toast.error('Failed to load test');
      navigate('/mock-tests');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    setAnswers({ ...answers, [questionIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    if (submitting) return;
    
    const confirmed = window.confirm('Are you sure you want to submit the test?');
    if (!confirmed && timeLeft > 0) return;

    setSubmitting(true);
    try {
      const timeTaken = (test.duration * 60) - timeLeft;
      const response = await axios.post(
        `${apiUrl}/attempts`,
        {
          test_id: testId,
          answers: answers,
          time_taken: timeTaken
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success('Test submitted successfully!');
      navigate(`/result/${response.data.attempt_id}`);
    } catch (error) {
      toast.error('Failed to submit test');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="take-test-page">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!test || !test.questions || test.questions.length === 0) {
    return (
      <div className="take-test-page">
        <div className="container">
          <div className="empty-state">
            <h3>Test not available</h3>
            <button onClick={() => navigate('/mock-tests')} className="btn btn-primary">
              Back to Tests
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;

  return (
    <div className="take-test-page">
      {/* Header */}
      <div className="test-header">
        <div className="container">
          <div className="test-header-content">
            <div className="test-info">
              <h2>{test.title}</h2>
              <div className="test-progress">
                <span>Question {currentQuestion + 1} of {test.questions.length}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            </div>
            <div className="test-timer">
              <i className="fas fa-clock"></i>
              <span className={timeLeft < 300 ? 'time-warning' : ''}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="test-content">
        <div className="container">
          <div className="test-layout">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="question-panel glass-card"
            >
              <div className="question-header">
                <span className="question-number">Question {currentQuestion + 1}</span>
                <span className="question-marks">{Math.ceil(test.total_marks / test.questions.length)} Marks</span>
              </div>
              <h3 className="question-text">{currentQ.question_text}</h3>
              <div className="options-list">
                {currentQ.options.map((option, index) => (
                  <label
                    key={index}
                    className={`option-item ${
                      answers[currentQuestion] === index ? 'selected' : ''
                    }`}
                    data-testid={`option-${index}`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      checked={answers[currentQuestion] === index}
                      onChange={() => handleAnswerSelect(currentQuestion, index)}
                    />
                    <span className="option-label">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <div className="navigation-panel glass-card">
              <h4>Question Navigation</h4>
              <div className="question-grid">
                {test.questions.map((_, index) => (
                  <button
                    key={index}
                    className={`question-nav-btn ${
                      index === currentQuestion ? 'active' : ''
                    } ${answers[index] !== undefined ? 'answered' : ''}`}
                    onClick={() => setCurrentQuestion(index)}
                    data-testid={`nav-question-${index}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="legend">
                <div className="legend-item">
                  <span className="legend-box answered"></span>
                  <span>Answered</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box current"></span>
                  <span>Current</span>
                </div>
                <div className="legend-item">
                  <span className="legend-box"></span>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="test-actions">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              <i className="fas fa-arrow-left"></i>
              Previous
            </button>
            {currentQuestion < test.questions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next
                <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={submitting}
                data-testid="submit-test-button"
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
                <i className="fas fa-check"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TakeTest;
