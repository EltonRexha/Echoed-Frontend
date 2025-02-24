import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useTimedRedirect(seconds: number, to: string): number {
  const [secondsToRedirect, setSecondsToRedirect] = useState(seconds);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsToRedirect <= 0) {
        navigate(to);
        return;
      }
      setSecondsToRedirect((curr) => curr - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [secondsToRedirect, navigate, to]);

  return secondsToRedirect;
}
