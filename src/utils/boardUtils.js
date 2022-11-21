/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
import { defaultCell } from './cell';
import { transferToBoard } from './tetrominoes';

export const buildBoard = ({ rows, columns }) => {
  const buildRows = Array.from(
    { length: rows },
    () => Array.from(
      { length: columns },
      () => ({ ...defaultCell }),
    ),
  );
  console.log(buildRows);
  return {
    rows: buildRows,
    size: {
      rows,
      columns,
    },
  };
};
export const nextBoard = ({
  board, player, resetPlayer, addLinesCleared,
}) => {
  const { tetromino, position } = player;
  let rows = board.rows.map((row) => (
    row.map((cell) => (cell.occupied ? cell : { ...defaultCell }))
  ));
  rows = transferToBoard({
    className: tetromino.className,
    isOccupied: player.collided,
    position,
    rows,
    shape: tetromino.shape,
  });
  return {
    rows,
    size: { ...board.size },
  };
};
export const hasCollision = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;

        if (
          board.rows[row]
          && board.rows[row][column]
          && board.rows[row][column].occupied
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
export const isWithinBoard = ({ board, position, shape }) => {
  for (let y = 0; y < shape.length; y++) {
    const row = y + position.row;

    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const column = x + position.column;
        const isValidPosition = board.rows[row] && board.rows[row][column];

        if (!isValidPosition) return false;
      }
    }
  }

  return true;
};
