import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  callback: () => void,
) => {
  

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, callback]);
};

export default useClickOutside;
