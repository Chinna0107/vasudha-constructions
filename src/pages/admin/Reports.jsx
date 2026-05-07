import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

const monthlyData = [
  { month: 'Oct 2024', revenue: 18500 },
  { month: 'Nov 2024', revenue: 62000 },
  { month: 'Jan 2025', revenue: 12000 },
];

export default function Reports() {
  const { customers, orders } = useAuth();
  const totalRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const totalCoins = customers.reduce((s, c) => s + c.coins, 0);
  const avgOrderValue = orders.length ? Math.round(totalRevenue / orders.length) : 0;

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

      <div className="two-col-grid">
        <div className="card">
          <h3>Monthly Revenue</h3>
          <div className="bar-list">
            {monthlyData.map(m => {
              const pct = Math.round((m.revenue / totalRevenue) * 100);
              return (
                <div key={m.month} className="bar-item">
                  <div className="bar-label-row">
                    <span className="td-muted">{m.month}</span>
                    <span className="fw-bold">₹{m.revenue.toLocaleString()}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <h3>Order Details</h3>
          <div className="table-wrap desktop-only">
            <table>
              <thead><tr><th>Order ID</th><th>Amount</th><th>Coins</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id}>
                    <td className="td-gold fw-bold">{o.id}</td>
                    <td>₹{o.amount.toLocaleString()}</td>
                    <td><span className="coins-badge">🪙 {o.coins}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-only">
            {orders.map(o => (
              <div key={o.id} className="list-card">
                <div className="list-card-row">
                  <span className="td-gold fw-bold">{o.id}</span>
                  <span className="coins-badge">🪙 {o.coins}</span>
                </div>
                <div className="fw-bold" style={{ marginTop: 4 }}>₹{o.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Customer Acquisition</h3>
        <div className="table-wrap desktop-only">
          <table>
            <thead><tr><th>Customer</th><th>Joined</th><th>Orders</th><th>Total Spent</th><th>Coins</th></tr></thead>
            <tbody>
              {customers.map(c => {
                const cOrders = orders.filter(o => o.customerId === c.id);
                const spent = cOrders.reduce((s, o) => s + o.amount, 0);
                return (
                  <tr key={c.id}>
                    <td className="fw-bold">{c.name}</td>
                    <td className="td-muted">{c.joined}</td>
                    <td>{cOrders.length}</td>
                    <td>₹{spent.toLocaleString()}</td>
                    <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          {customers.map(c => {
            const cOrders = orders.filter(o => o.customerId === c.id);
            const spent = cOrders.reduce((s, o) => s + o.amount, 0);
            return (
              <div key={c.id} className="list-card">
                <div className="list-card-row">
                  <span className="fw-bold">{c.name}</span>
                  <span className="coins-badge">🪙 {c.coins}</span>
                </div>
                <div className="list-card-row" style={{ marginTop: 6 }}>
                  <span className="td-muted" style={{ fontSize: 12 }}>{c.joined} · {cOrders.length} orders</span>
                  <span className="fw-bold">₹{spent.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
