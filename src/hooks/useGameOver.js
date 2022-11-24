/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from 'react';

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState({ isGameOver: true, afterPlaying: false });
  const resetGameOver = useCallback(() => {
    setGameOver({ isGameOver: false, afterPlaying: false });
  }, []);
  return [gameOver, setGameOver, resetGameOver];
};
