import { Button } from '@/components/ui/button';
import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import PasswordInput from '@/components/ui/PasswordInput';
import { resetPassword } from '@/services/api/User';
import ResponseError from '@/types/responseError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character')
    .regex(/^\S*$/, 'Password cannot contain spaces')
    .regex(
      /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]*$/,
      'Password contains invalid characters'
    ),
  confirmPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character')
    .regex(/^\S*$/, 'Password cannot contain spaces')
    .regex(
      /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]*$/,
      'Password contains invalid characters'
    ),
});

type Inputs = z.infer<typeof schema>;

function ResetPasswordPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const ResetPasswordToken = urlParams.get('k');

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: { password: string; reset_password_token: string }) =>
      resetPassword(payload),
    onError: (e: ResponseError) => {
      if (e.response) {
        toast.error(e.response.data.error.message);
        return;
      }

      toast.error('Something wrong happened');
    },
    onSuccess: () => {
      toast.success('Successfully reseted password');
      navigate('/');
    },
  });

  if (!ResetPasswordToken) {
    return (
      <div className="overflow-x-hidden font-raleway bg-lighter-background dark:bg-purple-shade-400">
        <FadeIn>
          <div className="min-h-[100vh] bg-lighter-background dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
            <GettingStartedNav />
            <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
              <div className="text-center">
                <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-bold text-3xl">
                  You have a broken link
                </h1>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    );
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetPasswordMutation.mutate({
      password: data.password,
      reset_password_token: ResetPasswordToken,
    });
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  return (
    <div className="overflow-x-hidden font-raleway bg-lighter-background dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[100vh] pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex flex-col sm:items-center sm:justify-center flex-1">
            <h1 className="text-2xl font-raleway font-semibold text-light-primary-text dark:text-dark-primary-text mb-10">
              Reset password
            </h1>
            <div className="w-[90%] sm:w-96 p-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex-1 h-full"
                autoComplete="off"
              >
                <div className="relative z-0 w-full mb-5 group">
                  <PasswordInput
                    inputProps={{ ...register('password'), id: 'password' }}
                    labelProps={{ id: 'password' }}
                  />

                  {errors.password && (
                    <p className="text-red-600 text-sm font-semibold font-sans">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <PasswordInput
                    inputProps={{
                      ...register('confirmPassword'),
                      id: 'confirmPassword',
                    }}
                    labelProps={{ id: 'confirmPassword' }}
                    labelText="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm font-semibold font-sans">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                  {password !== confirmPassword && !errors.password && (
                    <p className="text-red-600 text-sm font-semibold font-sans">
                      Passwords are not equal
                    </p>
                  )}
                </div>

                {password === confirmPassword &&
                  Object.keys(errors).length === 0 &&
                  password &&
                  confirmPassword && (
                    <Button className="w-full cursor-pointer font-sans">
                      Reset password
                    </Button>
                  )}
              </form>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default ResetPasswordPage;
