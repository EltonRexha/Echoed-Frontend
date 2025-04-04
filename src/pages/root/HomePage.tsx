import ForYouPosts from '@/components/ForYouPosts';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RootState } from '@/services/state/redux/store';
import { User } from '@/types/user';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import defaultProfile from '@/assets/images/icons/defaultProfile.svg';

function HomePage() {
  let { profileUrl } = useSelector(
    (state: RootState) => state.Authentication.user
  ) as User;

  const [showForYouPosts, setShowForYouPosts] = useState(true);

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
        <Tabs
          defaultValue="for-you"
          className="w-[250px] p-2"
          onValueChange={(value) => setShowForYouPosts(value === 'for-you')}
        >
          <TabsList className="grid w-full grid-cols-2 bg-light-background dark:bg-dark-background">
            <TabsTrigger
              value="for-you"
              className="cursor-pointer text-light-secondary-text dark:text-dark-secondary-text font-semibold"
            >
              For You
            </TabsTrigger>
            <TabsTrigger
              value="following"
              className="cursor-pointer text-light-secondary-text dark:text-dark-secondary-text font-semibold"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <main className="container mx-auto p-1">
        {showForYouPosts ? (
          <div className="for-you-content">
            <ForYouPosts />
          </div>
        ) : (
          <div className="following-content">
            {/* Following Content */}
            <h2 className="text-xl font-semibold text-light-primary-text dark:text-dark-primary-text mb-4">
              Following
            </h2>
            {/* Content will be added here */}
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;
