import PropTypes from 'prop-types';
import { useBoard } from '../../hooks/useBoard';
import { useGameStats } from '../../hooks/useGameStats';
import Board from '../Board/Board';
import GameStats from '../GameStats/GameStats';
import Previews from '../Previews/Previews';
import './tetris.scss';

function Tetris({ rows, columns, setGameOver }) {
  const [board] = useBoard({ rows, columns });
  const [gameStats, addLinesCleared] = useGameStats();
  const player = {
    tetrominoes: [],
  };
  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
    </div>
  );
}
Tetris.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  setGameOver: PropTypes.func.isRequired,
};
export default Tetris;
