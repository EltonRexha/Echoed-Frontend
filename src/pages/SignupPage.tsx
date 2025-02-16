import SignupBox from '@/components/SignupBox';
import FadeIn from '@/components/ui/FadeIn';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { motion, Variants } from 'framer-motion';

const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: 'anticipate',
      duration: 1,
    },
  },
};

function SignupPage(): JSX.Element {
  return (
    <div className="overflow-x-hidden font-raleway bg-lighter dark:bg-purple-shade-400">
      <FadeIn>
        <div className="min-h-[101vh] bg-lighter dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative flex flex-col">
          <GettingStartedNav />
          <div className="w-full flex sm:items-center sm:justify-center flex-1">
            <SignupBox />
          </div>
        </div>
      </FadeIn>
    </div>
  );
}

export default SignupPage;
