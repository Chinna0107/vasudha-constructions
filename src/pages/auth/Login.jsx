import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';
import './Auth.css';

const FEATURES = [
  { icon: '🏗️', label: 'Premium Construction Materials' },
  { icon: '🪙', label: 'Earn Coins on Every Purchase' },
  { icon: '📦', label: 'Real-Time Order Tracking' },
  { icon: '🏆', label: 'Exclusive Member Rewards' },
];

const STATS = [
  { val: '500+', lbl: 'Customers' },
  { val: '10K+', lbl: 'Orders' },
  { val: '₹2Cr', lbl: 'Revenue' },
];

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPass, setShowPass] = useState(false);
  const glowRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 800));
    const result = login(form.email, form.password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard');
    } else {
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  const fillDemo = (email, password) => { setForm({ email, password }); setError(''); };

  return (
    <div className="auth-root">
      <div className="auth-glow" ref={glowRef} />

      <div className="auth-container">

        {/* ── Left panel ── */}
        <div className="auth-left">
          <div className="auth-left-orb auth-left-orb-1" />
          <div className="auth-left-orb auth-left-orb-2" />
          <div className="auth-grid" />

          <div className="auth-left-inner">
            <div className="auth-logo-wrap">
              <div className="auth-ring auth-ring-1" />
              <div className="auth-ring auth-ring-2" />
              <div className="auth-ring auth-ring-3" />
              <img src={logoImg} alt="Vasudha" className="auth-logo" />
            </div>

            <h1 className="auth-brand">Vasudha</h1>
            <p className="auth-tagline">
              <span className="auth-tagline-line" />
              Construction Excellence
              <span className="auth-tagline-line" />
            </p>

            <ul className="auth-features">
              {FEATURES.map((f, i) => (
                <li key={i} className="auth-feature" style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
                  <span className="auth-feature-dot" />
                  <span className="auth-feature-icon">{f.icon}</span>
                  <span className="auth-feature-label">{f.label}</span>
                </li>
              ))}
            </ul>

            <div className="auth-stats">
              {STATS.map(s => (
                <div key={s.lbl} className="auth-stat">
                  <span className="auth-stat-val">{s.val}</span>
                  <span className="auth-stat-lbl">{s.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            <div className="auth-badge">
              <span className="auth-badge-dot" />
              Secure Login
            </div>

            <div className="auth-head">
              <h2>Welcome Back</h2>
              <p>Sign in to your Vasudha account</p>
            </div>

            {error && (
              <div className="auth-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className={`auth-field ${focused === 'email' ? 'focused' : ''}`}>
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className={`auth-field ${focused === 'password' ? 'focused' : ''}`}>
                <label>Password</label>
                <div className="auth-input-wrap">
                  <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onFocus={() => setFocused('password')}
                    onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    autoComplete="current-password"
                    required
                  />
                  <button type="button" className="auth-eye" onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                    {showPass
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                <span className="auth-submit-shine" />
                {loading ? (
                  <span className="auth-submit-inner">
                    <span className="auth-spinner" /> Authenticating…
                  </span>
                ) : (
                  <span className="auth-submit-inner">
                    Sign In
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                )}
              </button>
            </form>

            <p className="auth-switch">
              No account yet? <Link to="/signup">Create one free</Link>
            </p>

            <div className="auth-demo">
              <div className="auth-demo-label"><span />Quick demo access<span /></div>
              <div className="auth-demo-grid">
                <button type="button" className="auth-demo-btn" onClick={() => fillDemo('ravi@example.com', 'pass123')}>
                  <div className="auth-demo-avatar customer">R</div>
                  <div className="auth-demo-info">
                    <span className="auth-demo-role">Customer</span>
                    <span className="auth-demo-cred">ravi@example.com</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
                </button>
                <button type="button" className="auth-demo-btn" onClick={() => fillDemo('admin@vasudha.com', 'admin123')}>
                  <div className="auth-demo-avatar admin">A</div>
                  <div className="auth-demo-info">
                    <span className="auth-demo-role">Admin</span>
                    <span className="auth-demo-cred">admin@vasudha.com</span>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17 17 7M7 7h10v10"/></svg>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
