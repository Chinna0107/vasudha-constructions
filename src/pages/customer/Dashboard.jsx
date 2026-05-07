import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../hooks/useProfile';
import Layout from '../../components/Layout';
import { RiCoinsFill, RiTrophyFill, RiCalendarLine, RiUserStarFill, RiArrowRightLine, RiWallet3Fill, RiUserFill, RiGiftFill } from 'react-icons/ri';

export default function CustomerDashboard() {
  const { user: authUser } = useAuth();
  const { data: profile } = useProfile(authUser?.id);
  const user = { ...authUser, ...(profile || {}) };
  const coins = user.coins ?? 0;
  const tierPct = Math.min((coins / 1000) * 100, 100);
  const nextTier = coins >= 1000 ? null : 1000 - coins;
  const isGold = coins >= 1000;

  return (
    <Layout role="customer">
      <div className="page-header">
        <h1>Welcome back, {(user.full_name || user.name)?.split(' ')[0]} 👋</h1>
        <p>Here's your account overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card gold">
          <div className="stat-icon-wrap gold"><RiCoinsFill size={22} /></div>
          <div className="stat-value">{coins.toLocaleString()}</div>
          <div className="stat-label">Vasudha Coins</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon-wrap purple"><RiTrophyFill size={22} /></div>
          <div className="stat-value">{isGold ? 'Gold' : 'Silver'}</div>
          <div className="stat-label">Member Tier</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon-wrap blue"><RiCalendarLine size={22} /></div>
          <div className="stat-value" style={{ fontSize: 16 }}>{user.joined ? new Date(user.joined).toLocaleDateString() : '—'}</div>
          <div className="stat-label">Member Since</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon-wrap green"><RiUserStarFill size={22} /></div>
          <div className="stat-value">#{user.id}</div>
          <div className="stat-label">Customer ID</div>
        </div>
      </div>

      <div className="two-col-grid">
        {/* Coin Banner */}
        <div className="card coin-banner">
          <div className="coin-banner-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <RiCoinsFill size={20} color="#f59e0b" />
              <h3 style={{ marginBottom: 0 }}>Your Coin Balance</h3>
            </div>
            <p>Redeem coins for exclusive discounts on your next purchase!</p>
            <Link to="/customer/wallet">
              <button className="btn btn-gold" style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                Redeem Now <RiArrowRightLine size={15} />
              </button>
            </Link>
          </div>
          <div className="coin-banner-right">
            <div className="coin-banner-value">{coins.toLocaleString()}</div>
            <div className="coin-banner-sub">Vasudha Coins</div>
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
          {nextTier ? (
            <>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 12 }}>
                Earn <strong style={{ color: '#c7c362' }}>{nextTier} more coins</strong> to unlock Gold tier
              </p>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${tierPct}%`, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
                <span>{coins} coins</span><span>1000 coins</span>
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: '#34d399', marginTop: 4 }}>🎉 You've reached the highest tier! Enjoy exclusive Gold benefits.</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3>Quick Actions</h3>
        <div className="quick-action-grid">
          {[
            { icon: <RiGiftFill size={26} color="#f59e0b" />, label: 'Redeem Coins', to: '/customer/wallet', desc: 'Use coins for discounts' },
            { icon: <RiWallet3Fill size={26} color="#7ec8ca" />, label: 'My Wallet', to: '/customer/wallet', desc: 'View balance & history' },
            { icon: <RiUserFill size={26} color="#a78bfa" />, label: 'Edit Profile', to: '/customer/profile', desc: 'Update your details' },
          ].map(a => (
            <Link key={a.label} to={a.to} style={{ textDecoration: 'none' }}>
              <div className="quick-action-card">
                <div className="quick-action-icon">{a.icon}</div>
                <div className="quick-action-label">{a.label}</div>
                <div className="quick-action-desc">{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
