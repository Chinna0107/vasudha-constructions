import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function Reports() {
  const { customers, orders } = useAuth();
  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const totalCoins = customers.reduce((s, c) => s + c.coins, 0);
  const avgOrderValue = orders.length ? Math.round(totalRevenue / orders.length) : 0;

  const monthlyData = [
    { month: 'Oct 2024', orders: 1, revenue: 18500 },
    { month: 'Nov 2024', orders: 1, revenue: 62000 },
    { month: 'Jan 2025', orders: 1, revenue: 12000 },
  ];

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Reports</h1>
        <p>Business analytics and insights</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card green">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{(totalRevenue / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Revenue</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{totalCoins.toLocaleString()}</div>
          <div className="stat-label">Coins Circulating</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📊</div>
          <div className="stat-value">₹{(avgOrderValue / 1000).toFixed(0)}K</div>
          <div className="stat-label">Avg Order Value</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="admin-two-col">
        <div className="card">
          <h3>Monthly Revenue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
            {monthlyData.map(m => {
              const pct = Math.round((m.revenue / totalRevenue) * 100);
              return (
                <div key={m.month}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{m.month}</span>
                    <span style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>₹{m.revenue.toLocaleString()}</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3>Order Details</h3>
          <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Amount</th><th>Coins</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={{ color: '#f59e0b', fontWeight: 600 }}>{o.id}</td>
                  <td>₹{o.amount.toLocaleString()}</td>
                  <td><span className="coins-badge">🪙 {o.coins}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Customer Acquisition</h3>
        <div className="table-wrap">
        <table>
          <thead><tr><th>Customer</th><th>Joined</th><th>Total Orders</th><th>Total Spent</th><th>Coins Balance</th></tr></thead>
          <tbody>
            {customers.map(c => {
              const cOrders = orders.filter(o => o.customerId === c.id);
              const spent = cOrders.reduce((s, o) => s + o.amount, 0);
              return (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td style={{ color: 'rgba(255,255,255,0.45)' }}>{c.joined}</td>
                  <td>{cOrders.length}</td>
                  <td>₹{spent.toLocaleString()}</td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </Layout>
  );
}
