import { useEffect } from 'react';
import LoadingPage from '@/pages/LoadingPage';
import logoutUser from '@/utils/logoutUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function LogoutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    toast.loading('Logging out');
    logoutUser();
  }, [navigate]);
  return <LoadingPage></LoadingPage>;
}

export default LogoutPage;
