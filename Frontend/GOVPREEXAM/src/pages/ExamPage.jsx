import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

// Since the whole App.jsx uses VITE_API_URL or local hardcoded string:
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ExamPage() {
  const { examType } = useParams();
  const [activeTab, setActiveTab] = useState('syllabus');
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realTests, setRealTests] = useState([]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/exams/${examType}`);
        setExam(response.data);
        
        // Fetch real tests for this exam
        try {
          const testRes = await axios.get(`${apiUrl}/tests?exam_type=${examType}`);
          setRealTests(testRes.data.tests || []);
        } catch(e) {
          console.error('Error fetching real tests');
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        toast.error('Failed to load exam data');
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
    // Default fallback to syllabus when changing exams
    setActiveTab('syllabus');
  }, [examType]);

  if (loading) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="page-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Exam Not Found</h2>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    );
  }

  const syllabusData = exam.syllabus || [];
  const currentAffairsData = exam.currentAffairs || [];
  const baseUrl = apiUrl.replace(/\/api\/?$/, '');

  return (
    <div className="page-container" style={{ paddingBottom: '100px' }}>
      
      {/* Hero Header */}
      <div style={{ background: 'var(--dark-secondary)', borderBottom: '1px solid var(--border)', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: '80px', height: '80px', borderRadius: '24px', 
              background: `linear-gradient(135deg, ${exam.color}33, ${exam.color}11)`,
              color: exam.color, fontSize: '36px', marginBottom: '24px',
              border: `1px solid ${exam.color}55`, boxShadow: `0 0 30px ${exam.color}33`
            }}>
              <i className={`fas ${exam.icon}`}></i>
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '16px', color: 'var(--text)' }}>
              {exam.name} <span style={{ color: exam.color }}>Preparation</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              {exam.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          
          {/* Sidebar */}
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card" style={{ padding: '24px', height: 'fit-content', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '24px', fontSize: '1.2rem', paddingBottom: '16px', borderBottom: '1px solid var(--glass-border)' }}>Dashboard</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'syllabus', icon: 'fa-book-open', label: 'Detailed Syllabus' },
                { id: 'mock', icon: 'fa-clipboard-check', label: 'Mock Tests' },
                { id: 'current', icon: 'fa-newspaper', label: 'Current Affairs' },
                { id: 'previous', icon: 'fa-history', label: 'Previous Papers' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                    padding: '14px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    fontSize: '15px', fontWeight: '600', transition: 'all 0.3s ease',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))' : 'transparent',
                    color: activeTab === tab.id ? '#000' : 'var(--text-secondary)',
                    boxShadow: activeTab === tab.id ? '0 4px 15px rgba(0, 240, 255, 0.3)' : 'none'
                  }}
                >
                  <i className={`fas ${tab.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <AnimatePresence mode="wait">
              
              {/* SYLLABUS TAB */}
              {activeTab === 'syllabus' && (
                <motion.div key="syllabus" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem' }}>Comprehensive Syllabus</h2>
                    <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                    {exam.syllabusPdf && (
                      <a href={`${baseUrl}${exam.syllabusPdf}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <i className="fas fa-file-pdf"></i> Download PDF
                      </a>
                    )}
                  </div>
                  
                  {syllabusData.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No syllabus data available for {exam.name} yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      {syllabusData.map((section, idx) => (
                        <div key={section._id || idx} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                          <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                            <h3 style={{ fontSize: '1.3rem', color: 'var(--primary)' }}>{section.title}</h3>
                          </div>
                          <div style={{ padding: '24px' }}>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                              {section.topics.map((topic, tidx) => (
                                <li key={tidx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                  <i className="fas fa-check-circle" style={{ color: 'var(--success)', marginTop: '4px' }}></i>
                                  <span style={{ color: 'var(--text-secondary)' }}>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* MOCK TESTS TAB */}
              {activeTab === 'mock' && (
                <motion.div key="mock" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', justifyContent: 'space-between' }}>
                    <h2 style={{ fontSize: '2rem' }}>Latest Mock Tests</h2>
                    <Link to="/mock-tests" className="btn btn-primary btn-sm">View All</Link>
                  </div>

                  {realTests.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No mock tests available for {exam.name} yet.
                    </div>
                  ) : (
                    <div className="grid grid-2" style={{ gap: '24px' }}>
                      {realTests.map((test, idx) => (
                        <div key={test.id || test._id || idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="badge badge-primary">{test.level || 'Full Length'}</span>
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{new Date(test.createdAt).toLocaleDateString() || 'Recent'}</span>
                          </div>
                          <h3 style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>{test.title}</h3>
                          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '16px 0' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                              <i className="fas fa-clock" style={{ color: 'var(--primary)' }}></i> {test.duration} min
                            </div>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                              <i className="fas fa-list-ol" style={{ color: 'var(--primary)' }}></i> {test.questions ? test.questions.length : 0} Qs
                            </div>
                          </div>
                          <Link to={`/test/${test.id || test._id}`} className="btn btn-outline" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                            View Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* CURRENT AFFAIRS TAB */}
              {activeTab === 'current' && (
                <motion.div key="current" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem' }}>Current Affairs Updates</h2>
                    <div style={{ flex: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                  </div>

                  {currentAffairsData.length === 0 ? (
                    <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No current affairs available for {exam.name} yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {currentAffairsData.map((item, idx) => (
                        <div key={item._id || idx} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(157, 78, 221, 0.1)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                            <i className="fas fa-file-pdf"></i>
                          </div>
                          <div style={{ flex: 1 }}>
                            <span style={{ fontSize: '12px', color: 'var(--secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</span>
                            <h3 style={{ fontSize: '1.2rem', marginTop: '4px', marginBottom: '8px' }}>{item.title}</h3>
                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}><i className="fas fa-calendar-alt"></i> Released: {item.date}</span>
                          </div>
                          <button className="btn btn-secondary">
                            <i className="fas fa-download"></i> Download
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <Link to="/current-affairs" className="btn btn-outline">View All Current Affairs</Link>
                  </div>
                </motion.div>
              )}

              {/* PREVIOUS PAPERS TAB */}
              {activeTab === 'previous' && (
                <motion.div key="previous" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="glass-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                    <div style={{ fontSize: '64px', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '24px' }}>
                      <i className="fas fa-folder-open"></i>
                    </div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Previous Year Papers</h3>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 24px' }}>
                      We are currently compiling the latest previous question papers for {exam.name}. Check back soon!
                    </p>
                    <button className="btn btn-primary">Notify Me When Available</button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;
