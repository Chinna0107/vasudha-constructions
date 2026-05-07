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
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>No orders yet</p>
        ) : (
          <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Item</th><th>Amount</th><th>Coins Earned</th><th>Status</th></tr></thead>
            <tbody>
              {orders.slice(-3).reverse().map(o => (
                <tr key={o.id}>
                  <td style={{ color: '#f59e0b' }}>{o.id}</td>
                  <td>{o.item}</td>
                  <td>₹{o.amount.toLocaleString()}</td>
                  <td><span className="coins-badge">🪙 {o.coins}</span></td>
                  <td><span className="badge badge-green">{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.08))', borderColor: 'rgba(245,158,11,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ marginBottom: 4 }}>🪙 Your Coin Balance</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Earn coins on every purchase. Redeem for discounts!</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#f59e0b' }}>{user.coins.toLocaleString()}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Vasudha Coins</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
