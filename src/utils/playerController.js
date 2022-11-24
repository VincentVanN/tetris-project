/* eslint-disable import/no-cycle */
import { hasCollision, isWithinBoard } from './boardUtils';
import { Action } from './input';
import { rotate } from './tetrominoes';
import fastDrop from '../sound/fastDrop.mp3';
import rotateSound from '../sound/rotate.mp3';
/* eslint-disable import/prefer-default-export */
const attemptRotation = ({ board, player, setPlayer }) => {
  const rotateSample = new Audio(rotateSound);
  const shape = rotate({
    piece: player.tetromino.shape,
    direction: 1,
  });

  const { position } = player;
  const isValidRotation = isWithinBoard({ board, position, shape })
    && !hasCollision({ board, position, shape });

  if (isValidRotation) {
    rotateSample.play();
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

export const movePlayer = ({
  delta, position, shape, board,
}) => {
  const desiredNextPosition = {
    row: position.row + delta.row,
    column: position.column + delta.column,
  };

  const collided = hasCollision({
    board,
    position: desiredNextPosition,
    shape,
  });

  const isOnBoard = isWithinBoard({
    board,
    position: desiredNextPosition,
    shape,
  });

  const preventMove = !isOnBoard || (isOnBoard && collided);
  const nextPosition = preventMove ? position : desiredNextPosition;

  const isMovingDown = delta.row > 0;
  const isHit = isMovingDown && (collided || !isOnBoard);

  return { collided: isHit, nextPosition };
};

const attemptMovement = ({
  board, action, player, setPlayer, setGameOver,
}) => {
  const fastDropSound = new Audio(fastDrop);
  const delta = { row: 0, column: 0 };
  let isFastDropping = false;

  if (action === Action.FastDrop) {
    fastDropSound.play();
    isFastDropping = true;
  }
  else if (action === Action.SlowDrop) {
    delta.row += 1;
  }
  else if (action === Action.Left) {
    delta.column -= 1;
  }
  else if (action === Action.Right) {
    delta.column += 1;
  }

  const { collided, nextPosition } = movePlayer({
    delta,
    position: player.position,
    shape: player.tetromino.shape,
    board,
  });

  // gameover!
  const isGameOver = collided && player.position.row === 0;
  if (isGameOver) {
    setGameOver({ isGameOver: true, afterPlaying: true });
  }

  setPlayer({
    ...player,
    collided,
    isFastDropping,
    position: nextPosition,
  });
};

export const playerController = ({
  action,
  board,
  player,
  setPlayer,
  setGameOver,
}) => {
  if (!action) return;

  if (action === Action.Rotate) {
    attemptRotation({ board, player, setPlayer });
  }
  else {
    attemptMovement({
      board, player, setPlayer, action, setGameOver,
    });
  }
};
