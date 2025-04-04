import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { Outlet } from 'react-router-dom';

function SignupPage(): JSX.Element {
  return (
    <div className="overflow-x-hidden font-raleway bg-lighter-background dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[100vh] pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
            <Outlet />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default SignupPage;
