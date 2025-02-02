import { motion } from 'framer-motion';

interface props {
  bgColor: string;
  /** durations in seconds*/
  duration: number;
  /** delay in seconds*/
  delay: number;
}

function SlideAnimation({ bgColor, duration, delay }: props): JSX.Element {
  const slideVariants = {
    initial: {
      transform: 'translateX(-100%)',
    },
    animation: {
      transform: 'translateX(100%)',
      transition: {
        duration: duration,
        ease: 'ease-out',
        delay: delay,
      },
    },
  };
  return (
    <motion.div
      variants={slideVariants}
      animate="animation"
      initial="initial"
      style={{ backgroundColor: bgColor }}
      className="absolute z-50 top-0 right-0 bottom-0 left-0"
    ></motion.div>
  );
}

export default SlideAnimation;
