import { useCustomers } from '../../hooks/useCustomers';
import Layout from '../../components/Layout';

export default function Reports() {
  const { data: customers = [], loading } = useCustomers();
  const totalCoins = customers.reduce((s, c) => s + c.coins, 0);
  const goldMembers = customers.filter(c => c.coins >= 1000);
  const silverMembers = customers.filter(c => c.coins < 1000);

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Reports</h1>
        <p>Business analytics and insights</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon">🪙</div>
          <div className="stat-value">{totalCoins.toLocaleString()}</div>
          <div className="stat-label">Coins Circulating</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-icon">🏆</div>
          <div className="stat-value">{goldMembers.length}</div>
          <div className="stat-label">Gold Members</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">🥈</div>
          <div className="stat-value">{silverMembers.length}</div>
          <div className="stat-label">Silver Members</div>
        </div>
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>Tier Distribution</h3>
          <div className="bar-list">
            {[
              { label: 'Gold (1000+ coins)', count: goldMembers.length },
              { label: 'Silver (< 1000 coins)', count: silverMembers.length },
            ].map(item => {
              const pct = customers.length ? Math.round((item.count / customers.length) * 100) : 0;
              return (
                <div key={item.label} className="bar-item">
                  <div className="bar-label-row">
                    <span className="td-muted">{item.label}</span>
                    <span className="fw-bold">{item.count} customers ({pct}%)</span>
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
          <h3>Top Coin Holders</h3>
          <div className="table-wrap desktop-only">
            <table>
              <thead><tr><th>Customer</th><th>Coins</th><th>Tier</th></tr></thead>
              <tbody>
                {[...customers].sort((a, b) => b.coins - a.coins).slice(0, 5).map(c => (
                  <tr key={c.id}>
                    <td className="fw-bold">{c.full_name}</td>
                    <td><span className="coins-badge">🪙 {c.coins}</span></td>
                    <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-only">
            {[...customers].sort((a, b) => b.coins - a.coins).slice(0, 5).map(c => (
              <div key={c.id} className="list-card">
                <div className="list-card-row">
                  <span className="fw-bold">{c.full_name}</span>
                  <span className="coins-badge">🪙 {c.coins}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>All Customers</h3>
        <div className="table-wrap desktop-only">
          <table>
            <thead><tr><th>Customer</th><th>Email</th><th>Joined</th><th>Coins</th><th>Tier</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td className="fw-bold">{c.full_name}</td>
                  <td className="td-muted">{c.email}</td>
                  <td className="td-muted">{new Date(c.joined).toLocaleDateString()}</td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          {customers.map(c => (
            <div key={c.id} className="list-card">
              <div className="list-card-row">
                <span className="fw-bold">{c.full_name}</span>
                <span className="coins-badge">🪙 {c.coins}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 6 }}>
                <span className="td-muted" style={{ fontSize: 12 }}>{c.email} · {new Date(c.joined).toLocaleDateString()}</span>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
