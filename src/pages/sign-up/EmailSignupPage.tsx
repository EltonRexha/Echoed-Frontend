import { ReactNode, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import StepDescriptionIndicator from '@/components/ui/StepDescriptionIndicator';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries } from 'countries-list';
import genders from '@/services/state/genders.json';
import getMonthName from '@/utils/getMonthName';
import getDaysInMonth from '@/utils/getDaysInMonth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createUser, getUser } from '@/services/api/User';
import SubmitButton from '@/components/SubmitButton';
import FadeIn from '@/components/ui/FadeIn';
import { User } from '@/types/user';
import convertGenderString from '@/utils/convertGenderString';
import { toast } from 'sonner';
import NextButton from '@/components/NextButton';
import PrevButton from '@/components/PrevButton';
import ResendEmailButton from '@/components/ResendEmailBtn';
import { sendVerificationEmail } from '@/services/api/Email';
import { useNavigate } from 'react-router-dom';
import CustomInput from '@/components/ui/CustomInput';
import PasswordInput from '@/components/ui/PasswordInput';
import FadeInList from '@/components/FadeInList';
import ResponseError from '@/types/responseError';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/services/state/redux/store';
import { resetTimer } from '@/services/state/redux/slices/emailVerificationTimeoutSlice';

const COUNTRIES = Object.values(countries)
  .map((country) => country.name)
  .sort();
const MIN_AGE = 13;
const NOW = new Date();

const schema = z.object({
  firstName: z
    .string()
    .min(3, 'At least 3 characters')
    .max(10, 'Reached max of characters (10)')
    .regex(/^[A-Za-z]+$/, 'Only letters are allowed'),
  lastName: z
    .string()
    .min(3, 'At least 3 characters')
    .max(10, 'Reached max of characters (10)')
    .regex(/^[A-Za-z]+$/, 'Only letters are allowed'),
  username: z
    .string()
    .min(3, 'The username must have at least 3 characters')
    .max(20, 'Reached max of characters'),
  email: z.string().email('Invalid email address'),
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
  country: z.enum(COUNTRIES as [string, ...string[]]),
  gender: z.enum(genders as [string, ...string[]]),
  year: z
    .number()
    .max(NOW.getFullYear() - MIN_AGE, 'You are too young')
    .min(1900, 'Stop lying about your age'),
  month: z.number().min(1, 'Invalid month').max(12, 'Invalid month'),
  day: z.number().min(1, 'Invalid day').max(31, 'Invalid day'),
});

type Inputs = z.infer<typeof schema>;

function EmailSignupPage(): JSX.Element {
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

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (success) => {
      incrementCurrentInputBox();
      toast.success(success.message);
    },
    onError: (e: ResponseError) => {
      if (e.response) {
        toast.error(e.response.data.error.message);
      } else {
        toast.error('Something wrong happened creating user');
      }
      navigate('/sign-up');
    },
  });

  const dispatch: AppDispatch = useDispatch();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const user: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      dateOfBirth: new Date(data.year, data.month - 1, data.day),
      email: data.email,
      gender: convertGenderString(data.gender),
      username: data.username,
      password: data.password,
    };
    createUserMutation.mutate(user);
    dispatch(resetTimer());
  };
  const [currentInputBox, setCurrentInputBox] = useState(0);
  const incrementCurrentInputBox = () => {
    setCurrentInputBox(currentInputBox + 1);
  };

  const decrementCurrentInputBox = () => {
    setCurrentInputBox(currentInputBox - 1);
  };

  const inputBoxes: ReactNode[] = [
    <FirstInputGroup
      register={register}
      next={incrementCurrentInputBox}
      errors={errors}
      watch={watch}
    />,
    <SecondInputGroup
      register={register}
      errors={errors}
      watch={watch}
      previous={decrementCurrentInputBox}
    />,
    <VerifyEmail watch={watch} />,
  ];

  return (
    <div className="flex flex-col items-center justify-center mt-5 sm:mt-0 w-full sm:w-[650px] font-sans p-2 sm:h-[650px] rounded text-light-primary-text dark:text-dark-primary-text">
      <div className="justify-self-start">
        <div className="hidden sm:block">
          <StepDescriptionIndicator
            currentIndex={currentInputBox}
            descriptions={['Personal Info', 'Account Info', 'Finish']}
          />
        </div>
        <div className="block sm:hidden">
          <StepDescriptionIndicator
            currentIndex={currentInputBox}
            descriptions={['Personal', 'Account', 'Finish']}
          />
        </div>
      </div>

      <div className="mt-5 sm:mt-0 w-full sm:w-[650px] font-sans p-2 sm:h-[650px] rounded text-light-primary-text dark:text-dark-primary-text">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 h-full"
          autoComplete="off"
        >
          {inputBoxes[currentInputBox]}
        </form>
      </div>
    </div>
  );
}

