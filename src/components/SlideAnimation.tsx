import { motion } from 'framer-motion';

interface props {
  bgColor: string;
  /** durations in seconds*/
  duration: number;
  /** delay in seconds*/
  delay: number;
  /**The percentage of the start x */
  startX?: number;
  /**The percentage of the end x */
  endX?: number;
}

function SlideAnimation({
  bgColor,
  duration,
  delay,
  startX = -100,
  endX = 100,
}: props): JSX.Element {
  const slideVariants = {
    initial: {
      x: `${startX}%`,
    },
    animation: {
      transform: `translateX(${endX}%)`,
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
