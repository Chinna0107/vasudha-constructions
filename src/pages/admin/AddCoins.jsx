import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCustomers } from '../../hooks/useCustomers';
import Layout from '../../components/Layout';

const QUICK = [100, 250, 500, 1000];

export default function AddCoins() {
  const { addCoins } = useAuth();
  const { data: customers = [], refetch } = useCustomers();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const searchResults = search.trim()
    ? customers.filter(c =>
        c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        c.email?.toLowerCase().includes(search.toLowerCase()) ||
        c.mobile?.includes(search)
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !amount) return;
    setLoading(true);
    const ok = await addCoins(selected.id, parseInt(amount));
    setLoading(false);
    if (ok) {
      refetch();
      setSuccess(`✓ Added ${amount} coins to ${selected.full_name}`);
      setAmount('');
      setSelected(null);
      setSearch('');
      setTimeout(() => setSuccess(''), 4000);
    }
  };

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Add Vasudha Coins</h1>
        <p>Credit coins to customer accounts</p>
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3>Add Coins</h3>
          {success && <div className="success-msg">{success}</div>}

          {/* Search */}
          <div className="field">
            <label>Search Customer</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Name, email or mobile..."
                value={search}
                onChange={e => { setSearch(e.target.value); setSelected(null); }}
                style={{ flex: 1 }}
              />
              <button type="button" className="btn btn-gold" style={{ padding: '0 16px' }}
                onClick={() => {}}>
                🔍
              </button>
            </div>
            {searchResults.length > 0 && !selected && (
              <div style={{ border: '1px solid #333', borderRadius: 8, marginTop: 4, overflow: 'hidden' }}>
                {searchResults.map(c => (
                  <div key={c.id}
                    onClick={() => { setSelected(c); setSearch(c.full_name); }}
                    style={{ padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{c.full_name}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>{c.email}</div>
                    </div>
                    <span className="coins-badge">🪙 {c.coins}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selected && (
            <div style={{ background: '#1a1a1a', borderRadius: 8, padding: '10px 14px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600 }}>{selected.full_name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{selected.email}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="coins-badge">🪙 {selected.coins}</span>
                <button type="button" onClick={() => { setSelected(null); setSearch(''); }}
                  style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 16 }}>✕</button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Coin Amount</label>
              <input type="number" placeholder="Enter amount" min="1" value={amount}
                onChange={e => setAmount(e.target.value)} required />
            </div>
            <button type="submit" className={`btn btn-gold${loading ? ' loading' : ''}`} disabled={!selected || loading}>
              {loading ? 'Adding…' : 'Add Coins'}
            </button>
          </form>
        </div>

        <div className="card accent-card">
          <h3>Quick Amounts</h3>
          <div className="quick-actions">
            {QUICK.map(q => (
              <button key={q} className="btn btn-outline quick-btn"
                onClick={() => setAmount(q.toString())}>
                <span>Bonus {q} Coins</span>
                <span className="coins-badge">🪙 {q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Customer Coin Balances</h3>
        <div className="table-wrap desktop-only">
          <table>
            <thead><tr><th>Customer</th><th>Balance</th><th>Tier</th><th>Action</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar-sm">{c.full_name?.[0]}</div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: 14 }}>{c.full_name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}
                      onClick={() => { setSelected(c); setSearch(c.full_name); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Add Coins
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-only">
          {customers.map(c => (
            <div key={c.id} className="list-card">
              <div className="list-card-row">
                <div className="customer-cell">
                  <div className="avatar-sm">{c.full_name?.[0]}</div>
                  <span className="fw-bold">{c.full_name}</span>
                </div>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 8 }}>
                <span className="coins-badge">🪙 {c.coins}</span>
                <button className="btn btn-outline" style={{ padding: '5px 12px', fontSize: 12 }}
                  onClick={() => { setSelected(c); setSearch(c.full_name); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Add Coins
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
