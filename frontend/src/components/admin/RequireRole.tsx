import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RequireRoleProps {
  children: React.ReactNode;
  allow: Array<'admin' | 'marketing' | 'user'>;
}

export default function RequireRole({ children, allow }: RequireRoleProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}