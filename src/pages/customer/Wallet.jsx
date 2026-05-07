import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import { useFetch } from '../../hooks/useFetch';
import Layout from '../../components/Layout';
import { RiCoinsFill, RiGiftFill, RiTrophyFill, RiShoppingBagLine, RiUserAddLine, RiStarLine, RiMoneyDollarCircleLine } from 'react-icons/ri';

export default function Wallet() {
  const { user: authUser } = useAuth();
  const { data: profile } = useProfile(authUser?.id);
  const user = { ...authUser, ...(profile || {}) };
  const { data: redemptions = [] } = useFetch(authUser?.id ? `/customers/${authUser.id}/redemptions` : null);

  const coins = user.coins ?? 0;
  const totalRedeemed = redemptions.reduce((s, t) => s + t.coins, 0);
  const isGold = coins >= 1000;
  const tierPct = Math.min((coins / 1000) * 100, 100);

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>My Wallet</h1>
        <p>1 Vasudha Coin = ₹1 — Coins are redeemed by admin on your behalf</p>
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

      {/* Notice */}
      <div className="card" style={{ background: 'rgba(199,195,98,0.06)', border: '1px solid rgba(199,195,98,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RiGiftFill size={20} color="#c7c362" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#fff' }}>How to Redeem Your Coins</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>Contact or visit Vasudha — our admin will redeem your coins as a discount on your next purchase. 1 coin = ₹1.</div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h3>Redemption History</h3>
        {redemptions.length === 0 ? (
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
                  {redemptions.map(t => (
                    <tr key={t.id}>
                      <td>{t.description}</td>
                      <td className="td-muted">{new Date(t.redeemed_at).toLocaleDateString()}</td>
                      <td style={{ color: '#f87171', fontWeight: 700 }}>-{t.coins}</td>
                      <td><span className="badge badge-green">{t.value}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mobile-only">
              {redemptions.map(t => (
                <div key={t.id} className="list-card">
                  <div className="list-card-row">
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{t.description}</span>
                    <span style={{ color: '#f87171', fontWeight: 700 }}>-{t.coins} 🪙</span>
                  </div>
                  <div className="list-card-row" style={{ marginTop: 6 }}>
                    <span className="td-muted" style={{ fontSize: 12 }}>{new Date(t.redeemed_at).toLocaleDateString()}</span>
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
