import { isWithinBoard } from './boardUtils';
import { Action } from './input';
import { rotate } from './tetrominoes';
/* eslint-disable import/prefer-default-export */
const attemptRotation = ({ board, player, setPlayer }) => {
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });
  const { position } = player;
  const isValidRotation = isWithinBoard({ board, position, shape })
  && !hasCollision({ board, position, shape });
  if (isValidRotation) {
    setPlayer({
      ...player,
      tetromino: {
        ...player.tetromino,
        shape,
      },
    });
  }
  return false;
};
export const playerController = ({
  action,
  board,
  player,
  setGameOver,
  setPlayer,
}) => {
  if (!action) return;
  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  }
};
