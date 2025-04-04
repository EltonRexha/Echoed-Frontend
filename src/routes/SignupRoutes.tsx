import EmailSignupPage from '@/pages/auth/sign-up/EmailSignupPage';
import SignupOptionsPage from '@/pages/auth/sign-up/SignupOptionsPage';
import SignupPage from '@/pages/auth/sign-up/SignupPage';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './guards/PublicRouteGuard';

export default function SignUpRoutes() {
  return (
    <Routes>
      <Route
        element={
          <PublicRoute showLoading={false}>
            <SignupPage />
          </PublicRoute>
        }
      >
        <Route index element={<SignupOptionsPage />} />
        <Route path="email" element={<EmailSignupPage />} />
      </Route>
    </Routes>
  );
}
