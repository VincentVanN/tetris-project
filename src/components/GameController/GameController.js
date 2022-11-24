/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useLayoutEffect, useState,
} from 'react';
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
  const [keyPress, setkeyPress] = useState({});
  const keyupHandler = useCallback((e) => {
    setkeyPress({ keyUp: e.code, keyDown: '' });
  });
  const keyDownHandler = useCallback((e) => {
    setkeyPress({ keyUp: '', keyDown: e.code });
  });
  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyupHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyupHandler);
    };
  }, []);
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
  useLayoutEffect(() => {
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
        else resumeDropTime();
      }
      else if (action === Action.Quit) {
        setGameOver(true);
      }
      else {
        if (actionIsDrop(action)) resumeDropTime();
        handleInput({ action });
      }
    }
  }, [keyPress]);
  return (
    <div />
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
