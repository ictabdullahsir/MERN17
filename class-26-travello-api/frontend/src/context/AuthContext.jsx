import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('travello_token'));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('travello_user')) || null; } catch { return null; }
  });

  useEffect(() => {
    if (!token) return;
    authApi.me()
      .then(({ data }) => {
        const u = data.data.user;
        setUser(u);
        localStorage.setItem('travello_user', JSON.stringify(u));
      })
      .catch(() => logout());
  }, [token]);

  function login(data) {
    localStorage.setItem('travello_token', data.token);
    localStorage.setItem('travello_user', JSON.stringify(data.data.user));
    setToken(data.token); setUser(data.data.user);
  }
  function logout() {
    localStorage.removeItem('travello_token');
    localStorage.removeItem('travello_user');
    setToken(null); setUser(null);
  }
  return <AuthContext.Provider value={{ token, user, login, logout, isAdmin: user?.role === 'admin' }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
