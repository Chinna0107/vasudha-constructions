import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCustomers } from '../../hooks/useCustomers';
import { API_URL } from '../../config';
import Layout from '../../components/Layout';
import { RiUserForbidLine, RiUserFollowLine, RiCoinsFill, RiGiftFill } from 'react-icons/ri';

const REDEEM_OPTIONS = [100, 250, 500, 1000];

export default function Customers() {
  const { addCoins, blockCustomer, redeemCoins } = useAuth();
  const { data: customers = [], loading, refetch } = useCustomers();
  const [search, setSearch] = useState('');
  const [redeemModal, setRedeemModal] = useState(null); // customer object
  const [redeemAmount, setRedeemAmount] = useState('');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemMsg, setRedeemMsg] = useState({ type: '', text: '' });

  const filtered = customers.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBlock = async (c) => {
    await blockCustomer(c.id, !c.is_blocked);
    refetch();
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    if (!redeemAmount) return;
    setRedeemLoading(true); setRedeemMsg({ type: '', text: '' });
    const res = await fetch(`${API_URL}/customers/${redeemModal.id}/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('vasudha_token')}` },
      body: JSON.stringify({ amount: parseInt(redeemAmount) }),
    });
    const data = await res.json();
    setRedeemLoading(false);
    if (res.ok) {
      setRedeemMsg({ type: 'success', text: `✓ Redeemed ${redeemAmount} coins from ${redeemModal.full_name}` });
      refetch();
      setTimeout(() => { setRedeemModal(null); setRedeemAmount(''); setRedeemMsg({ type: '', text: '' }); }, 2000);
    } else {
      setRedeemMsg({ type: 'error', text: data.error });
    }
  };

  return (
    <Layout role="admin">
      <div className="page-header">
        <h1>Customers</h1>
        <p>Manage all registered customers</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrap blue"><RiUserFollowLine size={20} /></div>
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Total Customers</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-icon-wrap gold"><RiCoinsFill size={20} /></div>
          <div className="stat-value">{customers.filter(c => c.coins >= 1000).length}</div>
          <div className="stat-label">Gold Members</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon-wrap green"><RiUserFollowLine size={20} /></div>
          <div className="stat-value">{customers.filter(c => !c.is_blocked).length}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-card" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="stat-icon-wrap" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}><RiUserForbidLine size={20} /></div>
          <div className="stat-value">{customers.filter(c => c.is_blocked).length}</div>
          <div className="stat-label">Blocked</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header-row">
          <h3>All Customers</h3>
          <input type="text" className="search-input" placeholder="Search customers..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        {loading && <p className="empty-msg">Loading…</p>}

        <div className="table-wrap desktop-only">
          <table>
            <thead>
              <tr><th>Customer</th><th>Mobile</th><th>Joined</th><th>Coins</th><th>Tier</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ opacity: c.is_blocked ? 0.6 : 1 }}>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar-sm">{c.full_name?.[0]}</div>
                      <div>
                        <div className="fw-bold">{c.full_name}</div>
                        <div className="td-muted" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="td-muted">{c.mobile}</td>
                  <td className="td-muted">{new Date(c.joined).toLocaleDateString()}</td>
                  <td><span className="coins-badge"><RiCoinsFill size={12} /> {c.coins}</span></td>
                  <td><span className={`badge ${c.coins >= 1000 ? 'badge-yellow' : 'badge-blue'}`}>{c.coins >= 1000 ? 'Gold' : 'Silver'}</span></td>
                  <td>
                    <span className={`badge ${c.is_blocked ? '' : 'badge-green'}`} style={c.is_blocked ? { background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' } : {}}>
                      {c.is_blocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-outline" style={{ padding: '5px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                        onClick={() => { setRedeemModal(c); setRedeemAmount(''); setRedeemMsg({ type: '', text: '' }); }}>
                        <RiGiftFill size={13} /> Redeem
                      </button>
                      <button onClick={() => handleBlock(c)}
                        style={{ padding: '5px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, border: '1px solid', ...(c.is_blocked ? { background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#34d399' } : { background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.25)', color: '#f87171' }) }}>
                        {c.is_blocked ? <><RiUserFollowLine size={13} /> Unblock</> : <><RiUserForbidLine size={13} /> Block</>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mobile-only">
          {filtered.map(c => (
            <div key={c.id} className="list-card" style={{ opacity: c.is_blocked ? 0.6 : 1 }}>
              <div className="list-card-row">
                <div className="customer-cell">
                  <div className="avatar-sm">{c.full_name?.[0]}</div>
                  <div>
                    <div className="fw-bold">{c.full_name}</div>
                    <div className="td-muted" style={{ fontSize: 11 }}>{c.email}</div>
                  </div>
                </div>
                <span className={`badge ${c.is_blocked ? '' : 'badge-green'}`} style={c.is_blocked ? { background: 'rgba(239,68,68,0.12)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' } : {}}>
                  {c.is_blocked ? 'Blocked' : 'Active'}
                </span>
              </div>
              <div className="list-card-row" style={{ marginTop: 8 }}>
                <span className="coins-badge"><RiCoinsFill size={12} /> {c.coins}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }}
                    onClick={() => { setRedeemModal(c); setRedeemAmount(''); setRedeemMsg({ type: '', text: '' }); }}>
                    Redeem
                  </button>
                  <button onClick={() => handleBlock(c)}
                    style={{ padding: '4px 10px', fontSize: 12, borderRadius: 8, cursor: 'pointer', border: '1px solid', ...(c.is_blocked ? { background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#34d399' } : { background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.25)', color: '#f87171' }) }}>
                    {c.is_blocked ? 'Unblock' : 'Block'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Redeem Modal */}
      {redeemModal && (
        <div className="modal-overlay" onClick={() => setRedeemModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Redeem Coins — {redeemModal.full_name}</h3>
              <button className="modal-close" onClick={() => setRedeemModal(null)}>✕</button>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 16 }}>
              Current balance: <strong style={{ color: '#c7c362' }}>{redeemModal.coins} coins</strong>
            </p>
            {redeemMsg.text && (
              <div className={redeemMsg.type === 'success' ? 'success-msg' : 'error-msg'} style={{ marginBottom: 16 }}>
                {redeemMsg.text}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 16 }}>
              {REDEEM_OPTIONS.map(q => (
                <button key={q} className={`btn ${redeemAmount == q ? 'btn-gold' : 'btn-outline'}`}
                  style={{ fontSize: 13 }} onClick={() => setRedeemAmount(q.toString())}>
                  {q} coins = ₹{q}
                </button>
              ))}
            </div>
            <form onSubmit={handleRedeem}>
              <div className="field">
                <label>Custom Amount</label>
                <input type="number" min="1" max={redeemModal.coins} placeholder="Enter coins to redeem"
                  value={redeemAmount} onChange={e => setRedeemAmount(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setRedeemModal(null)}>Cancel</button>
                <button type="submit" className="btn btn-gold" style={{ flex: 1 }} disabled={redeemLoading}>
                  {redeemLoading ? 'Redeeming…' : 'Redeem Coins'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
