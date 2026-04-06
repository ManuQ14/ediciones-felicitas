import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // sessionStorage: la sesión admin se limpia al cerrar la pestaña (más seguro que localStorage)
  const [token, setToken] = useState(() => sessionStorage.getItem('ef_token'));

  const login = async (usuario, password) => {
    const { data } = await api.post('/auth/login', { usuario, password });
    sessionStorage.setItem('ef_token', data.token);
    setToken(data.token);
    return data;
  };

  const logout = () => {
    sessionStorage.removeItem('ef_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
