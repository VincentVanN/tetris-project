import PropTypes from 'prop-types';
import { useState } from 'react';
import useKeypress from 'react-use-keypress';
import { useGameOver } from '../../hooks/useGameOver';
import Menu from '../Menu/Menu';
import Tetris from '../Tetris/Tetris';

function Game({ rows, columns }) {
  const [playMusic, setplayMusic] = useState(true);
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => {
    resetGameOver();
  };
  useKeypress('Enter', () => {
    resetGameOver();
  });
  return (
    <div className="game">
      {gameOver ? (
        <Menu
          onClick={start}
          playMusic={playMusic}
        />
      )
        : (
          <Tetris
            rows={rows}
            columns={columns}
            setGameOver={setGameOver}
            playMusic={playMusic}
          />
        )}
    </div>
  );
}
Game.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};
export default Game;
