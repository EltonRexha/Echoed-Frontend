import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface props {
  children: ReactNode;
  /** A duration of how long will the animation run */
  duration: number;
  /** The background color that is behind the children*/
  backgroundClr: string;
}

function TypeAnimationWrapper({
  children,
  duration,
  backgroundClr,
}: props): JSX.Element {
  const moveLeftToRight = {
    animation: {
      transform: 'translateX(1000px)',
      transition: {
        duration: duration,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  const blink = {
    initial: {
      opacity: 0,
    },
    animation: {
      transform: 'translateX(1000px)',
      opacity: 1,
      transition: {
        transform: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
        },
        opacity: {
          duration: duration / 25,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      },
    },
  };

  return (
    <div className="block">
      <div className="relative p-1 overflow-hidden inline-block">
        {/* Hide the rest of the white "blinker" to make it look like a blinker */}
        <motion.div
          variants={moveLeftToRight}
          animate="animation"
          className="absolute  left-3 top-0 right-0 bottom-0 z-50"
          style={{
            backgroundColor: backgroundClr,
          }}
        ></motion.div>
        {/* Blinker */}
        <div className="relative inline-block z-10">
          <motion.div
            variants={blink}
            animate="animation"
            initial="initial"
            className="absolute inline-block bg-white z-50 left-0 right-0 top-0 bottom-0"
          ></motion.div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default TypeAnimationWrapper;
