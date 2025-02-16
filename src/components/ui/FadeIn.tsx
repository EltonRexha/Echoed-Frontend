import { Variants } from 'framer-motion';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
}

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

function FadeIn({ children }: Props): JSX.Element {
  return (
    <motion.div variants={pageVariants} animate="animate" initial="initial">
      {children}
    </motion.div>
  );
}

export default FadeIn;
