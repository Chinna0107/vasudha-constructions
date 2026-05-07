import { BrowserRouter, Routes, Route, Navigate, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
const logoImg = '/logo.jpeg';
import './components/Layout.css';

import {
  RiDashboardFill, RiDashboardLine,
  RiWallet3Fill, RiWallet3Line,
  RiUserFill, RiUserLine,
  RiTeamFill, RiTeamLine,
  RiCoinsFill, RiCoinsLine,
  RiBarChartFill, RiBarChartLine,
  RiLogoutBoxLine,
  RiShieldUserFill,
  RiImageFill, RiImageLine,
  RiPriceTag3Fill, RiPriceTag3Line,
} from 'react-icons/ri';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import CustomerDashboard from './pages/customer/Dashboard';
import Wallet from './pages/customer/Wallet';
import CustomerProfile from './pages/customer/Profile';
import CustomerOffers from './pages/customer/Offers';
import AdminDashboard from './pages/admin/Dashboard';
import Customers from './pages/admin/Customers';
import AddCoins from './pages/admin/AddCoins';
import Reports from './pages/admin/Reports';
import AdminProfile from './pages/admin/Profile';
import AdminOffers from './pages/admin/Offers';

const customerNav = [
  { to: '/customer/dashboard', label: 'Dashboard', icon: <RiDashboardLine size={20}/>, activeIcon: <RiDashboardFill size={20}/> },
  { to: '/customer/offers',    label: 'Offers',    icon: <RiPriceTag3Line size={20}/>, activeIcon: <RiPriceTag3Fill size={20}/> },
  { to: '/customer/wallet',    label: 'Wallet',    icon: <RiWallet3Line size={20}/>,   activeIcon: <RiWallet3Fill size={20}/> },
  { to: '/customer/profile',   label: 'Profile',   icon: <RiUserLine size={20}/>,      activeIcon: <RiUserFill size={20}/> },
];

const adminNav = [
  { to: '/admin/dashboard',  label: 'Dashboard', icon: <RiDashboardLine size={20}/>, activeIcon: <RiDashboardFill size={20}/> },
  { to: '/admin/customers',  label: 'Customers', icon: <RiTeamLine size={20}/>,      activeIcon: <RiTeamFill size={20}/> },
  { to: '/admin/add-coins',  label: 'Add Coins', icon: <RiCoinsLine size={20}/>,     activeIcon: <RiCoinsFill size={20}/> },
  { to: '/admin/offers',     label: 'Offers',    icon: <RiImageLine size={20}/>,     activeIcon: <RiImageFill size={20}/> },
  { to: '/admin/reports',    label: 'Reports',   icon: <RiBarChartLine size={20}/>,  activeIcon: <RiBarChartFill size={20}/> },
  { to: '/admin/profile',    label: 'Profile',   icon: <RiUserLine size={20}/>,      activeIcon: <RiUserFill size={20}/> },
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
  const displayName = user?.full_name || user?.name || '';

  return (
    <div className="layout">

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
                {({ isActive }) => (
                  <>
                    <span className="nav-icon">{isActive ? item.activeIcon : item.icon}</span>
                    <span>{item.label}</span>
                    {isActive && <span className="nav-active-dot" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {user.role === 'admin'
                  ? <RiShieldUserFill size={18} />
                  : displayName?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="user-name">{displayName}</div>
                <div className="user-role">{user.role}</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <RiLogoutBoxLine size={15} style={{ marginRight: 6 }} />
              Logout
            </button>
          </div>
        </aside>
      )}

      <main className={`main-content${(!isAuthPage && user && !isMobile) ? ' has-sidebar' : ''}`}>
        <Routes>
          <Route path="/login"  element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/customer/dashboard" /> : <Signup />} />

          <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
          <Route path="/customer/offers"    element={<ProtectedRoute role="customer"><CustomerOffers /></ProtectedRoute>} />
          <Route path="/customer/wallet"    element={<ProtectedRoute role="customer"><Wallet /></ProtectedRoute>} />
          <Route path="/customer/profile"   element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/customers" element={<ProtectedRoute role="admin"><Customers /></ProtectedRoute>} />
          <Route path="/admin/add-coins" element={<ProtectedRoute role="admin"><AddCoins /></ProtectedRoute>} />
          <Route path="/admin/offers"    element={<ProtectedRoute role="admin"><AdminOffers /></ProtectedRoute>} />
          <Route path="/admin/reports"   element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
          <Route path="/admin/profile"   element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

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
