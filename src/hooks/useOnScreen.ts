import { useEffect, useRef, useState } from "react";

const useOnScreen = (threshold = 0) => {
  const ref = useRef(null); // Reference to the DOM element
  const [isOnScreen, setIsOnScreen] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right'>('right')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
        const rect = entry.boundingClientRect;
        if (rect.right < 0) {
          console.log('exited left')
          setExitDirection('left')
        } else {
          console.log('exited right')
          setExitDirection('right')
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

  return {ref, isOnScreen, exitDirection };
};

export default useOnScreen;
