import FadeInList from '@/components/FadeInList';
import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import useTimedRedirect from '@/hooks/useTimedRedirect';

function OAuthErrorPage() {
  const timeToRedirect = useTimedRedirect(10, '/sign-up');

  return (
    <div className="overflow-x-hidden font-raleway bg-lighter dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[100vh] bg-lighter dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
            <div className="text-center">
              <FadeInList>
                <h1 className="text-light-primary dark:text-dark-primary font-bold text-bold text-3xl">
                  Could not continue with OAuth
                </h1>
                <p className="text-light-secondary dark:text-dark-secondary mt-2">
                  please allow Echoed to use your third party account
                </p>
                <p className="text-light-secondary-lighter dark:text-dark-secondary-darker mt-2 font-sans">
                  redirecting in {timeToRedirect}s
                </p>
              </FadeInList>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default OAuthErrorPage;
