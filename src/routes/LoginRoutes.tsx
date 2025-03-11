import EmailLoginPage from '@/pages/log-in/EmailLoginPage';
import UsernameLoginPage from '@/pages/log-in/UsernameLoginPage';
import LoginPage from '@/pages/LoginPage';
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
