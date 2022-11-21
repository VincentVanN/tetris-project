/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import { Action, actionForKey } from '../../utils/input';
import { playerController } from '../../utils/playerController';
import './gameController.scss';

function GameController({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) {
  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setGameOver,
      setPlayer,
    });
  };
  const onKeyUp = ({ code }) => {
    const action = actionForKey(code);
    if (action === Action.Quit) {
      setGameOver(true);
    }
  };
  const onKeyDown = ({ code }) => {
    const action = actionForKey(code);
    handleInput({ action });
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
