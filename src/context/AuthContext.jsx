import { createContext, useContext, useState } from 'react';
import { invalidateCache } from '../hooks/useFetch';
import { API_URL } from '../config';

const AuthContext = createContext(null);
const API = API_URL;
const token = () => localStorage.getItem('vasudha_token');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vasudha_user')); } catch { return null; }
  });

  const setAndStore = (u) => {
    const normalized = { ...u, name: u.full_name || u.name };
    setUser(normalized);
    localStorage.setItem('vasudha_user', JSON.stringify(normalized));
    return normalized;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, msg: data.error };
    localStorage.setItem('vasudha_token', data.token);
    const u = setAndStore(data.user);
    return { success: true, role: u.role };
  };

  const sendOtp = async (email) => {
    const res = await fetch(`${API}/auth/send-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { success: res.ok, msg: data.error || data.message };
  };

  const verifyOtp = async (email, otp) => {
    const res = await fetch(`${API}/auth/verify-otp`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    return { success: res.ok, msg: data.error || data.message };
  };

  const signup = async (payload) => {
    const res = await fetch(`${API}/auth/signup`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, msg: data.error };
    localStorage.setItem('vasudha_token', data.token);
    setAndStore(data.user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('vasudha_token');
    localStorage.removeItem('vasudha_user');
    setUser(null);
  };

  const updateProfile = async (id, payload) => {
    const res = await fetch(`${API}/customers/${id}/profile`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, msg: data.error };
    setAndStore(data);
    invalidateCache(`/customers/${id}`);
    return { success: true };
  };

  const redeemCoins = async (amount) => {
    const res = await fetch(`${API}/customers/${user.id}/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    if (!res.ok) return { success: false, msg: data.error };
    setAndStore(data);
    invalidateCache(`/customers/${user.id}`);
    return { success: true };
  };

  const addCoins = async (customerId, amount) => {
    const res = await fetch(`${API}/customers/${customerId}/coins`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ amount }),
    });
    if (res.ok) invalidateCache('/customers');
    return res.ok;
  };

  const blockCustomer = async (customerId, block) => {
    const res = await fetch(`${API}/customers/${customerId}/block`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ block }),
    });
    if (res.ok) invalidateCache('/customers');
    return res.ok;
  };

  const forgotPassword = async (email) => {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { success: res.ok, msg: data.error || data.message };
  };

  const resetPassword = async (email, otp, newPassword) => {
    const res = await fetch(`${API}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json();
    return { success: res.ok, msg: data.error || data.message };
  };

  const changePassword = async (currentPassword, newPassword) => {
    const res = await fetch(`${API}/auth/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, currentPassword, newPassword }),
    });
    const data = await res.json();
    return { success: res.ok, msg: data.error || data.message };
  };

  return (
    <AuthContext.Provider value={{ user, login, sendOtp, verifyOtp, signup, logout, updateProfile, redeemCoins, addCoins, blockCustomer, forgotPassword, resetPassword, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
