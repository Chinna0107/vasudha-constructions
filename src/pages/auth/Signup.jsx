import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';
import './Login.css';
import './Signup.css';

const FIELDS = [
  { key: 'name',     label: 'Full Name',        type: 'text',     placeholder: 'John Doe',        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
  { key: 'email',    label: 'Email Address',     type: 'email',    placeholder: 'you@example.com', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
  { key: 'phone',    label: 'Phone Number',      type: 'tel',      placeholder: '9876543210',      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.61 19a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3.09 4.18 2 2 0 0 1 5.07 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L9.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
  { key: 'password', label: 'Password',          type: 'password', placeholder: '••••••••',        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> },
  { key: 'confirm',  label: 'Confirm Password',  type: 'password', placeholder: '••••••••',        icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
];

export default function Signup() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const { signup }  = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = signup(form.name, form.email, form.password, form.phone);
    if (result.success) navigate('/customer/dashboard');
    else { setError(result.msg); setLoading(false); }
  };

  return (
    <div className="lr-root">
      <div className="lr-cursor-glow" style={{ display: 'none' }} />

      <div className="lr-particles" aria-hidden>
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} className="lr-particle" style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 12}s`,
            animationDuration: `${Math.random() * 8 + 10}s`,
            opacity: Math.random() * 0.5 + 0.15,
          }} />
        ))}
      </div>

      {/* Left */}
      <div className="lr-container">
      <div className="lr-left">
        <div className="lr-orb lr-orb-1" />
        <div className="lr-orb lr-orb-2" />
        <div className="lr-orb lr-orb-3" />
        <div className="lr-grid" aria-hidden />

        <div className="lr-left-inner">
          <div className="lr-logo-stack">
            <div className="lr-ring lr-ring-outer" />
            <div className="lr-ring lr-ring-mid" />
            <div className="lr-ring lr-ring-inner" />
            <img src={logoImg} alt="Vasudha" className="lr-logo-img" />
            <div className="lr-logo-shine" />
          </div>

          <h1 className="lr-brand">Vasudha</h1>
          <p className="lr-tagline">
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
              <li key={i} className="lr-feature" style={{ animationDelay: `${0.9 + i * 0.12}s` }}>
                <span className="lr-feature-dot" />
                <span className="lr-feature-icon">{f.icon}</span>
                <span className="lr-feature-label">{f.label}</span>
              </li>
            ))}
          </ul>

          <div className="lr-stats">
            {[{ val: '500+', lbl: 'Customers' }, { val: '10K+', lbl: 'Orders' }, { val: '₹2Cr', lbl: 'Revenue' }].map(s => (
              <div key={s.lbl} className="lr-stat">
                <span className="lr-stat-val">{s.val}</span>
                <span className="lr-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lr-divider-line" />
      </div>

      {/* Right */}
      <div className="lr-right su-right">
        <div className="lr-form-wrap">
          <div className="lr-badge">
            <span className="lr-badge-dot" />
            Free Account
          </div>

          <div className="lr-form-head">
            <h2>Create Account</h2>
            <p>Join thousands of Vasudha customers</p>
          </div>

          {error && (
            <div className="lr-error" key={error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="lr-form su-form" noValidate>
            {FIELDS.map((f) => (
              <div
                key={f.key}
                className={`lr-field ${focused === f.key ? 'lr-field--focused' : ''} ${form[f.key] ? 'lr-field--filled' : ''}`}
              >
                <label className="lr-label">{f.label}</label>
                <div className="lr-input-box">
                  <span className="lr-input-icon">{f.icon}</span>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onFocus={() => setFocused(f.key)}
                    onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                    required
                  />
                  <div className="lr-input-line" />
                </div>
              </div>
            ))}

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
                  Creating account…
                </span>
              ) : (
                <span className="lr-submit-inner">
                  Create Account
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              )}
            </button>
          </form>

          <p className="lr-switch" style={{ marginTop: 20 }}>
            Already have an account?&nbsp;<Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
