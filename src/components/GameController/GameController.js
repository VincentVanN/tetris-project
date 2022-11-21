/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import { useDropTime } from '../../hooks/useDropTime';
import { useInterval } from '../../hooks/useInterval';
import { Action, actionForKey, actionIsDrop } from '../../utils/input';
import { playerController } from '../../utils/playerController';
import './gameController.scss';

function GameController({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) {
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({ gameStats });
  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setGameOver,
      setPlayer,
    });
  };
  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (actionIsDrop(action)) resumeDropTime();
  };
  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
    if (action === Action.Pause) {
      if (dropTime) {
        pauseDropTime();
      }
      else resumeDropTime();
    }
    else if (action === Action.Quit) {
      setGameOver(true);
    }
    else {
      if (actionIsDrop(action)) resumeDropTime();
      handleInput({ action });
    }
  };
  return (
    <input
      type="text"
      className="gameController"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      autoFocus
    />
  );
}
GameController.propTypes = {
  gameStats: PropTypes.object.isRequired,
  board: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  setGameOver: PropTypes.func.isRequired,
  setPlayer: PropTypes.func.isRequired,
};
export default GameController;
