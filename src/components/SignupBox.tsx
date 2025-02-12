import { Gender } from '@/types/gender';
import { ReactNode, useState } from 'react';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import StepDescriptionIndicator from './ui/StepDescriptionIndicator';
import {
  Variants,
  animationControls,
  motion,
  useAnimationControls,
} from 'framer-motion';

interface Inputs {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  confirmPassword: string;
  username: string;
  country: string;
  gender: Gender;
}

function SignupBox(): JSX.Element {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [currentInputBox, setCurrentInputBox] = useState(0);
  const incrementCurrentInputBox = (): void => {
    setCurrentInputBox(currentInputBox + 1);
  };

  const inputBoxes: ReactNode[] = [
    <FirstInputGroup register={register} next={incrementCurrentInputBox} />,
    <SecondInputGroup register={register} next={incrementCurrentInputBox} />,
    <ThirdInputGroup register={register} next={incrementCurrentInputBox} />,
  ];

  return (
    <div className="flex flex-col w-[550px] font-raleway p-2 h-[450px] rounded border-dark-secondary dark:border-purple-shade-300 border-2 text-light-primary dark:text-dark-primary">
      <div className="p-2">
        <StepDescriptionIndicator
          currentIndex={currentInputBox}
          descriptions={['Personal Info', 'Account Info', 'Finish']}
        />
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
}: {
  register: UseFormRegister<Inputs>;
  next: () => void;
}): JSX.Element {
  return (
    <div className="relative h-full flex flex-col">
      <ul className="flex flex-col gap-3 px-15 justify-center flex-1">
        <li className="flex gap-5 w-full x">
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
          </div>
        </li>
      </ul>
      <NextButton onClick={next} />
    </div>
  );
}

function SecondInputGroup({
  register,
  next,
}: {
  register: UseFormRegister<Inputs>;
  next: () => void;
}): JSX.Element {
  return (
    <div>
      {' '}
      <label>First Name</label>
      <input {...register('firstName')} />
    </div>
  );
}

function ThirdInputGroup({
  register,
  next,
}: {
  register: UseFormRegister<Inputs>;
  next: () => void;
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

function NextButton({ onClick }: { onClick: () => void }): JSX.Element {
  const arrowAnimateControls = useAnimationControls();

  return (
    <div className="flex gap-1 pr-15 mb-10 ml-auto ">
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover='whileHover'
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
        Next
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
  );
}

export default SignupBox;
