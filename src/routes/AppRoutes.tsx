import { Route, Routes } from 'react-router-dom';
import PublicRoute from './guards/PublicRouteGuard';
import GettingStartedPage from '@/pages/GettingStartedPage';
import SignUpRoutes from './SignupRoutes';
import LoginRoutes from './LoginRoutes';
import OAuthErrorPage from '@/pages/auth/account/OAuthErrorPage';
import AccountRoutes from './AccountRoutes';
import LogoutPage from '@/pages/auth/log-in/LogoutPage';
import UserRootRoutes from './UserRootRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GettingStartedPage />} />
      <Route path="/*" element={<UserRootRoutes />} />
      <Route path="/sign-up/*" element={<SignUpRoutes />} />
      <Route path="/account/*" element={<AccountRoutes />} />
      <Route path="/log-in/*" element={<LoginRoutes />} />
      <Route path="/logout" element={<LogoutPage />}></Route>
      <Route
        path="/oauth/error"
        element={
          <PublicRoute showLoading={false}>
            <OAuthErrorPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
