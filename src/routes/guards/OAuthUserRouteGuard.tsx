import { RootState } from '@/services/state/redux/store';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

//Routes which will only be available to local users and not OAuth users
//As OAuth users will be prompted to a seperate page to finsih their account
//Which will create for them a local user
export default function LocalUserRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated: isAuth, user } = useSelector(
    (state: RootState) => state.Authentication
  );

  if (!isAuth) {
    return <Navigate to={'/log-in'} />;
  }

  if (user && (user.UserType === 'github' || user.UserType === 'google')) {
    return <Navigate to={'/account/complete-profile'} />;
  }

  return children;
}


