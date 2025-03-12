import useLoadUserInfo from '@/hooks/useLoadUserInfo';
import LoadingPage from '@/pages/LoadingPage';
import { RootState } from '@/services/state/redux/store';
import { ReactNode, useRef } from 'react';
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

  const firstTimeRender = useRef(true);

  if (firstTimeRender.current) {
    firstTimeRender.current = false;
    if (isAuth) {
      return children;
    }
  }

  //The user information is being loaded
  if (loading && showLoading) {
    return <LoadingPage />;
  }

  if (!isAuth) return <Navigate to={'/log-in'} replace />;

  return children;
}
