import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const logoImg = '/logo.jpeg';
import { RiMailLine, RiLockLine, RiUserLine, RiPhoneLine, RiMapPinLine, RiArrowRightLine, RiCheckLine, RiShieldCheckLine } from 'react-icons/ri';
import './Auth.css';

export default function Signup() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [form, setForm] = useState({ fullName: '', mobile: '', address: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState('');
  const { sendOtp, verifyOtp, signup } = useAuth();
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    const result = await sendOtp(email);
    setLoading(false);
    if (result.success) setStep('otp');
    else setError(result.msg);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setError('Enter the 6-digit OTP');
    setLoading(true); setError('');
    const result = await verifyOtp(email, otp);
    setLoading(false);
    if (result.success) setStep('details');
    else setError(result.msg);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true); setError('');
    const result = await signup({ email, otp, fullName: form.fullName, mobile: form.mobile, address: form.address, password: form.password });
    if (result.success) navigate('/customer/dashboard');
    else { setError(result.msg); setLoading(false); }
  };

  const stepIndex = { email: 0, otp: 1, details: 2 }[step];
  const steps = ['Email', 'Verify', 'Details'];

  const field = (key, label, type, placeholder, Icon) => (
    <div key={key} className={`auth-field auth-field--sm ${focused === key ? 'focused' : ''}`}>
      <label>{label}</label>
      <div className="auth-input-wrap">
        {Icon && <Icon className="auth-input-icon" size={17} />}
        <input type={type} placeholder={placeholder} value={form[key]}
          onFocus={() => setFocused(key)} onBlur={() => setFocused('')}
          onChange={e => setForm({ ...form, [key]: e.target.value })} required />
      </div>
    </div>
  );

  return (
    <div className="auth-root">

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
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="auth-right auth-right--scroll">
        <div className="auth-form-wrap">

          <div className="auth-badge">
            <RiShieldCheckLine size={14} />
            Free Account
          </div>

          <div className="auth-head">
            <h2>Create Account</h2>
            <p>Join thousands of <span className="auth-head-brand">Vasudha</span> customers</p>
          </div>

          {/* Step indicator */}
          <div className="auth-steps">
            {steps.map((s, i) => (
              <div key={s} className="auth-step-wrap">
                <div className={`auth-step-node ${i < stepIndex ? 'done' : i === stepIndex ? 'active' : ''}`}>
                  {i < stepIndex ? <RiCheckLine size={14} /> : <span>{i + 1}</span>}
                </div>
                <span className={`auth-step-lbl ${i === stepIndex ? 'active' : ''}`}>{s}</span>
                {i < steps.length - 1 && <div className={`auth-step-line ${i < stepIndex ? 'done' : ''}`} />}
              </div>
            ))}
          </div>

          {error && (
            <div className="auth-error">
              <RiShieldCheckLine size={16} />{error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleSendOtp} noValidate>
              <div className={`auth-field ${focused === 'email' ? 'focused' : ''}`}>
                <label>Email Address</label>
                <div className="auth-input-wrap">
                  <RiMailLine className="auth-input-icon" size={18} />
                  <input type="email" placeholder="you@example.com" value={email}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    onChange={e => setEmail(e.target.value)} required />
                </div>
              </div>
              <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                <span className="auth-submit-shine" />
                <span className="auth-submit-inner">
                  {loading ? <><span className="auth-spinner" /> Sending OTP…</> : <>Send OTP <RiArrowRightLine size={18} /></>}
                </span>
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} noValidate>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                OTP sent to <strong style={{ color: '#c7c362' }}>{email}</strong>
              </p>
              <div className={`auth-field ${focused === 'otp' ? 'focused' : ''}`}>
                <label>6-Digit OTP</label>
                <div className="auth-input-wrap">
                  <RiShieldCheckLine className="auth-input-icon" size={18} />
                  <input type="text" inputMode="numeric" maxLength={6} placeholder="000000"
                    value={otp} onFocus={() => setFocused('otp')} onBlur={() => setFocused('')}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} required
                    style={{ letterSpacing: '0.3em', fontSize: 20, textAlign: 'center' }} />
                </div>
              </div>
              <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                <span className="auth-submit-shine" />
                <span className="auth-submit-inner">
                  {loading ? <><span className="auth-spinner" /> Verifying…</> : <>Verify OTP <RiArrowRightLine size={18} /></>}
                </span>
              </button>
              <p className="auth-switch" style={{ marginTop: 14 }}>
                Wrong email?{' '}
                <button type="button" style={{ background: 'none', border: 'none', color: '#c7c362', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}
                  onClick={() => { setStep('email'); setOtp(''); setError(''); }}>Go back</button>
              </p>
            </form>
          )}

          {/* Step 3: Details */}
          {step === 'details' && (
            <form onSubmit={handleSignup} noValidate>
              {field('fullName', 'Full Name', 'text', 'John Doe', RiUserLine)}
              {field('mobile', 'Mobile Number', 'tel', '9876543210', RiPhoneLine)}
              {field('address', 'Address', 'text', '123 Main St, City', RiMapPinLine)}
              {field('password', 'Password', 'password', '••••••••', RiLockLine)}
              {field('confirm', 'Confirm Password', 'password', '••••••••', RiLockLine)}
              <button type="submit" className={`auth-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                <span className="auth-submit-shine" />
                <span className="auth-submit-inner">
                  {loading ? <><span className="auth-spinner" /> Creating account…</> : <>Create Account <RiArrowRightLine size={18} /></>}
                </span>
              </button>
            </form>
          )}

          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>

        </div>
      </div>
    </div>
  );
}
