import React from 'react';
import PropTypes from 'prop-types';
import './gameStats.scss';

function GameStats({ gameStats }) {
  const {
    level, points, linesCompleted, linesPerLevel,
  } = gameStats;
  const linesToLevel = (Number(linesPerLevel || 0)) - (Number(linesCompleted || 0));

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
