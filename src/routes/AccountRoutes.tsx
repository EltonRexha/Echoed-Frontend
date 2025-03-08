import ResetPasswordPage from '@/pages/ResetPasswordPage';
import VerifyEmailPage from '@/pages/VerifyEmailPage';
import { Route, Routes } from 'react-router-dom';
import OAuthUserRoute from './guards/OAuthUserRouteGuard';

export default function AccountRoutes() {
  return (
    <Routes>
      <Route path="verify" element={<VerifyEmailPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route
        path="complete-profile"
        element={
          <OAuthUserRoute>
            <h1>Please complete your account</h1>
          </OAuthUserRoute>
        }
      />
    </Routes>
  );
}
