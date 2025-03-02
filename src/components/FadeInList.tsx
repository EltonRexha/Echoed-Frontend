import { ReactNode } from 'react';
import { HTMLMotionProps, motion, Variants } from 'framer-motion';

interface Props {
  children: ReactNode;
  parentProps?: HTMLMotionProps<'div'>;
}

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2, // Delay between children animations
    },
  },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'anticipate',
      duration: 0.8,
    },
  },
};

export default function FadeInList({
  children,
  parentProps
}: Props): JSX.Element {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
      {...parentProps}
      viewport={{ once: true, amount: 0.2 }}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={itemVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
}
