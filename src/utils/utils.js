import { useEffect, useRef } from 'react';

export function randomIntFromInterval(min, max, snakeCells, currentFoodCell) {
  while (true) {
    let nextFoodCell = Math.floor(Math.random() * (max - min + 1) + min);
    if (snakeCells.has(nextFoodCell) || nextFoodCell === currentFoodCell)
      continue;
    return nextFoodCell;
  }
}

// Copied from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
