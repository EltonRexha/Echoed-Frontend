import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available when you are logged in
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuth = useSelector(
    (state: RootState) => state.Authentication.isAuthenticated
  );

  if (!isAuth) return <Navigate to={'/log-in'} replace />;

  return children;
}