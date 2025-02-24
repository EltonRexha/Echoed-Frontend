import FadeInList from '@/components/FadeInList';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import useTimedRedirect from '@/hooks/useTimedRedirect';
import { sendVerificationEmail, verifyEmail } from '@/services/api/Email';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { decode } from 'js-base64';
import HttpError from '@/Errors/httpError';

function VerifyEmailPage(): JSX.Element {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('k');
  const encodedEmail = queryParams.get('e');
  const [emailVerifiedBefore, setEmailVerifiedBefore] = useState(false);

  const verifyEmailMutation = useMutation({
    mutationFn: () => verifyEmail(token as string),
    onError: (e: HttpError) => {
      if (e.code === 409) {
        setEmailVerifiedBefore(true);
      }
      toast.error(e.message);
    },
    onSuccess: (success) => {
      toast.success(success.message);
    },
  });

  useEffect(() => {
    verifyEmailMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token || !encodedEmail) {
    return (
      <div className="text-center">
        <FadeInList>
          <h1 className="text-light-primary dark:text-dark-primary font-bold text-bold text-3xl">
            Broken verification link
          </h1>
        </FadeInList>
      </div>
    );
  }

  const email = decode(encodedEmail);

  return (
    <div className="overflow-x-hidden font-raleway bg-lighter dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[100vh] bg-lighter dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
            {verifyEmailMutation.isSuccess && <VerifySuccess />}
            {verifyEmailMutation.isError && (
              <VerifyError email={email} verified={emailVerifiedBefore} />
            )}
            {verifyEmailMutation.isPending && <VerifyPending />}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function VerifySuccess() {
  const timeToRedirect = useTimedRedirect(10, '/login');

  return (
    <div className="text-center">
      <FadeInList>
        <h1 className="text-light-primary dark:text-dark-primary font-bold text-bold text-3xl">
          Successfully verified your email
        </h1>
        <p className="text-light-secondary dark:text-dark-secondary mt-2">
          Your email was successfully verified
        </p>
        <p className="text-light-secondary-lighter dark:text-dark-secondary-darker mt-2 font-sans">
          redirecting in {timeToRedirect}s
        </p>
      </FadeInList>
    </div>
  );
}

function VerifyError({
  email,
  verified,
}: {
  email: string;
  verified: boolean;
}) {
  const emailVerificationMutation = useMutation({
    mutationFn: () => sendVerificationEmail(email),
    onSuccess: (success) => {
      toast.success(success.message);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  return (
    <div className="text-center">
      <FadeInList>
        <h1 className="text-light-primary dark:text-dark-primary font-bold text-bold text-3xl">
          Something wrong happened
        </h1>
        <p className="text-light-secondary dark:text-dark-secondary mt-2">
          Could not verify your email
        </p>
        {!verified && (
          <div className="mt-5 font-sans">
            <Button
              onClick={() => {
                emailVerificationMutation.mutate();
              }}
            >
              Resend email
            </Button>
          </div>
        )}
      </FadeInList>
    </div>
  );
}

function VerifyPending() {
  return (
    <div className="text-center">
      <h1 className="text-light-primary dark:text-dark-primary font-bold text-bold text-3xl">
        Loading...
      </h1>
    </div>
  );
}

export default VerifyEmailPage;
