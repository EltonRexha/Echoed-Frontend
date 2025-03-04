import { Button } from '@/components/ui/button';
import CustomInput from '@/components/ui/CustomInput';
import PasswordInput from '@/components/ui/PasswordInput';
import VerifyEmailModal from '@/components/VerifyEmailModal';
import { loginUserWithUsername } from '@/services/api/User';
import ResponseError from '@/types/responseError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Github } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

const googleSignupEndpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
const githubSignupEndpoint = `${import.meta.env.VITE_API_BASE_URL}/auth/github`;

type Inputs = z.infer<typeof schema>;

function EmailLoginPage() {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const [showVerifyEmailModal, setShowVerifyEmailModal] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const loginMutation = useMutation({
    mutationFn: (user: Inputs) => loginUserWithUsername(user),
    onError: (e: ResponseError) => {
      if (e.response) {
        const error = e.response.data.error;
        if (
          error.messageCode === 'EMAIL_NOT_VERIFIED' &&
          error.details &&
          typeof error.details.email === 'string'
        ) {
          setShowVerifyEmailModal(true);
          setEmail(error.details.email);
          setErrorLogin(error.message);
          return;
        }
      }

      toast.error('Could not log you in');
    },
    onSuccess: () => {
      navigate('/');
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="w-[90%] sm:w-96 p-2">
      <VerifyEmailModal
        close={() => {
          setShowVerifyEmailModal(false);
        }}
        email={email ? email : ''}
        isOpen={showVerifyEmailModal}
      />
      <h1 className="text-2xl font-raleway font-semibold text-light-primary-text dark:text-dark-primary-text mb-10">
        Log in
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 h-full"
        autoComplete="off"
      >
        <div className="relative z-0 w-full mb-5 group">
          <CustomInput
            inputProps={{
              ...register('username'),
              id: 'username',
            }}
            labelProps={{ id: 'username' }}
            labelText="Username"
          />

          {errors.username && (
            <p className="text-red-600 text-sm font-semibold font-sans">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <PasswordInput
            inputProps={{ ...register('password'), id: 'password' }}
            labelProps={{ id: 'password' }}
          />
        </div>
        {errorLogin && (
          <p className="font-sans text-red-600 dark:text-red-500 text-sm my-3">
            {errorLogin}
          </p>
        )}
        <div className="my-10 flex flex-col gap-1">
          <p className="font-sans text-light-secondary-text dark:text-dark-secondary-text text-sm">
            <span className="hover:opacity-100 opacity-80 transition-opacity ease-in-out">
              <Link to="/log-in">Continue with email?</Link>
            </span>
          </p>
          <p className="font-sans text-light-secondary-text dark:text-dark-secondary-text text-sm">
            <span className="hover:opacity-100 opacity-80 transition-opacity ease-in-out">
              <Link to="username">Forgot password?</Link>
            </span>
          </p>
        </div>

        <Button className="w-full cursor-pointer font-sans">Log in</Button>
      </form>
      <div className="my-3">
        <h1 className="text-light-secondary-text dark:text-dark-secondary-text text-center mb-3">
          or
        </h1>
        <div className=" flex flex-col gap-2">
          <a href={googleSignupEndpoint}>
            <Button
              variant="secondary"
              className="w-full cursor-pointer font-sans"
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Login with Google
            </Button>
          </a>

          <a href={githubSignupEndpoint}>
            <Button
              variant="secondary"
              className="w-full cursor-pointer font-sans"
            >
              <Github className="mr-2 h-4 w-4" />
              Login with GitHub
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default EmailLoginPage;
