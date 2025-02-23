import { useEffect } from 'react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/state/redux/store';
import {
  inititalize,
  setTimer,
  substractSecond,
} from '@/services/state/redux/slices/emailVerificationTimeout';

const ResendEmailButton = () => {
  const emailTimedOut = useSelector(
    (state: RootState) => state.emailVerificationTimedOut
  );
  const dispatch: AppDispatch = useDispatch();
  const isCooldown = emailTimedOut.timeRemaining !== 0;

  useEffect(() => {
    dispatch(inititalize());
  }, [dispatch]);

  function resendEmail() {
    dispatch(setTimer());

    //Logic for sending email
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (emailTimedOut.ticking) {
        dispatch(substractSecond());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [emailTimedOut.ticking, dispatch]);

  return (
    <Button onClick={resendEmail} disabled={isCooldown}>
      {isCooldown
        ? `Resend available in ${Math.floor(
            emailTimedOut.timeRemaining / 60
          )}:${String(emailTimedOut.timeRemaining % 60).padStart(2, '0')}`
        : 'Resend Email'}
    </Button>
  );
};

export default ResendEmailButton;
