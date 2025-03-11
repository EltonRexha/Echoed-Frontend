import { Route, Routes } from 'react-router-dom';
import PublicRoute from './guards/PublicRouteGuard';
import LocalUserRoute from './guards/LocalUserRouteGuard';
import GettingStartedPage from '@/pages/GettingStartedPage';
import SignUpRoutes from './SignupRoutes';
import LoginRoutes from './LoginRoutes';
import OAuthErrorPage from '@/pages/OAuthErrorPage';
import AccountRoutes from './AccountRoutes';
import LogoutPage from '@/pages/LogoutPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <LocalUserRoute showLoading={true}>
            <h1>This is home</h1>
          </LocalUserRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicRoute showLoading={false}>
            <GettingStartedPage />
          </PublicRoute>
        }
      />
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
    </Routes>
  );
}
