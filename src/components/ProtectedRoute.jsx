import { Outlet } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ unauthenticatedElement }) {
  const { isAuthenticated, authChecked } = useAuth();

  if (!authChecked) return null;
  if (!isAuthenticated) return unauthenticatedElement;

  return <Outlet />;
}
