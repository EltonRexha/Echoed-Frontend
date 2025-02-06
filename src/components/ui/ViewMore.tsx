import downArrow from '@/assets/images/icons/down-arrow.svg';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';

interface props {
  /**Id to where to go */
  to: string;
}

const arrowVariants = {
  initial: {
    scale: 1,
    y: 0,
  },
  animate: {
    scale: 1.3,
    y: 20,
    transition: {
      duration: 1,
      ease: 'easeIn',
      type: 'spring',
    },
  },
};

function ViewMore({ to }: props): JSX.Element {
  const animateArrowControls = useAnimationControls();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered) {
      animateArrowControls.start('animate');
      return;
    }

    animateArrowControls.start('initial');
  }, [hovered, animateArrowControls]);

  return (
    <div
      className="flex flex-col items-center"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <p>
        <a href={to}>View more</a>
      </p>
      <motion.div
        variants={arrowVariants}
        animate={animateArrowControls}
        className="w-5 h-5"
      >
        <img src={downArrow} alt="" className="w-[100%] h-[100%]" />
      </motion.div>
    </div>
  );
}

export default ViewMore;
