/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDropTime } from '../../hooks/useDropTime';
import { useInterval } from '../../hooks/useInterval';
import { Action, actionForKey, actionIsDrop } from '../../utils/input';
import { playerController } from '../../utils/playerController';

function GameController({
  board,
  gameStats,
  player,
  setGameOver,
  setPlayer,
}) {
  const [keyPress, setKeyPress] = useState({ keyUp: '', keyDown: '' });
  const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
    gameStats,
  });
  const handleInput = ({ action }) => {
    playerController({
      action,
      board,
      player,
      setPlayer,
      setGameOver,
    });
  };
  useInterval(() => {
    handleInput({ action: Action.SlowDrop });
  }, dropTime);

  useEffect(() => {
    if (keyPress.keyUp) {
      const action = actionForKey(keyPress.keyUp);
      if (actionIsDrop(action)) resumeDropTime();
    }
    if (keyPress.keyDown) {
      const action = actionForKey(keyPress.keyDown);

      if (action === Action.Pause) {
        if (dropTime) {
          pauseDropTime();
        }
        else {
          resumeDropTime();
        }
      }
      else if (action === Action.Quit) {
        setGameOver(true);
      }
      else {
        if (actionIsDrop(action)) pauseDropTime();
        if (!dropTime) {
          return;
        }
        handleInput({ action });
      }
    }
  }, [keyPress]);
  const handleKeyUp = (e) => setKeyPress({ keyUp: e.code, keyDown: '' });
  const handleKeyDown = (e) => setKeyPress({ keyUp: '', keyDown: e.code });
  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div
      className="GameController"
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
