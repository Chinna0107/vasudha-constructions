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

  const stats = [
    { label: 'Member Since', value: user.joined, icon: '📅' },
    { label: 'Vasudha Coins', value: user.coins.toLocaleString(), icon: '🪙' },
    { label: 'Member Tier', value: user.coins >= 1000 ? 'Gold' : 'Silver', icon: '🏆' },
    { label: 'Customer ID', value: `#${user.id}`, icon: '🆔' },
  ];

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information</p>
      </div>

      <div className="two-col-grid">
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

        <div className="col-stack">
          <div className="card accent-card">
            <h3>Account Stats</h3>
            <div className="info-list">
              {stats.map(item => (
                <div key={item.label} className="info-row">
                  <span className="info-label">{item.icon} {item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3>Security</h3>
            <button className="btn btn-outline btn-full mt-12">Change Password</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
