import { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import Layout from '../../components/Layout';

export default function Customers() {
  const { data: customers = [], loading } = useCustomers();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

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
          <input type="text" className="search-input" placeholder="Search customers..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="table-wrap desktop-only">
          <table>
            <thead>
              <tr><th>Customer</th><th>Mobile</th><th>Joined</th><th>Coins</th><th>Tier</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar-sm">{c.full_name?.[0]}</div>
                      <div>
                        <div className="fw-bold">{c.full_name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted">{c.mobile}</td>
                  <td className="td-muted">{new Date(c.joined).toLocaleDateString()}</td>
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
                  <div className="avatar-sm">{c.full_name?.[0]}</div>
                  <div>
                    <div className="fw-bold">{c.full_name}</div>
                    <div className="td-muted" style={{ fontSize: 11 }}>{c.email}</div>
                  </div>
                </div>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 8 }}>
                <span className="td-muted" style={{ fontSize: 12 }}>{c.mobile} · {new Date(c.joined).toLocaleDateString()}</span>
                <span className="coins-badge">🪙 {c.coins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
