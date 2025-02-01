import useAutoCycle from '@/hooks/useAutoCycle';

interface Props {
  content: string[];
  /** Delay between content changes in milliseconds */
  delay: number;
}

function CycleHeader({ content, delay }: Props): JSX.Element {
  const currentContent = useAutoCycle(content, delay);

  return (
    <h1 className="text-5xl font-raleway text-gray-300 font-semiBold">
      {currentContent}
    </h1>
  );
}

export default CycleHeader;
