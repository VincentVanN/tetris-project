import PropTypes from 'prop-types';
import { useGameOver } from '../../hooks/useGameOver';
import Menu from '../Menu/Menu';
import Tetris from '../Tetris/Tetris';

function Game({ rows, columns }) {
  const [gameOver, setGameOver, resetGameOver] = useGameOver();
  const start = () => resetGameOver();
  return (
    <div className="game">
      {gameOver ? (<Menu onClick={start} />)
        : (
          <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
        )}
    </div>
  );
}
Game.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
};
export default Game;
