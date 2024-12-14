import { useEffect, useRef, useState } from 'react';

export type ExitDirection = 'left' | 'right';

const useOnScreen = (threshold = 0) => {
  const ref = useRef(null); // Reference to the DOM element
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [exitDirection, setExitDirection] = useState<ExitDirection>('right');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
        const rect = entry.boundingClientRect;
        if (rect.right < 0) {
          setExitDirection('left');
        } else {
          setExitDirection('right');
        }
        // here is where we know that the element stopped being on screen
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  return { ref, isOnScreen, exitDirection };
};

export default useOnScreen;
