import EmailLoginPage from '@/pages/auth/log-in/EmailLoginPage';
import UsernameLoginPage from '@/pages/auth/log-in/UsernameLoginPage';
import LoginPage from '@/pages/auth/log-in/LoginPage';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './guards/PublicRouteGuard';

export default function LoginRoutes() {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute showLoading={false}>
            <LoginPage />
          </PublicRoute>
        }
      >
        <Route index element={<EmailLoginPage />} />
        <Route path="username" element={<UsernameLoginPage />} />
      </Route>
    </Routes>
  );
}
