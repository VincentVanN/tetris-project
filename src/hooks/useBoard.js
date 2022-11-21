/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { buildBoard, nextBoard } from '../utils/boardUtils';

export const useBoard = ({
  rows,
  columns,
  player,
  resetPlayer,
  addLinesCleared,
}) => {
  const [board, setBoard] = useState(buildBoard({ rows, columns }));
  useEffect(() => {
    setBoard((previousBoard) => nextBoard({
      board: previousBoard,
      player,
      resetPlayer,
      addLinesCleared,
    }));
  }, [player, resetPlayer, addLinesCleared]);

  return [board];
};
