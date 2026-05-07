import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function Orders() {
  const { user, getCustomerOrders } = useAuth();
  const orders = getCustomerOrders(user.id);

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>Past Orders</h1>
        <p>View your order history</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{(orders.reduce((s, o) => s + o.amount, 0) / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{orders.reduce((s, o) => s + o.coins, 0)}</div>
          <div className="stat-label">Coins Earned</div>
        </div>
      </div>

      <div className="card">
        <h3>Order History</h3>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <table>
            <thead><tr><th>Order ID</th><th>Item</th><th>Date</th><th>Amount</th><th>Coins</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={{ color: '#f59e0b', fontWeight: 600 }}>{o.id}</td>
                  <td>{o.item}</td>
                  <td style={{ color: 'rgba(255,255,255,0.45)' }}>{o.date}</td>
                  <td style={{ fontWeight: 600 }}>₹{o.amount.toLocaleString()}</td>
                  <td><span className="coins-badge">🪙 {o.coins}</span></td>
                  <td><span className="badge badge-green">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
