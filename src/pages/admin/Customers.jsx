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

      <div className="stats-grid">
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
          <div className="stat-label">Active</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header-row">
          <h3>All Customers</h3>
          <input
            type="text"
            className="search-input"
            placeholder="Search customers..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="table-wrap desktop-only">
          <table>
            <thead>
              <tr><th>Customer</th><th>Phone</th><th>Joined</th><th>Orders</th><th>Coins</th><th>Tier</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar-sm">{c.name[0]}</div>
                      <div>
                        <div className="fw-bold">{c.name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted">{c.phone}</td>
                  <td className="td-muted">{c.joined}</td>
                  <td><span className="badge badge-blue">{getOrderCount(c.id)} orders</span></td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-only">
          {filtered.map(c => (
            <div key={c.id} className="list-card">
              <div className="list-card-row">
                <div className="customer-cell">
                  <div className="avatar-sm">{c.name[0]}</div>
                  <div>
                    <div className="fw-bold">{c.name}</div>
                    <div className="td-muted" style={{ fontSize: 11 }}>{c.email}</div>
                  </div>
                </div>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 8 }}>
                <span className="td-muted" style={{ fontSize: 12 }}>{c.phone} · {c.joined}</span>
                <span className="coins-badge">🪙 {c.coins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
