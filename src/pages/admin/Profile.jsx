import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="admin-two-col">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(245,158,11,0.4)' }}>
              A
            </div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Administrator</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>{user.email}</div>
            <span className="badge badge-yellow" style={{ marginTop: 10, display: 'inline-block' }}>Super Admin</span>
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

        <div>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.08))', borderColor: 'rgba(245,158,11,0.2)' }}>
            <h3>Admin Privileges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {[
                'View all customers',
                'Manage customer accounts',
                'Add/remove Vasudha Coins',
                'View all orders & reports',
                'Full system access',
              ].map(p => (
                <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                  <span style={{ color: '#34d399', fontSize: 16 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h3>Security</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              <button className="btn btn-outline" style={{ width: '100%' }}>Change Password</button>
              <button className="btn btn-outline" style={{ width: '100%' }}>Enable 2FA</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
