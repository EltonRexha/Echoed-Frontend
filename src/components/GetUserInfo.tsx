import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../services/state/redux/store';
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/api/User';
import { login } from '../services/state/redux/slices/AuthSlice';

export function GetUserInfo({ children }: { children: ReactNode }) {
  const dispatch: AppDispatch = useDispatch();
  const user = useQuery({
    queryFn: getCurrentUser,
    queryKey: ['currentUser'],
  });

  if (user.isSuccess) {
    dispatch(login(user.data.user));
  }

  return children;
}
export default GetUserInfo;
