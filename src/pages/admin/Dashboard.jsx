import { useCustomers } from '../../hooks/useCustomers';
import Layout from '../../components/Layout';

export default function AdminDashboard() {
  const { data: customers = [], loading } = useCustomers();

  if (loading && !customers.length) {
    return (
      <Layout role="admin">
        <div className="page-header"><h1>Admin Dashboard</h1><p>Loading…</p></div>
      </Layout>
    );
  }

  const totalCoins = customers.reduce((s, c) => s + c.coins, 0);
  const goldMembers = customers.filter(c => c.coins >= 1000).length;

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Vasudha Construction — Overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{totalCoins.toLocaleString()}</div>
          <div className="stat-label">Coins Issued</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{goldMembers}</div>
          <div className="stat-label">Gold Members</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Active Accounts</div>
        </div>
      </div>

      <div className="card">
        <h3>Top Customers by Coins</h3>
        <div className="table-wrap desktop-only">
          <table>
            <thead><tr><th>Customer</th><th>Mobile</th><th>Coins</th><th>Tier</th></tr></thead>
            <tbody>
              {[...customers].sort((a, b) => b.coins - a.coins).map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar-sm">{c.full_name?.[0]}</div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: 14 }}>{c.full_name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted">{c.mobile}</td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          {[...customers].sort((a, b) => b.coins - a.coins).map(c => (
            <div key={c.id} className="list-card">
              <div className="list-card-row">
                <div className="customer-cell">
                  <div className="avatar-sm">{c.full_name?.[0]}</div>
                  <span className="fw-bold">{c.full_name}</span>
                </div>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 6 }}>
                <span className="td-muted" style={{ fontSize: 12 }}>{c.email}</span>
                <span className="coins-badge">🪙 {c.coins}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
