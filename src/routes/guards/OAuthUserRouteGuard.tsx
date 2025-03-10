import LoadingPage from '@/pages/LoadingPage';
import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available to OAuth users
export default function OAuthUserRoute({
  children,
  loading,
}: {
  children: ReactNode;
  loading: boolean;
}) {
  const { isAuthenticated: isAuth, user } = useSelector(
    (state: RootState) => state.Authentication
  );

  //The user information is being loaded
  if (loading) {
    return <LoadingPage />;
  }

  if (!isAuth) {
    return <Navigate to={'/log-in'} replace />;
  }

  if (user && user.UserType === 'local') {
    return <Navigate to={'/home'} replace />;
  }

  return children;
}
