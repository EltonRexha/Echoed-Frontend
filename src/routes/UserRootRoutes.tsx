import HomePage from '@/pages/root/HomePage';
import UserRootPage from '@/pages/root/UserRootPage';
import { Route, Routes } from 'react-router-dom';
import LocalUserRoute from './guards/LocalUserRouteGuard';

export default function UserRootRoutes() {
  return (
    <Routes>
      <Route
        element={
          <LocalUserRoute showLoading={true}>
            <UserRootPage />
          </LocalUserRoute>
        }
      >
        <Route path="home" element={<HomePage />} />
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
