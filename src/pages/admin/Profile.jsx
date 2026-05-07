import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';
import { RiShieldUserFill, RiLogoutBoxLine, RiLockPasswordLine, RiCheckboxCircleFill } from 'react-icons/ri';

const PRIVILEGES = [
  'View all customers',
  'Manage customer accounts',
  'Add/remove Vasudha Coins',
  'View all orders & reports',
  'Full system access',
];

export default function AdminProfile() {
  const { user, logout, changePassword } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError('New passwords do not match');
      return;
    }
    setPasswordLoading(true); setPasswordError('');
    const result = await changePassword(passwordForm.current, passwordForm.new);
    setPasswordLoading(false);
    if (result.success) {
      setPasswordSuccess(result.msg);
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordForm({ current: '', new: '', confirm: '' });
        setPasswordSuccess('');
      }, 2000);
    } else {
      setPasswordError(result.msg);
    }
  };

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Admin Profile</h1>
        <p>Manage your administrator account</p>
      </div>

      <div className="two-col-grid">
        <div className="card">
          <div className="admin-avatar-block">
            <div className="admin-avatar"><RiShieldUserFill size={32} /></div>
            <div className="admin-avatar-name">Administrator</div>
            <div className="td-muted" style={{ fontSize: 13 }}>{user.email}</div>
            <span className="badge badge-yellow" style={{ marginTop: 10 }}>Super Admin</span>
          </div>
          {saved && <div className="success-msg">✓ Profile updated successfully</div>}
          <form onSubmit={handleSave}>
            <div className="field">
              <label>Display Name</label>
              <input type="text" defaultValue="Administrator" />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" defaultValue={user.email} disabled style={{ opacity: 0.5 }} />
            </div>
            <button type="submit" className="btn btn-gold">Save Changes</button>
          </form>
        </div>

        <div className="col-stack">
          <div className="card accent-card">
            <h3>Admin Privileges</h3>
            <div className="privilege-list">
              {PRIVILEGES.map(p => (
                <div key={p} className="privilege-item">
                  <RiCheckboxCircleFill className="privilege-check" size={16} />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Security</h3>
            <div className="col-stack" style={{ gap: 10, marginTop: 12 }}>
              <button className="btn btn-outline btn-full" onClick={() => setShowPasswordModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <RiLockPasswordLine size={16} /> Change Password
              </button>
              <button onClick={handleLogout} className="btn btn-full" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                <RiLogoutBoxLine size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>✕</button>
            </div>
            {passwordSuccess && <div className="success-msg">{passwordSuccess}</div>}
            {passwordError && <div className="error-msg">{passwordError}</div>}
            <form onSubmit={handlePasswordChange}>
              <div className="field">
                <label>Current Password</label>
                <input type="password" value={passwordForm.current} onChange={e => setPasswordForm({ ...passwordForm, current: e.target.value })} required />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" value={passwordForm.new} onChange={e => setPasswordForm({ ...passwordForm, new: e.target.value })} required />
              </div>
              <div className="field">
                <label>Confirm New Password</label>
                <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm({ ...passwordForm, confirm: e.target.value })} required />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-gold" style={{ flex: 1 }} disabled={passwordLoading}>
                  {passwordLoading ? 'Changing…' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
