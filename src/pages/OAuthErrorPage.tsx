import FadeInList from '@/components/FadeInList';
import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import useTimedRedirect from '@/hooks/useTimedRedirect';
import decodeFromHex from '@/utils/decodeHex';
import { useLocation } from 'react-router-dom';

function OAuthErrorPage() {
  const timeToRedirect = useTimedRedirect(5, '/sign-up');
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const message = urlParams.get('m');
  const decodedMessage = message ? decodeFromHex(message) : null;

  return (
    <div className="overflow-x-hidden font-raleway bg-lighter-background dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[100vh] bg-lighter-background dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
            <div className="text-center">
              <FadeInList>
                <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-bold text-3xl">
                  {decodedMessage
                    ? decodedMessage
                    : 'please allow Echoed to use your third party account'}
                </h1>

                <p className="text-light-secondary-text dark:text-dark-secondary-text mt-2">
                  Could not continue with OAuth
                </p>
                <p className="text-light-secondary-lighter-text-text dark:text-dark-secondary-text-darker-text mt-2 font-sans">
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
