import HomePage from '@/pages/root/HomePage';
import UserRootPage from '@/pages/root/UserRootPage';
import { Route, Routes } from 'react-router-dom';
import LocalUserRoute from './guards/LocalUserRouteGuard';
import FollowingPosts from '@/pages/root/FollowingPosts';
import ForYouPosts from '@/pages/root/ForYouPosts';

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
        <Route path="home" element={<HomePage />}>
          <Route index element={<ForYouPosts />} />
          <Route path="following" element={<FollowingPosts />}></Route>
          <Route path="for-you" element={<ForYouPosts />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
}
