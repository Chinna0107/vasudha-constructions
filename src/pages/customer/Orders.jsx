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

      <div className="stats-grid">
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
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p>No orders yet. Start shopping!</p>
          </div>
        ) : (
          <>
            <div className="table-wrap desktop-only">
              <table>
                <thead><tr><th>Order ID</th><th>Item</th><th>Date</th><th>Amount</th><th>Coins</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td className="td-gold fw-bold">{o.id}</td>
                      <td>{o.item}</td>
                      <td className="td-muted">{o.date}</td>
                      <td className="fw-bold">₹{o.amount.toLocaleString()}</td>
                      <td><span className="coins-badge">🪙 {o.coins}</span></td>
                      <td><span className="badge badge-green">{o.status}</span></td>
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
                    <span className="badge badge-green">{o.status}</span>
                  </div>
                  <div className="list-card-title">{o.item}</div>
                  <div className="td-muted" style={{ fontSize: 12 }}>{o.date}</div>
                  <div className="list-card-row" style={{ marginTop: 6 }}>
                    <span className="fw-bold">₹{o.amount.toLocaleString()}</span>
                    <span className="coins-badge">🪙 {o.coins}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
