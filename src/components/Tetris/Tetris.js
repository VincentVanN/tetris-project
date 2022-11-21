import PropTypes from 'prop-types';
import { useBoard } from '../../hooks/useBoard';
import { useGameStats } from '../../hooks/useGameStats';
import { usePlayer } from '../../hooks/usePlayer';
import Board from '../Board/Board';
import GameController from '../GameController/GameController';
import GameStats from '../GameStats/GameStats';
import Previews from '../Previews/Previews';
import './tetris.scss';

function Tetris({ rows, columns, setGameOver }) {
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [gameStats, addLinesCleared] = useGameStats();
  const [board] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared,
  });
  return (
    <div className="tetris">
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
}
Tetris.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  setGameOver: PropTypes.func.isRequired,
};
export default Tetris;
