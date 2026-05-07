import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function AdminDashboard() {
  const { customers, orders } = useAuth();
  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const totalCoins = customers.reduce((s, c) => s + c.coins, 0);

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
        <div className="stat-card green">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{totalCoins.toLocaleString()}</div>
          <div className="stat-label">Coins Issued</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>Recent Orders</h3>
          <div className="table-wrap desktop-only">
            <table>
              <thead><tr><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                {orders.slice(-4).reverse().map(o => (
                  <tr key={o.id}>
                    <td>
                      <div className="td-gold fw-bold" style={{ fontSize: 13 }}>{o.id}</div>
                      <div className="td-muted" style={{ fontSize: 12 }}>{o.item}</div>
                    </td>
                    <td>₹{o.amount.toLocaleString()}</td>
                    <td><span className="badge badge-green">{o.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-only">
            {orders.slice(-4).reverse().map(o => (
              <div key={o.id} className="list-card">
                <div className="list-card-row">
                  <span className="td-gold fw-bold">{o.id}</span>
                  <span className="badge badge-green">{o.status}</span>
                </div>
                <div className="list-card-row" style={{ marginTop: 4 }}>
                  <span className="td-muted">{o.item}</span>
                  <span className="fw-bold">₹{o.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Top Customers</h3>
          <div className="table-wrap desktop-only">
            <table>
              <thead><tr><th>Customer</th><th>Coins</th><th>Tier</th></tr></thead>
              <tbody>
                {[...customers].sort((a, b) => b.coins - a.coins).map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="customer-cell">
                        <div className="avatar-sm">{c.name[0]}</div>
                        <div>
                          <div className="fw-bold" style={{ fontSize: 14 }}>{c.name}</div>
                          <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                        </div>
                      </div>
                    </td>
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
                    <div className="avatar-sm">{c.name[0]}</div>
                    <span className="fw-bold">{c.name}</span>
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
      </div>
    </Layout>
  );
}
