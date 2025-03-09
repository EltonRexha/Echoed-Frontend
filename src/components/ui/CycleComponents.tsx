import useAutoCycle from '@/hooks/useAutoCycle';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode[] | ReactNode;
  /** Delay between content changes in milliseconds */
  delay: number;
}

function CycleComponents({ children, delay }: Props): JSX.Element {
  if (!Array.isArray(children)) {
    children = [children];
  }
  const currentContent = useAutoCycle(children as ReactNode[], delay);

  return <>{currentContent}</>;
}

export default CycleComponents;
