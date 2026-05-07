import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

const QUICK = [
  { label: 'Bonus 100 Coins', amount: 100 },
  { label: 'Bonus 250 Coins', amount: 250 },
  { label: 'Bonus 500 Coins', amount: 500 },
  { label: 'Bonus 1000 Coins', amount: 1000 },
];

export default function AddCoins() {
  const { customers, addCoins } = useAuth();
  const [form, setForm] = useState({ customerId: '', amount: '' });
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const customer = customers.find(c => c.id === parseInt(form.customerId));
    if (!customer) return;
    addCoins(parseInt(form.customerId), parseInt(form.amount));
    setSuccess(`Successfully added ${form.amount} coins to ${customer.name}`);
    setForm({ customerId: '', amount: '' });
    setTimeout(() => setSuccess(''), 4000);
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
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Select Customer</label>
              <select value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })} required>
                <option value="">Choose a customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.email})</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Coin Amount</label>
              <input type="number" placeholder="Enter amount" min="1" value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })} required />
            </div>
            <button type="submit" className="btn btn-gold">Add Coins</button>
          </form>
        </div>

        <div className="col-stack">
          <div className="card accent-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              {QUICK.map(item => (
                <button key={item.amount} className="btn btn-outline quick-btn"
                  onClick={() => setForm({ ...form, amount: item.amount.toString() })}>
                  <span>{item.label}</span>
                  <span className="coins-badge">🪙 {item.amount}</span>
                </button>
              ))}
            </div>
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
                      <div className="avatar-sm">{c.name[0]}</div>
                      <div>
                        <div className="fw-bold" style={{ fontSize: 14 }}>{c.name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="coins-badge">🪙 {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                  <td>
                    <button className="btn btn-outline" style={{ padding: '6px 14px', fontSize: 12 }}
                      onClick={() => setForm({ customerId: c.id.toString(), amount: '' })}>
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
                  <div className="avatar-sm">{c.name[0]}</div>
                  <span className="fw-bold">{c.name}</span>
                </div>
                <span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span>
              </div>
              <div className="list-card-row" style={{ marginTop: 8 }}>
                <span className="coins-badge">🪙 {c.coins}</span>
                <button className="btn btn-outline" style={{ padding: '5px 12px', fontSize: 12 }}
                  onClick={() => setForm({ customerId: c.id.toString(), amount: '' })}>
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