function FirstInputGroup({
  register,
  next,
  errors,
  watch,
}: {
  register: UseFormRegister<Inputs>;
  next: () => void;
  errors: FieldErrors<Inputs>;
  watch: UseFormWatch<Inputs>;
}): JSX.Element {
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const gender = watch('gender');
  const country = watch('country');
  const month = watch('month');
  const year = watch('year');
  const day = watch('day');

  console.log({ email });

  const { data: userData } = useQuery({
    queryFn: () => getUser({ email }),
    queryKey: ['user', { email }],
    enabled: !errors.email && email?.length > 1,
  });

  const formIsFilled: boolean =
    !!firstName &&
    !!lastName &&
    !!email &&
    !!gender &&
    !!country &&
    !!year &&
    !!day &&
    !!month;

  const emailAlreadyInUse = !!userData?.user;

  function formIsValid(): boolean {
    return (
      formIsFilled &&
      Object.keys(errors).filter((item) =>
        [
          'firstName',
          'lastName',
          'email',
          'gender',
          'country',
          'year',
          'day',
          'month',
        ].includes(item)
      ).length === 0 &&
      !emailAlreadyInUse
    );
  }

  return (
    <FadeIn>
      <div className="relative h-full flex flex-col font-sans">
        <FadeInList
          parentProps={{
            className: 'flex flex-col gap-3 px-2 sm:px-15 pt-10 flex-1',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="relative z-0 w-full mb-5 group">
              <CustomInput
                inputProps={{ ...register('firstName'), id: 'first_name' }}
                labelProps={{ id: 'first_name' }}
                labelText="First name"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <CustomInput
                inputProps={{ ...register('lastName'), id: 'last_name' }}
                labelProps={{ id: 'last_name' }}
                labelText="Last name"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="relative z-0 w-full mb-5 group">
              <CustomInput
                inputProps={{ ...register('email'), id: 'email' }}
                labelProps={{ id: 'email' }}
                labelText="Email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.email.message}
                </p>
              )}
              {emailAlreadyInUse && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  Email is already in use
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mb-5 flex flex-col gap-2 mt-5">
              <label
                htmlFor="gender"
                className="text-sm text-gray-500 dark:text-gray-400 "
              >
                Gender
              </label>
              <select
                {...register('gender')}
                id="gender"
                className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600"
              >
                <option value="unkown">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="w-full mb-5 flex flex-col gap-2">
              <label
                htmlFor="country"
                className="text-sm text-gray-500 dark:text-gray-400 "
              >
                Country
              </label>
              <select
                {...register('country')}
                id="country"
                defaultValue="United States"
                className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600"
              >
                {COUNTRIES.map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="w-full mb-5 flex flex-col gap-2">
              <label className="text-sm text-gray-500 dark:text-gray-400 ">
                Date of birth
              </label>
              <div className="flex gap-1">
                <select
                  {...register('month', {
                    setValueAs: (value) => Number(value),
                  })}
                  defaultValue="unkown"
                  id="month"
                  className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option value={month} key={month}>
                      {getMonthName(month)}
                    </option>
                  ))}
                  <option value="unkown">Month</option>
                </select>{' '}
                <select
                  {...register('day', {
                    setValueAs: (value) => Number(value),
                  })}
                  defaultValue="unkown"
                  className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
                >
                  {Array.from(
                    { length: getDaysInMonth(month ? month : 1) as number },
                    (_, i) => i + 1
                  ).map((day) => (
                    <option value={day} key={day}>
                      {day}
                    </option>
                  ))}
                  <option value="unkown">Day</option>
                </select>
                <select
                  {...register('year', {
                    setValueAs: (value) => Number(value),
                  })}
                  defaultValue="unkown"
                  className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
                >
                  {Array.from(
                    { length: new Date().getFullYear() - 1900 + 1 },
                    (_, i) => 1900 + i
                  ).map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                  <option value="unkown">Year</option>
                </select>
              </div>
              {errors.year && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.year.message}
                </p>
              )}
              {errors.day && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.day.message}
                </p>
              )}
              {errors.month && (
                <p className="text-red-600 text-sm font-semibold font-sans">
                  {errors.month.message}
                </p>
              )}
            </div>
          </div>
        </FadeInList>

        {/* Show Next button only if all fields are filled */}
        {formIsValid() && <NextButton onClick={next} />}
      </div>
    </FadeIn>
  );
}

