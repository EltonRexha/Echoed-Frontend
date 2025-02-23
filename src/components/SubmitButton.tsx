import { Variants } from 'framer-motion';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

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
// font-bold font-sans mb-5 ml-5 px-5 py-2 rounded-2xl text-light-primary dark:text-dark-primary
export default function SubmitButton() {
  return (
    <>
      <div className="inline-block sm:hidden fixed bottom-0 right-0">
        <button
          className="font-bold font-sans mb-5 mr-5 px-5 py-2 bg-purple-shade-200 rounded text-dark-primary flex items-center gap-2"
          type="submit"
        >
          <Send className="h-4 w-4" /> <p>Submit</p>
        </button>
      </div>
      <div className="hidden sm:flex gap-1">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="whileHover"
          className="font-bold font-sans cursor-pointer z-10 flex items-center gap-1"
          type="submit"
        >
          <Send className="h-4 w-4" /> <p>Submit</p>
        </motion.button>
      </div>
    </>
  );
}
