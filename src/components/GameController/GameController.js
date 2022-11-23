/* eslint-disable jsx-a11y/no-autofocus */

import PropTypes from 'prop-types';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
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
  const prevKeyUpRef = useRef();
  const prevKeyDownRef = useRef();
  const [keyPress, setKeyPress] = useState({});
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
  console.log(keyPress);
  if (keyPress.keyUp) {
    const actionKeyUp = actionForKey(keyPress.keyUp);
    if (actionIsDrop(actionKeyUp)) resumeDropTime();
    setKeyPress({ keyUp: '', keyDown: '' });
  }
  useEffect(() => {
    prevKeyUpRef.current = keyPress.keyUp;
    prevKeyDownRef.current = keyPress.keyDown;
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
  const handleKeyUp = useCallback((e) => {
    setKeyPress({ keyUp: e.code, keyDown: '' });
  }, [keyPress]);
  const handleKeyDown = useCallback((e) => {
    setKeyPress({ keyUp: '', keyDown: e.code });
    setInterval(() => {
      setKeyPress({ keyUp: e.code, keyDown: '' });
    }, 100);
  }, [keyPress]);
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
