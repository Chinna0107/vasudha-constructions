const isProd = import.meta.env.PROD;

export const API_URL = isProd
  ? 'https://vasudhabe.vercel.app'
  : (import.meta.env.VITE_API_URL || 'http://localhost:3000');
