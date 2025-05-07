import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = () => {
  const { user } = useAuth();
  console.log(user);

  // Si el usuario ya está autenticado, redirigir a la página de dashboard
  return !user ? <Outlet /> : <Navigate to="/dashboard" replace />;
};
