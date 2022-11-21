/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
// credit Dan Abramov
// for more information for this hook, plz consult https://overreacted.io/making-setinterval-declarative-with-react-hooks/
