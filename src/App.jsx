import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

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

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/customer/dashboard'} /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/customer/dashboard" /> : <Signup />} />

      <Route path="/customer/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
      <Route path="/customer/wallet" element={<ProtectedRoute role="customer"><Wallet /></ProtectedRoute>} />
      <Route path="/customer/orders" element={<ProtectedRoute role="customer"><Orders /></ProtectedRoute>} />
      <Route path="/customer/profile" element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />

      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute role="admin"><Customers /></ProtectedRoute>} />
      <Route path="/admin/add-coins" element={<ProtectedRoute role="admin"><AddCoins /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfile /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
