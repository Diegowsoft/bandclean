import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'cleaner' | 'client')[];
  children?: React.ReactNode;
}

export default function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-destructive">Acesso negado. Você não tem permissão para acessar esta página.</div>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
}
