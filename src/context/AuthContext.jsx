import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = { email: 'admin@vasudha.com', password: 'admin123' };

const INITIAL_CUSTOMERS = [
  { id: 1, name: 'Ravi Kumar', email: 'ravi@example.com', password: 'pass123', phone: '9876543210', coins: 1200, joined: '2024-01-15' },
  { id: 2, name: 'Priya Sharma', email: 'priya@example.com', password: 'pass123', phone: '9123456789', coins: 850, joined: '2024-03-22' },
];

const INITIAL_ORDERS = [
  { id: 'ORD001', customerId: 1, item: 'Premium Cement (50 bags)', amount: 18500, coins: 185, date: '2024-11-10', status: 'Delivered' },
  { id: 'ORD002', customerId: 1, item: 'Steel Rods (1 ton)', amount: 62000, coins: 620, date: '2024-12-05', status: 'Delivered' },
  { id: 'ORD003', customerId: 2, item: 'River Sand (5 loads)', amount: 12000, coins: 120, date: '2025-01-18', status: 'Delivered' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [orders] = useState(INITIAL_ORDERS);

  const login = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({ role: 'admin', name: 'Admin', email });
      return { success: true, role: 'admin' };
    }
    const customer = customers.find(c => c.email === email && c.password === password);
    if (customer) {
      setUser({ ...customer, role: 'customer' });
      return { success: true, role: 'customer' };
    }
    return { success: false };
  };

  const signup = (name, email, password, phone) => {
    if (customers.find(c => c.email === email)) return { success: false, msg: 'Email already exists' };
    const newCustomer = { id: Date.now(), name, email, password, phone, coins: 0, joined: new Date().toISOString().split('T')[0] };
    setCustomers(prev => [...prev, newCustomer]);
    setUser({ ...newCustomer, role: 'customer' });
    return { success: true };
  };

  const logout = () => setUser(null);

  const addCoins = (customerId, amount) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, coins: c.coins + amount } : c));
    if (user?.id === customerId) setUser(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const getCustomerOrders = (id) => orders.filter(o => o.customerId === id);

  return (
    <AuthContext.Provider value={{ user, customers, orders, login, signup, logout, addCoins, getCustomerOrders }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
