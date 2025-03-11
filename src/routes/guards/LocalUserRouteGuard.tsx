import useLoadUserInfo from '@/hooks/useLoadUserInfo';
import LoadingPage from '@/pages/LoadingPage';
import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available to local users and not OAuth users
//As OAuth users will be prompted to a seperate page to finsih their account
//Which will create for them a local user
export default function LocalUserRoute({
  children,
  showLoading,
}: {
  children: ReactNode;
  showLoading: boolean;
}) {
  const { loading } = useLoadUserInfo();
  const { isAuthenticated: isAuth, user } = useSelector(
    (state: RootState) => state.Authentication
  );

  //The user information is being loaded
  if (loading && showLoading) {
    return <LoadingPage />;
  }

  if (!isAuth) {
    return <Navigate to={'/log-in'} replace />;
  }

  if (
    user &&
    (user.UserType.toLowerCase() === 'github' ||
      user.UserType.toLowerCase() === 'google')
  ) {
    return <Navigate to={'/account/complete-profile'} replace />;
  }

  return children;
}
