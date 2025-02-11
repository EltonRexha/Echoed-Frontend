import { ReactNode } from 'react';
import { motion, useAnimationControls, Variants } from 'framer-motion';

interface props {
  children: ReactNode;
  /**Color that of the line */
  color: string;
  /**Height of the line in pixels */
  height: number;
}

const lineVariant: Variants = {
  initial: {
    width: '0%',
  },
  animate: {
    width: '100%',
  },
};

function Line({ children, color, height }: props): JSX.Element {
  const animateControler = useAnimationControls();

  return (
    <div className="relative">
      <div
        onMouseEnter={() => {
          animateControler.start('animate');
        }}
        onMouseLeave={() => {
          animateControler.start('initial');
        }}
      >
        {children}
      </div>
      <motion.div
        variants={lineVariant}
        animate={animateControler}
        initial="initial"
        className="relative bottom-0"
        style={{
          backgroundColor: color,
          height: `${height}px`,
        }}
      ></motion.div>
    </div>
  );
}

export default Line;
