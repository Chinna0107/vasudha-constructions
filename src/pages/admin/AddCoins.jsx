import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Layout from '../../components/Layout';

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="admin-two-col">
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

        <div>
          <div className="card" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(217,119,6,0.08))', borderColor: 'rgba(245,158,11,0.2)' }}>
            <h3>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              {[
                { label: 'Bonus 100 Coins', amount: 100 },
                { label: 'Bonus 250 Coins', amount: 250 },
                { label: 'Bonus 500 Coins', amount: 500 },
                { label: 'Bonus 1000 Coins', amount: 1000 },
              ].map(item => (
                <button
                  key={item.amount}
                  className="btn btn-outline"
                  style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => setForm({ ...form, amount: item.amount.toString() })}
                >
                  <span>{item.label}</span>
                  <span className="coins-badge">🪙 {item.amount}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }}>
            <h3>Recent Additions</h3>
            <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '20px', fontSize: 14 }}>
              No recent coin additions
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Customer Coin Balances</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Current Balance</th><th>Tier</th><th>Actions</th></tr></thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>
                        {c.name[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{c.email}</div>
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
      </div>
    </Layout>
  );
}
