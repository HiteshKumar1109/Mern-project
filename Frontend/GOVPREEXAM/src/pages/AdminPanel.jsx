import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const apiUrl = import.meta.env.VITE_API_URL;

function AdminPanel() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchExams();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load stats');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.users);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get(`${apiUrl}/exams`);
      setExams(response.data);
    } catch (error) {
      toast.error('Failed to load exams');
    }
  };

  const handleFileUpload = async (examId, file) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('pdf', file);
    
    try {
      const toastId = toast.loading('Uploading PDF...');
      const response = await axios.post(`${apiUrl}/exams/${examId}/syllabus-pdf`, formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success(response.data.message, { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to upload PDF');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container section">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}><i className="fas fa-shield-halved"></i> Admin Panel</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Manage users, tests, and platform content</p>
        </motion.div>

        {stats && (
          <div className="grid grid-4" style={{ marginBottom: '48px' }}>
            {[
              { label: 'Total Users', value: stats.total_users, icon: 'fa-users', color: 'var(--primary)' },
              { label: 'Total Tests', value: stats.total_tests, icon: 'fa-file-lines', color: 'var(--success)' },
              { label: 'Total Attempts', value: stats.total_attempts, icon: 'fa-chart-line', color: 'var(--warning)' },
              { label: 'Current Affairs', value: stats.total_affairs, icon: 'fa-newspaper', color: 'var(--secondary)' }
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
        )}

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-card" style={{ padding: '32px' }}>
          <div style={{ borderBottom: '1px solid var(--glass-border)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              <button
                onClick={() => setActiveTab('stats')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'stats' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'stats' ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'users' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'users' ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                style={{
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeTab === 'exams' ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === 'exams' ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Exams
              </button>
            </div>
          </div>

          {activeTab === 'stats' && (
            <div>
              <h3 style={{ marginBottom: '24px' }}>Platform Overview</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Monitor and manage all platform activities from this dashboard.</p>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 style={{ marginBottom: '24px' }}>User Management</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14px' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14px' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14px' }}>Role</th>
                      <th style={{ padding: '12px', textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14px' }}>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <td style={{ padding: '12px' }}>{user.name}</td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>{user.email}</td>
                        <td style={{ padding: '12px' }}>
                          <span className={`badge badge-${user.role === 'admin' ? 'error' : 'primary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'exams' && (
            <div>
              <h3 style={{ marginBottom: '24px' }}>Exam Management</h3>
              <div className="grid grid-2" style={{ gap: '24px' }}>
                {exams.map((exam) => (
                  <div key={exam._id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${exam.color}33, ${exam.color}11)`, color: exam.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        <i className={`fas ${exam.icon}`}></i>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{exam.name}</h4>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{exam.examType}</span>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Upload Syllabus PDF</label>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={(e) => handleFileUpload(exam._id, e.target.files[0])}
                        style={{
                          width: '100%',
                          padding: '8px',
                          background: 'rgba(0,0,0,0.2)',
                          border: '1px dashed var(--glass-border)',
                          borderRadius: '8px',
                          color: 'var(--text)',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default AdminPanel;
