import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RootState } from '@/services/state/redux/store';
import { User } from '@/types/user';
import { useSelector } from 'react-redux';
import defaultProfile from '@/assets/images/icons/defaultProfile.svg';
import { Link, Outlet, useLocation } from 'react-router-dom';

function HomePage() {
  let { profileUrl } = useSelector(
    (state: RootState) => state.Authentication.user
  ) as User;
  const location = useLocation();

  // Determine active tab based on pathname
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('following')) return 'following';
    return 'for-you';
  };

  if (!profileUrl) {
    profileUrl = defaultProfile;
  }

  return (
    <div className="bg-lighter-background dark:bg-dark-background min-h-[100vh] font-raleway">
      <header className="p-4 flex justify-center items-center gap-2">
        <div>
          <img
            src={profileUrl}
            alt=""
            className="w-8 h-8 rounded-full m-auto"
          />
        </div>
        <Tabs value={getActiveTab()} className="w-[250px] p-2">
          <TabsList className="grid w-full grid-cols-2 bg-light-background dark:bg-dark-background">
            <TabsTrigger
              value="for-you"
              className="cursor-pointer text-light-secondary-text dark:text-dark-secondary-text font-semibold"
            >
              <Link to={'for-you'}>For You</Link>
            </TabsTrigger>

            <TabsTrigger
              value="following"
              className="cursor-pointer text-light-secondary-text dark:text-dark-secondary-text font-semibold"
            >
              <Link to={'following'}>Following</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <main className="container mx-auto p-1">
        <div className="for-you-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default HomePage;
