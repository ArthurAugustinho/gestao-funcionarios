import { Navigate, useLocation } from 'react-router-dom';
import type { PropsWithChildren } from 'react';
import { useAuth } from '../context/AuthContext';

// Protege rotas: se não houver token, redireciona para /login preservando a rota desejada.
export function PrivateRoute({ children }: PropsWithChildren) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
