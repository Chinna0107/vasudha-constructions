import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';
import './Login.css';

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: Math.random() * 5 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 8 + 10,
  opacity: Math.random() * 0.5 + 0.15,
}));

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate  = useNavigate();

  useEffect(() => {
    const move = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 900));
    const result = login(form.email, form.password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard');
    } else {
      setError('Invalid email or password. Try the demo credentials below.');
      setLoading(false);
    }
  };

  const fillDemo = (email, password) => {
    setForm({ email, password });
    setError('');
  };

  return (
    <div className="lr-root">

      {/* ── Mesh gradient that follows cursor ── */}
      <div
        className="lr-cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* ── Floating particles ── */}
      <div className="lr-particles" aria-hidden>
        {PARTICLES.map(p => (
          <span
            key={p.id}
            className="lr-particle"
            style={{
              width: p.size, height: p.size,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div className="lr-container">
      {/* ══════════ LEFT PANEL ══════════ */}
      <div className="lr-left">

        {/* big blurred orbs */}
        <div className="lr-orb lr-orb-1" />
        <div className="lr-orb lr-orb-2" />
        <div className="lr-orb lr-orb-3" />

        {/* grid overlay */}
        <div className="lr-grid" aria-hidden />

        <div className="lr-left-inner">

          {/* Logo stack */}
          <div className="lr-logo-stack">
            <div className="lr-ring lr-ring-outer" />
            <div className="lr-ring lr-ring-mid"   />
            <div className="lr-ring lr-ring-inner"  />
            <img src={logoImg} alt="Vasudha" className="lr-logo-img" />
            <div className="lr-logo-shine" />
          </div>

          <h1 className="lr-brand">Vasudha</h1>
          <p  className="lr-tagline">
            <span className="lr-tagline-line" />
            Construction Excellence
            <span className="lr-tagline-line" />
          </p>

          <ul className="lr-features">
            {[
              { icon: '🏗️', label: 'Premium Construction Materials' },
              { icon: '🪙', label: 'Earn Coins on Every Purchase'   },
              { icon: '📦', label: 'Real-Time Order Tracking'        },
              { icon: '🏆', label: 'Exclusive Member Rewards'        },
            ].map((f, i) => (
              <li
                key={i}
                className="lr-feature"
                style={{ animationDelay: `${0.9 + i * 0.12}s` }}
              >
                <span className="lr-feature-dot" />
                <span className="lr-feature-icon">{f.icon}</span>
                <span className="lr-feature-label">{f.label}</span>
              </li>
            ))}
          </ul>

          {/* bottom stat strip */}
          <div className="lr-stats">
            {[
              { val: '500+', lbl: 'Customers' },
              { val: '10K+', lbl: 'Orders'    },
              { val: '₹2Cr', lbl: 'Revenue'   },
            ].map(s => (
              <div key={s.lbl} className="lr-stat">
                <span className="lr-stat-val">{s.val}</span>
                <span className="lr-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* vertical divider */}
        <div className="lr-divider-line" />
      </div>

      {/* ══════════ RIGHT PANEL ══════════ */}
      <div className="lr-right">
        <div className="lr-form-wrap">

          {/* top badge */}
          <div className="lr-badge">
            <span className="lr-badge-dot" />
            Secure Login
          </div>

          <div className="lr-form-head">
            <h2>Welcome Back</h2>
            <p>Sign in to your Vasudha account</p>
          </div>

          {error && (
            <div className="lr-error" key={error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="lr-form" noValidate>

            {/* Email */}
            <div className={`lr-field ${focused === 'email' ? 'lr-field--focused' : ''} ${form.email ? 'lr-field--filled' : ''}`}>
              <label className="lr-label">Email Address</label>
              <div className="lr-input-box">
                <svg className="lr-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  autoComplete="email"
                />
                <div className="lr-input-line" />
              </div>
            </div>

            {/* Password */}
            <div className={`lr-field ${focused === 'password' ? 'lr-field--focused' : ''} ${form.password ? 'lr-field--filled' : ''}`}>
              <label className="lr-label">Password</label>
              <div className="lr-input-box">
                <svg className="lr-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  autoComplete="current-password"
                />
                <div className="lr-input-line" />
              </div>
            </div>

            <button
              type="submit"
              className={`lr-submit ${loading ? 'lr-submit--loading' : ''}`}
              disabled={loading}
            >
              <span className="lr-submit-bg" />
              <span className="lr-submit-shine" />
              {loading ? (
                <span className="lr-submit-inner">
                  <span className="lr-spinner" />
                  Authenticating…
                </span>
              ) : (
                <span className="lr-submit-inner">
                  Sign In
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              )}
            </button>
          </form>

          <p className="lr-switch">
            No account yet?&nbsp;
            <Link to="/signup">Create one free</Link>
          </p>

          {/* Demo credentials */}
          <div className="lr-demo-section">
            <div className="lr-demo-label">
              <span />Quick demo access<span />
            </div>
            <div className="lr-demo-grid">
              <button
                type="button"
                className="lr-demo-btn"
                onClick={() => fillDemo('ravi@example.com', 'pass123')}
              >
                <div className="lr-demo-avatar lr-demo-avatar--customer">R</div>
                <div className="lr-demo-info">
                  <span className="lr-demo-role">Customer</span>
                  <span className="lr-demo-cred">ravi@example.com</span>
                </div>
                <svg className="lr-demo-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
              </button>

              <button
                type="button"
                className="lr-demo-btn"
                onClick={() => fillDemo('admin@vasudha.com', 'admin123')}
              >
                <div className="lr-demo-avatar lr-demo-avatar--admin">A</div>
                <div className="lr-demo-info">
                  <span className="lr-demo-role">Admin</span>
                  <span className="lr-demo-cred">admin@vasudha.com</span>
                </div>
                <svg className="lr-demo-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
              </button>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}
