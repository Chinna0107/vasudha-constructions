import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function Wallet() {
  const { user, getCustomerOrders } = useAuth();
  const orders = getCustomerOrders(user.id);
  const totalEarned = orders.reduce((s, o) => s + o.coins, 0);
  const transactions = orders.map(o => ({
    id: o.id, desc: `Purchase: ${o.item}`, coins: `+${o.coins}`, date: o.date,
  }));

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Wallet</h1>
        <p>Track your Vasudha Coins</p>
      </div>

      <div className="wallet-top">
        <div className="card wallet-balance-card">
          <div className="wallet-balance-label">Available Balance</div>
          <div className="wallet-balance-value">{user.coins.toLocaleString()}</div>
          <div className="wallet-balance-sub">Vasudha Coins</div>
        </div>
        <div className="wallet-stats">
          <div className="stat-card green">
            <div className="stat-icon">📈</div>
            <div className="stat-value">{totalEarned}</div>
            <div className="stat-label">Total Earned</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">🎁</div>
            <div className="stat-value">0</div>
            <div className="stat-label">Total Redeemed</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p className="empty-msg">No transactions yet</p>
        ) : (
          <>
            <div className="table-wrap desktop-only">
              <table>
                <thead><tr><th>Description</th><th>Date</th><th>Coins</th></tr></thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td>{t.desc}</td>
                      <td className="td-muted">{t.date}</td>
                      <td className="td-green fw-bold">{t.coins}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only">
              {transactions.map(t => (
                <div key={t.id} className="list-card">
                  <div className="list-card-row">
                    <span className="list-card-title" style={{ marginBottom: 0 }}>{t.desc}</span>
                    <span className="td-green fw-bold">{t.coins}</span>
                  </div>
                  <div className="td-muted" style={{ fontSize: 12, marginTop: 4 }}>{t.date}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="card earn-card">
        <h3>💡 How to Earn More Coins</h3>
        <div className="earn-grid">
          {[
            { icon: '🛒', title: 'Purchase Products', desc: '1 coin per ₹100 spent' },
            { icon: '👥', title: 'Refer Friends', desc: '50 coins per referral' },
            { icon: '⭐', title: 'Write Reviews', desc: '10 coins per review' },
          ].map(item => (
            <div key={item.title} className="earn-item">
              <div className="earn-icon">{item.icon}</div>
              <div className="earn-title">{item.title}</div>
              <div className="earn-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