function SecondInputGroup({
  register,
  errors,
  watch,
  previous,
}: {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  watch: UseFormWatch<Inputs>;
  previous: () => void;
}): JSX.Element {
  const username = watch('username');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isFormValid = username && password && confirmPassword;

  const { data: userData } = useQuery({
    queryFn: () => getUser({ username }),
    queryKey: ['user', { username }],
    enabled: !errors.username,
  });

  const usernameInUse = !!userData?.user;

  function formIsValid(): boolean {
    return (
      !!isFormValid &&
      Object.keys(errors).filter((item) =>
        ['password', 'confirmPassword', 'username'].includes(item)
      ).length === 0 &&
      !errors.confirmPassword?.message &&
      !usernameInUse &&
      password === confirmPassword
    );
  }

  return (
    <div className="h-full">
      <FadeIn>
        <div className="relative h-full flex flex-col">
          <FadeInList
            parentProps={{
              className: 'flex flex-col gap-3 px-2 sm:px-15 pt-10 flex-1',
            }}
          >
            <div className="w-full">
              <div className="relative z-0 w-full mb-5 group">
                <CustomInput
                  inputProps={{ ...register('username'), id: 'username' }}
                  labelProps={{ id: 'username' }}
                  labelText="Username"
                />
                {errors.username && (
                  <p className="text-red-600 text-sm font-semibold font-sans">
                    {errors.username.message}
                  </p>
                )}
                {usernameInUse && (
                  <p className="text-red-600 text-sm font-semibold font-sans">
                    this username is already in use
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
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
            </div>
            <div className="w-full">
              <div className="relative z-0 w-full mb-5 group">
                <PasswordInput
                  inputProps={{
                    ...register('confirmPassword'),
                    id: 'confirm_password',
                  }}
                  labelProps={{ id: 'confirm_password' }}
                  labelText="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm font-semibold font-sans">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {password !== confirmPassword && (
                  <p className="text-red-600 text-sm font-semibold font-sans">
                    Password do not match
                  </p>
                )}
              </div>
            </div>
          </FadeInList>
          {/* Show Next button only if all fields are filled */}
          <div className="flex pr-10 ml-10 mt-auto">
            <div className="mr-auto">
              <PrevButton onClick={previous} />
            </div>
            {formIsValid() && <SubmitButton />}
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

function VerifyEmail({ watch }: { watch: UseFormWatch<Inputs> }): JSX.Element {
  const emailVerificationMutation = useMutation({
    mutationFn: (email: string) => sendVerificationEmail(email),
    onSuccess: (success) => {
      toast.success(success.message);
    },
    onError: (e: ResponseError) => {
      if (e.response) {
        toast.error(e.response.data.error.message);
        return;
      }

      toast.error('Something wrong happened sending email');
    },
  });

  const email = watch('email');

  return (
    <FadeInList
      parentProps={{
        className: 'h-full flex flex-col items-center pt-20 gap-2',
      }}
    >
      <h1 className="text-center text-4xl text-purple-shade-300 dark:text-purple-shade-100">
        Verify Email
      </h1>
      <p className="text-light-primary-text dark:text-dark-primary-text text-pretty text-lg">
        All what is left now is to verify your email
      </p>
      <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
        Go to <span className="font-bold">{email}</span>
      </p>
      <p className="text-light-secondary-text dark:text-dark-secondary-text text-pretty text-sm">
        Cannot find you email?{' '}
        <span className="font-bold">Check your spams</span>
      </p>
      <ResendEmailButton
        onClick={() => {
          emailVerificationMutation.mutate(email);
        }}
      />
    </FadeInList>
  );
}

export default EmailSignupPage;
