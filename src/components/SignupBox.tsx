import { ReactNode, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
} from 'react-hook-form';
import StepDescriptionIndicator from './ui/StepDescriptionIndicator';
import { Variants, motion, useAnimationControls } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries } from 'countries-list';
import genders from '@/services/state/genders.json';
import getMonthName from '@/utils/getMonthName';
import getDaysInMonth from '@/utils/getDaysInMonth';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '@/services/api/users/User';

const COUNTRIES = Object.values(countries)
  .map((country) => country.name)
  .sort();
const MIN_AGE = 13;
const NOW = new Date();

const schema = z
  .object({
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
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    country: z.enum(COUNTRIES as [string, ...string[]]),
    gender: z.enum(genders as [string, ...string[]]),
    year: z
      .number()
      .max(NOW.getFullYear() - MIN_AGE, 'You are too young')
      .min(1900, 'Stop lying about your age'),
    month: z.number().min(1, 'Invalid month').max(12, 'Invalid month'),
    day: z.number().min(1, 'Invalid day').max(31, 'Invalid day'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type Inputs = z.infer<typeof schema>;

function SignupBox(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [currentInputBox, setCurrentInputBox] = useState(0);
  const incrementCurrentInputBox = (): void => {
    setCurrentInputBox(currentInputBox + 1);
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
      next={incrementCurrentInputBox}
      errors={errors}
      watch={watch}
    />,
    <VerifyEmail register={register} />,
  ];

  return (
    <div className="flex flex-col mt-5 sm:mt-0 w-full sm:w-[650px] font-sans p-2 sm:h-[650px] rounded text-light-primary dark:text-dark-primary">
      <div className="sm:p-2">
        <div className="hidden sm:block">
          <StepDescriptionIndicator
            currentIndex={currentInputBox}
            descriptions={['Personal Info', 'Account Info', 'Finish']}
          />
        </div>
        <div className="block sm:hidden sm:mb-10 ml-4">
          <StepDescriptionIndicator
            currentIndex={currentInputBox}
            descriptions={['Personal', 'Account', 'Finish']}
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex-1">
        {inputBoxes[currentInputBox]}
      </form>
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

  const { data: userData } = useQuery({
    queryFn: () => fetchUser({ email }),
    queryKey: ['user', { email }],
    enabled: !errors.email,
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

  const emailAlreadyInUse = (userData?.length as number) > 0;

  console.log(emailAlreadyInUse);

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
    <div className="relative h-full flex flex-col font-sans">
      <ul className="flex flex-col gap-3 px-2 sm:px-15 pt-10 flex-1">
        <li className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="first_name"
              {...register('firstName')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="first_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              First Name
            </label>
            {errors.firstName && (
              <p className="text-red-600 text-sm font-semibold font-sans">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="last_name"
              {...register('lastName')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="last_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Last Name
            </label>
            {errors.lastName && (
              <p className="text-red-600 text-sm font-semibold font-sans">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </li>

        <li className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="email"
              {...register('email')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
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
        </li>
        <li className="w-full">
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
        </li>
        <li className="w-full">
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
        </li>

        <li className="w-full">
          <div className="w-full mb-5 flex flex-col gap-2">
            <label className="text-sm text-gray-500 dark:text-gray-400 ">
              Date of birth
            </label>
            <div className="flex gap-1">
              <select
                {...register('month', { setValueAs: (value) => Number(value) })}
                id="month"
                className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((item) => (
                  <option value={item}>{getMonthName(item)}</option>
                ))}
              </select>{' '}
              <select
                {...register('day', { setValueAs: (value) => Number(value) })}
                className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
              >
                {Array.from(
                  { length: getDaysInMonth(month) as number },
                  (_, i) => i + 1
                ).map((day) => (
                  <option value={day}>{day}</option>
                ))}
              </select>
              <select
                {...register('year', { setValueAs: (value) => Number(value) })}
                defaultValue={new Date().getFullYear()}
                className="border-b-2 border-gray-300 p-2 dark:bg-purple-shade-400 dark:border-gray-600 flex-1"
              >
                {Array.from(
                  { length: new Date().getFullYear() - 1900 + 1 },
                  (_, i) => 1900 + i
                ).map((year) => (
                  <option value={year}>{year}</option>
                ))}
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
        </li>
      </ul>

      {/* Show Next button only if all fields are filled */}
      {formIsValid() && <NextButton onClick={next} />}
    </div>
  );
}

function SecondInputGroup({
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
  const username = watch('username');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isFormValid = username && password && confirmPassword;

  const { data: userData } = useQuery({
    queryFn: () => fetchUser({ username }),
    queryKey: ['user', { username }],
    enabled: !errors.username,
  });

  const usernameInUse = (userData?.length as number) > 0;

  console.log({usernameInUse, userData, username});

  function formIsValid(): boolean {
    return (
      !!isFormValid &&
      Object.keys(errors).filter((item) =>
        ['password', 'confirmPassword', 'username'].includes(item)
      ).length === 0 &&
      !errors.confirmPassword?.message &&
      !usernameInUse
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      <ul className="flex flex-col gap-3 px-2 sm:px-15 pt-10 flex-1">
        <li className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="username"
              {...register('username')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
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
        </li>
        <li className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="password"
              {...register('password')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
            {errors.password && (
              <p className="text-red-600 text-sm font-semibold font-sans">
                {errors.password.message}
              </p>
            )}
          </div>
        </li>
        <li className="w-full">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-shade-200 focus:outline-none focus:ring-0 focus:purple-shade-300 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="confirmPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-shade-200 peer-focus:dark:text-purple-shade-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              confirm password
            </label>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm font-semibold font-sans">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </li>
      </ul>
      {/* Show Next button only if all fields are filled */}
      {formIsValid() && <NextButton onClick={next} />}
    </div>
  );
}

function VerifyEmail({
  register,
}: {
  register: UseFormRegister<Inputs>;
}): JSX.Element {
  return (
    <div>
      {' '}
      <label>First Name</label>
      <input {...register('firstName')} />
    </div>
  );
}

const arrowVariants: Variants = {
  initial: {
    x: -20,
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.5,
    },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

const buttonVariants: Variants = {
  initial: {
    opacity: 0.7,
  },
  whileHover: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
};

function NextButton({
  onClick,
  text = 'Next',
}: {
  onClick: () => void;
  text?: string;
}): JSX.Element {
  const arrowAnimateControls = useAnimationControls();

  return (
    <>
      <div className="inline-block sm:hidden fixed bottom-0 right-0">
        <button
          className="font-bold font-sans mb-5 mr-5 px-5 py-2 bg-purple-shade-200 rounded-2xl "
          type="button"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
      <div className="hidden sm:flex gap-1 pr-15 mb-10 ml-auto ">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="whileHover"
          className="font-bold font-sans cursor-pointer z-10"
          onClick={onClick}
          onMouseEnter={() => {
            arrowAnimateControls.start('animate');
          }}
          onMouseLeave={() => {
            arrowAnimateControls.start('initial');
          }}
          type="button"
        >
          {text}
        </motion.button>
        <motion.p
          className="text-purple-shade-100"
          variants={arrowVariants}
          animate={arrowAnimateControls}
          initial="initial"
        >
          &gt;
        </motion.p>
      </div>
    </>
  );
}

export default SignupBox;
