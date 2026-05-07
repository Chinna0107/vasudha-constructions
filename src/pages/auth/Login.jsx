import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpeg';
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiArrowRightLine, RiShieldCheckLine } from 'react-icons/ri';
import './Auth.css';

const FEATURES = [
  { icon: '🏗️', label: 'Premium Construction Materials' },
  { icon: '🪙', label: 'Earn Coins on Every Purchase' },
  { icon: '📦', label: 'Real-Time Order Tracking' },
  { icon: '🏆', label: 'Exclusive Member Rewards' },
];

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [fpStep, setFpStep] = useState('');
  const [fpEmail, setFpEmail] = useState('');
  const [fpOtp, setFpOtp] = useState('');
  const [fpNew, setFpNew] = useState('');
  const [fpConfirm, setFpConfirm] = useState('');
  const [fpMsg, setFpMsg] = useState({ type: '', text: '' });
  const [fpLoading, setFpLoading] = useState(false);
  const glowRef = useRef(null);
  const { login, forgotPassword, resetPassword } = useAuth();
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
    const result = await login(form.email, form.password);
    if (result.success) navigate(result.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard');
    else { setError(result.msg || 'Invalid email or password.'); setLoading(false); }
  };

  const handleForgotEmail = async (e) => {
    e.preventDefault();
    setFpLoading(true); setFpMsg({ type: '', text: '' });
    const result = await forgotPassword(fpEmail);
    setFpLoading(false);
    if (result.success) setFpStep('otp');
    else setFpMsg({ type: 'error', text: result.msg });
  };

  const handleForgotOtp = (e) => {
    e.preventDefault();
    if (fpOtp.length !== 6) { setFpMsg({ type: 'error', text: 'Enter the 6-digit OTP' }); return; }
    setFpStep('reset'); setFpMsg({ type: '', text: '' });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (fpNew !== fpConfirm) { setFpMsg({ type: 'error', text: 'Passwords do not match' }); return; }
    setFpLoading(true); setFpMsg({ type: '', text: '' });
    const result = await resetPassword(fpEmail, fpOtp, fpNew);
    setFpLoading(false);
    if (result.success) {
      setFpMsg({ type: 'success', text: 'Password reset! You can now log in.' });
      setTimeout(() => { setFpStep(''); setFpEmail(''); setFpOtp(''); setFpNew(''); setFpConfirm(''); }, 2000);
    } else setFpMsg({ type: 'error', text: result.msg });
  };

  return (
    <>
      <div className="auth-root">
        <div className="auth-glow" ref={glowRef} />

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
              <span className="auth-tagline-line" />Construction Excellence<span className="auth-tagline-line" />
            </p>
            <ul className="auth-features">
              {FEATURES.map((f, i) => (
                <li key={i} className="auth-feature" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                  <span className="auth-feature-dot" />
                  <span className="auth-feature-icon">{f.icon}</span>
                  <span className="auth-feature-label">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="auth-right">
          <div className="auth-form-wrap">

            <div className="auth-badge">
              <RiShieldCheckLine size={14} />
              Secure Login
            </div>

            <div className="auth-head">
              <h2>Welcome Back</h2>
              <p>Sign in to your <span className="auth-head-brand">Vasudha</span> account</p>
            </div>

            {error && (
              <div className="auth-error">
                <RiShieldCheckLine size={16} />{error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className={`auth-field ${focused === 'email' ? 'focused' : ''}`}>
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <RiMailLine className="auth-input-icon" size={18} />
                  <input type="email" placeholder="you@example.com" value={form.email}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, email: e.target.value })} autoComplete="email" required />
                </div>
              </div>

              <div className={`auth-field ${focused === 'password' ? 'focused' : ''}`}>
                <label>Password</label>
                <div className="auth-input-wrap">
                  <RiLockLine className="auth-input-icon" size={18} />
                  <input type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                    onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                    onChange={e => setForm({ ...form, password: e.target.value })} autoComplete="current-password" required />
                  <button type="button" className="auth-eye" onClick={() => setShowPass(p => !p)} tabIndex={-1}>
                    {showPass ? <RiEyeOffLine size={17} /> : <RiEyeLine size={17} />}
                  </button>
                </div>
              </div>

              <div className="auth-forgot">
                <button type="button" onClick={() => setFpStep('email')}>Forgot Password?</button>
              </div>

              <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                <span className="auth-submit-shine" />
                <span className="auth-submit-inner">
                  {loading ? <><span className="auth-spinner" /> Authenticating…</> : <>Sign In <RiArrowRightLine size={18} /></>}
                </span>
              </button>
            </form>

            <p className="auth-switch">No account yet? <Link to="/signup">Create one free</Link></p>

          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {fpStep && (
        <div className="modal-overlay" onClick={() => setFpStep('')}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{fpStep === 'email' ? 'Forgot Password' : fpStep === 'otp' ? 'Enter OTP' : 'Reset Password'}</h3>
              <button className="modal-close" onClick={() => setFpStep('')}>✕</button>
            </div>
            {fpMsg.text && (
              <div className={fpMsg.type === 'success' ? 'success-msg' : 'auth-error'} style={{ marginBottom: 16 }}>
                {fpMsg.text}
              </div>
            )}
            {fpStep === 'email' && (
              <form onSubmit={handleForgotEmail}>
                <div className="field">
                  <label>Registered Email</label>
                  <input type="email" placeholder="you@example.com" value={fpEmail} onChange={e => setFpEmail(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-gold btn-full" disabled={fpLoading}>
                  {fpLoading ? 'Sending OTP…' : 'Send OTP'}
                </button>
              </form>
            )}
            {fpStep === 'otp' && (
              <form onSubmit={handleForgotOtp}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>OTP sent to <strong style={{ color: '#c7c362' }}>{fpEmail}</strong></p>
                <div className="field">
                  <label>6-Digit OTP</label>
                  <input type="text" inputMode="numeric" maxLength={6} placeholder="000000" value={fpOtp} onChange={e => setFpOtp(e.target.value.replace(/\D/g, ''))} required />
                </div>
                <button type="submit" className="btn btn-gold btn-full">Verify OTP</button>
              </form>
            )}
            {fpStep === 'reset' && (
              <form onSubmit={handleResetPassword}>
                <div className="field">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••" value={fpNew} onChange={e => setFpNew(e.target.value)} required />
                </div>
                <div className="field">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••" value={fpConfirm} onChange={e => setFpConfirm(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-gold btn-full" disabled={fpLoading}>
                  {fpLoading ? 'Resetting…' : 'Reset Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
