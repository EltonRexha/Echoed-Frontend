import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import GettingStartedPage from './pages/GettingStartedPage';
import SignupPage from './pages/SignupPage';
import { Provider } from 'react-redux';
import store from './services/state/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import VerifyEmailPage from './pages/VerifyEmailPage';
import OAuthErrorPage from './pages/OAuthErrorPage';
import SignupOptionsPage from './pages/sign-up/SignupOptionsPage';
import EmailSignupPage from './pages/sign-up/EmailSignupPage';

const queryClient = new QueryClient();

// eslint-disable-next-line react-refresh/only-export-components
function AccountRoutes() {
  return (
    <Routes>
      <Route path="verify" element={<VerifyEmailPage />} />
      <Route
        path="tokens"
        element={<Navigate to={'/'} replace={true} />}
      ></Route>
    </Routes>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function SignUpRoutes() {
  return (
    <Routes>
      <Route element={<SignupPage />}>
        <Route index element={<SignupOptionsPage />}></Route>
        <Route path="email" element={<EmailSignupPage />}></Route>
      </Route>
      <Route path="oauth/error" element={<OAuthErrorPage />}></Route>
    </Routes>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GettingStartedPage />} />
            <Route path="/sign-up/*" element={<SignUpRoutes />} />
            <Route path="/account/*" element={<AccountRoutes />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
