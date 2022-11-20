import { useCallback, useState } from 'react';

/* eslint-disable import/prefer-default-export */
const buildGameStats = () => ({
  level: 1,
  lineCompleted: 0,
  linesPerLevel: 10,
  points: 0,
});
export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());
  const addLinescleared = useCallback(() => {}, []);
  return [gameStats, addLinescleared];
};
