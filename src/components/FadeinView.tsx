import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface Props {
  children: ReactNode;
}

const variants: Variants = {
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

export default function FadeInView({ children }: Props): JSX.Element {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }} // Adjust viewport settings
    >
      {children}
    </motion.div>
  );
}
