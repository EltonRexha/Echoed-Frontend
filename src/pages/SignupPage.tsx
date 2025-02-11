import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { motion } from 'framer-motion';

function SignupPage(): JSX.Element {
  return (
    <motion.div className="overflow-x-hidden font-raleway">
      <div className="min-h-[101vh] bg-lighter dark:bg-purple-shade-400 pl-2 pr-2 sm:pl-10 sm:pr-10 relative">
        <GettingStartedNav />
      </div>
    </motion.div>
  );
}

export default SignupPage;
