/* eslint-disable no-mixed-operators */
import { useCallback, useState } from 'react';
/* eslint-disable import/prefer-default-export */
const buildGameStats = () => ({
  level: 1,
  linesCompleted: 0,
  linesPerLevel: 5,
  points: 0,
});
export const useGameStats = () => {
  const [gameStats, setGameStats] = useState(buildGameStats());
  const addLinesCleared = useCallback((lines) => {
    setGameStats((previous) => {
      const points = previous.points + lines * 100;
      const { linesPerLevel } = previous;
      const newLinesCompleted = previous.linesCompleted + lines;
      const level = newLinesCompleted >= linesPerLevel
        ? previous.level + 1
        : previous.level;
      const linesCompleted = newLinesCompleted % linesPerLevel;

      return {
        level,
        linesCompleted,
        linesPerLevel,
        points,
      };
    }, []);
  }, []);

  return [gameStats, addLinesCleared];
};
