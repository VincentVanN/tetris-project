/* eslint-disable import/prefer-default-export */
const tetroClassName = 'tetromino';
export const TETROMINOES = {
  I: {
    shape: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
    className: `${tetroClassName} ${tetroClassName}__i`,
  },
  J: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0],
    ],
    className: `${tetroClassName} ${tetroClassName}__j`,
  },
  L: {
    shape: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
    ],
    className: `${tetroClassName} ${tetroClassName}__l`,
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    className: `${tetroClassName} ${tetroClassName}__o`,
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    className: `${tetroClassName} ${tetroClassName}__s`,
  },
  T: {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    className: `${tetroClassName} ${tetroClassName}__t`,
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    className: `${tetroClassName} ${tetroClassName}__z`,
  },
};
export const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const index = Math.floor(Math.random() * keys.length);

  const key = keys[index];
  return TETROMINOES[key];
};
export const rotate = ({ piece, direction }) => {
// rows <====> collumns
  const newPiece = piece.map((_, index) => piece.map((column) => column[index]));
  if (direction > 0) return newPiece.map((row) => row.reverse());
  return newPiece.reverse();
};
export const transferToBoard = ({
  className,
  isOccupied,
  position,
  rows,
  shape,
}) => {
  shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const occupied = isOccupied;
        const newY = y + position.row;
        const newX = x + position.column;
        rows[newY][newX] = { occupied, className };
      }
    });
  });
  return rows;
};
