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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card">
          <h3>Recent Orders</h3>
          <table>
            <thead><tr><th>Order</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {orders.slice(-4).reverse().map(o => (
                <tr key={o.id}>
                  <td>
                    <div style={{ color: '#f59e0b', fontWeight: 600, fontSize: 13 }}>{o.id}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{o.item}</div>
                  </td>
                  <td>₹{o.amount.toLocaleString()}</td>
                  <td><span className="badge badge-green">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Top Customers</h3>
          <table>
            <thead><tr><th>Customer</th><th>Coins</th><th>Tier</th></tr></thead>
            <tbody>
              {[...customers].sort((a, b) => b.coins - a.coins).map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.email}</div>
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
      </div>
    </Layout>
  );
}
