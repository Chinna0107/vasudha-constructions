import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Layout from '../../components/Layout';
import { RiUserFill, RiMailLine, RiPhoneLine, RiMapPinLine, RiCalendarLine, RiCoinsFill, RiTrophyFill, RiShieldUserLine, RiLogoutBoxLine, RiSaveLine, RiIdCardLine, RiLockPasswordLine } from 'react-icons/ri';

export default function CustomerProfile() {
  const { user: authUser, logout, updateProfile, changePassword } = useAuth();
  const { data: profile, refetch } = useProfile(authUser?.id);
  const user = { ...authUser, ...(profile || {}) };
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: user.full_name || user.name || '', mobile: user.mobile || '', address: user.address || '' });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) { setPasswordError('Passwords do not match'); return; }
    setPasswordLoading(true); setPasswordError('');
    const result = await changePassword(passwordForm.current, passwordForm.new);
    setPasswordLoading(false);
    if (result.success) {
      setPasswordSuccess('Password changed successfully!');
      setTimeout(() => { setShowPasswordModal(false); setPasswordForm({ current: '', new: '', confirm: '' }); setPasswordSuccess(''); }, 2000);
    } else { setPasswordError(result.msg); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const result = await updateProfile(user.id, form);
    setLoading(false);
    if (result.success) { refetch(); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    else setError(result.msg);
  };

  const stats = [
    { icon: <RiCalendarLine size={16} />, label: 'Member Since', value: user.joined ? new Date(user.joined).toLocaleDateString() : '—' },
    { icon: <RiCoinsFill size={16} color="#f59e0b" />, label: 'Vasudha Coins', value: (user.coins ?? 0).toLocaleString() },
    { icon: <RiTrophyFill size={16} color={(user.coins ?? 0) >= 1000 ? '#f59e0b' : '#7ec8ca'} />, label: 'Member Tier', value: (user.coins ?? 0) >= 1000 ? 'Gold' : 'Silver' },
    { icon: <RiIdCardLine size={16} />, label: 'Customer ID', value: `#${user.id}` },
  ];

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="two-col-grid">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <RiUserFill size={18} color="#c7c362" />
            <h3 style={{ marginBottom: 0 }}>Personal Information</h3>
          </div>

          {saved && <div className="success-msg" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>✓ Profile updated successfully</div>}
          {error && <div className="error-msg" style={{ marginBottom: 16 }}>{error}</div>}

          <form onSubmit={handleSave}>
            <div className="field">
              <label><RiUserFill size={13} style={{ marginRight: 5 }} />Full Name</label>
              <input type="text" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
            </div>
            <div className="field">
              <label><RiMailLine size={13} style={{ marginRight: 5 }} />Email Address</label>
              <input type="email" value={user.email} disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} />
            </div>
            <div className="field">
              <label><RiPhoneLine size={13} style={{ marginRight: 5 }} />Mobile Number</label>
              <input type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
            </div>
            <div className="field">
              <label><RiMapPinLine size={13} style={{ marginRight: 5 }} />Address</label>
              <input type="text" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-gold" disabled={loading} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <RiSaveLine size={16} />
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        </div>

        <div className="col-stack">
          <div className="card accent-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <RiTrophyFill size={18} color="#f59e0b" />
              <h3 style={{ marginBottom: 0 }}>Account Stats</h3>
            </div>
            <div className="info-list">
              {stats.map(item => (
                <div key={item.label} className="info-row">
                  <span className="info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{item.icon}{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <RiShieldUserLine size={18} color="#a78bfa" />
              <h3 style={{ marginBottom: 0 }}>Security</h3>
            </div>
            <button className="btn btn-outline btn-full" onClick={() => setShowPasswordModal(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RiLockPasswordLine size={15} /> Change Password
            </button>
            <button onClick={handleLogout} className="btn btn-full" style={{ marginTop: 10, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <RiLogoutBoxLine size={15} /> Logout
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>✕</button>
            </div>
            {passwordSuccess && <div className="success-msg">{passwordSuccess}</div>}
            {passwordError && <div className="error-msg" style={{ marginBottom: 16 }}>{passwordError}</div>}
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
