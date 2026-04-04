import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;
function Dashboard() {
  const { token, user } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const response = await axios.get(`${API_URL}/attempts/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttempts(response.data.attempts);
    } catch (error) {
      toast.error('Failed to load attempts');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (attempts.length === 0) return { total: 0, avgScore: 0, bestScore: 0 };
    const total = attempts.length;
    const avgScore = (attempts.reduce((sum, a) => sum + (a.score / a.total_marks) * 100, 0) / total).toFixed(1);
    const bestScore = Math.max(...attempts.map(a => (a.score / a.total_marks) * 100)).toFixed(1);
    return { total, avgScore, bestScore };
  };

  const stats = calculateStats();

  return (
    <div className="page-container">
      <div className="container section">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Track your progress and continue your learning journey</p>
        </motion.div>

        <div className="grid grid-3" style={{ marginBottom: '48px' }}>
          {[
            { label: 'Total Tests', value: stats.total, icon: 'fa-file-lines', color: 'var(--primary)' },
            { label: 'Average Score', value: `${stats.avgScore}%`, icon: 'fa-chart-line', color: 'var(--success)' },
            { label: 'Best Score', value: `${stats.bestScore}%`, icon: 'fa-trophy', color: 'var(--warning)' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card" style={{ padding: '32px', textAlign: 'center' }}
            >
              <div style={{ fontSize: '48px', color: stat.color, marginBottom: '16px' }}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2>Recent Test Attempts</h2>
            <Link to="/mock-tests" className="btn btn-primary btn-sm">
              <i className="fas fa-plus"></i> Take New Test
            </Link>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : attempts.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <i className="fas fa-inbox" style={{ fontSize: '48px', opacity: '0.5', marginBottom: '16px' }}></i>
              <h3>No tests attempted yet</h3>
              <p style={{ marginBottom: '24px' }}>Start your preparation journey by taking a mock test</p>
              <Link to="/mock-tests" className="btn btn-primary">
                <i className="fas fa-rocket"></i> Take Your First Test
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {attempts.slice(0, 10).map((attempt, index) => {
                const percentage = ((attempt.score / attempt.total_marks) * 100).toFixed(1);
                return (
                  <div key={index} style={{ padding: '20px', background: 'var(--glass)', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '8px' }}>{attempt.test_title || 'Mock Test'}</div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        <span><i className="fas fa-calendar"></i> {new Date(attempt.attempted_at).toLocaleDateString()}</span>
                        <span><i className="fas fa-clock"></i> {Math.floor(attempt.time_taken / 60)} min</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: '900', color: percentage >= 60 ? 'var(--success)' : 'var(--error)' }}>
                        {percentage}%
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{attempt.score}/{attempt.total_marks}</div>
                    </div>
                    <Link to={`/result/${attempt.id}`} className="btn btn-secondary btn-sm">
                      View Details
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
