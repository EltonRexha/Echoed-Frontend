import { motion, useAnimationControls, Variants } from 'framer-motion';

const arrowVariants: Variants = {
  initial: {
    x: -20,
    opacity: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.5,
    },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

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

export default function PrevButton({
  onClick,
  text = 'Prev',
}: {
  onClick: () => void;
  text?: string;
}): JSX.Element {
  const arrowAnimateControls = useAnimationControls();

  return (
    <>
      <div className="inline-block sm:hidden fixed bottom-0 left-0">
        <button
          className="font-bold font-sans mb-5 ml-5 px-5 py-2 bg-purple-shade-200 rounded text-dark-primary"
          type="button"
          onClick={onClick}
        >
          {text}
        </button>
      </div>
      <div className="hidden sm:flex gap-1">
        <motion.p
          className="text-purple-shade-100"
          variants={arrowVariants}
          animate={arrowAnimateControls}
          initial="initial"
        >
          &lt;
        </motion.p>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="whileHover"
          className="font-bold font-sans cursor-pointer z-10"
          onClick={onClick}
          onMouseEnter={() => {
            arrowAnimateControls.start('animate');
          }}
          onMouseLeave={() => {
            arrowAnimateControls.start('initial');
          }}
          type="button"
        >
          {text}
        </motion.button>
      </div>
    </>
  );
}