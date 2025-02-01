import { useEffect, useState } from 'react';

function useAutoCycle(content: string[], delay: number) {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentContentIndex((currentContentIndex + 1) % content.length);
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [delay, currentContentIndex, content.length]);

  return content[currentContentIndex];
}

export default useAutoCycle;
