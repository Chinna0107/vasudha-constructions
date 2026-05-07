import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpeg';
import './Layout.css';

const customerNav = [
  { to: '/customer/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/customer/wallet', icon: '◈', label: 'Wallet' },
  { to: '/customer/orders', icon: '◫', label: 'Orders' },
  { to: '/customer/profile', icon: '◉', label: 'Profile' },
];

const adminNav = [
  { to: '/admin/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/admin/customers', icon: '◎', label: 'Customers' },
  { to: '/admin/add-coins', icon: '◈', label: 'Add Coins' },
  { to: '/admin/reports', icon: '◫', label: 'Reports' },
  { to: '/admin/profile', icon: '◉', label: 'Profile' },
];

export default function Layout({ children, role }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const nav = role === 'admin' ? adminNav : customerNav;
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">
      {/* Mobile top bar */}
      <header className="mobile-topbar">
        <button className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <div className="mobile-logo">
          <img src={logoImg} alt="Vasudha" className="s-logo-img" />
          <span className="s-logo-name">Vasudha</span>
        </div>
        <div className="user-avatar" style={{ width: 34, height: 34, fontSize: 13 }}>{user?.name?.[0]?.toUpperCase()}</div>
      </header>

      {/* Overlay */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <img src={logoImg} alt="Vasudha" className="s-logo-img" />
          <div>
            <span className="s-logo-name">Vasudha</span>
            <span className="s-logo-tag">{role === 'admin' ? 'Admin Panel' : 'Customer Panel'}</span>
          </div>
          <button className="sidebar-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
        </div>
        <nav className="sidebar-nav">
          {nav.map(item => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.[0]?.toUpperCase()}</div>
            <div>
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{role}</div>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>⏻ Logout</button>
        </div>
      </aside>

      <main className="main-content">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav">
        {nav.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
