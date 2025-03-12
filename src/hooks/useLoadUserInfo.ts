import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../services/state/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api/User';
import { login } from '../services/state/redux/slices/AuthSlice';
import { useEffect, useState } from 'react';

const MIN_LOADING_TIME_MS = 300;

/**
 * Loads the user and in order to prevent flashing it will
 * add some artificial loading
 */
export function useLoadUserInfo() {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated: isAuth } = useSelector(
    (state: RootState) => state.Authentication
  );

  const [artificialLoading, setArtificialLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => {
      setArtificialLoading(false);
    }, MIN_LOADING_TIME_MS);
  }, []);

  return {
    loading: user.isLoading || artificialLoading,
    success: user.isSuccess,
  };
}

export default useLoadUserInfo;
