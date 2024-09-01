import { useEffect, useState } from 'react';

export const useAddKeyboardTopItems = () => {
  const [height, setHeight] = useState(window.visualViewport?.height);
  const [bottom, setBottom] = useState('0px');
  const viewport = window.visualViewport;

  useEffect(() => {
    const resizeHandler = () => {
      if (!/iPhone|iPad|iPod/.test(window.navigator.userAgent)) {
        setHeight(viewport?.height);
      }
      setBottom(`${height! - viewport!.height + 0}px`);
    };

    viewport?.addEventListener('resize', resizeHandler);

    return () => {
      viewport?.removeEventListener('resize', resizeHandler);
    };
  }, [height, viewport]);

  return { bottom };
};
