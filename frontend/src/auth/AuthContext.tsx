import { createContext, useEffect, useState, type ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  user: any | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean; // Estado de carga
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const userData = parseJwt(token);
      setUser(userData); // Establecer el usuario
    }
    setLoading(false); // Cuando termine de verificar el token, actualizamos el estado de carga
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token);
    const userData = parseJwt(token);
    setUser(userData);
    navigate('/dashboard');
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function parseJwt(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  ).join(''));
  return JSON.parse(jsonPayload);
}
