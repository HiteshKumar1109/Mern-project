import { motion } from 'framer-motion';

function CurrentAffairs() {
  return (
    <div className="page-container">
      <div className="container section">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Current <span className="gradient-text">Affairs</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>Stay updated with latest news and events for your exam preparation</p>
        </motion.div>
        <div className="glass-card" style={{ padding: '80px 40px', textAlign: 'center' }}>
          <i className="fas fa-newspaper" style={{ fontSize: '64px', color: 'var(--primary)', marginBottom: '24px' }}></i>
          <h3 style={{ marginBottom: '16px' }}>Current Affairs Coming Soon</h3>
          <p style={{ color: 'var(--text-secondary)' }}>We're preparing daily current affairs updates for you</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentAffairs;
