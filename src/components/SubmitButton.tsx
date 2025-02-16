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

export default function SubmitButton() {
  return (
    <>
      <div className="inline-block sm:hidden fixed bottom-0 right-0">
        <button
          className="font-bold font-sans cursor-pointer z-10 flex items-center gap-1"
          type="submit"
        >
          <Send className="h-4 w-4" /> <p>Submit</p>
        </button>
      </div>
      <div className="hidden sm:flex gap-1 pr-15 mb-10 ml-auto ">
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
