import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function Customers() {
  const { customers, orders } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const getOrderCount = (id) => orders.filter(o => o.customerId === id).length;

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage all registered customers</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{customers.filter(c => c.coins >= 1000).length}</div>
          <div className="stat-label">Gold Members</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Active Customers</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>All Customers</h3>
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ padding: '9px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: '#fff', fontSize: 14, outline: 'none', width: 220 }}
          />
        </div>
        <table>
          <thead>
            <tr><th>Customer</th><th>Phone</th><th>Joined</th><th>Orders</th><th>Coins</th><th>Tier</th></tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                      {c.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: 'rgba(255,255,255,0.6)' }}>{c.phone}</td>
                <td style={{ color: 'rgba(255,255,255,0.45)' }}>{c.joined}</td>
                <td><span className="badge badge-blue">{getOrderCount(c.id)} orders</span></td>
                <td><span className="coins-badge">🪙 {c.coins}</span></td>
                <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
