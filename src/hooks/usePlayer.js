/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from 'react';
import { randomTetromino } from '../utils/tetrominoes';

const buildPlayer = (previous) => {
  let tetrominoes;
  if (previous) {
    tetrominoes = [...previous.tetrominoes];
    tetrominoes.unshift(randomTetromino());
  }
  else {
    tetrominoes = Array(3).fill(0).map(() => randomTetromino());
  }
  return {
    collided: false,
    isFastDropping: false,
    position: { row: 0, column: 4 },
    tetrominoes,
    tetromino: tetrominoes.pop(),
  };
};
export const usePlayer = () => {
  const [player, setPlayer] = useState(buildPlayer());
  const resetPlayer = useCallback(() => {
    setPlayer((prev) => buildPlayer(prev));
  }, []);
  return [player, setPlayer, resetPlayer];
};
