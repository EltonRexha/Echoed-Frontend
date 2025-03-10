import ResetPasswordPage from '@/pages/ResetPasswordPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import { Route, Routes } from 'react-router-dom';
import OAuthUserRoute from './guards/OAuthUserRouteGuard';
import PublicRoute from './guards/PublicRouteGuard';
import CompleteProfilePage from '@/pages/CompleteProfilePage';

export default function AccountRoutes({ loading }: { loading: boolean }) {
  return (
    <Routes>
      <Route
        path="verify"
        element={
          <PublicRoute loading={loading}>
            <VerifyEmailPage />
          </PublicRoute>
        }
      />
      <Route
        path="reset-password"
        element={
          <PublicRoute loading={loading}>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="complete-profile"
        element={
          <OAuthUserRoute loading={loading}>
            <CompleteProfilePage />
          </OAuthUserRoute>
        }
      />
    </Routes>
  );
}
