import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function TestResult() {
  const { attemptId } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResult();
  }, [attemptId]);

  const fetchResult = async () => {
    try {
      const response = await axios.get(`${apiUrl}/attempts/${attemptId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
    } catch (error) {
      toast.error('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h3>Result not found</h3>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  const { attempt, test } = data;
  const percentage = ((attempt.score / attempt.total_marks) * 100).toFixed(2);

  return (
    <div className="page-container">
      <div className="container section">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-card" style={{ padding: '48px', textAlign: 'center' }}
        >
          <div style={{ fontSize: '64px', color: percentage >= 60 ? 'var(--success)' : 'var(--error)', marginBottom: '24px' }}>
            <i className={`fas ${percentage >= 60 ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
            {percentage >= 60 ? 'Great Job!' : 'Keep Practicing!'}
          </h1>
          <div style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '32px' }}>
            {percentage}%
          </div>
          <div className="grid grid-3" style={{ gap: '24px', marginBottom: '32px' }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)' }}>{attempt.score}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Score</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)' }}>{attempt.total_marks}</div>
              <div style={{ color: 'var(--text-secondary)' }}>Total Marks</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text)' }}>
                {Math.floor(attempt.time_taken / 60)}:{(attempt.time_taken % 60).toString().padStart(2, '0')}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>Time Taken</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/mock-tests" className="btn btn-primary">
              <i className="fas fa-redo"></i> Take Another Test
            </Link>
            <Link to="/dashboard" className="btn btn-secondary">
              <i className="fas fa-chart-line"></i> View Dashboard
            </Link>
          </div>
        </motion.div>

        {test && test.questions && (
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-card" style={{ padding: '32px', marginTop: '32px' }}
          >
            <h2 style={{ marginBottom: '24px' }}>Answer Review</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {test.questions.map((question, index) => (
                <div key={index} style={{ padding: '20px', background: 'var(--glass)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ fontWeight: '600', marginBottom: '12px' }}>Question {index + 1}</div>
                  <div style={{ marginBottom: '16px' }}>{question.question_text}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        style={{
                          padding: '12px',
                          borderRadius: '8px',
                          background: optIndex === question.correct_answer ? 'rgba(16, 185, 129, 0.1)' :
                                     attempt.answers[index] === optIndex ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                          border: '1px solid',
                          borderColor: optIndex === question.correct_answer ? 'var(--success)' :
                                      attempt.answers[index] === optIndex ? 'var(--error)' : 'var(--glass-border)'
                        }}
                      >
                        {option}
                        {optIndex === question.correct_answer && <span style={{ color: 'var(--success)', marginLeft: '8px' }}>✓ Correct</span>}
                        {attempt.answers[index] === optIndex && optIndex !== question.correct_answer && <span style={{ color: 'var(--error)', marginLeft: '8px' }}>✗ Your Answer</span>}
                      </div>
                    ))}
                  </div>
                  {question.explanation && (
                    <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', fontSize: '14px' }}>
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default TestResult;
