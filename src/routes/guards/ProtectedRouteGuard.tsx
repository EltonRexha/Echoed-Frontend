import useLoadUserInfo from '@/hooks/useLoadUserInfo';
import LoadingPage from '@/pages/LoadingPage';
import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available when you are logged in
export default function ProtectedRoute({
  children,
  showLoading,
}: {
  children: ReactNode;
  showLoading: boolean;
}) {
  const { loading } = useLoadUserInfo();

  const isAuth = useSelector(
    (state: RootState) => state.Authentication.isAuthenticated
  );

  //The user information is being loaded
  if (loading && showLoading && !isAuth) {
    return <LoadingPage />;
  }

  if (!isAuth) return <Navigate to={'/log-in'} replace />;

  return children;
}
