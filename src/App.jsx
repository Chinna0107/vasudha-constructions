import { BrowserRouter, Routes, Route, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import logoImg from './assets/logo.jpeg';
import './components/Layout.css';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import CustomerDashboard from './pages/customer/Dashboard';
import Wallet from './pages/customer/Wallet';
import Orders from './pages/customer/Orders';
import CustomerProfile from './pages/customer/Profile';

import AdminDashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import AddCoins from './pages/admin/AddCoins';
import Reports from './pages/admin/Reports';
import AdminProfile from './pages/admin/Profile';

const customerNav = [
  {
    to: '/customer/dashboard', label: 'Dashboard',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    to: '/customer/wallet', label: 'Wallet',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><circle cx="18" cy="12" r="3"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><circle cx="18" cy="12" r="3" fill="currentColor"/></svg>,
  },
  {
    to: '/customer/orders', label: 'Orders',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" fill="rgba(199,195,98,0.15)"/><rect x="9" y="3" width="6" height="4" rx="1" fill="currentColor" stroke="none"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  },
  {
    to: '/customer/profile', label: 'Profile',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
];

const adminNav = [
  {
    to: '/admin/dashboard', label: 'Dashboard',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    to: '/admin/customers', label: 'Customers',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="7" r="4" fill="currentColor"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.87"/></svg>,
  },
  {
    to: '/admin/add-coins', label: 'Add Coins',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" fill="rgba(199,195,98,0.2)"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  },
  {
    to: '/admin/reports', label: 'Reports',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    to: '/admin/profile', label: 'Profile',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" fill="currentColor"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  },
];

const authPaths = ['/login', '/signup'];

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isAuthPage = authPaths.includes(location.pathname);
  const nav = user?.role === 'admin' ? adminNav : customerNav;

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="layout">

      {/* Desktop sidebar — only when logged in and not on auth pages */}
      {!isAuthPage && user && !isMobile && (
        <aside className="sidebar">
          <div className="sidebar-logo">
            <img src={logoImg} alt="Vasudha" className="s-logo-img" />
            <div>
              <span className="s-logo-name">Vasudha</span>
              <span className="s-logo-tag">{user.role === 'admin' ? 'Admin Panel' : 'Customer Panel'}</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            {nav.map(item => (
              <NavLink key={item.to} to={item.to}
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
                <div className="user-role">{user?.role}</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>⏻ Logout</button>
          </div>
        </aside>
      )}

      {/* Page content */}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/customer/dashboard" /> : <Signup />} />

          <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer/wallet"    element={<ProtectedRoute role="customer"><Wallet /></ProtectedRoute>} />
          <Route path="/customer/orders"    element={<ProtectedRoute role="customer"><Orders /></ProtectedRoute>} />
          <Route path="/customer/profile"   element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />

          <Route path="/admin/dashboard"  element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/customers"  element={<ProtectedRoute role="admin"><Customers /></ProtectedRoute>} />
          <Route path="/admin/add-coins"  element={<ProtectedRoute role="admin"><AddCoins /></ProtectedRoute>} />
          <Route path="/admin/reports"    element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
          <Route path="/admin/profile"    element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      {/* Mobile bottom nav — fixed, renders once, never remounts */}
      {!isAuthPage && user && isMobile && (
        <nav className="bottom-nav">
          {nav.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) => `bn-item ${isActive ? 'bn-item--active' : ''}`}>
              {({ isActive }) => (
                <>
                  <span className="bn-pill" />
                  <span className="bn-icon">{isActive ? item.activeIcon : item.icon}</span>
                  <span className="bn-label">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      )}

    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
