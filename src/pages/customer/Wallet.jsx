import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

export default function Wallet() {
  const { user, getCustomerOrders } = useAuth();
  const orders = getCustomerOrders(user.id);
  const transactions = orders.map(o => ({ id: o.id, desc: `Purchase: ${o.item}`, coins: `+${o.coins}`, date: o.date, type: 'credit' }));

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Wallet</h1>
        <p>Track your Vasudha Coins</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }} className="wallet-top-grid">
        <div className="card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Available Balance</div>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{user.coins.toLocaleString()}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>Vasudha Coins</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="stat-card green" style={{ flex: 1 }}>
            <div className="stat-icon">📈</div>
            <div className="stat-value">{orders.reduce((s, o) => s + o.coins, 0)}</div>
            <div className="stat-label">Total Earned</div>
          </div>
          <div className="stat-card blue" style={{ flex: 1 }}>
            <div className="stat-icon">🎁</div>
            <div className="stat-value">0</div>
            <div className="stat-label">Total Redeemed</div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px' }}>No transactions yet</p>
        ) : (
          <div className="table-wrap">
          <table>
            <thead><tr><th>Description</th><th>Date</th><th>Coins</th></tr></thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td>{t.desc}</td>
                  <td style={{ color: 'rgba(255,255,255,0.45)' }}>{t.date}</td>
                  <td><span style={{ color: '#34d399', fontWeight: 700 }}>{t.coins}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>

      <div className="card" style={{ background: 'rgba(139,92,246,0.08)', borderColor: 'rgba(139,92,246,0.2)' }}>
        <h3>💡 How to Earn More Coins</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 8 }} className="earn-grid">
          {[
            { icon: '🛒', title: 'Purchase Products', desc: '1 coin per ₹100 spent' },
            { icon: '👥', title: 'Refer Friends', desc: '50 coins per referral' },
            { icon: '⭐', title: 'Write Reviews', desc: '10 coins per review' },
          ].map(item => (
            <div key={item.title} style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: 12 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
