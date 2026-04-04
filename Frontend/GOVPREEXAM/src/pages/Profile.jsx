import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="container section">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '48px' }}>Profile</h1>
        </motion.div>
        <div className="glass-card" style={{ padding: '48px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', color: 'white', margin: '0 auto 16px' }}>
              <i className="fas fa-user"></i>
            </div>
            <h2>{user?.name}</h2>
            <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'var(--glass)', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Full Name</div>
              <div style={{ fontWeight: '600' }}>{user?.name}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--glass)', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Email</div>
              <div style={{ fontWeight: '600' }}>{user?.email}</div>
            </div>
            <div style={{ padding: '16px', background: 'var(--glass)', borderRadius: '8px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Account Type</div>
              <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
