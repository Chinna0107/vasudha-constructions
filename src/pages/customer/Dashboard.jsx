import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function CustomerDashboard() {
  const { user, getCustomerOrders } = useAuth();
  const orders = getCustomerOrders(user.id);
  const totalSpent = orders.reduce((s, o) => s + o.amount, 0);

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>Welcome back, {user.name.split(' ')[0]} 👋</h1>
        <p>Here's your account overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{user.coins.toLocaleString()}</div>
          <div className="stat-label">Vasudha Coins</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">💰</div>
          <div className="stat-value">₹{(totalSpent / 1000).toFixed(0)}K</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{user.coins >= 1000 ? 'Gold' : 'Silver'}</div>
          <div className="stat-label">Member Tier</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Orders</h3>
        {orders.length === 0 ? (
          <p className="empty-msg">No orders yet</p>
        ) : (
          <>
            <div className="table-wrap desktop-only">
              <table>
                <thead><tr><th>Order ID</th><th>Item</th><th>Amount</th><th>Coins</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.slice(-3).reverse().map(o => (
                    <tr key={o.id}>
                      <td className="td-gold">{o.id}</td>
                      <td>{o.item}</td>
                      <td>₹{o.amount.toLocaleString()}</td>
                      <td><span className="coins-badge">🪙 {o.coins}</span></td>
                      <td><span className="badge badge-green">{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only">
              {orders.slice(-3).reverse().map(o => (
                <div key={o.id} className="list-card">
                  <div className="list-card-row">
                    <span className="td-gold fw-bold">{o.id}</span>
                    <span className="badge badge-green">{o.status}</span>
                  </div>
                  <div className="list-card-title">{o.item}</div>
                  <div className="list-card-row">
                    <span className="fw-bold">₹{o.amount.toLocaleString()}</span>
                    <span className="coins-badge">🪙 {o.coins}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card coin-banner">
        <div className="coin-banner-left">
          <h3>🪙 Your Coin Balance</h3>
          <p>Earn coins on every purchase. Redeem for discounts!</p>
        </div>
        <div className="coin-banner-right">
          <div className="coin-banner-value">{user.coins.toLocaleString()}</div>
          <div className="coin-banner-sub">Vasudha Coins</div>
        </div>
      </div>
    </Layout>
  );
}
