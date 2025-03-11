import FadeIn from '@/components/ui/FadeIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { countries } from 'countries-list';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FadeInList from '@/components/FadeInList';
import CustomInput from '@/components/ui/CustomInput';
import getMonthName from '@/utils/getMonthName';
import { differenceInYears, getDaysInMonth } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/services/state/redux/store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { convertOAuthUserToLocalUser, getUser } from '@/services/api/User';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { logout } from '@/services/state/redux/slices/AuthSlice';

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
  country: z.enum(COUNTRIES as [string, ...string[]]),
  year: z.number(),
  month: z.number().min(1, 'Invalid month').max(12, 'Invalid month'),
  day: z.number().min(1, 'Invalid day').max(31, 'Invalid day'),
});

type Inputs = z.infer<typeof schema>;

//Will get more information about a user and make a request to the backend to migrate oauth user to a localuser
function CompleteProfilePage() {
  const { user } = useSelector((state: RootState) => state.Authentication);

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const month = watch('month');
  const year = watch('year');
  const day = watch('day');
  const username = watch('username');

  const { data: userData } = useQuery({
    queryFn: () => getUser({ username }),
    queryKey: ['user', { username }],
    enabled: !!(!errors.username && username),
  });

  const usernameInUse = !!userData?.user;

  function formIsValid(): boolean {
    return (
      Object.keys(errors).filter((item) =>
        [
          'firstName',
          'lastName',
          'gender',
          'country',
          'year',
          'day',
          'month',
        ].includes(item)
      ).length === 0 &&
      !usernameInUse &&
      differenceInYears(NOW, new Date(year, month - 1, day)) >= MIN_AGE
    );
  }

  const migrateUserMutation = useMutation({
    mutationFn: (payload: {
      firstName: string;
      lastName: string;
      username: string;
      dateOfBirth: Date;
      country: string;
    }) => convertOAuthUserToLocalUser(payload),
    onSuccess: () => {
      toast.success('Successfully finished account');
      //Log out the OAuth user
      dispatch(logout());
      window.location.reload();
    },
    onError: () => {
      navigate('/');
      toast.error('Something went wrong finshing your account');
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    migrateUserMutation.mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      dateOfBirth: new Date(data.year, data.month - 1, data.day),
      country: data.country,
    });
  };

  return (
    <div className="overflow-x-hidden font-raleway  bg-lighter-background dark:bg-purple-shade-400">
      <FadeIn>
        <div className="w-full min-h-[100vh] flex flex-col items-center justify-center flex-1">
          <div className="w-full sm:w-[650px] font-sans px-8 sm:px-17 rounded text-light-primary-text dark:text-dark-primary-text">
            <h1 className="text-xl font-raleway font-semibold text-light-primary-text dark:text-dark-primary-text mb-1">
              Finish setting up your account
            </h1>
            <p className="text-sm font-sans text-light-secondary-text dark:text-dark-secondary-text mb-10">
              Just a little bit of info, and we'll be all set!
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative h-full flex flex-col font-sans">
                <FadeInList
                  parentProps={{
                    className: 'flex flex-col',
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    {!user?.firstName ? (
                      <div className="relative z-0 w-full mb-5 group">
                        <CustomInput
                          inputProps={{
                            ...register('firstName'),
                            id: 'first_name',
                          }}
                          labelProps={{ id: 'first_name' }}
                          labelText="First name"
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-sm font-semibold font-sans">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <input
                        className="hidden"
                        {...register('firstName')}
                        value={user.firstName}
                      />
                    )}

                    {!user?.lastName ? (
                      <div className="relative z-0 w-full mb-5 group">
                        <CustomInput
                          inputProps={{
                            ...register('lastName'),
                            id: 'last_name',
                          }}
                          labelProps={{ id: 'last_name' }}
                          labelText="Last name"
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-sm font-semibold font-sans">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <input
                        className="hidden"
                        {...register('lastName')}
                        value={user.lastName}
                      />
                    )}
                  </div>

                  <div className="flex-1 mt-2">
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
                      {usernameInUse && (
                        <p className="text-red-600 text-sm font-semibold font-sans">
                          This username is already in use
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 mt-4">
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

                  <div className="flex-1 mt-2">
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
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option value={month} key={month}>
                                {getMonthName(month)}
                              </option>
                            )
                          )}
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
                            {
                              length: getDaysInMonth(
                                month ? month : 1
                              ) as number,
                            },
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
                      {differenceInYears(NOW, new Date(year, month, day)) <
                        MIN_AGE && (
                        <p className="text-red-600 text-sm font-semibold font-sans">
                          You must be {MIN_AGE} to use this app
                        </p>
                      )}
                    </div>
                  </div>
                </FadeInList>
              </div>
              {/* Show Next button only if all fields are filled */}
              {formIsValid() && (
                <Button type="submit" className="cursor-pointer w-full">
                  Finish
                </Button>
              )}
            </form>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default CompleteProfilePage;
