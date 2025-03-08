import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GettingStartedPage from './pages/GettingStartedPage';
import { Provider } from 'react-redux';
import store from './services/state/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import OAuthErrorPage from './pages/OAuthErrorPage';
import LocalUserRoute from './routes/guards/LocalUserRouteGuard';
import GetUserInfo from './components/GetUserInfo';
import PublicRoute from './routes/guards/PublicRouteGuard';
import SignUpRoutes from './routes/SignupRoutes';
import AccountRoutes from './routes/AccountRoutes';
import LoginRoutes from './routes/LoginRoutes';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GetUserInfo>
          <BrowserRouter>
            <Routes>
              <Route
                path="/home"
                element={
                  <LocalUserRoute>
                    <h1>This is home</h1>
                  </LocalUserRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <GettingStartedPage />
                  </PublicRoute>
                }
              />
              <Route
                path="/sign-up/*"
                element={
                  <PublicRoute>
                    <SignUpRoutes />
                  </PublicRoute>
                }
              />
              <Route path="/account/*" element={<AccountRoutes />} />
              <Route
                path="/log-in/*"
                element={
                  <PublicRoute>
                    <LoginRoutes />
                  </PublicRoute>
                }
              />
              <Route
                path="/oauth/error"
                element={
                  <PublicRoute>
                    <OAuthErrorPage />
                  </PublicRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </GetUserInfo>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
