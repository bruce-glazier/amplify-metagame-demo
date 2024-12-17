import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash/debounce';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const handleResize = debounce(() => {
    setScreenSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, 150);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
