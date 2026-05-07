import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function CustomerProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: user.phone });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="admin-two-col">
        <div className="card">
          <h3>Personal Information</h3>
          {saved && <div className="success-msg">✓ Profile updated successfully</div>}
          <form onSubmit={handleSave}>
            <div className="field">
              <label>Full Name</label>
              <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Email Address</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <button type="submit" className="btn btn-gold">Save Changes</button>
          </form>
        </div>

        <div>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.08))', borderColor: 'rgba(245,158,11,0.2)' }}>
            <h3>Account Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              {[
                { label: 'Member Since', value: user.joined, icon: '📅' },
                { label: 'Vasudha Coins', value: user.coins.toLocaleString(), icon: '🪙' },
                { label: 'Member Tier', value: user.coins >= 1000 ? 'Gold' : 'Silver', icon: '🏆' },
                { label: 'Customer ID', value: `#${user.id}`, icon: '🆔' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{item.icon} {item.label}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h3>Security</h3>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 12 }}>Change Password</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
