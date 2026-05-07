import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpeg';
import './Layout.css';

const customerNav = [
  { to: '/customer/dashboard', icon: '⊞', label: 'Dashboard' },
  { to: '/customer/wallet', icon: '◈', label: 'Wallet' },
  { to: '/customer/orders', icon: '◫', label: 'Past Orders' },
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

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logoImg} alt="Vasudha" className="s-logo-img" />
          <div>
            <span className="s-logo-name">Vasudha</span>
            <span className="s-logo-tag">{role === 'admin' ? 'Admin Panel' : 'Customer Panel'}</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {nav.map(item => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
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
    </div>
  );
}
