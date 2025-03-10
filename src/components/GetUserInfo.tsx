import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/state/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api/User';
import { login } from '../services/state/redux/slices/AuthSlice';
import LoadingPage from '@/pages/LoadingPage';

export function GetUserInfo({ children }: { children: ReactNode }) {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated: isAuth } = useSelector(
    (state: RootState) => state.Authentication
  );

  const user = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['currentUser'],
    enabled: !isAuth,
    retry: 1,
  });

  useEffect(() => {
    if (user.isSuccess) {
      dispatch(login(user.data.user));
    }
  }, [user.isSuccess, dispatch, user.data, isAuth]);

  if (user.isLoading) {
    return <LoadingPage />;
  }

  return <>{children}</>;
}

export default GetUserInfo;
