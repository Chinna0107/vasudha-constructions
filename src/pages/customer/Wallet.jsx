import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Layout from '../../components/Layout';
import { RiCoinsFill, RiGiftFill, RiTrophyFill, RiShoppingBagLine, RiUserAddLine, RiStarLine, RiCheckboxCircleFill, RiErrorWarningFill, RiMoneyDollarCircleLine } from 'react-icons/ri';

const REDEEM_OPTIONS = [
  { coins: 100,  value: '₹100',  desc: 'Small discount coupon' },
  { coins: 250,  value: '₹250',  desc: 'Medium discount coupon' },
  { coins: 500,  value: '₹500',  desc: 'Large discount coupon' },
  { coins: 1000, value: '₹1000', desc: 'Premium discount coupon' },
];

const TX_KEY = (id) => `vasudha_tx_${id}`;

export default function Wallet() {
  const { user: authUser, redeemCoins } = useAuth();
  const { data: profile, refetch } = useProfile(authUser?.id);
  const user = { ...authUser, ...(profile || {}) };
  const [loading, setLoading] = useState(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(TX_KEY(user.id))) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(TX_KEY(user.id), JSON.stringify(transactions));
  }, [transactions]);

  const coins = user.coins ?? 0;
  const totalRedeemed = transactions.reduce((s, t) => s + t.coins, 0);
  const isGold = coins >= 1000;
  const tierPct = Math.min((coins / 1000) * 100, 100);

  const handleRedeem = async (opt) => {
    if (coins < opt.coins) return setMsg({ type: 'error', text: 'Insufficient coins to redeem this offer.' });
    setLoading(opt.coins); setMsg({ type: '', text: '' });
    const result = await redeemCoins(opt.coins);
    setLoading(null);
    if (result.success) {
      refetch();
      setTransactions(prev => [{ id: Date.now(), coins: opt.coins, value: opt.value, desc: `Redeemed for ${opt.value} discount`, date: new Date().toLocaleDateString() }, ...prev]);
      setMsg({ type: 'success', text: `Successfully redeemed ${opt.coins} coins for ${opt.value} discount coupon!` });
      setTimeout(() => setMsg({ type: '', text: '' }), 5000);
    } else {
      setMsg({ type: 'error', text: result.msg });
    }
  };

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Wallet</h1>
        <p>1 Vasudha Coin = ₹1 — Redeem for discounts on your purchases</p>
      </div>

      {/* Top summary row */}
      <div className="wallet-summary-row">
        <div className="wallet-balance-card card">
          <div className="wallet-balance-label">Available Balance</div>
          <div className="wallet-balance-main">
            <RiCoinsFill size={40} color="rgba(255,255,255,0.85)" />
            <div className="wallet-balance-value">{coins.toLocaleString()}</div>
          </div>
          <div className="wallet-balance-sub">Vasudha Coins &nbsp;·&nbsp; Worth <strong>₹{coins.toLocaleString()}</strong></div>
        </div>

        <div className="wallet-meta-col">
          <div className="stat-card green" style={{ marginBottom: 0 }}>
            <div className="stat-icon-wrap green"><RiCoinsFill size={18} /></div>
            <div className="stat-value">{coins.toLocaleString()}</div>
            <div className="stat-label">Available Coins</div>
          </div>
          <div className="stat-card purple" style={{ marginBottom: 0 }}>
            <div className="stat-icon-wrap purple"><RiGiftFill size={18} /></div>
            <div className="stat-value">{totalRedeemed.toLocaleString()}</div>
            <div className="stat-label">Coins Redeemed</div>
          </div>
          <div className="stat-card gold" style={{ marginBottom: 0 }}>
            <div className="stat-icon-wrap gold"><RiMoneyDollarCircleLine size={18} /></div>
            <div className="stat-value">₹{totalRedeemed.toLocaleString()}</div>
            <div className="stat-label">Total Saved</div>
          </div>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RiTrophyFill size={18} color={isGold ? '#f59e0b' : '#7ec8ca'} />
            <h3 style={{ marginBottom: 0 }}>{isGold ? 'Gold Member' : 'Silver Member'}</h3>
          </div>
          <span className={`badge ${isGold ? 'badge-yellow' : 'badge-blue'}`}>{isGold ? '🥇 Gold' : '🥈 Silver'}</span>
        </div>
        {!isGold ? (
          <>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 10 }}>
              <strong style={{ color: '#c7c362' }}>{1000 - coins} more coins</strong> to reach Gold tier
            </p>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${tierPct}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
              <span>{coins} coins</span><span>1000 coins</span>
            </div>
          </>
        ) : (
          <p style={{ fontSize: 13, color: '#34d399' }}>🎉 You've reached the highest tier! Enjoy exclusive Gold benefits.</p>
        )}
      </div>

      {/* Alert */}
      {msg.text && (
        <div className={msg.type === 'success' ? 'success-msg' : 'error-msg'} style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
          {msg.type === 'success' ? <RiCheckboxCircleFill size={18} /> : <RiErrorWarningFill size={18} />}
          {msg.text}
        </div>
      )}

      {/* Redeem Options */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <RiGiftFill size={18} color="#c7c362" />
          <h3 style={{ marginBottom: 0 }}>Redeem Coins</h3>
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>1 coin = ₹1</span>
        </div>
        <div className="redeem-grid">
          {REDEEM_OPTIONS.map(opt => {
            const canAfford = coins >= opt.coins;
            return (
              <div key={opt.coins} className={`redeem-card ${!canAfford ? 'redeem-card--disabled' : ''}`}>
                <div className="redeem-value">{opt.value}</div>
                <div className="redeem-desc">{opt.desc}</div>
                <div className="coins-badge" style={{ margin: '12px auto', display: 'inline-flex' }}>
                  <RiCoinsFill size={13} /> {opt.coins} coins
                </div>
                <button
                  className={`btn ${canAfford ? 'btn-gold' : 'btn-outline'} btn-full`}
                  style={{ fontSize: 13 }}
                  disabled={!canAfford || loading === opt.coins}
                  onClick={() => handleRedeem(opt)}
                >
                  {loading === opt.coins ? 'Redeeming…' : canAfford ? 'Redeem' : 'Not enough'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h3>Transaction History</h3>
        {transactions.length === 0 ? (
          <div className="empty-state">
            <RiGiftFill size={40} color="rgba(255,255,255,0.1)" />
            <p style={{ marginTop: 10 }}>No redemptions yet</p>
          </div>
        ) : (
          <>
            <div className="table-wrap desktop-only">
              <table>
                <thead><tr><th>Description</th><th>Date</th><th>Coins Used</th><th>Value</th></tr></thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id}>
                      <td>{t.desc}</td>
                      <td className="td-muted">{t.date}</td>
                      <td style={{ color: '#f87171', fontWeight: 700 }}>-{t.coins}</td>
                      <td><span className="badge badge-green">{t.value}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only">
              {transactions.map(t => (
                <div key={t.id} className="list-card">
                  <div className="list-card-row">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{t.desc}</span>
                    <span style={{ color: '#f87171', fontWeight: 700 }}>-{t.coins} 🪙</span>
                  </div>
                  <div className="list-card-row" style={{ marginTop: 6 }}>
                    <span className="td-muted" style={{ fontSize: 12 }}>{t.date}</span>
                    <span className="badge badge-green">{t.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* How to Earn */}
      <div className="card earn-card">
        <h3>💡 How to Earn More Coins</h3>
        <div className="earn-grid">
          {[
            { icon: <RiShoppingBagLine size={28} color="#f59e0b" />, title: 'Purchase Products', desc: '1 coin = ₹1 value' },
            { icon: <RiUserAddLine size={28} color="#34d399" />, title: 'Refer Friends', desc: '50 coins per referral' },
            { icon: <RiStarLine size={28} color="#a78bfa" />, title: 'Write Reviews', desc: '10 coins per review' },
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
