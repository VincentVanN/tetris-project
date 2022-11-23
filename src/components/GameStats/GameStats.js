import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './gameStats.scss';
import lvlup from '../../sound/lvlup.mp3';
import line from '../../sound/line.mp3';

function GameStats({ gameStats }) {
  const levelupSound = new Audio(lvlup);
  const lineSound = new Audio(line);
  const {
    level, points, linesCompleted, linesPerLevel,
  } = gameStats;
  const linesToLevel = (Number(linesPerLevel || 0)) - (Number(linesCompleted || 0));
  useEffect(() => {
    if (level && level > 1) {
      levelupSound.play();
    }
  }, [level]);
  useEffect(() => {
    if (linesCompleted) {
      lineSound.play();
    }
  }, [linesCompleted]);
  return (
    <ul className="gameStats gameStats__right">
      <li>Level</li>
      <li className="value">{level}</li>
      <li>Lines to level</li>
      <li className="value">{linesToLevel}</li>
      <li>{`Point${points > 1 ? 's' : ''}`}</li>
      <li className="value">{points}</li>
    </ul>
  );
}
GameStats.propTypes = {
  gameStats: PropTypes.object.isRequired,
};
export default React.memo(GameStats);
