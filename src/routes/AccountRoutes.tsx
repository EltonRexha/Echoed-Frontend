import ResetPasswordPage from '@/pages/ResetPasswordPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import { Route, Routes } from 'react-router-dom';
import OAuthUserRoute from './guards/OAuthUserRouteGuard';
import PublicRoute from './guards/PublicRouteGuard';
import CompleteProfilePage from '@/pages/CompleteProfilePage';

export default function AccountRoutes() {
  return (
    <Routes>
      <Route
        path="verify"
        element={
          <PublicRoute showLoading={false}>
            <VerifyEmailPage />
          </PublicRoute>
        }
      />
      <Route
        path="reset-password"
        element={
          <PublicRoute showLoading={false}>
            <ResetPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="complete-profile"
        element={
          <OAuthUserRoute showLoading={true}>
            <CompleteProfilePage />
          </OAuthUserRoute>
        }
      />
    </Routes>
  );
}
