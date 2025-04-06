import React, { ReactNode, useEffect } from 'react';
import { useInView } from 'framer-motion';

interface ViewWrapperProps<T> {
  children: ReactNode;
  onInView?: ({
    inView,
    additionalData,
  }: {
    inView: boolean;
    additionalData: T;
  }) => void;
  id?: string;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  additionalData: T;
}

/**
 * A component that wraps its children and detects when they come into view
 * using Framer Motion's useInView hook
 */
const ViewWrapper = <T,>({
  children,
  onInView,
  id,
  threshold = 0.1,
  triggerOnce = false,
  className = '',
  additionalData,
}: ViewWrapperProps<T>) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, {
    amount: threshold,
    once: triggerOnce,
  });

  // Call the onInView callback when inView state changes
  useEffect(() => {
    // Only call onInView when the element is in view, not when exiting view
    if (onInView && inView) {
      onInView({ inView, additionalData });
    }
  }, [inView, onInView, additionalData]);

  return (
    <div ref={ref} id={id} className={className} data-in-view={inView}>
      {children}
    </div>
  );
};

export default ViewWrapper;
