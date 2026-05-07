import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

const PRIVILEGES = [
  'View all customers',
  'Manage customer accounts',
  'Add/remove Vasudha Coins',
  'View all orders & reports',
  'Full system access',
];

export default function AdminProfile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
            <div className="admin-avatar">A</div>
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
              <input type="email" defaultValue={user.email} />
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
                  <span className="privilege-check">✓</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Security</h3>
            <div className="col-stack" style={{ gap: 10, marginTop: 12 }}>
              <button className="btn btn-outline btn-full">Change Password</button>
              <button className="btn btn-outline btn-full">Enable 2FA</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
