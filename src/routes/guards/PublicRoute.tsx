import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available when you are logged out
export default function PublicRoute({ children }: { children: ReactNode }) {
  const isAuth = useSelector(
    (state: RootState) => state.Authentication.isAuthenticated
  );

  if (isAuth) return <Navigate to={'/home'} />;

  return children;
}
