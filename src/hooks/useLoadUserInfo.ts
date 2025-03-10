import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/state/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api/User';
import { login } from '../services/state/redux/slices/AuthSlice';
import { useEffect } from 'react';

export function useLoadUserInfo() {
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
  }, [dispatch, user.data, user.isSuccess]);

  return { loading: user.isLoading, success: user.isSuccess };
}

export default useLoadUserInfo;
