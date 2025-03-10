import LoadingPage from '@/pages/LoadingPage';
import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available when you are logged out
export default function PublicRoute({
  children,
  loading,
}: {
  children: ReactNode;
  loading?: boolean;
}) {
  const isAuth = useSelector(
    (state: RootState) => state.Authentication.isAuthenticated
  );

  //The user information is being loaded
  if (loading) {
    return <LoadingPage />;
  }

  if (isAuth) return <Navigate to={'/home'} replace />;

  return children;
}
